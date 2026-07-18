import { HashRouter, Route, Routes } from "react-router-dom";
import { ImageGame } from "./ImageGame";
import { QuizGame } from "./QuizGame";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/quiz" element={<QuizGame />} />
        <Route path="/" element={<ImageGame />} />
      </Routes>
    </HashRouter>
  );
}
