const { CloseButton } = require("react-bootstrap-v5");

const chatInput = document.querySelector('.chat-input textarea');
const sendChatBtn = document.querySelector('.chat-input span');
const chatbox = document.querySelector('.chatbox');
const chatbot_toggler = document.querySelector('.chatbot-toggler');
const chatbotCloseBtn = document.querySelector('.close-btn');

let userMessage;
let API_KEY = "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";

const generateResponse = (incomingChatLi) =>{
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");
    const requestOptions = {
        method : "POST",
        headers : {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
            {
                role: "user",
                content: userMessage
            }]
        })
    }
    fetch(API_URL,requestOptions).then(res => res.json()).then(data =>{
        messageElement.textContent = data.choices[0].message.content;
    }).catch((error)=>{
        messageElement.textContent = "Oops! Something went Wrong. Please try again.";
    }).finally(()=>{
        chatbox.scrollTo(0,chatbox.scrollHeight);
    })
}

const createChatLi = (message,className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat",className);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    chatInput.value ="";
    // console.log(userMessage);
    if(!userMessage) return;
    chatbox.appendChild(createChatLi(userMessage,"outgoing"));
    chatbox.scrollTo(0,chatbox.scrollHeight);
    setTimeout(()=>{
        const incomingChatLi = createChatLi("Thinking...","incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0,chatbox.scrollHeight);
        generateResponse(incomingChatLi);
        // chatbox.scrollTo(0,chatbox.scrollHeight);
    },600);
}


sendChatBtn.addEventListener("click",handleChat);
chatbotCloseBtn.addEventListener("click",()=> {
    document.body.classList.toggle("show-chatbot");
});
chatbot_toggler.addEventListener("click",()=> {
    document.body.classList.toggle("show-chatbot");
});

