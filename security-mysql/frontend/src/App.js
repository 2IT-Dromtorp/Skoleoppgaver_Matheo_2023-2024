import './css/main.css'

import {Route, Routes, BrowserRouter} from 'react-router-dom';

import Layout from './structure/layout';
import LogInPage from './structure/pages/logInPage';
import CreateUser from './structure/pages/createUser';
import LendingSite from './structure/pages/borrowingSite';
import ItemPage from './structure/pages/itemPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<LendingSite />} />
            <Route path="log-in" element={<LogInPage />} />
            <Route path="create-user" element={<CreateUser />} />
            <Route path="item/:serialnumber" element={<ItemPage />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
