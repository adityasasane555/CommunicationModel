const socket = io("http://localhost:3000")
const msgcontainer = document.getElementById("msg-container");
const messageForm = document.getElementById("send-container");
const input = document.getElementById("input");

const name = prompt("What is your name?");
appendMessage("You Joined");
socket.emit("new-user",name);

socket.on("chat-message",data =>{
  appendMessage(`${data.name} : ${data.message}`);
})

socket.on("user-connected",name =>{
  appendMessage(`${name} joined!`);
})

socket.on("user-disconnected",name =>{
   appendMessage(`${name} disconnected!`);
})

messageForm.addEventListener("submit",e =>{
  e.preventDefault();
  const message = input.value;
  appendMessage(`You : ${message}`);
  socket.emit("send-message",message);
  message.value = "";
})


function appendMessage(message){
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  msgcontainer.append(messageElement);
}