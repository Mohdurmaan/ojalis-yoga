import React, { useEffect, useRef, useState } from "react";

const ScrollAnimation = ({ children, className = "" }) => {
    const elementRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0.15,
            }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div
            ref={elementRef}
            className={`
                scroll-animate
                ${isVisible ? "show" : ""}
                ${className}
            `}
        >
            {children}
        </div>
    );
};

export default ScrollAnimation;