import React from 'react';

export default function Loader() {
  return (
    <div className="loader-wrapper">
      <div className="loader-container">
        <div className="loader-dot loader-dot-1"></div>
        <div className="loader-dot loader-dot-2"></div>
        <div className="loader-dot loader-dot-3"></div>
      </div>

      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              result="blur"
              stdDeviation="10"
              in="SourceGraphic"
            ></feGaussianBlur>
            <feColorMatrix
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
              mode="matrix"
              in="blur"
            ></feColorMatrix>
          </filter>
        </defs>
      </svg>
    </div>
  );
}
