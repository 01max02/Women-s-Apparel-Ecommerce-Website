// Global variables
let isLiked = false;
let likeCount = 24;

// Toggle dropdown menu
function toggleMenu() {
    const menu = document.getElementById('dropdownMenu');
    menu.classList.toggle('show');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const menu = document.getElementById('dropdownMenu');
    const menuBtn = document.querySelector('.menu-btn');
    
    if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
        menu.classList.remove('show');
    }
});

// Edit review function
function editReview() {
    const reviewText = document.querySelector('.review-text p');
    const currentText = reviewText.textContent;
    
    // Create textarea for editing
    const textarea = document.createElement('textarea');
    textarea.value = currentText;
    textarea.style.width = '100%';
    textarea.style.minHeight = '100px';
    textarea.style.padding = '12px';
    textarea.style.border = '2px solid #3b82f6';
    textarea.style.borderRadius = '6px';
    textarea.style.fontSize = '15px';
    textarea.style.fontFamily = 'inherit';
    textarea.style.resize = 'vertical';
    
    // Create save and cancel buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.style.marginTop = '12px';
    buttonContainer.style.display = 'flex';
    buttonContainer.style.gap = '8px';
    
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.style.padding = '8px 16px';
    saveBtn.style.backgroundColor = '#3b82f6';
    saveBtn.style.color = 'white';
    saveBtn.style.border = 'none';
    saveBtn.style.borderRadius = '6px';
    saveBtn.style.cursor = 'pointer';
    saveBtn.style.fontWeight = '500';
    
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.padding = '8px 16px';
    cancelBtn.style.backgroundColor = '#6b7280';
    cancelBtn.style.color = 'white';
    cancelBtn.style.border = 'none';
    cancelBtn.style.borderRadius = '6px';
    cancelBtn.style.cursor = 'pointer';
    cancelBtn.style.fontWeight = '500';
    
    buttonContainer.appendChild(saveBtn);
    buttonContainer.appendChild(cancelBtn);
    
    // Replace review text with textarea
    const reviewContainer = document.querySelector('.review-text');
    reviewContainer.innerHTML = '';
    reviewContainer.appendChild(textarea);
    reviewContainer.appendChild(buttonContainer);
    
    // Focus on textarea
    textarea.focus();
    
    // Save functionality
    saveBtn.addEventListener('click', function() {
        const newText = textarea.value.trim();
        if (newText) {
            reviewContainer.innerHTML = `<p>${newText}</p>`;
            showNotification('Review updated successfully!', 'success');
        } else {
            showNotification('Review cannot be empty!', 'error');
        }
    });
    
    // Cancel functionality
    cancelBtn.addEventListener('click', function() {
        reviewContainer.innerHTML = `<p>${currentText}</p>`;
    });
    
    // Close dropdown menu
    document.getElementById('dropdownMenu').classList.remove('show');
}

// Remove review function
function removeReview() {
    if (confirm('Are you sure you want to remove this review? This action cannot be undone.')) {
        const reviewCard = document.querySelector('.review-card');
        reviewCard.style.transform = 'scale(0.95)';
        reviewCard.style.opacity = '0.5';
        
        setTimeout(() => {
            reviewCard.style.display = 'none';
            showNotification('Review removed successfully!', 'success');
        }, 300);
    }
    
    // Close dropdown menu
    document.getElementById('dropdownMenu').classList.remove('show');
}

// Toggle like function
function toggleLike() {
    const likeBtn = document.getElementById('likeBtn');
    const heartIcon = document.getElementById('heartIcon');
    const likeCountElement = document.getElementById('likeCount');
    
    isLiked = !isLiked;
    
    if (isLiked) {
        heartIcon.className = 'fas fa-heart';
        likeBtn.classList.add('liked');
        likeCount++;
        
        // Add animation
        heartIcon.style.transform = 'scale(1.2)';
        setTimeout(() => {
            heartIcon.style.transform = 'scale(1)';
        }, 200);
    } else {
        heartIcon.className = 'far fa-heart';
        likeBtn.classList.remove('liked');
        likeCount--;
    }
    
    likeCountElement.textContent = likeCount;
}

// Show notification function
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Styling
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '12px 20px';
    notification.style.borderRadius = '8px';
    notification.style.color = 'white';
    notification.style.fontWeight = '500';
    notification.style.zIndex = '1000';
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'transform 0.3s ease';
    
    // Color based on type
    if (type === 'success') {
        notification.style.backgroundColor = '#059669';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#dc2626';
    } else {
        notification.style.backgroundColor = '#3b82f6';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Handle video placeholder click
document.addEventListener('DOMContentLoaded', function() {
    const videoPlaceholder = document.querySelector('.video-placeholder');
    const productVideo = document.querySelector('.product-video');
    
    if (videoPlaceholder && productVideo) {
        videoPlaceholder.addEventListener('click', function() {
            // In a real implementation, you would load the actual video source
            showNotification('Video would load here in a real implementation', 'info');
        });
    }
    
    // Handle image click for lightbox effect
    const productImages = document.querySelectorAll('.product-image');
    productImages.forEach(image => {
        image.addEventListener('click', function() {
            // In a real implementation, you would open a lightbox
            showNotification('Image lightbox would open here', 'info');
        });
    });
});

// Add smooth transitions
document.addEventListener('DOMContentLoaded', function() {
    const reviewCard = document.querySelector('.review-card');
    reviewCard.style.transition = 'all 0.3s ease';
});