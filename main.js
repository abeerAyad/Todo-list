// let form = document.getElementById('form');
// let input = document.getElementById('input');
// let msg = document.getElementById('msg');
// let posts = document.getElementById('posts');

// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//      formValidation();

// });
//  let formValidation = () => {
//      if( input.value === '') {
//          msg.innerHTML = 'Post cannot be blank';
//      } else {
//          msg.innerHTML = '';
//          acceptData();
//      }
//  };

//  let data = {};

//  let acceptData = () => {
//      data['Text'] = input.value;
//      console.log(data)
//      createPost();
//  }

//  let createPost = () => {
//      posts.innerHTML+= `               
//      <div>
//         <p>Hello world post 1</p>
//         <span class="options">
//             <i onclick = 'editPost(this)' class="fas fa-edit"></i>
//             <i onclick = 'deletePost(this)' class="fas fa-trash-alt"></i>
//         </span>
//     </div>`;
//     input.value = '';
//  }
//   let deletePost = (e) => {
//       e.parentElement.parentElement.remove();

//   }

//   let editPost = (e) => {
//       input.value = e.parentElement.previousElementSibling.innerHTML;
//       e.parentElement.parentElement.remove();

//   }

let form = document.getElementById('form');
let textInput = document.getElementById('textInput');
let dateInput = document.getElementById('dateInput');
 let textArea = document.getElementById('textarea');
 let msg = document.getElementById('msg');
 let tasks = document.getElementById('tasks');
 let add = document.getElementById('add');
let popupOuter = document.querySelector('.popup-outer');
let addNew = document.querySelector('#addNew');
let app = document.querySelector('.app');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    formValidation()
})
 let formValidation = (e) => {
     if(textInput.value  === '') {
         msg.innerHTML = 'Task cannot be blank';
     } else {
         msg.innerHTML = '';
         acceptData();
         add.click()

     }

 }

 let data = []; 

 let acceptData = () => {
     data.push({
         'text':textInput.value,
         'date':dateInput.value,
         'description':textArea.value

     })
     localStorage.setItem('data',JSON.stringify(data));
     createTasks()
 }

 let createTasks = () => {
    tasks.innerHTML = ''

     data.map((a,b)=>{
         console.log(b)
         tasks.innerHTML += `
         <div id=${b}>
         <span>${a.text}</span>
         <span>${a.date}</span>
         <p>${a.description}</p>
         <span class='optios'>
         <i onClick= "editTask(this)" class="fas fa-edit"></i>
         <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
         </span>
         </div>
         
         `

     })
     resetForm();
 }
 let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textArea.value = "";
  };


  let deleteTask = (e) => {
      e.parentElement.parentElement.remove();
      data.splice(e.parentElement.parentElement.id,1);
      localStorage.setItem('data',JSON.stringify(data));
  }

  let editTask = (e) => {
      let selectedTask = e.parentElement.parentElement;
      textInput.value =  selectedTask.children[0].innerHTML;
      dateInput.value =  selectedTask.children[1].innerHTML;
      textArea.value =  selectedTask.children[2].innerHTML;
      showPopup();
      deleteTask(e);


  }

    add.addEventListener('click', hide);
    function hide() {
        popupOuter.style.transform= 'scale(0)';
        app.style.display ='block';

    }

    addNew.addEventListener('click',showPopup) 
    
    function showPopup() {
        popupOuter.style.transform= 'scale(1)';
        app.style.display ='none';
    }

    (()=> {
        data = JSON.parse(localStorage.getItem('data') || []);
        createTasks()
    })();