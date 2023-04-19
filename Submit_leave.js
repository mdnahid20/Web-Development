let storage=JSON.parse(localStorage.getItem('pushing')) || [];
let index=JSON.parse(localStorage.getItem('rIndex')) || null;
const submitButtonCatch=document.getElementById("submitButton");
let imageLink;


const nameInput = document.getElementById('name');
const startInput = document.getElementById('starDay');
const daysInput = document.getElementById('days');
const selectInput = document.getElementById('select');
const ImgInput = document.getElementById('images');

const nameError = document.getElementById('nameError');
const startError = document.getElementById('starError');
const daysError = document.getElementById('daysError');
const selectError = document.getElementById('selectError');
const ImgError = document.getElementById('photosError');


nameInput.addEventListener("input", (event) =>  {
    const val = nameInput.value.trim();
    if (val === '') {
      showErrorMessage(nameInput, nameError);
    } else { 
      hideErrorMessage(nameInput, nameError);
    }
  });

startInput.addEventListener("input", (event) =>  {
    const val = startInput.value.trim();
    if (val==='') { 
      showErrorMessage(startInput, startError);
    } else {
      hideErrorMessage(startInput, startError);
    }
  });  
  daysInput.addEventListener("input", (event) =>  {
    const val = daysInput.value.trim();
    if (val<1 || val>7) { 
        showErrorMessage(daysInput, daysError);
    } else {
      hideErrorMessage(daysInput, daysError);
    }
  }); 
  
selectInput.addEventListener("input", (event) =>  {
    const val = selectInput.value.trim();
    if (val=='a') {
      showErrorMessage(selectInput, selectError);
    } else {
      hideErrorMessage(selectInput, selectError);
    }
  });
  ImgInput.addEventListener("input", (event) =>  {
    const val = ImgInput.value.trim();
    if (val==='') {
      showErrorMessage(ImgInput, ImgError);
    } else {
      
    let reader = new FileReader();
    reader.addEventListener("load", () => {
    imageLink = reader.result;
  });
    reader.readAsDataURL(event.target.files[0]);
    hideErrorMessage(ImgInput, ImgError);
  }
  }); 

function showErrorMessage(input, error) {
    input.style.border = '2px solid red';
    error.classList.add('active');
  }
  
  function hideErrorMessage(input, error) {
   input.style.border = '2px solid black';
    error.classList.remove('active');
  }

  //PRESSING SUBMIT BUTTON
submitButtonCatch.addEventListener("click",() =>{
   const form=document.getElementById("form1");

     let object={},flag=true;
     object["id"]=Date.now;
     
    
         for(let i=0;i<form.length;i++) {
             if(i!=4)
             object[form.elements[i].name] = form.elements[i].value.trim();
             else
             object[form.elements[i].name] = imageLink;             
 
             if(form.elements[i].value=='') {
                 flag=false;
                 break;
             }
         }   
         if(flag) {
             if(index!=null) {
                 storage[index]=object;
                 index=null;
             }
             else {
                 storage.push(object);
             }
             localStorage.setItem('pushing',JSON.stringify(storage));
             localStorage.setItem('rIndex',JSON.stringify(index));
             form.reset();
             console.log(storage);
         }
});

//EDIT OPTION IS ACTIVE
if (index != null) {
  index--;
  let form = document.getElementById("form1");
  let i = 0;
  for (let key in storage[index])
    form.elements[i++].value = storage[index][key];
}


//RESET BUTTON PRESSED
const reset=document.getElementById("resetButton");
reset.addEventListener("click",()=>{
    const form=document.getElementById("form1");
    form.reset();
});

// Set the min attribute of the date input field
const today = new Date().toISOString().split('T')[0];        
document.getElementById('starDay').setAttribute('min', today);
