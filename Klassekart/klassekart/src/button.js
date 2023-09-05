import React, { PureComponent, useState } from 'react';

export default function Button({person, oppdater}) {
      return (
        <button className='nameButt' button onClick={() => oppdater(person)}>{person}</button>
      );
    } 