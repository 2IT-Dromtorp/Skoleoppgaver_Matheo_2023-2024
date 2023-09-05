import { useState } from 'react';
import './App.css'; 
import MyButton from './myButton';
import LogInButton from './loginButton';
import LogOutButton from './logoutButton';
import LogIn from './loginSite';

function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  let isLoggedIn = "login";
  let content;
  if (isLoggedIn === "logout") {
    content=<LogOutButton/>
  }
  else if (isLoggedIn === "login"){
    content=<LogInButton/>
  }
  else{
    content=<LogIn/>
  }

  return (
    <div className="App">
      <header className="App-header">
      <MyButton count={count} onClick={handleClick}/>
      {content}
      </header>
    </div>
  );
}

export default App;
