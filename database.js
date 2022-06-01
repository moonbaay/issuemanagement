// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARzwGeqevkZVnlRxiaqgASniG0fVz9NPI",
  authDomain: "issue-management-58629.firebaseapp.com",
  projectId: "issue-management-58629",
  storageBucket: "issue-management-58629.appspot.com",
  messagingSenderId: "323534339143",
  appId: "1:323534339143:web:f11646f9425ef1fe820562",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {
    getDatabase,ref,set,get,child,update,onValue
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js"

const db = getDatabase()

function selectElement(element){
    return document.querySelector(element)
}

function getID(){
    return Math.floor(Math.random() * 1000000)
}
function getDate(){
    let dt = new Date()

    return `${dt.getMonth() +1}/${dt.getDate()}/${dt.getFullYear()}`
}

let reporter,type,des,status,priority,assignee

    reporter = selectElement('#reporter')
    type = selectElement('#type')
    des = selectElement("#description")
    status = selectElement("#status")
    priority = selectElement("#priority")
    assignee = selectElement('#assignee')


function AddDocument(){
    const id = getID()
    set(ref(db,'issue-management/' + id),{
            reporter:reporter.value,
            type:type.value,
            des:des.value,
            status:status.value,
            priority:priority.value,
            assignee:assignee.value,
            date: getDate(),
            id:id
        }
    ).then(()=>{
        alert('data added successfully')
  
    }).catch(error=>alert('unsuccessful operation, error:'+error))



}

const submitForm = selectElement(".submit-form-btn");

submitForm.addEventListener('click',AddDocument)
const tBody = selectElement('#tbody')

function AddItemToTable(id,reporter,type,des,assignee,date,status,priority){
    
    let tr = document.createElement('tr')
    let td_id = document.createElement('td')
    let td_reporter = document.createElement("td");
    let td_type= document.createElement("td");
    let td_des = document.createElement("td");
    let td_assignee = document.createElement("td");
    let td_date = document.createElement("td");
    let td_status = document.createElement("td");
    let td_priority = document.createElement("td");
    let td_a = document.createElement('a')
    td_a.classList.add('item')
    td_a.setAttribute('id',id)
    td_a.innerHTML = id
    td_des.classList.add('td-desc')
    td_id.appendChild(td_a)
    td_reporter.textContent = reporter
    td_type.textContent = type
    td_des.textContent = des
    td_assignee.textContent = assignee
    td_date.textContent = date
    td_status.textContent = status
    td_priority.textContent = priority
    
    tr.appendChild(td_id)
    tr.appendChild(td_reporter);
    tr.appendChild(td_type);
    tr.appendChild(td_des);
    tr.appendChild(td_assignee);
    tr.appendChild(td_date);
    tr.appendChild(td_status);
    tr.appendChild(td_priority);
    tBody.appendChild(tr)
}

function AddListToTable(issueManagement){
    tBody.innerHTML = ''
    issueManagement.forEach(item =>{
        AddItemToTable(item.id,
            item.reporter,
            item.type,
            item.des,
            item.assignee,
            item.date,
            item.status,
            item.priority)
    })
}

function getDataAtOnce(){
    const dbRef = ref(db)

    get(child(dbRef,"issue-management"))
    .then((snapshot)=>{
        const issue = []
        console.log(snapshot)
        snapshot.forEach(childSnapshot =>{
            issue.push(childSnapshot.val())

        })

        AddListToTable(issue)
    })
}

function getDataAtRealTime() {
  const dbRef = ref(db, "issue-management");

  onValue(dbRef,(snapshot) => {
    const issue = [];

    snapshot.forEach((childSnapshot) => {
      issue.push(childSnapshot.val());
      
    });

    AddListToTable(issue);
  });
}

window.onload = getDataAtRealTime();

//select data

    const singleItem = document.getElementById("single-item");
    const cancelModal = document.querySelector(".edit-form-cancel-btn");
function singleItemModal(){

    singleItem.classList.toggle('activated')


}
function singleItemModalClose(){
    cancelModal.addEventListener("click", function () {
          singleItem.classList.remove("activated");
    });
}
function updateData(id,reporter,type,des,status,priority,assignee){

        update(ref(db, "issue-management/" + id), {
          reporter: reporter.value,
          type: type.value,
          des: des.value,
          status: status.value,
          priority: priority.value,
          assignee: assignee.value,
        })
          .then(() => {
            alert("data update successfully");
          })
          .catch((error) => alert("unsuccessful operation, error:" + error));
}
function getIndividualItem(e){

    singleItemModal()
    singleItemModalClose()

    const id = e.target.getAttribute('id')

    const idParse = parseInt(id)
    const dbRef = ref(db)
    
    
    let reporter, type, des, status, priority, assignee,itemId,date;

    itemId = selectElement('#item-id')
    reporter = selectElement("#item-reporter");
    type = selectElement("#item-type");
    des = selectElement("#item-desc");
    status = selectElement("#item-status");
    priority = selectElement("#item-priority");
    assignee = selectElement("#item-assignee");
    date = selectElement('#item-date')
    
    get(child(dbRef,"issue-management/"+idParse)).then((snapshot)=>{
        if (snapshot.exists()) {
          itemId.value = snapshot.val().id;
          reporter.value = snapshot.val().reporter;
          type.value = snapshot.val().type;
          des.value = snapshot.val().des;
          date.innerHTML = snapshot.val().date;
          status.value = snapshot.val().status;
          assignee.value = snapshot.val().assignee;
          priority.value = snapshot.val().priority;
        } else {
          alert("no data found");
        }
        
    })
    const editBtn = document.querySelector(".edit");
   editBtn.addEventListener("click", ()=>{
       updateData(idParse,reporter,type,des,status,priority,assignee)
        singleItem.classList.remove('activated')
   }); 
}


document.querySelector('table').addEventListener('click',getIndividualItem)



