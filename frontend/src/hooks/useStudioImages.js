import { useState, useEffect } from "react";
import { fetchPublic, getImageUrl } from "../utils/api";

const defaultStudioSpaces = [
  {
    id: "main-hall",
    title: "The Main Sadhana Hall",
    subtitle: "Bathed in Gentle Dawn Light & Natural Ventilation",
    description: "A spacious, distraction-free practice floor built with natural materials, non-toxic finishes, and expansive cross-ventilation to support deep diaphragmatic pranayama.",
    aspectRatio: "16 / 9",
    slotLabel: "Studio Space • Photography Placeholder"
  },
  {
    id: "meditation-nook",
    title: "The Silent Meditation Alcove",
    subtitle: "A Sanctuary for Contemplation",
    description: "Dedicated to silent sitting, Trataka practice, and twilight meditation circles shielded from outer noise.",
    aspectRatio: "4 / 5",
    slotLabel: "Contemplation Area • Photography Placeholder"
  },
  {
    id: "breath-floor",
    title: "The Kriya & Breathwork Floor",
    subtitle: "Intimate Practice Space",
    description: "Specially calibrated for small-cohort guidance, allowing acharyas to observe subtle respiratory patterns and ribcage movement.",
    aspectRatio: "16 / 10",
    slotLabel: "Kriya Floor • Photography Placeholder"
  },
  {
    id: "tea-corridor",
    title: "The Tea & Reflection Corridor",
    subtitle: "Post-Practice Decompression",
    description: "Where practitioners transition gently back into daily rhythm with warm Ayurvedic herbal infusions and quiet conversation.",
    aspectRatio: "16 / 9",
    slotLabel: "Tea Lounge • Photography Placeholder"
  },
  {
    id: "props-gallery",
    title: "The Sacred Props & Supports",
    subtitle: "Organic Cotton & Natural Wood",
    description: "Sanitized organic cotton bolsters, natural cork blocks, cotton straps, and woolen blankets that support every body type safely.",
    aspectRatio: "1 / 1",
    slotLabel: "Props & Craft • Photography Placeholder"
  },
  {
    id: "entry-threshold",
    title: "The Threshold",
    subtitle: "Leaving Hurry at the Door",
    description: "The welcoming entryway designed to slow the senses the moment shoes are set aside and breathing deepens.",
    aspectRatio: "1 / 1",
    slotLabel: "Entry Sanctuary • Photography Placeholder"
  }
];

export function useStudioImages() {
  const [studioSpaces, setStudioSpaces] = useState(defaultStudioSpaces);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchPublic("/studio").then((data) => {
      if (isMounted) {
        if (Array.isArray(data) && data.length > 0) {
          // 1. Update the studio spaces
          const newSpaces = [...defaultStudioSpaces];
          data.forEach((item, idx) => {
            if (idx < newSpaces.length) {
              newSpaces[idx] = {
                ...newSpaces[idx],
                title: item.title,
                subtitle: item.category || newSpaces[idx].subtitle,
                description: item.description || newSpaces[idx].description,
                image: getImageUrl(item.image)
              };
            }
          });
          setStudioSpaces(newSpaces);

          // 2. Extract valid images for the gallery
          const mappedImages = data
            .filter((item) => item && item.image)
            .map((item) => ({
              image: getImageUrl(item.image),
              text: item.title || item.category || "Studio Space",
              rawItem: item
            }));
          setImages(mappedImages);
        }
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return { studioSpaces, images, loading };
}

export default useStudioImages;
