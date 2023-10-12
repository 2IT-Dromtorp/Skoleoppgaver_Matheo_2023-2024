import { useState, useEffect } from 'react';
import Display from './display';
let x = false


export default function List({input, description, brukerNavn}) {
  const [filteredPupils, setF] = useState([]);
  const [objectList, setObjectList] = useState([]);

  useEffect(() => {
    const userParam = brukerNavn;
  
    fetch(`http://localhost:8080/api/items?user=${userParam}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setObjectList(data));
  }, []);

  useEffect(() => {
    if(x==false){
      x=true
    } 
    else{
      if (objectList.length >=0) {
        console.log("POST Request Called");
    
        const newData = {"list":objectList, "user":brukerNavn};
    
        fetch("/api/items", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newData),
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            throw new Error("Failed to update data.");
          })
          .catch((error) => {
            console.error("Error updating data:", error);
          });
      }
    }
    
  }, [objectList]);  

  const [deletedTasks, setDeletedTasks] = useState(false);


  function oppdater(id) {
    setObjectList((prevObjectList) => {
      const updatedObjectList = [...prevObjectList];
      if (id >= 0 && id < updatedObjectList.length) {
        updatedObjectList[id] = {
          ...updatedObjectList[id],
          finished: !updatedObjectList[id].finished,
        };
      }
  
      return updatedObjectList;
    });
  }

  useEffect(() => {
    setF('')
    const newPupil = {
      name: input,
      description: description,
      finished: false,
    };
    if (input!='' && description!='') {
      setObjectList((prevObjectList) => [...prevObjectList, newPupil]);
    }
  }, [input]);

  function makeList(){
    const newFilteredPupils = [];


    for (let i = 0; i < objectList.length; i++) {
      if (deletedTasks===false){
        if (objectList[i] && objectList[i].finished === false) {
          newFilteredPupils.push(
            <Display oppdater={oppdater} key={i} name={objectList[i].name} description={objectList[i].description} id={i} buttonState={deletedTasks} objectList={objectList} setObjectList={setObjectList}/>
          );
        }
      }
      else{
        if (objectList[i] && objectList[i].finished === true) {
          newFilteredPupils.push(
            <Display oppdater={oppdater} key={i} name={objectList[i].name} description={objectList[i].description} id={i} buttonState={deletedTasks} objectList={objectList} setObjectList={setObjectList}/>
          );
        }
      }
    }
    setF(newFilteredPupils);
  }

  useEffect(() => {
    makeList()
  }, [objectList]);

  useEffect(() => {
    makeList()
  }, [deletedTasks]);
  
  function changeList(){
    setDeletedTasks(!deletedTasks)
  }

  return (
    <>
    <div className='changeButton'> 
      <button onClick={() => changeList()}>Change View</button>
    </div>
    <div className='listPart'>
      {filteredPupils}
    </div>
    </>
  );
}