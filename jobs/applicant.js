function openPopup(popupId) {
    document.getElementById(popupId).style.display = "block";
}

function closePopup(popupId) {
    document.getElementById(popupId).style.display = "none";
}

function openChat(userName) {
    window.location.href = "chat.html?user=" + encodeURIComponent(userName);
}