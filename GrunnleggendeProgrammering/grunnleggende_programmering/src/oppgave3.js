import React, { useState } from 'react';

export default function Oppgave3() {
    let content = <p>Where are you from? <br></br> If youre Norwegian, write N, if Swedish, write S, if Danish, write D</p>
    let message = <p>This is not a valid language</p>

    const [inputValue1, setInputValue1] = useState('');
    
    function InputComponent() {   
        const handleInputChange1 = (event) => {
            const newValue = event.target.value.toLowerCase();
            setInputValue1(newValue);
        };      
        return (
          <div>
            <input
              type="text"
              value={inputValue1}
              onChange={handleInputChange1}
            />
          </div>
        );
      }

      if(inputValue1==="n"){
        content=<p>Hvor er du fra? <br></br> Hvis du er norsk, skriv N, hvis svensk, skriv S, hvis dansk, skriv D</p>
        message = null
      }
      else if(inputValue1==="d"){
        content=<p>Hvor er du fra? <br></br> Hvis du er norsk, skriv N, hvis svensk, skriv S, hvis dansk, skriv D</p>
        message = null
      }
      else if(inputValue1==="s"){
        content=<p>Var kommer du ifrån? <br></br> Om du är norsk, skriv N, om svenska, skriv S, om danska, skriv D</p>
        message = null
      }
      else{
        content = <p>Where are you from? <br></br> If youre Norwegian, write N, if Swedish, write S, if Danish, write D</p>
        message = <p>This is not a valid language</p>
      }

      return (
        <>
        <h1>
          Oppgave 3
        </h1>
          {content}
          <InputComponent/>
          {message}
        </>
      );
} 