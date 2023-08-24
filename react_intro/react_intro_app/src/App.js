import logo from './logo.svg';
import { useState } from 'react';
import './App.css'; 
import MyButton from './myButton';

const people = [
  { name: 'Vetle', imageUrl: "https://scontent.fosl1-1.fna.fbcdn.net/v/t1.6435-9/36944531_116985529219962_345109083319173120_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ehDCJez7hRMAX-zbMVa&_nc_ht=scontent.fosl1-1.fna&oh=00_AfBdx7unY8ur-_ECaY1Qi8bPqTUtm0BpEVsqXspnFI4MKA&oe=650D5803"},
  { name: 'Elias', imageUrl: "https://image.oavis.no/723785.webp?imageId=723785&x=11.17&y=1.78&cropw=88.83&croph=67.67&width=968&height=554&format=jpg"},
  { name: 'Indine', imageUrl: "https://lh3.googleusercontent.com/pw/AIL4fc_agZtVXBTA3hdHHEYEb3jT_lCvfZP2Ceolx-iYU0n4YXAYhCQxPVA_Lpz3PLSW3w_UJCvOOG5FriHj3UbXoT0kMWxnVyyX9_VZAJBiAC2fDn6vGTC1qBui-BKwx74HcXhfG-l4OzaViy-WhOTuyhg1=w739-h924-s-no?authuser=0"},
];

function App() {

  const [count, setCount] = useState(0);
  const [logoSrc, setLogoSrc] = useState(people[0].imageUrl);

  function handleClick() {
    setCount(count + 1);
  }
  
  function newLogo() {
    if(people[count+1]===undefined){
      setCount(-1);
    }
    else{
      setLogoSrc(people[count+1].imageUrl);
    }
  }

  function callMultipleFunctions(){
    handleClick();
    newLogo()
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logoSrc} className="App-logo" alt="{people[count].name}" />
      <MyButton count={count} onClick={callMultipleFunctions}/>
      _<p>
        Vetle er {count} år gammel
      </p>
        <MyButton count={count} onClick={callMultipleFunctions} />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
