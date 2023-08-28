import logo from './logo.svg';
import { useState } from 'react';
import './App.css'; 
import MyButton from './myButton';

function App() {
    // const products = [
    //   { title: 'Cabbage', id: 1 },
    //   { title: 'Garlic', id: 2 },
    //   { title: 'Apple', id: 3 },
    // ];
    // const listItems = products.map(product =>
    //   <li key={product.id}>
    //     {product.title}
    //   </li>
    // );
    // return (
    //   <ul>{listItems}</ul>
    // );


  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  function callMultipleFunctions(){
    handleClick();
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={"https://scontent.fosl1-1.fna.fbcdn.net/v/t1.6435-9/36944531_116985529219962_345109083319173120_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ehDCJez7hRMAX-zbMVa&_nc_ht=scontent.fosl1-1.fna&oh=00_AfBdx7unY8ur-_ECaY1Qi8bPqTUtm0BpEVsqXspnFI4MKA&oe=650D5803"} className="App-logo" alt="{people[count].name}" />
      <MyButton count={count} onClick={callMultipleFunctions}/>
      _<p>
        Vetle er {count} år gammel
      </p>
        <MyButton count={count} onClick={callMultipleFunctions} />
      </header>
    </div>
  );
}

export default App;
