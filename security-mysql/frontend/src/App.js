import logo from './logo.svg';
import './App.css';

function App() {
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

export default App;
