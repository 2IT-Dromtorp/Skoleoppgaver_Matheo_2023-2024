import { useState, useEflct } from 'react';
import up from './up.png'
import down from './down.png'


export default function Display({name, description, oppdater, id, buttonState, objectList, setObjectList}) {
  const [editing, setEditing] = useState(false);
  let buttonText;
  if (buttonState===true) {
    buttonText = "Recover"
  }
  else{
    buttonText = "Finish"
  };

  function editValues(){
    setEditing(!editing)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const submittedValue = e.target.elements.inputName.value;
    
    setObjectList((prevObjectList) => {
      const updatedObjectList = [...prevObjectList];
        updatedObjectList[id] = {
        ...updatedObjectList[id],
        name: submittedValue,
        };
      
  
      return updatedObjectList;
    });


    editValues()
  };

  function deleteTask(){
    setObjectList([...objectList].filter((_, index)=>index!=id))
  }

  function takeUp(){
    if(id!==0){
      setObjectList((prevObjectList) => {
        const updatedList = [...prevObjectList];
        updatedList.splice(id-1, 0, updatedList[id]);
        updatedList.splice(id+1, 1)
    
        return updatedList;
        }
      );
    }
  }
  function takeDown(){
    if(id!==objectList.lenght){
      setObjectList((prevObjectList) => {
        const updatedList = [...prevObjectList];
        updatedList.splice(id+2, 0, updatedList[id]);
        updatedList.splice(id, 1)
        return updatedList;
        }
      );
    }
  }

  if(editing){
    return (
      <div className='display'>
          <form onSubmit={handleSubmit}>
            <input type="text" name="inputName" defaultValue={objectList[id].name}/>
            <button type="submit">Submit</button>
          </form>
          <button onClick={() => oppdater(id)}>
              {buttonText}
          </button>
          <button onClick={() => deleteTask()}>
            delete
          </button>
          <button onClick={() => takeUp()}>
            <img src={up}></img>
          </button>
          <button onClick={() => takeDown()}>
            <img src={down}></img>
          </button>
      </div>
    );
  }
  else{
    return (
      <div className='display'>
          <h1>
              {name}
          </h1>
          <p>
            {description}
          </p>
          <button onClick={() => editValues()}>
             Edit
          </button>
          <button onClick={() => oppdater(id)}>
              {buttonText}
          </button>
          <button onClick={() => deleteTask()}>
            delete
          </button>
          <button onClick={() => takeUp()}>
            <img src={up}></img>
          </button>
          <button onClick={() => takeDown()}>
            <img src={down}></img>
          </button>
      </div>
    );
  }
  
}