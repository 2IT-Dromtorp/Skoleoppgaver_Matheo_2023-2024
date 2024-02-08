import { io } from 'socket.io-client';

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./sources/layout"
import BlackjackTable from './sources/pages/blackjackTable';
import MainSite from './sources/pages/mainSite';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<MainSite/>}/>
            <Route path='/lobby' element={<BlackjackTable />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

const URL = 'http://localhost:8080';

export const socket = io(URL);