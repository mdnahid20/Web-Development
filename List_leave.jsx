import React, {useState,useEffect} from "react";
import './App.css';


export const List_leave = (props)=>{
  const [storage, setStorage] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(()=> {
    const pushing  = localStorage.getItem("pushing");
    setStorage(pushing?JSON.parse(pushing):[]);
  
    
    setStorage((prevData) => {
      const newData = [...prevData];
      newData.splice(0, 1);
      return newData;
    });

  },[]);

  const handleReject = (rowIndex)=>{
     
    if(window.confirm("Are you sure?")){

      setStorage((prevData) => {
        const newData = [...prevData];
        newData.splice(rowIndex, 1);
        localStorage.setItem("pushing",JSON.stringify(storage));
        return newData;
      });
    }
  }

  const handleEdit = (rowIndex) =>{
    
    localStorage.setItem("rIndex", JSON.stringify(rowIndex+1));
    props.onFormSwitch('login');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filterData = storage.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

return (
    <>
      <input type="text" id="finding" value={searchQuery}  onChange={handleSearchChange} placeholder="Enter Name to Search"/>
      <title>Checkout Leaves</title>
      
      <br /><br /> 
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Start Day</th>
            <th>Days</th>
            <th>Type</th>
            <th>Photo</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {filterData.map((obj, i) => (
            <tr key={i}>
              <td>{obj.name}</td>
              <td>{obj.date}</td>
              <td>{obj.days}</td>
              <td>{obj.type}</td>
              <td><img id="img" src={obj.imglink} alt=""/></td>
              <td>
                <button id="edit" onClick={() => handleEdit(i)} >Edit</button>
                <input type='button' value='Reject'  id="reject" onClick={() => handleReject(i)} />
              </td>
            </tr>  
          ))}
        </tbody>
      </table>
      <div/>  
      <br /><br /><br /><br />
      <button id="button1" style={{textDecoration: 'none'}} onClick={()=> props.onFormSwitch('login')}> Checkout Leaves</button>
         
      </>
  );
}