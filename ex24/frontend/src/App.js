import './App.css';

import {Route, Routes, BrowserRouter} from 'react-router-dom';

import Layout from './general/layout';
import MainSite from './general/pages/mainSite/mainSite';
import LogInPage from './general/pages/loginpage/logInPage';
import RequestUserPage from './general/pages/requestUserPage/requestUserPage';
import Tournaments from './general/pages/tournament/tournaments';
import Userpage from './general/pages/userpage/userpage';
import Register from './general/pages/register/register';
import RequestHandlePage from './general/pages/requestHandle/requestHandle';
import CreateTournament from './general/pages/createTournament/createTournament';
import CreateSport from './general/pages/createSport/createSport';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<MainSite/>}/>
        <Route path='/login' element={<LogInPage/>} />
        <Route path='/:sport/join' element={<RequestUserPage/>} />
        <Route path='/tournaments' element={<Tournaments/>} />
        <Route path='/my-page' element={<Userpage/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/requests' element={<RequestHandlePage/>} />
        <Route path='/create/tournament' element={<CreateTournament/>} />
        <Route path='/create/sport' element={<CreateSport/>} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
