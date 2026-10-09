import React from "react";
import "../index.css";
import ScrollAnimation from "./ScrollAnimation";

const CTASection = () => {
    return (
        <section className="cta-section">

            {/* Decorative Elements */}

            <div className="cta-glow cta-glow-left"></div>
            <div className="cta-glow cta-glow-right"></div>

            <div className="cta-pattern">
                <span></span>
                <span></span>
                <span></span>
            </div>


            {/* Content */}

            <div className="cta-container">

                <div className="cta-content">


                    {/* ================= LABEL ================= */}

                    <ScrollAnimation>

                        <div className="cta-label">

                            <span className="cta-line"></span>

                            <span>
                                Begin Your Journey
                            </span>

                            <span className="cta-line"></span>

                        </div>

                    </ScrollAnimation>


                    {/* ================= HEADING ================= */}

                    <ScrollAnimation>

                        <h2 className="cta-title">

                            Your Journey Within

                            <span>
                                Begins Today
                            </span>

                        </h2>

                    </ScrollAnimation>


                    {/* ================= DESCRIPTION ================= */}

                    <ScrollAnimation>

                        <p className="cta-description">
                            Take the first step towards a deeper connection
                            with yourself. Discover ancient wisdom, mindful
                            practices and a peaceful path designed to transform
                            your inner world.
                        </p>

                    </ScrollAnimation>


                    {/* ================= BUTTONS ================= */}

                    <ScrollAnimation>

                        <div className="cta-buttons">

                            <a
                                href="#programs"
                                className="cta-primary"
                            >
                                Explore Programs

                                <span>
                                    →
                                </span>

                            </a>


                            <a
                                href="#contact"
                                className="cta-secondary"
                            >
                                Connect With Us
                            </a>

                        </div>

                    </ScrollAnimation>


                    {/* ================= NOTE ================= */}

                    <ScrollAnimation>

                        <p className="cta-note">
                            Walk gently. Breathe deeply. Live consciously.
                        </p>

                    </ScrollAnimation>


                </div>

            </div>

        </section>
    );
};

export default CTASection;