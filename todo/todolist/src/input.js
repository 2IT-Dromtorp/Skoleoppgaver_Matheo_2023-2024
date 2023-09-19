import React, { useState } from 'react';
import List from './list';

export default function Input() {
  const [array, setArray] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const submittedValue = e.target.elements.inputField.value;
    setArray(submittedValue);
  };
  return (
    <>
    <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="inputField"
          />
          <button type="submit">Submit</button>
        </form>
        <List array={array} />
    </>
  );
}