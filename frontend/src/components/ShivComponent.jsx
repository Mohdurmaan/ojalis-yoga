import React, { useState, useEffect } from 'react';

import eyeImage from '../assets/shivji-eye.png';
import bgImage from '../assets/shivjibb.jpeg';

import '../index.css';

const ShivComponent = () => {

    const [isAnimating, setIsAnimating] = useState(false);
    const [showEye, setShowEye] = useState(true);
    const [isDimmed, setIsDimmed] = useState(false);

    useEffect(() => {

        // Initial state
        setIsAnimating(false);
        setShowEye(true);
        setIsDimmed(false);


        // Animation start
        const startTimer = setTimeout(() => {

            setIsAnimating(true);
            setIsDimmed(true);

        }, 100);


        // Animation complete
        const endTimer = setTimeout(() => {

            setShowEye(false);
            setIsDimmed(false);

        }, 5200);


        // Cleanup
        return () => {

            clearTimeout(startTimer);
            clearTimeout(endTimer);

        };

    }, []);


    return (

        <div className="shiv-container">

            {/* =================================
                BACKGROUND
            ================================= */}

            <img
                src={bgImage}
                alt="Lord Shiva Background"
                className="static-bg"
            />


            {/* =================================
                BLACK OVERLAY

                Important:
                inline opacity hata diya hai
                ================================= */}

            <div
                className={`dark-overlay ${
                    isDimmed ? 'active' : ''
                }`}
            ></div>


            {/* =================================
                THIRD EYE
            ================================= */}

            {showEye && (

                <img
                    src={eyeImage}
                    alt="Third Eye"
                    className={`animated-eye ${
                        isAnimating
                            ? 'animate-eye-reveal'
                            : ''
                    }`}
                />

            )}

        </div>

    );

};

export default ShivComponent;