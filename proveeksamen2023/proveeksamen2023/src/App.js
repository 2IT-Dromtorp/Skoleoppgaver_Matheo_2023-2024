import Layout from "./pageSetUp/layout";
import Homesite from "./pageSetUp/pages/homesite";
import CreateTicket from "./pageSetUp/pages/createTicket";
import EditTicket from "./pageSetUp/pages/editTicket";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Layout />}>
                <Route index element={<Homesite />} />
                <Route path="create-ticket" element={<CreateTicket />} />
                <Route path="edit-ticket/:id" element={<EditTicket />} />
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;