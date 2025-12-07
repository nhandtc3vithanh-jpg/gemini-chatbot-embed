// CẢNH BÁO: KHÔNG NÊN ĐẶT API KEY TRỰC TIẾP TRONG MÃ PHÍA CLIENT CHO ỨNG DỤNG CÔNG KHAI!
// Thay thế YOUR_API_KEY_HERE bằng Khóa API thật của bạn
const GEMINI_API_KEY = "AIzaSyCvv9dyiGvsKjUm6b0dtcww25eyaXaCT_U"; 
const MODEL_NAME = "gemini-2.5-flash";

// Khởi tạo đối tượng GoogleGenAI
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// Lấy các phần tử DOM
const inputField = document.getElementById('input-box');
const sendButton = document.getElementById('send-button');
const outputDiv = document.getElementById('output');

// Hàm hiển thị tin nhắn trên giao diện
function displayMessage(text, sender) {
    const msg = document.createElement('div');
    msg.className = sender === 'user' ? 'user-message' : 'gemini-message';
    msg.textContent = text;
    outputDiv.appendChild(msg);
    // Cuộn xuống cuối
    outputDiv.scrollTop = outputDiv.scrollHeight;
}

// Hàm gửi tin nhắn và nhận phản hồi từ Gemini
async function sendMessage() {
    const userMessage = inputField.value.trim();

    if (!userMessage) return;

    // 1. Hiển thị tin nhắn người dùng
    displayMessage("Bạn: " + userMessage, 'user');
    inputField.value = ''; // Xóa nội dung input
    sendButton.disabled = true; // Tắt nút Gửi khi đang chờ phản hồi

    try {
        // 2. Gọi Gemini API
        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: userMessage
        });

        const geminiResponseText = response.text;

        // 3. Hiển thị phản hồi của Gemini
        displayMessage("Gemini: " + geminiResponseText, 'gemini');

    } catch (error) {
        console.error("Lỗi khi gọi Gemini API:", error);
        displayMessage("Lỗi: Không thể kết nối với Gemini API.", 'gemini');
    } finally {
        sendButton.disabled = false; // Bật lại nút Gửi
    }
}

// Xử lý sự kiện khi nhấn nút Gửi
sendButton.addEventListener('click', sendMessage);

// Xử lý sự kiện khi nhấn Enter trong ô nhập liệu
inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});