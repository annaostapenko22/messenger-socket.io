const socket = io.connect("http://localhost:4000");

const refs = {
  message: document.getElementById("message"),
  handle: document.getElementById("handle"),
  button: document.getElementById("send"),
  output: document.getElementById("output"),
  feedback: document.getElementById("feedback")
};

const handleClickSend = () => {
  socket.emit("chat", {
    message: refs.message.value,
    handle: refs.handle.value
  });
  refs.message.value = "";
};

const broadcastTypingMessage = () => {
  socket.emit("typing", refs.handle.value);
};

refs.button.addEventListener("click", handleClickSend);
refs.message.addEventListener("keypress", broadcastTypingMessage);

socket.on("chat", data => {
  refs.feedback.innerHTML = "";
  refs.output.innerHTML += `<p><strong> ${data.handle} : </strong> ${data.message}</p>`;
  
});

socket.on("typing", data => {
  refs.feedback.innerHTML = `<p><em> ${data} is typing a message...</em></p>`;
});
