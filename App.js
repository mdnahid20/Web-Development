import React, { useState } from "react";
import './App.css';
import {List_leave} from "./List_leave";
import {Login} from "./Login";

export default function App(){
  const[currentForm , setCurerentForm] = useState('login');

const toggleForm = (forName) => {
  setCurerentForm(forName);
}

return (
  <div className="App">
    {
      currentForm ==="login"?<Login onFormSwitch={toggleForm}/>: <List_leave onFormSwitch={toggleForm}/> 
    }
  </div>
);}
