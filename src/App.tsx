import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ImageGame } from "./ImageGame";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ImageGame />} />
      </Routes>
    </BrowserRouter>
  );
}
