import {BrowserRouter, Routes, Route} from "react-router-dom";
import LandingPage from "features/landing/pages/Landing";
import SearchResults from "features/search-results/pages/SearchResults";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
