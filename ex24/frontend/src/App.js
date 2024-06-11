import './App.css';

import {Route, Routes, BrowserRouter} from 'react-router-dom';

import Layout from './general/layout';
import MainSite from './general/pages/mainSite/mainSite';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<MainSite/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
