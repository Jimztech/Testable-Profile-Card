function updateTime() {
    const timeElement = document.querySelector('.time');
    const now = new Date();
    
    // Get hours and minutes
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    // Determine AM/PM
    const ampm = hours >= 12 ? 'pm' : 'am';
    
    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    
    // Add leading zero to minutes if needed
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    
    // Update the element
    timeElement.textContent = `${hours}:${minutesStr}:${seconds}${ampm} WAT`;
}

// Update time immediately
updateTime();

// Update every minute (60000 milliseconds)
setInterval(updateTime, 1000);