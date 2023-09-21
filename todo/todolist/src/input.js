import React, { useState } from 'react';
import List from './list';

export default function Input() {
  const [arr, setArr] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const submittedValue = e.target.elements.inputField.value;
    setArr(submittedValue);
    e.target.elements.inputField.value=''
  };
  return (
    <>
    <div className='inputBar'>
      <form onSubmit={handleSubmit}>
          <input type="text" name="inputField"/>
          <button type="submit">Submit</button>
      </form>
    </div>
    <div className='listBar'>
      <List input={arr} />
    </div>  
    </>
  );
}