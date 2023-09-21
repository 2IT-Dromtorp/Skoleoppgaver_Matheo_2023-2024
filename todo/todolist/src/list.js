import { useState, useEffect } from 'react';
import Display from './display';


export default function List({input}) {
  const [filteredPupils, setF] = useState([]);
  const [objectList, setObjectList] = useState([]);

  function oppdater(id) {
    setObjectList((prevObjectList) => {
      if (id !== -1) {
        const updatedObjectList = [...prevObjectList];
        updatedObjectList[id] = {
          ...updatedObjectList[id],
          finished: true,
        };

        return updatedObjectList;
      }

      return prevObjectList;
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
    for (let i in objectList) {
      if (objectList[i].finished===false) {
        setF((filteredPupils) => [...filteredPupils, <Display oppdater={oppdater} key={i} name={objectList[i].name} />]);
      }
    }
  }, [objectList]);

  return (
    <>
    {filteredPupils}
    </>
  );
}