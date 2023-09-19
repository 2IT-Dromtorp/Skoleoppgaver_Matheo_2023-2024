import { useState, useEffect } from 'react';


export default function List({ array }) {
  const [objectList, setObjectList] = useState([]);
  console.log(array)
  useEffect(() => {
    const newPupil = {
      firstname: array.value,
      lastname: 'NewLastName',
      email: 'newemail@viken.no',
      fellesfagng: 'NewFellesfagng',
      klasse: 'NewKlasse',
      fellesfags: 'NewFellesfags',
    };

    setObjectList([...objectList, newPupil]);
  }, []);

  console.log(objectList)

  return (
    <p>i</p>
  );
}