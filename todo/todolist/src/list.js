import { useState, useEffect } from 'react';
import Display from './display';


export default function List({input}) {
  const [filteredPupils, setF] = useState([]);
  const [objectList, setObjectList] = useState([]);

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

  useEffect(() => {
    const newFilteredPupils = [];
    for (let i = 0; i < objectList.length; i++) {
      if (objectList[i] && objectList[i].finished === false) {
        newFilteredPupils.push(
          <Display oppdater={oppdater} key={i} name={objectList[i].name} id={i}/>
        );
      }
    }
    setF(newFilteredPupils);
  }, [objectList]);
  
  
  

  return (
    <>
    {filteredPupils}
    </>
  );
}