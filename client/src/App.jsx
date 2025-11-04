import { useState } from "react";
import Gallery from "./components/Gallery";
import UploadForm from "./components/UploadForm";

function App() {
  const [refresh, setResfresh] = useState(false);
  const handleUpload = () => {
    setResfresh((prev) => !prev);
  };
  return (
    <div className="App">
      <UploadForm onUpload={handleUpload} />
      <Gallery refresh={refresh} />
    </div>
  );
}

export default App;
