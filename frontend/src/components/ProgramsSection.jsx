import React, { useEffect, useState } from "react";
import "../index.css";
import ScrollAnimation from "./ScrollAnimation";

const ProgramsSection = () => {
    const [visibleItems, setVisibleItems] = useState([]);

    useEffect(() => {
        const timers = [0, 1, 2].map((index) =>
            setTimeout(() => {
                setVisibleItems((prev) => [...prev, index]);
            }, index * 180)
        );

        return () => timers.forEach(clearTimeout);
    }, []);

    const programs = [
        {
            id: 1,
            tag: "SACRED FIRE RITUAL",
            title: "Hawan Sadhana",
            description:
                "Experience the sacred Vedic fire ritual to purify your surroundings, strengthen positive energies, and deepen your spiritual connection.",
            date: "7 Sep 2026 – 9 Oct 2026",
            level: "All Levels",
            image:
                "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop",
        },
        {
            id: 2,
            tag: "HOLISTIC HEALING",
            title: "Spiritual Remedies",
            description:
                "Learn traditional spiritual remedies that help remove negativity, restore inner harmony, and create balance in your life and mind.",
            date: "12 Oct 2026 – 30 Oct 2026",
            level: "Beginner",
            image:
                "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop",
        },
        {
            id: 3,
            tag: "INNER AWAKENING",
            title: "Shambhavi Sadhana",
            description:
                "Awaken inner awareness through a powerful yogic practice that harmonizes breath, mind, and energy for profound transformation.",
            date: "07 Sep 2026 – 02 Oct 2026",
            level: "Intermediate",
            image:
                "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop",
        },
    ];

    return (
        <ScrollAnimation>
        <section className=" animate-fadeZoomOut programs-section">

            {/* Background Decorations */}
            <div className=" animate-fadeZoomOut animate-fadeZoomOut program-bg program-bg-left"></div>
            <div className=" animate-fadeZoomOut animate-fadeZoomOut program-bg program-bg-right"></div>

            <div className=" animate-fadeZoomOut animate-fadeZoomOut programs-container">

                {/* ================= HEADER ================= */}

                <div className=" animate-fadeZoomOut programs-header">
                    <ScrollAnimation>

                    <div className=" animate-fadeZoomOut program-label">
                        <span className=" animate-fadeZoomOut label-line"></span>

                        <span>Our Sacred Programs</span>

                        <span className=" animate-fadeZoomOut label-line"></span>
                    </div>

                    <h2 className=" animate-fadeZoomOut programs-title">
                        Paths to
                        <span>Inner Peace</span>
                    </h2>
                    

                    <p className=" animate-fadeZoomOut programs-description">
                        Embark on a transformative journey through ancient wisdom,
                        sacred traditions and holistic practices designed to reconnect
                        you with your inner self.
                    </p>
                    </ScrollAnimation>

                </div>


                {/* ================= PROGRAM CARDS ================= */}

                <div className=" animate-fadeZoomOut programs-grid">

                    {programs.map((program, index) => (

                        <article
                            key={program.id}
                            className={`program-card ${
                                visibleItems.includes(index)
                                    ? "program-visible"
                                    : "program-hidden"
                            }`}
                        >

                            {/* Image */}

                            <div className=" animate-fadeZoomOut program-image">

                                <img
                                    src={program.image}
                                    alt={program.title}
                                />

                                <div className=" animate-fadeZoomOut image-overlay"></div>


                                {/* Badge */}

                                <div className=" animate-fadeZoomOut program-badge">
                                    {program.tag}
                                </div>


                                {/* Number */}

                                <div className=" animate-fadeZoomOut program-number">
                                    0{program.id}
                                </div>


                                {/* Image Content */}

                                <div className=" animate-fadeZoomOut image-content">

                                    <div className=" animate-fadeZoomOut program-date">

                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.8"
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>

                                        <span>{program.date}</span>

                                    </div>

                                    <h3>{program.title}</h3>

                                </div>

                            </div>


                            {/* Card Content */}

                            <div className=" animate-fadeZoomOut program-content">

                                <p className=" animate-fadeZoomOut program-description">
                                    {program.description}
                                </p>


                                {/* Details */}

                                <div className=" animate-fadeZoomOut program-details">

                                    <div className=" animate-fadeZoomOut program-level">

                                        <div className=" animate-fadeZoomOut level-icon">

                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="1.7"
                                                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                                                />
                                            </svg>

                                        </div>

                                        <div>
                                            <span>Level</span>
                                            <strong>{program.level}</strong>
                                        </div>

                                    </div>


                                    {/* Arrow */}

                                    <div className=" animate-fadeZoomOut program-arrow">

                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.8"
                                                d="M5 12h14m-6-6l6 6-6 6"
                                            />
                                        </svg>

                                    </div>

                                </div>


                                {/* CTA */}

                                <a href="#" className=" animate-fadeZoomOut program-link">
                                    Explore Program

                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.8"
                                            d="M5 12h14m-6-6l6 6-6 6"
                                        />
                                    </svg>
                                </a>

                            </div>

                        </article>

                    ))}

                </div>


                {/* ================= BOTTOM CTA ================= */}

                <div className=" animate-fadeZoomOut programs-bottom">

                    <p>
                        Your journey inward begins with a single step.
                    </p>

                    <a href="#programs">
                        View All Programs
                        <span>→</span>
                    </a>

                </div>

            </div>

        </section>
        </ScrollAnimation>
    );
};

export default ProgramsSection;