document.addEventListener('DOMContentLoaded', function() {
    const chatContainer = document.getElementById('chatContainer');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    
    // Auto-resize textarea
    userInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
    
    // Send message on button click
    sendButton.addEventListener('click', sendMessage);
    
    // Send message on Enter key (but allow Shift+Enter for new line)
    userInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;
        
        // Add user message to chat
        addMessage(message, 'user');
        userInput.value = '';
        userInput.style.height = 'auto';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Scroll to bottom
        scrollToBottom();
        
        // Get response from g4f
        getGPTResponse(message);
    }
    
    function addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = content;
        
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = getCurrentTime();
        
        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timeDiv);
        
        chatContainer.appendChild(messageDiv);
    }
    
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typingIndicator';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.className = 'typing-dot';
            typingDiv.appendChild(dot);
        }
        
        chatContainer.appendChild(typingDiv);
        scrollToBottom();
    }
    
    function hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    function scrollToBottom() {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    async function getGPTResponse(prompt) {
        try {
            // Используем g4f для получения ответа
            // Внимание: для работы этого кода вам нужно будет подключить g4f библиотеку
            // и настроить CORS политику, так как GitHub Pages не поддерживает серверный код
            
            // Это демонстрационный код, который не будет работать без дополнительной настройки
            const response = await fetchGPTResponse(prompt);
            
            hideTypingIndicator();
            addMessage(response, 'bot');
            scrollToBottom();
        } catch (error) {
            hideTypingIndicator();
            addMessage('Извините, произошла ошибка. Пожалуйста, попробуйте еще раз.', 'bot');
            console.error('Error:', error);
        }
    }
    
    // Заглушка для функции получения ответа от GPT
    // В реальном приложении вам нужно будет реализовать это через бэкенд
    // или использовать клиентскую часть g4f с правильной настройкой
    async function fetchGPTResponse(prompt) {
        // В реальном приложении здесь будет вызов к g4f API
        // Например:
        // const response = await g4f.ChatCompletion.create(...);
        // return response.text;
        
        // Для демонстрации используем имитацию задержки
        return new Promise(resolve => {
            setTimeout(() => {
                const responses = [
                    "Я обрабатываю ваш запрос: " + prompt,
                    "Это интересный вопрос. Давайте подумаем...",
                    "На основе моего анализа, вот что я могу сказать...",
                    "Я AI помощник, и вот мой ответ на ваш вопрос."
                ];
                resolve(responses[Math.floor(Math.random() * responses.length)]);
            }, 1500);
        });
    }
});
