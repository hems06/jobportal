function sendMessage() {
    let input = document.getElementById("messageInput");
    let message = input.value.trim();
    if (message === "") return;

    let chatBox = document.getElementById("chatBox");

    // Create message bubble
    let messageDiv = document.createElement("div");
    messageDiv.classList.add("message", "sent");
    messageDiv.textContent = message;
    
    chatBox.appendChild(messageDiv);

    // Auto-scroll to latest message
    chatBox.scrollTop = chatBox.scrollHeight;

    // Clear input field
    input.value = "";
}
// Check if the job seeker is accepted
function checkChatAccess() {
    let userEmail = firebase.auth().currentUser.email; // Get logged-in user's email

    db.collection("applications").where("email", "==", userEmail)
    .where("status", "==", "accepted")
    .get()
    .then(snapshot => {
        if (!snapshot.empty) {
            document.getElementById("chatBtn").disabled = false; // Enable Chat
        }
    });
}

// Run check when the page loads
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        checkChatAccess();
    }
});

// Redirect to chat page when clicking chat button
function startChat() {
    let jobPosterEmail = "jobposter@example.com"; // Replace with actual job poster email
    window.location.href = `chat.html?user=${jobPosterEmail}`;
}
