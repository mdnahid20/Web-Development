import React, { useState,useEffect } from "react";
import './App.css';

export const Login = (props) => {
  
  const currentDate = new Date().toISOString().split('T')[0];
  const [storage, setStorage] = useState(() => JSON.parse(localStorage.getItem('pushing')) || []);
  const [index, setIndex] = useState(() => JSON.parse(localStorage.getItem('rIndex')) || null);


  const [person, setPerson] = useState({
    name: '',
    date: '',
    days: '',
    type: '',
   imglink: ''
  });

  const [personw, setPersonw] = useState({
    name: false,
    date: false,
    days: false,
    type: false,
   imglink: false
  });
  
  useEffect(() => {
    
    if(index!=null)
    {
      setPerson(storage[index]);
    }
  }, [index,storage]);

  function handleNameChange(e) {
    setPerson({
      ...person,
      name: e.target.value
    });

      setPersonw({
        ...personw,
        name : false});}

  function handleDaysChange(e) {
    setPerson({
      ...person,
      days: e.target.value });
    setPersonw({
      ...personw,
      days: false});}

  function handleTypeChange(e) {
    setPerson({
      ...person,
      type: e.target.value
    });

    setPersonw({
      ...personw,
      type: false}); }

  function handleImglinkChange(e) {
    
    const file = e.target.files[0];
    
    if(!file){
      setPerson({
        ...person,
        imglink: ''});
        
        setPersonw({
          ...personw,
          imglink: true});

      }else{

    const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        setPerson({
          ...person,
          imglink: base64String
        });
      };
      reader.readAsDataURL(file);

      setPersonw({
        ...personw,
        imglink: false});
      }
}
  
const handleReset = () => {
  setPerson({
    name: '',
    date: '',
    days: '',
    type: '',
   imglink: ''
  });
};

  function handleDateChange(e) {
    setPerson({
      ...person,
      date: e.target.value});

    setPersonw({
        ...personw,
      date:false}); }
   function IsOK(){
     
    if(person.name.trim()==='')
    {
      personw.name = true;
      return true;
    } 
    else if(person.days.trim()==='' || person.days<'1' || person.days>'7')
    {
      personw.days = true;
       return true;
    }  
      else if(person.date.trim()==='')
    {
      personw.date = true;
      return true;
    }   else if(person.type.trim()==='')
    {
      personw.type = true;
      return true;
    }  else if(person.imglink===null || personw.imglink)
  {
    personw.imglink = true;
      return true;
  }else
  return false;
   }   

function Submit(){
  if(index!=null) {
    const newstorage = [...storage];
    newstorage[index] = person;
    setStorage(newstorage);
      setIndex(null);
    }else{
      setStorage(
        [...storage,person])
      } 
     
     handleReset();
}

function Logout(){

  localStorage.setItem('pushing',JSON.stringify(storage));
  localStorage.setItem('rIndex',JSON.stringify(index));
  props.onFormSwitch('list_leave')
}


  return (

    <div>
      <link rel="stylesheet" href="Style.css" />
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Submit Leave</title>
      <div className="page">
        <header id="header">Submit Leave</header>
        <br />
        <form id="form1" autoComplete="off">
          <label htmlFor="name">Name:</label>

          <input type="text" id="name" name="name" value={person.name}   onChange={handleNameChange} /><br />
          {personw.name && <span id="error">Please enter a valid name.</span>}
          <br />

          <label htmlFor="sd">Start date:</label>
          <input type="date" id="starDay" name="starDay" min={currentDate} value={person.date} onChange={handleDateChange} /><br />
          {personw.date && <span id="error">Please enter a valid date.</span>}
          <br />

          <label htmlFor="days"># of days:</label>
          <input type="number" id="days" name="days" min={1} max={7} value={person.days}   onChange={handleDaysChange} /><br />
          {personw.days && <span id="error">Please enter days between 1 to 7</span>}<br />

          <label htmlFor="type">Type:</label>
          <select name="type" id="select" value={person.type} onChange={handleTypeChange} >
            <option value="a" />
            <option value="General">General</option>
            <option value="Sick">Sick</option>
            <option value="Accident">Accident</option>
            <option value="Function">Function</option>
          </select><br />
          {personw.type && <span id="error">Please select the option</span>}
          <br />

          <label htmlFor="photos">Photos:</label>
          <input type="file" name="photo" id="images"  onChange={handleImglinkChange} /><br /> 
          {personw.imglink && <span id="error">Please upload the photo</span>}
          <br />
        </form>


        <div id="bt">
           { !IsOK()? <button id="submitButton" onClick={Submit}>Submit</button>:<button id="dissubmitButton" >Submit</button>}
          <button id="resetButton" onClick = {handleReset}>Cancel</button><br /><br /><br />
        </div>
      </div>
      <button id="newpage" onClick={Logout}> Checkout Leaves</button>
    </div>
  );
}