import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './general/layout';
import MainSite from './general/pages/mainsite/mainsite';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<MainSite/>} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;