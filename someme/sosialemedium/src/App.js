import Layout from "./pageSetUp/layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeSite from "./pageSetUp/pages/homeSite";
import ProfileSite from "./pageSetUp/pages/profileSite";
// import ProfileSiteViewPosts from "./pageSetUp/pages/profileSiteViewPosts";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Layout />}>
                <Route index element={<HomeSite />} />
                <Route path=':variabel' element={<ProfileSite />} />
                {/* <Route path=':variabel/viewpost/:0' element={<ProfileSiteViewPosts />} /> */}
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;