import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FolderTree from "./components/FolderTree";
import "./styles.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/files/:path/*" element={<FolderTree />} />
      </Routes>
    </Router>
  );
}

export default App;
