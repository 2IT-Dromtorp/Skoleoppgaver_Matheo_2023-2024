import { useState, useEffect } from 'react';


export default function Display({name}) {
 

  return (
    <div className='display'>
        <h1>
            {name}
        </h1>
        <button>
            Delete
        </button>
    </div>
  );
}