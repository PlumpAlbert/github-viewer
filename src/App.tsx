import {BrowserRouter, Routes, Route} from "react-router-dom";
import LandingPage from "features/landing/pages/Landing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
