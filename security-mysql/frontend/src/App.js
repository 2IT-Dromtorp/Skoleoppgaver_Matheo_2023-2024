import './css/main.css'

import {Route, Routes, BrowserRouter} from 'react-router-dom';

import Layout from './structure/layout';
import LogInPage from './structure/pages/logInPage';
import CreateUser from './structure/pages/createUser';
import LendingSite from './structure/pages/borrowingSite';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<LogInPage />} />
            <Route path="create-user" element={<CreateUser />} />
            <Route path="lending" element={<LendingSite />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
