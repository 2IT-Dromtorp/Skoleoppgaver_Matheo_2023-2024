import { io } from 'socket.io-client';

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<MainSiteGame />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

const URL = 'http://localhost:8080';

export const socket = io(URL);