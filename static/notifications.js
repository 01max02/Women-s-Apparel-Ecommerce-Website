// Notifications Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeNotificationTabs();
    initializeNotificationActions();
    initializeNotificationInteractions();
});

function initializeNotificationTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabType = this.getAttribute('data-tab');
            
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter notifications
            filterNotifications(tabType);
        });
    });
}

function filterNotifications(type) {
    const notifications = document.querySelectorAll('.notification-card');
    
    notifications.forEach(notification => {
        const notificationType = notification.getAttribute('data-type');
        
        if (type === 'all') {
            notification.style.display = 'flex';
        } else if (type === 'orders' && notificationType === 'order') {
            notification.style.display = 'flex';
        } else if (type === 'promotions' && notificationType === 'promotion') {
            notification.style.display = 'flex';
        } else if (type === 'system' && notificationType === 'system') {
            notification.style.display = 'flex';
        } else {
            notification.style.display = 'none';
        }
    });
}

function initializeNotificationActions() {
    const markAllReadBtn = document.getElementById('markAllReadBtn');
    
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', function() {
            markAllNotificationsAsRead();
        });
    }
}

function initializeNotificationInteractions() {
    const notificationCards = document.querySelectorAll('.notification-card');
    
    notificationCards.forEach(card => {
        card.addEventListener('click', function() {
            if (this.classList.contains('unread')) {
                markNotificationAsRead(this);
            }
        });
    });
}

function markNotificationAsRead(notificationCard) {
    // Remove unread class and indicator
    notificationCard.classList.remove('unread');
    const unreadIndicator = notificationCard.querySelector('.unread-indicator');
    if (unreadIndicator) {
        unreadIndicator.remove();
    }
    
    // In a real app, you would send an API request to mark as read
    // For now, we'll just show a success message
    showToast('Notification marked as read');
}

function markAllNotificationsAsRead() {
    const unreadNotifications = document.querySelectorAll('.notification-card.unread');
    
    unreadNotifications.forEach(notification => {
        markNotificationAsRead(notification);
    });
    
    // Hide the mark all as read button
    const markAllReadBtn = document.getElementById('markAllReadBtn');
    if (markAllReadBtn) {
        markAllReadBtn.style.display = 'none';
    }
    
    showToast('All notifications marked as read');
}

function showToast(message, type = 'success') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast-notification ${type}`;
    toast.textContent = message;
    
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 4px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    `;
    
    // Set background color based on type
    if (type === 'success') {
        toast.style.backgroundColor = '#28a745';
    } else if (type === 'error') {
        toast.style.backgroundColor = '#dc3545';
    } else {
        toast.style.backgroundColor = '#007bff';
    }
    
    document.body.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 3000);
}

// Add CSS for toast animations if not already present
const toastStyles = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;

// Inject toast styles if not already present
if (!document.querySelector('#toast-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'toast-styles';
    styleSheet.textContent = toastStyles;
    document.head.appendChild(styleSheet);
}