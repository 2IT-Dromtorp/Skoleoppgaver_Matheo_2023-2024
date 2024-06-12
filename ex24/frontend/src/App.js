import './App.css';

import {Route, Routes, BrowserRouter} from 'react-router-dom';

import Layout from './general/layout';
import MainSite from './general/pages/mainSite/mainSite';
import LogInPage from './general/pages/loginpage/logInPage';
import RequestUserPage from './general/pages/requestUserPage/requestUserPage';
import Tournaments from './general/pages/tournament/tournaments';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<MainSite/>}/>
        <Route path='/login' element={<LogInPage/>} />
        <Route path='/:sport/join' element={<RequestUserPage/>} />
        <Route path='/tournaments' element={<Tournaments/>} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
