//genrrating random number
const randomIdGenerator = () => {
  let randomStringLength = 10;
  let randomString = "";
  let alphabetString =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (let i = 0; i < randomStringLength; i++) {
    let randomIndex = Math.floor(Math.random() * alphabetString.length);
    randomString += alphabetString[randomIndex];
  }

  return randomString;
};



let taskList = [
  
];
//input task and hour
//add to tasklist
const addTask =() =>{
    const taskField =document.getElementById("task");
    const hourField =document.getElementById("hour");
    //   console.log(taskField,hourField);
    if(taskField.value != "" && hourField.value !="")
    {

        const taskObject = {
          id: randomIdGenerator(),
          task: taskField.value,
          hour:parseInt (hourField.value),
          type: "entry",
        };
        taskList.push(taskObject);

    } else{
        alert("enter the value please");
    }
    console.log("nahen");
    console.log(taskList);

    displayTask();
    // console.log("add task ");
};
const displayTask =() =>
{
    console.log("displaying task");
    const goodListElement = document.getElementById("entry-list");
    const badListElement = document.getElementById("bad-list");
    goodListElement.innerHTML = "";
    badListElement.innerHTML = "";
    // const taskListElement= document.getElementById("entry-list");
    // taskListElement.innerHTML="";
     taskList.map((item, index) => {
       let goodTrValue = "";
       let badTrValue = "";
       if (item.type == "entry") {
         goodTrValue = `
                  <tr>
                    <td>${index + 1}</td>
                    <td>${item.task}</td>
                    <td>${item.hour}</td>
                    <td class="text-end "><button class="btn btn-danger me-1" onclick="deleteTask('${
                      item.id
                    }')"><i
                          class="fa-solid fa-trash"></i></button>
                          <button class="btn btn-success" onclick="convertTask('${
                            item.id
                          }')"><i
                          class="fa-solid fa-arrow-right"></i></button></td>
                  </tr>
      `;
       } else {
         badTrValue = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.task}</td>
                    <td>${item.hour}</td>
                  <td class="text-end "> <button class="btn btn-warning" onclick="convertTask('${
                    item.id
                  }')"><i
                        class="fa-solid fa-arrow-left"></i></button>
                        <button class="btn btn-danger ms-1" onclick="deleteTask('${
                          item.id
                        }')"><i
                        class="fa-solid fa-trash"></i></button></td>
                </tr>`;
       }

       goodListElement.innerHTML = goodListElement.innerHTML + goodTrValue;
       badListElement.innerHTML = badListElement.innerHTML + badTrValue;
     });
      const totalHourSpan= document.getElementById("totalhours");
     
    
      totalHourSpan.innerText=calculateTotalHour();
        const badHourSpan = document.getElementById("badhours");
        badHourSpan.innerText=calculateBadHour();
     

      


     
    
   
}

// change type from entry -> bad or bad -> entry
const convertTask = (id) => {
  console.log("TASK CONVERTED");

  let task = taskList.find((task) => task.id == id);
  console.log(100,id);

  task.type = task.type == "entry" ? "bad" : "entry";

  displayTask();
};
//deleting
const deleteTask = (id) => {
  console.log("TASK deleted");

//   let task = taskList.find((task) => task.id == id);
  console.log(200, id);
  taskList= taskList.filter((item)=>item.id!==id);
  //this filter gives the object only that doesnot match with given id
  //yedi id ra item.id match garena vane trythy value dincha ani tesko matra object filter garer object dinch
  //yed item.id ra id match garyo vane tyesko matra dincha


//   task.type = task.type == "entry" ? "bad" : "entry";

  displayTask();
};
const calculateTotalHour=()=>
{
    let totalHour= taskList.reduce((acc,item)=>acc +item.hour ,0);
    return totalHour;
}

const calculateBadHour = () => {
    let badHour= taskList.reduce((acc,task)=>{

        if(task.type=="bad")
        { 
            return acc+task.hour;

        }
        else
        {
            return acc;

        }
       
    

    },0);

    return badHour;
}

 