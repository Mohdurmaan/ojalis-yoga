import React from "react";
import { useStudioImages } from "../hooks/useStudioImages";
import "./NiansGallery.css"; // Containing the CultureSlider CSS you provided

export default function HomeGallerySection() {
  const { images: studioImages, loading } = useStudioImages();

  if (loading) return null;

  // Ensure we have an array to map over, pulling the first 3 images if available
  const displayImages = studioImages && studioImages.length > 0 
    ? studioImages.slice(0, 3) 
    : [];

  if (displayImages.length === 0) return null;

  return (
    <section className="culture-section">
      <div className="culture-heading">
        <span className="culture-label">EVERYTHING IN</span>

        <h2>Our Culture is</h2>

        <h3>Focused on Your Success</h3>

        <p>
          We are young at heart, dynamic, proactive, and professional.
          And we work together so you may win!
        </p>
      </div>

      <div className="culture-slider">
        <div className="culture-slider-track">
          {displayImages.map((image, index) => (
            <div className="culture-slide" key={index}>
              {/* Using backend image URL dynamically */}
              <img src={image.image} alt={image.title || `Gallery image ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
