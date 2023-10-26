const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
const deleteMsg = get(".delete-btn");

let resultMessage = null;

const BOT_IMG = "../static/asset/bot.png";
const HUMAN_IMG = "../static/asset/human.png";
const BOT_NAME = "메디봇";
const HUMAN_NAME = "사용자";

msgerForm.addEventListener("submit", event => {
    event.preventDefault();
    const msgText = msgerInput.value.trim();
    if (!msgText) return;

    msgerInput.value = "";
    msgerInput.style.height = `${msgerInput.scrollHeight}px`;

    appendMessage(HUMAN_NAME, HUMAN_IMG, "right", msgText);
    showTypingIndicator();
    setTimeout(() => {
        botResponse(msgText);
        hideTypingIndicator();
    }, 500); // wait 0.5s
});
deleteMsg.addEventListener("click", deleteMessage);

function appendMessage(name, img, side, text) {
    const msgHTML = `
    <div class="msg ${side}-msg">
        <div class="msg-img" style="background-image: url(${img})"></div>
        <div class="msg-bubble">
            <div class="msg-info">
                <div class="msg-info-name">${name}</div>
                <div class="msg-info-time">${formatDate(new Date())}</div>
            </div>
            <div class="msg-text">${text}</div>
        <div>
    </div>`;
    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 500;
}

function botResponse(userText) {
    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/',
        data: JSON.stringify({'user_input' : userText}),
        datatype: 'json',
        async: false,
        success: function(response) {
            resultMessage = response['generated_ans'];
            appendMessage(BOT_NAME, BOT_IMG, "left", resultMessage);
            console.log(resultMessage);
        },
        error: function(error) {
            resultMessage = "ajax 통신 에러";
            appendMessage(BOT_NAME, BOT_IMG, "left", resultMessage);
            console.log("Error:", error);
        }
    });
}

// Utils
function get(selector, root = document) {
    return root.querySelector(selector);
}
function formatDate(date) {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();
    return `${h.slice(-2)}:${m.slice(-2)}`;
}
function showTypingIndicator() {
    const indicatorHTML = `
    <div class="msg left-msg">
        <div class="msg-img" style="background-image: url(${BOT_IMG})"></div>
        <div class="msg-bubble">
            <div class="msg-info">
                <div class="msg-info-name">${BOT_NAME}</div>
                <div class="msg-info-time">${formatDate(new Date())}</div>
            </div>
            <div class="msg-text">
                <div class="typing-indicator">
                    <div class="dot" style="--delay: 0.2s"></div>
                    <div class="dot" style="--delay: 0.3s"></div>
                    <div class="dot" style="--delay: 0.4s"></div>
                </div>
            </div>
        </div>
    </div>`;
    msgerChat.insertAdjacentHTML("beforeend", indicatorHTML);
    msgerChat.scrollTop += 500;
}
function hideTypingIndicator() {
    const typingIndicator = get(".typing-indicator");
    if (typingIndicator) {
        typingIndicator.parentElement.parentElement.parentElement.remove();
    }
}
function deleteMessage() {
    const messages = msgerChat.querySelectorAll(".msg");
    for (let i = messages.length - 1; i > 0; i--) {
        messages[i].remove(); // Remove all messages except the default message
    }
}