import './App.css';
import SearchBox from './SearchBox';
import React, { useState, useEffect, useRef } from 'react';
import Loading from './Loading';
import ReturnToTopButton from './ReturnToTop';

const textlimit = 1000;
const maxLength = 1800;

const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
        <p id="text">
            {isReadMore ? text.slice(0, textlimit) : text}
            <span
                onClick={toggleReadMore}
                id="read-or-hide"
            >
                {isReadMore ? "...read more" : " show less"}
            </span>
        </p>
    );
};

function reduceCorpus(corpus) {
    // Split the corpus into sentences
    const sentences = corpus.match(/[^.!?]+[.!?]+/g);
  
    // Initialize variables
    let reducedCorpus = '';
    let currentLength = 0;
  
    // Iterate through sentences and add them to the result
    for (const sentence of sentences) {
      // Add the sentence and delimiter (.!?) back
      const trimmedSentence = sentence.trim() + " ";
      
      // Check if adding the current sentence exceeds the maxLength
      if (currentLength + trimmedSentence.length <= maxLength) {
        reducedCorpus += trimmedSentence;
        currentLength += trimmedSentence.length;
      } else {
        // If the maxLength would be exceeded, stop adding sentences
        break;
      }
    }
  
    return reducedCorpus;
}

function App() {

    const [movies, setMovies] = useState([]);
    const [searched, setSearched] = useState(false);
    const targetSectionRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (query) => {
        setLoading(true);

        try {
            const response = await fetch('http://127.0.0.1:5000/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            });

            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }

            const searchResults = await response.json();
            setMovies(searchResults.result);
            setSearched(true);
            console.log('Response from server:', searchResults.result);
        } catch (error) {
            console.error('Error:', error.message);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (movies.length > 0) {
            if (targetSectionRef.current) {
                targetSectionRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    }, [movies]);


    return (
        <div className="App-header">
            
            <ReturnToTopButton />
            <div id="search-page">
                {(<SearchBox onSearch={handleSearch}/>)}
            </div>
            {loading && <Loading />}
            <div id="search-results" ref={targetSectionRef}>
                {movies.map((movie, index) => (
                    <div id="smallbox-results">
                        <br></br>
                        <img src = {movie["Image"]} alt = "movie-pic" id="image-float"/>

                        <div id="text-container">    
                            <a href={movie["Wiki"]} id="search-title"> {movie["Title"]} </a>({movie["Year"]})
                            <br></br>
                            <div id="search-content">
                                <ReadMore>{reduceCorpus(movie["Plot"])}</ReadMore>
                            </div>
                        </div>
                    </div>
                ))}
                <div></div>
            </div>

            <br></br>
        </div>
    );
}

export default App;

