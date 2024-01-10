import React from 'react';
import "./Loading.css"

function Loading() {
  return (
    <div id="bg">
        <div id="loop" class="center"></div>
        <div id="bike-wrapper" class="center">
            <div id="bike" class="centerBike"></div>
        </div>
    </div>
  );
}

export default Loading;
