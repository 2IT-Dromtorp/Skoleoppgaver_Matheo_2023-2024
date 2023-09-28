import { useState, useEffect } from 'react';
import Display from './display';


export default function List({input}) {
  const [filteredPupils, setF] = useState([]);
  const [objectList, setObjectList] = useState([]);

  useEffect(() => {
    fetch("/api/items", {method:"GET"})
      .then((res) => res.json())
      .then((data) => setObjectList(data));
  }, []);

  useEffect(() => {
    if (objectList.length > 0) {
      console.log("POST Request Called");
  
      const newData = objectList;
  
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
        .then((data) => {
          console.log("Data updated successfully:", data);
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
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
      description: 'NewLastName',
      finished: false,
    };
    if (input!='') {
      setObjectList((prevObjectList) => [...prevObjectList, newPupil]);
    }
  }, [input]);

  function makeList(){
    const newFilteredPupils = [];

    for (let i = 0; i < objectList.length; i++) {
      if (deletedTasks===false){
        if (objectList[i] && objectList[i].finished === false) {
          newFilteredPupils.push(
            <Display oppdater={oppdater} key={i} name={objectList[i].name} id={i} buttonState={deletedTasks} objectList={objectList} setObjectList={setObjectList}/>
          );
        }
      }
      else{
        if (objectList[i] && objectList[i].finished === true) {
          newFilteredPupils.push(
            <Display oppdater={oppdater} key={i} name={objectList[i].name} id={i} buttonState={deletedTasks} objectList={objectList} setObjectList={setObjectList}/>
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
      <button onClick={() => changeList()}>Change</button>
    
      {filteredPupils}
    </>
  );
}