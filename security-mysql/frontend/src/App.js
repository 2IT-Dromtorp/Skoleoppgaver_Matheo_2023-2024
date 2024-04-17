import './css/main.css'

import {Route, Routes, BrowserRouter} from 'react-router-dom';

import Layout from './structure/layout';
import LogInPage from './structure/pages/loginpage/logInPage';
import CreateUser from './structure/pages/createuser/createUser';
import LendingSite from './structure/pages/borrowingSite';
import ItemPage from './structure/pages/itempage/itemPage';
import RequestPage from './structure/pages/requestPage/requestPage';
import ProfilePage from './structure/pages/profilePage/profilePage';
import Users from './structure/pages/users/users';
import CreateNewItem from './structure/pages/createNewItem/createNewItem';
import EditItem from './structure/pages/editItem/editItem';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<LendingSite />} />
            <Route path="log-in" element={<LogInPage />} />
            <Route path="create-user" element={<CreateUser />} />
            <Route path="item/:serialnumber" element={<ItemPage />} />
            <Route path="requests" element={<RequestPage />} />
            <Route path="users" element={<Users />} />
            <Route path="profile/:email" element={<ProfilePage />} />
            <Route path="create-new-item" element={<CreateNewItem />} />
            <Route path="edit-item/:serialnumber" element={<EditItem />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
