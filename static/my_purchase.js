class MyAccountPage {
    constructor() {
        this.currentTab = 'all';
        this.orders = []; // This would be populated from an API
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadOrders();
    }

    setupEventListeners() {
        // Tab switching
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.status);
            });
        });

        // Search functionality
        const searchInput = document.querySelector('.search-input');
        searchInput.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // Navigation items
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleNavigation(item);
            });
        });

        // Edit profile
        const editProfileBtn = document.querySelector('.edit-profile');
        editProfileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleEditProfile();
        });
    }

    switchTab(status) {
        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-status="${status}"]`).classList.add('active');

        this.currentTab = status;
        this.filterOrders(status);
    }

    handleSearch(query) {
        const filteredOrders = this.orders.filter(order => {
            return order.sellerName.toLowerCase().includes(query.toLowerCase()) ||
                   order.orderId.toLowerCase().includes(query.toLowerCase()) ||
                   order.productName.toLowerCase().includes(query.toLowerCase());
        });

        this.displayOrders(filteredOrders);
    }

    handleNavigation(clickedItem) {
        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        // Add active class to clicked item
        clickedItem.classList.add('active');

        // Here you would typically navigate to different pages
        console.log('[v0] Navigation clicked:', clickedItem.textContent.trim());
    }

    handleEditProfile() {
        // This would typically open a modal or navigate to edit profile page
        alert('Edit Profile functionality would be implemented here');
    }

    loadOrders() {
        // Simulate loading orders from an API
        // In a real application, this would be an actual API call
        setTimeout(() => {
            this.orders = this.generateSampleOrders();
            this.displayOrders(this.orders);
        }, 1000);
    }

    generateSampleOrders() {
        // Generate some sample orders for demonstration
        return [
            {
                orderId: 'ORD001',
                sellerName: 'Fashion Store',
                productName: 'Summer Dress',
                status: 'completed',
                date: '2024-01-15',
                amount: '$45.99',
                image: '/placeholder.svg?height=60&width=60'
            },
            {
                orderId: 'ORD002',
                sellerName: 'Tech Gadgets',
                productName: 'Wireless Headphones',
                status: 'to-ship',
                date: '2024-01-20',
                amount: '$89.99',
                image: '/placeholder.svg?height=60&width=60'
            },
            {
                orderId: 'ORD003',
                sellerName: 'Home Decor',
                productName: 'Table Lamp',
                status: 'to-receive',
                date: '2024-01-22',
                amount: '$32.50',
                image: '/placeholder.svg?height=60&width=60'
            }
        ];
    }

    filterOrders(status) {
        let filteredOrders = this.orders;

        if (status !== 'all') {
            filteredOrders = this.orders.filter(order => {
                return order.status === status.replace('-', '-');
            });
        }

        this.displayOrders(filteredOrders);
    }

    displayOrders(orders) {
        const ordersContainer = document.querySelector('.orders-content');
        const emptyState = document.querySelector('.empty-state');
        const ordersList = document.querySelector('.orders-list');

        if (orders.length === 0) {
            emptyState.style.display = 'flex';
            ordersList.style.display = 'none';
        } else {
            emptyState.style.display = 'none';
            ordersList.style.display = 'flex';
            
            ordersList.innerHTML = orders.map(order => this.createOrderHTML(order)).join('');
        }
    }

    createOrderHTML(order) {
        const statusClass = `status-${order.status.replace('-', '-')}`;
        const statusText = order.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

        return `
            <div class="order-item">
                <div class="order-header">
                    <span class="order-id">Order ID: ${order.orderId}</span>
                    <span class="order-status ${statusClass}">${statusText}</span>
                </div>
                <div class="order-content">
                    <div class="order-details">
                        <div class="seller-name">${order.sellerName}</div>
                        <div class="product-name">${order.productName}</div>
                        <div class="order-date">${order.date}</div>
                        <div class="order-amount">${order.amount}</div>
                    </div>
                    <img src="${order.image}" alt="${order.productName}" class="product-image">
                </div>
            </div>
        `;
    }

    // Utility method to show notifications
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MyAccountPage();
});

// Add some additional CSS for order items and notifications
const additionalStyles = `
    .order-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .order-details {
        flex: 1;
    }

    .seller-name {
        font-weight: 600;
        margin-bottom: 4px;
    }

    .product-name {
        color: #666;
        margin-bottom: 4px;
    }

    .order-date {
        font-size: 12px;
        color: #999;
        margin-bottom: 4px;
    }

    .order-amount {
        font-weight: 600;
        color: #ee4d2d;
    }

    .product-image {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 4px;
        border: 1px solid #e5e5e5;
    }

    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 4px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    }

    .notification.info {
        background-color: #4a90e2;
    }

    .notification.success {
        background-color: #2d7d32;
    }

    .notification.error {
        background-color: #d32f2f;
    }

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

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);