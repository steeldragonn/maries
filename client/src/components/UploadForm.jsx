import { useState } from "react";

const UploadForm = ({ onUpload }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);

    try {
      const res = await fetch("http://localhost:5000/api/works", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setMessage(data.message || "Uploaded!");
      setTitle("");
      setImage(null);
      if (onUpload) onUpload();
    } catch (err) {
      console.error("Upload error:", err);
      setMessage("Error uploading file");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form">
      <h2>Upload New Artwork</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        required
      />
      <button type="submit">Upload</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default UploadForm;
