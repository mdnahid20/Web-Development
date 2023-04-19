const table=document.getElementById("table1");
let storage=JSON.parse(localStorage.getItem('pushing')) || [];



//SHOWING DATA ON TABLE
 storage.forEach(obj => {
        let row=document.createElement('tr');
        row.innerHTML = `<td>${obj.name}</td>
                        <td>${obj.starDay}</td> 
                        <td>${obj.days}</td>
                        <td>${obj.type}</td>
                        <td><img id="img" src=${obj.photo} alt=""></td>
                        <td><a href="index.html" id="edit">Edit</a><input type='button' value='Reject' name=${obj.id} id="reject"/></td>`;
        table.appendChild(row);
    
    //EDIT BUTTON
    const editButtonListener=(event)=>{
        let rowIndex= event.target.parentElement.parentElement.rowIndex;
        localStorage.setItem('rIndex',JSON.stringify(rowIndex));
    }

    const editButton=row.querySelector("#edit");
    editButton.addEventListener('click',(event)=>{editButtonListener(event)});

    //REJECT BUTTON
    const rejectButton=row.querySelector("#reject");
    rejectButton.addEventListener('click',(event)=>{
        
        let signal=confirm("Are you sure?");
        if(!signal) return;
        const rowIndex=event.target.parentElement.parentElement.rowIndex;
        console.log(rowIndex);
        event.target.parentElement.parentElement.remove();
        storage.splice(rowIndex-1,1);
        localStorage.setItem('pushing',JSON.stringify(storage));
    })
});




//SEARCHING AND SHOWING THE DATA
function searching()
{
    let filter=document.getElementById("finding").value.toUpperCase();
    let tr=table.getElementsByTagName("tr");
    for(let i=0;i<tr.length;i++)
    {
        let tableCell=tr[i].getElementsByTagName("td")[0];
        if(tableCell)
        {
            let text=tableCell.innerHTML;
            if(text.toUpperCase().indexOf(filter)>-1) tr[i].style.display="";
            else tr[i].style.display="none";
        }
    }
}

