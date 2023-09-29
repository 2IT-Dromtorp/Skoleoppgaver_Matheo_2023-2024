import React, { useState } from 'react';
import List from './list';

export default function Input() {
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
    <>
    <div className='inputBar'>
      <form onSubmit={handleSubmit}>
          <input type="text" name="inputField"/>
          <input type="text" name="description"/>
          <button type="submit">Submit</button>
      </form>
    </div>
    <div className='listBar'>
      <List input={arr} description={description} />
    </div>  
    </>
  );
}