const GEMINI_API_KEY = "AIzaSyCCeed-uPcDvA_In4ZoYXZ4tRnhzDfLXs8"; 
const MODEL_NAME = "gemini-2.5-flash";
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const inputField = document.getElementById('input-box');
const sendButton = document.getElementById('send-button');
const outputDiv = document.getElementById('output');
function displayMessage(text, sender) {
    const msg = document.createElement('div');
    msg.className = sender === 'user' ? 'user-message' : 'gemini-message';
    msg.textContent = text;
    outputDiv.appendChild(msg);
    // Cuộn xuống cuối
    outputDiv.scrollTop = outputDiv.scrollHeight;
}
async function sendMessage() {
    const userMessage = inputField.value.trim();

    if (!userMessage) return;
    displayMessage("Bạn: " + userMessage, 'user');
    inputField.value = ''; // Xóa nội dung input
    sendButton.disabled = true; // Tắt nút Gửi khi đang chờ phản hồi

    try {
        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: userMessage
        });

        const geminiResponseText = response.text;

        displayMessage("Gemini: " + geminiResponseText, 'gemini');

    } catch (error) {
        console.error("Lỗi khi gọi Gemini API:", error);
        displayMessage("Lỗi: Không thể kết nối với Gemini API.", 'gemini');
    } finally {
        sendButton.disabled = false; // Bật lại nút Gửi
    }
}

sendButton.addEventListener('click', sendMessage);

inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }

});
