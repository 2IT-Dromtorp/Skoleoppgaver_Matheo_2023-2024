import { useState, useEffect } from 'react';


export default function Display({name, oppdater, id}) {
 

  return (
    <div className='display'>
        <h1>
            {name}
        </h1>
        <button onClick={() => oppdater(id)}>
            Delete
        </button>
    </div>
  );
}