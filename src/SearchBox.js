import './App.css';
import React, { useState } from 'react';

function SearchBox({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
        }
    };

    return (
        <form 
        id="search-form" 
        action="/search" 
        method="get" 
        onChange={(e) => setQuery(e.target.value)}
        >
            <div id="search-header"><h1>Enter your Movie plot</h1></div>
            <textarea 
            type="text" 
            id="search-input" 
            name="query"
            placeholder="Let's hear it then..." 
            autoComplete="off" 
            rows="5" cols="30" 
            onKeyDown={handleKeyPress}/>
        </form>
    );
}

export default SearchBox;