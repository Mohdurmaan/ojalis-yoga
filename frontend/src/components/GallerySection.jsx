import React, { useEffect, useState } from "react";
import "../index.css";
import ScrollAnimation from "./ScrollAnimation";

const GallerySection = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const section = document.querySelector(".gallery-section");

            if (!section) return;

            const rect = section.getBoundingClientRect();

            if (rect.top < window.innerHeight * 0.85) {
                setVisible(true);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const galleryImages = [
        {
            id: 1,
            title: "Sacred Meditation",
            category: "Meditation",
            image:
                "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop",
        },
        {
            id: 2,
            title: "Inner Stillness",
            category: "Yoga",
            image:
                "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop",
        },
        {
            id: 3,
            title: "Morning Practice",
            category: "Sadhana",
            image:
                "https://images.unsplash.com/photo-1599447421416-3414500d18a5?q=80&w=1200&auto=format&fit=crop",
        },
        {
            id: 4,
            title: "Divine Energy",
            category: "Spirituality",
            image:
                "https://images.unsplash.com/photo-1532798442725-41036acc7489?q=80&w=1200&auto=format&fit=crop",
        },
        {
            id: 5,
            title: "Peace Within",
            category: "Wellness",
            image:
                "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1200&auto=format&fit=crop",
        },
        {
            id: 6,
            title: "Sacred Journey",
            category: "Retreat",
            image:
                "https://images.unsplash.com/photo-1474418397713-7ede21d49118?q=80&w=1200&auto=format&fit=crop",
        },
    ];

    return (
        <section className="gallery-section">

            {/* Background Decorations */}

            <div className="gallery-decoration gallery-decoration-left"></div>

            <div className="gallery-decoration gallery-decoration-right"></div>


            <div className="gallery-container">

                {/* ================= HEADER ================= */}

                <div
                    className={`gallery-header ${
                        visible ? "gallery-show" : "gallery-hide"
                    }`}
                >
                    <ScrollAnimation>

                    <div className="gallery-label">

                        <span className="gallery-line"></span>

                        <span>Moments of Stillness</span>

                        <span className="gallery-line"></span>

                    </div>


                    <h2 className="gallery-title">
                        A Glimpse Into
                        <span>Our Journey</span>
                    </h2>


                    <p className="gallery-description">
                        Explore moments of meditation, yoga, sacred practices
                        and meaningful connections from our spiritual journey.
                    </p>
</ScrollAnimation>
                </div>


                {/* ================= GALLERY ================= */}

                <div
                    className={`gallery-grid ${
                        visible ? "gallery-show" : "gallery-hide"
                    }`}
                >

                    {galleryImages.map((item, index) => (

                        <div
                            className={`gallery-item gallery-item-${index + 1}`}
                            key={item.id}
                        >

                            <img
                                src={item.image}
                                alt={item.title}
                            />


                            {/* Overlay */}

                            <div className="gallery-overlay"></div>


                            {/* Content */}

                            <div className="gallery-content">

                                <span className="gallery-category">
                                    {item.category}
                                </span>

                                <h3>
                                    {item.title}
                                </h3>

                                <span className="gallery-arrow">
                                    →
                                </span>

                            </div>

                        </div>

                    ))}

                </div>


                {/* ================= BOTTOM ================= */}

                <div className="gallery-bottom">

                    <p>
                        Every moment is a step closer to the self.
                    </p>

                    <a href="#gallery">
                        Explore Full Gallery
                        <span>→</span>
                    </a>

                </div>

            </div>

        </section>
    );
};

export default GallerySection;