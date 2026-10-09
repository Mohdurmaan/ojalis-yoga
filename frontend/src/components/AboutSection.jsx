import React from "react";
import "../index.css";
import ScrollAnimation from "./ScrollAnimation";
import "../index.css";

const AboutSection = () => {
    return (
        <section className="about-section" id="about">

            {/* Background Decorations */}

            <div className="about-decoration about-decoration-left"></div>
            <div className="about-decoration about-decoration-right"></div>


            <div className="about-container">

                {/* ================= LEFT IMAGE ================= */}

                <ScrollAnimation className="about-image-wrapper">

                    <div className="about-image-box">

                        <img
                            src="https://images.unsplash.com/photo-1545389336-cf090694435e?q=80&w=1200&auto=format&fit=crop"
                            alt="Yoga Meditation"
                            className="about-main-image"
                        />


                        {/* Image Overlay */}

                        <div className="about-image-overlay"></div>


                        {/* Experience Card */}

                        <div className="about-experience">

                            <span className="experience-number">
                                10+
                            </span>

                            <span className="experience-text">
                                Years of
                                <br />
                                Experience
                            </span>

                        </div>


                        {/* Decorative Circle */}

                        <div className="about-circle">
                            <span>ॐ</span>
                        </div>

                    </div>

                </ScrollAnimation>


                {/* ================= RIGHT CONTENT ================= */}

                <div className="about-content">

                    {/* Label */}

                    <ScrollAnimation>

                        <div className="about-label">

                            <span className="about-line"></span>

                            <span>
                                About Our Journey
                            </span>

                        </div>

                    </ScrollAnimation>


                    {/* Heading */}

                    <ScrollAnimation>

                        <h2 className="about-title">

                            Discover The
                            
                            <span>
                                Path Within
                            </span>

                        </h2>

                    </ScrollAnimation>


                    {/* Paragraph */}

                    <ScrollAnimation>

                        <p className="about-text">
                            Our journey is rooted in the timeless wisdom of
                            yoga, meditation and ancient spiritual traditions.
                            We believe that true transformation begins from
                            within.
                        </p>

                    </ScrollAnimation>


                    <ScrollAnimation>

                        <p className="about-text">
                            Through mindful practices, sacred knowledge and
                            compassionate guidance, we create a space where
                            you can slow down, reconnect with yourself and
                            discover a deeper sense of peace and purpose.
                        </p>

                    </ScrollAnimation>


                    {/* Features */}

                    <div className="about-features">

                        <ScrollAnimation>

                            <div className="about-feature">

                                <div className="feature-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                                </div>

                                <div>

                                    <h3>
                                        Ancient Wisdom
                                    </h3>

                                    <p>
                                        Timeless practices for modern life.
                                    </p>

                                </div>

                            </div>

                        </ScrollAnimation>


                        <ScrollAnimation>

                            <div className="about-feature">

                                <div className="feature-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /></svg>
                                </div>

                                <div>

                                    <h3>
                                        Inner Transformation
                                    </h3>

                                    <p>
                                        Discover balance, clarity and awareness.
                                    </p>

                                </div>

                            </div>

                        </ScrollAnimation>

                    </div>


                    {/* CTA */}

                    <ScrollAnimation>

                        <a
                            href="#programs"
                            className="about-button"
                        >
                            Discover Our Story

                            <span>
                                →
                            </span>

                        </a>

                    </ScrollAnimation>

                </div>

            </div>

        </section>
    );
};

export default AboutSection;