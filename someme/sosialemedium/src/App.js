import Layout from "./pageSetUp/layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeSite from "./pageSetUp/pages/homeSite";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Layout />}>
                <Route index element={<HomeSite />} />
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;