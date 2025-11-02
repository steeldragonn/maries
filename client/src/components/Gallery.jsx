import { useEffect, useState } from "react";

const Gallery = () => {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/works")
      .then((res) => res.json())
      .then((data) => setWorks(data))
      .catch((err) => console.error("Error fetching works:", err));
  }, []);

  return (
    <div className="gallery">
      <h1>Artworks</h1>
      <p>let it shine baby</p>
      <div className="art-grid">
        {works.map((work) => (
          <div key={work.id} className="art-item">
            <img
              src={`http://localhost:5000/artworks/${work.image}`}
              alt={work.title}
            />
            <p>{work.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
