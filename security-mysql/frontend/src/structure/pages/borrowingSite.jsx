import '../../css/borrowingSite.css'

import { useEffect, useState } from "react";
import ItemComponent from "./components/itemComponent";

export default function LendingSite() {
  const [listOfItems, setListOfItems] = useState([]);

  async function fetchData(number) {
    try{
      const response = await fetch(`/api/list-items?limit=${number}`);

      if(!response.ok){
        const responseData = await response.json();
        alert(responseData.message);
        return;
      } 

      const arrayWithData = (await response.json()).data;

      setListOfItems(arrayWithData)
    }
    catch(error){
      console.error(error);
    }
  }

  useEffect( ()=>{
    fetchData(25);
  },[])

  

  return (
    <div className='borrowingsite-main'>          
      {listOfItems.length&&listOfItems.map((item, index)=>
        <ItemComponent key={index} tool={item.tool} serialNumber={item.serialNumber}/>
      )}
    </div>
  );
}