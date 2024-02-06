import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./pages/layout";
import MainSite from "./pages/pages/mainSite";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<MainSite />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
