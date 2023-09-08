import { useState, useEffect } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';

export default function DigitalClock() {
  const [currentTime, setCurrentTime] = useState(new Date);
  let content;
  let extraZSecond=""
  let extraZMinute=""
  let extraZHour=""

  //useEffect fires when state changes, when renders
  useEffect(()=> {

    const myInterval = setInterval(()=> {
    setCurrentTime(new Date);   

    }, 100);

    return ()=> clearInterval(myInterval);    
  }, []);

  if (currentTime.getSeconds()===0) {
    content = <ConfettiExplosion 
    width={window.innerWidth}
    height={window.innerHeight}
    numberOfPieces={500} 
    recycle={false}
      />;
  }
  else{
    content = null
  };

  if(currentTime.getMilliseconds()%2===0){
    content += <ConfettiExplosion 
    width={window.innerWidth}
    height={window.innerHeight}
    numberOfPieces={500} // Increase the number of confetti pieces
    recycle={false}
      />;
  }
  else{
    content = null
  };

  if (currentTime.getSeconds()<10){
    extraZSecond = "0"
  };
  if (currentTime.getMinutes()<10){
    extraZMinute = "0"
  };
  if (currentTime.getHours()<10){
    extraZHour = "0"
  };
  
    return (
      <div className="App">
        <header className="App-header">
            <p>
              {extraZHour+currentTime.getHours()}:{extraZMinute+currentTime.getMinutes()}:{extraZSecond+currentTime.getSeconds()}
            </p>
            {content}
        </header>
      </div>
    );
  }