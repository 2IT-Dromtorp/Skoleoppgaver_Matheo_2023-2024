import { io } from 'socket.io-client';

import { BrowserRouter, Route, Routes } from "react-router-dom";

import TestMessage from './components/TestMessage'
import Layout from './components/layout';
import MainSiteGame from './components/threeonrow/mainSiteGame';
import Lobby from './components/threeonrow/lobby';
import Game from './components/threeonrow/game';

export default function App() {
  
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                  <Route index element={<MainSiteGame />} />
                  <Route path="/test" element={<TestMessage />} />
                  <Route path="/lobby" element={<Lobby />} />
                  <Route path="/game" element={<Game />} />
                </Route>
            </Routes>
        </BrowserRouter>
  );
}

const URL = 'http://localhost:8080';

export const socket = io(URL);
