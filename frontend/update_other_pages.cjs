const fs = require('fs');
const path = require('path');
const pagesDir = path.join(__dirname, 'src', 'pages');

const replaceInFile = (file, search, replacement) => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(search, replacement);
  fs.writeFileSync(filePath, content);
};

// Studio.jsx
replaceInFile('Studio.jsx',
  'import { Link } from "react-router-dom";\nimport { IconLotus, IconSparkle } from "../components/Icons";',
  'import { Link } from "react-router-dom";\nimport { useState, useEffect } from "react";\nimport { IconLotus, IconSparkle } from "../components/Icons";\nimport { fetchPublic, getImageUrl } from "../utils/api";'
);

replaceInFile('Studio.jsx',
  'function Studio() {\n  // Editorial gallery sections ready for user\'s future studio photos\n  const studioSpaces = [',
  'function Studio() {\n  const [studioSpaces, setStudioSpaces] = useState([\n'
);

replaceInFile('Studio.jsx',
  '    }\n  ];\n\n  return (',
  '    }\n  ]);\n\n  const [loading, setLoading] = useState(true);\n  useEffect(() => {\n    fetchPublic("/studio").then(data => {\n      if (data && data.length > 0) {\n        setStudioSpaces(prev => {\n          const newSpaces = [...prev];\n          data.forEach((item, idx) => {\n            if (idx < newSpaces.length) {\n              newSpaces[idx] = {\n                ...newSpaces[idx],\n                title: item.title,\n                subtitle: item.category || newSpaces[idx].subtitle,\n                description: item.description || newSpaces[idx].description,\n                image: getImageUrl(item.image)\n              };\n            }\n          });\n          return newSpaces;\n        });\n      }\n      setLoading(false);\n    });\n  }, []);\n\n  return ('
);

// Inject background images into the placeholders
replaceInFile('Studio.jsx', 
  'background: "linear-gradient(145deg, #f7f3ec 0%, #ede6db 100%)",',
  'background: studioSpaces[0].image ? `url(${studioSpaces[0].image}) center/cover no-repeat` : "linear-gradient(145deg, #f7f3ec 0%, #ede6db 100%)",'
);
// For the 2nd one
replaceInFile('Studio.jsx',
  'background: "linear-gradient(145deg, #f7f3ec 0%, #ede6db 100%)",',
  'background: studioSpaces[1].image ? `url(${studioSpaces[1].image}) center/cover no-repeat` : "linear-gradient(145deg, #f7f3ec 0%, #ede6db 100%)",'
);
// For the 3rd one
replaceInFile('Studio.jsx',
  'background: "linear-gradient(145deg, #f7f3ec 0%, #ede6db 100%)",',
  'background: studioSpaces[2].image ? `url(${studioSpaces[2].image}) center/cover no-repeat` : "linear-gradient(145deg, #f7f3ec 0%, #ede6db 100%)",'
);
// For the mapped ones (3, 4, 5)
replaceInFile('Studio.jsx',
  'background: "linear-gradient(145deg, #f7f3ec 0%, #ede6db 100%)",',
  'background: space.image ? `url(${space.image}) center/cover no-repeat` : "linear-gradient(145deg, #f7f3ec 0%, #ede6db 100%)",'
);


// OnlineClasses.jsx
replaceInFile('OnlineClasses.jsx',
  'import { Link } from "react-router-dom";\nimport { IconLotus, IconSparkle, IconCheckmark } from "../components/Icons";',
  'import { Link } from "react-router-dom";\nimport { useState, useEffect } from "react";\nimport { IconLotus, IconSparkle, IconCheckmark } from "../components/Icons";\nimport { fetchPublic, getImageUrl } from "../utils/api";'
);

replaceInFile('OnlineClasses.jsx',
  'function OnlineClasses() {\n  // Section 2: Running Events Offerings (Clean, editable, reusable)\n  const runningOfferings = [',
  'function OnlineClasses() {\n  const fallbackOfferings = ['
);

replaceInFile('OnlineClasses.jsx',
  '    }\n  ];\n\n  return (',
  '    }\n  ];\n\n  const [runningOfferings, setRunningOfferings] = useState(fallbackOfferings);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    fetchPublic("/events").then(data => {\n      if (data && data.length > 0) {\n        const mapped = data.map(item => ({\n          id: item._id,\n          title: item.title,\n          category: item.mode === "online" ? "Online Class" : "Studio Event",\n          badge: item.instructor ? `By ${item.instructor}` : "Active Cohort",\n          description: item.description,\n          curriculum: ["Live interactive session", `Scheduled for ${new Date(item.date).toLocaleDateString()}`, item.startTime ? `Time: ${item.startTime}` : "Time TBA"],\n          format: item.mode,\n          suitableFor: "All levels"\n        }));\n        setRunningOfferings(mapped);\n      }\n      setLoading(false);\n    });\n  }, []);\n\n  return ('
);


// Trainers.jsx
replaceInFile('Trainers.jsx',
  'import { Link } from "react-router-dom";',
  'import { Link } from "react-router-dom";\nimport { useState, useEffect } from "react";\nimport { fetchPublic, getImageUrl } from "../utils/api";'
);

replaceInFile('Trainers.jsx',
  'function Trainers() {\n  const trainersList = [',
  'function Trainers() {\n  const fallbackTrainers = ['
);

replaceInFile('Trainers.jsx',
  '    }\n  ];\n\n  return (',
  '    }\n  ];\n\n  const [trainersList, setTrainersList] = useState(fallbackTrainers);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    fetchPublic("/teachers").then(data => {\n      if (data && data.length > 0) {\n        const mapped = data.map(item => ({\n          name: item.name,\n          role: item.specializations || "Yoga Teacher",\n          photo: getImageUrl(item.profileImage) || "/logo.png",\n          qualification: item.qualifications,\n          experience: item.experience,\n          specialization: item.specializations,\n          quote: item.shortBio || "Dedicated to classical practice.",\n          bio: item.biography\n        }));\n        setTrainersList(mapped);\n      }\n      setLoading(false);\n    });\n  }, []);\n\n  return ('
);

console.log("Studio, OnlineClasses, and Trainers updated successfully.");
