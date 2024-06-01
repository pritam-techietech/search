


window.addEventListener("load", () => {
  let user = { Name: localStorage.getItem("user") };
 let prom= new Promise((resolve,reject)=>{
  fetch("/loadchats", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let ChatsArray = Array.from(data);
      ChatsArray.forEach((element) => {
        let chat = document.createElement("div");
        chat.className = "chat";
        document.getElementById("chats").appendChild(chat);
        chat.innerHTML = element;
      });
    resolve();
    });
 }).then(()=>{
   
  let chats=document.getElementsByClassName('chat')
  console.log(typeof(chats))

  Object.keys(chats).forEach(element=> {
    
    chats[element].addEventListener('click',()=>{

      console.log(element)

    })


    });
});

 })






      


