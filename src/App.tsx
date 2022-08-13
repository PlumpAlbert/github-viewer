import {BrowserRouter, Routes, Route} from "react-router-dom";
import LandingPage from "features/landing/pages/Landing";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
