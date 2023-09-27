import { useState, useEffect } from 'react';


export default function Display({name, oppdater, id, buttonState, objectList, setObjectList}) {
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

  if(editing){
    return (
      <div className='display'>
          <form onSubmit={handleSubmit}>
            <input type="text" name="inputName" defaultValue={objectList[id].name}/>
            <button type="submit">Submit</button>
          </form>
          <button onClick={() => oppdater()}>
              {buttonText}
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
          <button onClick={() => editValues()}>
             Edit
          </button>
          <button onClick={() => oppdater(id)}>
              {buttonText}
          </button>
        <button onClick={() => deleteTask()}>
          delete
        </button>
      </div>
    );
  }
  
}