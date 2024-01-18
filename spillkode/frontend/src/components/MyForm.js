import React, { useState } from 'react';
import { socket } from '../App';

export function MyForm() {
  const [value, setValue] = useState('');

  function onSubmit(event) {
    event.preventDefault();

    socket.emit('melding', value);
    setValue('');
  }

  return (
    <form onSubmit={onSubmit}>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
}
