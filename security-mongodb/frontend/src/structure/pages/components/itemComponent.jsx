import { useEffect, useState } from 'react';
import './itemComponent.css'
import { useNavigate } from 'react-router-dom';

export default function ItemComponent({ tool, serialNumber, url, borrowedBy }) {
  const navigate = useNavigate();

  const [isBurrowed, setIsBorrowed] = useState("");

  useEffect(()=> {
    if(borrowedBy!==""){
      setIsBorrowed("burrowed")
    }  
  },[borrowedBy])
  
  return (
    <button className={`itemcomponent-main ${isBurrowed}`} onClick={() => navigate(`/item/${serialNumber}`)}>
      <h1>
        {tool}
      </h1>
      <h2>
        {serialNumber}
      </h2>
    </button>
  );
}