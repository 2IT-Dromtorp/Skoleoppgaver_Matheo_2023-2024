import Layout from "./pageSetUp/layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeSite from "./pageSetUp/pages/homeSite";
import ProfileSite from "./pageSetUp/pages/profileSite";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Layout />}>
                <Route index element={<HomeSite />} />
                <Route path='user/:variabel' element={<ProfileSite />} />
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;