const chatbotBtn = document.getElementById("chatbot-btn");
const chatbotBox = document.getElementById("chatbot-box");
const closeBtn = document.getElementById("close-btn");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const messages = document.getElementById("chat-messages");

let isChatOpen = false;

// Toggle chatbot when icon is clicked
chatbotBtn.onclick = () => {
  if (isChatOpen) {
    chatbotBox.style.display = "none";
    isChatOpen = false;
  } else {
    chatbotBox.style.display = "flex";
    isChatOpen = true;
  }
};

// Close chatbot when ✖ is clicked
closeBtn.onclick = () => {
  chatbotBox.style.display = "none";
  isChatOpen = false;
};


// Send message
sendBtn.onclick = sendMessage;

userInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const text = userInput.value.trim();
  if (text === "") return;

  addMessage(text, "user-msg");
  userInput.value = "";

  // Temporary bot reply (backend later)
  setTimeout(() => {
    addMessage("Data fetch backend sanga connect bhayepachi aaucha 🙂", "bot-msg");
  }, 500);
}

function addMessage(text, className) {
  const msg = document.createElement("div");
  msg.className = className;
  msg.innerText = text;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}
