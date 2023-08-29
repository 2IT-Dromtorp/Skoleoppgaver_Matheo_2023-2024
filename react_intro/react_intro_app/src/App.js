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
      <MyButton count={count} onClick={callMultipleFunctions}/>
      _<p>
        Vetle er {count} år gammel
      </p>
      </header>
    </div>
  );
}

export default App;
