const buttonAddToDo = document.getElementById("addNewThing");
const listToDo = document.getElementById("toDoList");
const txtToDo = document.getElementById("txtToDo")

getAllThingsToDo();


buttonAddToDo.addEventListener("click",addNewThing);


//Get all the things to do
function getAllThingsToDo(){
    const url = "http://localhost:8080/todo";
    axios.get(url)
        .then((response) => {
            listToDo.innerHTML = "";
            const ol = document.createElement("ol");
            const listToDoDatabase = response.data;
            for(let i = 0; i < listToDoDatabase.length; i++){
                const li = document.createElement("li");
                li.innerHTML = "<strong>" + listToDoDatabase[i].element + "<strong>";

                //Trash
                const trash = document.createElement("img");
                trash.src = "img/trash.png";
                trash.title = "Delete";
                trash.width = 20;
                trash.alt = "Delete";
                trash.setAttribute("idToDo",listToDoDatabase[i].idToDo);
                trash.addEventListener("click",deleteThing);
                li.appendChild(trash);

                //Done or not
                const done = document.createElement("img");
                if(listToDoDatabase[i].completed == true){
                    done.src = "img/true.png";
                }
                else{
                    done.src = "img/false.png";
                }
                done.title = "Change";
                done.width = 20;
                done.alt = "Change";
                done.setAttribute("idToDo",listToDoDatabase[i].idToDo);
                done.setAttribute("status",listToDoDatabase[i].completed);
                done.addEventListener("click",changeDone);
                li.appendChild(done);

                ol.appendChild(li);
            }
            listToDo.appendChild(ol);
        })
        .catch((error) => {
            console.log(error);
        })
}


//Post Request, it adds a thing to do
function addNewThing(){
    if(txtToDo.value != ""){
        const newToDo = txtToDo.value;
        const url = "http://localhost:8080/todo/addtodo/" + newToDo;
        axios.post(url)
        .then((response) => {
            getAllThingsToDo();
            txtToDo.value = "";
        })
        .catch((error) => {
            console.log(error);
        });
    }
    else{
        alert("The text is mandatory");
    }
}

function deleteThing(event){
    let idToDo = event.target.getAttribute("idToDo");
    let url = "http://localhost:8080/todo/todoremove/" + idToDo;
    axios.delete(url)
    .then((response) => {
        getAllThingsToDo();
    })
    .catch((error) => {
        console.log(error);
    });
}

function changeDone(event){
    const attribute = {
        idToDo : event.target.getAttribute("idToDo"),
        changed : event.target.getAttribute("status")
    }
    const url = "http://localhost:8080/todo/todotoupdatechanged";
    axios.put(url,attribute)
    .then((response) => {
        getAllThingsToDo();
    })
    .catch((error) => {
        console.log(error);
    });
}