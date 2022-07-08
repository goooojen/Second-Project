let taskInput = document.getElementById("input");
let Add = document.getElementById("Add_bt");
let tasklist = [];
let tabs = document.querySelectorAll(".tab div");
let mode = "all";
let filterList=[];
let underline = document.getElementById("under_line");

tabs.forEach(menu =>
    menu.addEventListener("click", (e) => horizontalIndicator(e))
);

function horizontalIndicator(e){
    underline.style.left = e.currentTarget.offsetLeft + "px";
    underline.style.width = e.currentTarget.offsetWidth + "px";
    underline.style.Top = e.currentTarget.offsetTop = 
    e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
}

Add.addEventListener("click",addtask);

for(let i=1; i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event){
        filter(event);
    });
}


function addtask(){
    let task = {
        id:randomIDGenerate(),
        taskContent : taskInput.value,
        isComplete : false,
    };

    tasklist.push(task);
    console.log(tasklist);
    render();
}

function render(){
    let list = [];
    if(mode == "all"){
        list = tasklist;
    }else if(mode == "yet" || mode == "done"){
        list = filterList;
    }
    let resultHTML = "";
    for(let i=0; i<list.length; i++){
        if(list[i].isComplete == true){
            resultHTML += ` <div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div></div>
            <div> 
              <button class="check_bt" onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
                <button class="delete_bt" onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button></div>
        </div>`;
        }else{
            resultHTML += ` <div class="task">
            <div>${list[i].taskContent}</div>
            <div></div>
            <div> 
              <button class="check_bt" onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
                <button class="delete_bt" onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button></div>
        </div>`;
        }
       
    }

    document.getElementById("dash-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    for(let i=0; i<tasklist.length;i++){
        if(tasklist[i].id == id){
            tasklist[i].isComplete = !tasklist[i].isComplete;
            break;
        }
    }
    render();
}

function deleteTask(id){
    for(let i=0; i<tasklist.length;i++){
        if(tasklist[i].id == id){
            tasklist.splice(i,1)
            break;
        }
    }
    render();
}

function filter(event){
    mode = event.target.id;
    filterList = [];
   if(mode == "all"){
    render();
   }else if(mode == "yet"){
        for(let i=0; i<tasklist.length; i++){
            if(tasklist[i].isComplete == false){
                filterList.push(tasklist[i]);
            }
        }
        
        render();
   }else if(mode == "done"){
    for(let i=0; i<tasklist.length;i++){
        if(tasklist[i].isComplete == true){
            filterList.push(tasklist[i])
        }
    }
    render();
   }

}

function randomIDGenerate(){
    return (performance.now().toString(36)+Math.random().toString(36)).replace(/\./g,"");
}