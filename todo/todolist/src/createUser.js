import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { useState, useEffect } from 'react';
let x = false


export default function CreateUser() {
  const navigate = useNavigate();

  const [user, setArr] = useState('');
  const [pass, setDesctiption] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const submittedValue = e.target.elements.inputField.value;
    const description = e.target.elements.description.value;
    setArr(submittedValue);
    setDesctiption(description);
    e.target.elements.inputField.value=''
    e.target.elements.description.value=''
  };

  useEffect(() => {
    if(x==false){
      x=true
    } 
    else{
      if (user!=''&&pass!='') {
        console.log("POST Request Called");
    
        const newData = {"name":user, "password":pass, "isLoggedIn":false};
    
        fetch("/api/create", {
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
            if (data.currentUser===user) {
                navigate(`..`)
            }
            else{
                alert(data.currentUser);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    }
    
  }, [user]);  

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
            <input type="text" name="inputField"/>
            <input type="text" name="description"/>
            <button type="submit">Submit</button>
        </form> 
      </header>
    </div>
  );
}