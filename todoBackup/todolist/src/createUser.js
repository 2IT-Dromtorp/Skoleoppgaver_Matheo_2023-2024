import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';


export default function CreateUser() {
  const navigate = useNavigate();

  const [arr, setArr] = useState('');
  const [description, setDesctiption] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const submittedValue = e.target.elements.inputField.value;
    const description = e.target.elements.description.value;
    setArr(submittedValue);
    setDesctiption(description);
    e.target.elements.inputField.value=''
    e.target.elements.description.value=''
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
            <input type="text" name="inputField"/>
            <input type="text" name="description"/>
            <button type="submit">Submit</button>
        </form> 
      </header>
    </div>
  );
}