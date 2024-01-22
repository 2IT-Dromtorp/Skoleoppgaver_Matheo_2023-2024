import Layout from "./pageSetUp/layout";
import Homesite from "./pageSetUp/pages/homesite";
import CreateUser from "./pageSetUp/pages/createUser";
import LogInPopUp from "./pageSetUp/components/LogInPopUp";
import UserSite from "./pageSetUp/pages/userSite";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Layout />}>
                <Route index element={<Homesite />} />
                <Route path="sign-up" element={<CreateUser />} />
                <Route path="log-in" element={<LogInPopUp/>} />
                <Route path="user-site" element={<UserSite/>} />
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;