// Profile Sidebar JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Handle expandable menu items
    const expandableItems = document.querySelectorAll('.nav-item.expandable');
    
    expandableItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Toggle expanded state
            this.classList.toggle('expanded');
            
            // Find the corresponding sub-menu
            const subMenu = this.nextElementSibling;
            if (subMenu && subMenu.classList.contains('sub-menu')) {
                subMenu.classList.toggle('open');
            }
        });
    });

    // Handle standalone navigation items with data-section
    const standaloneNavItems = document.querySelectorAll('.nav-item[data-section]');
    
    standaloneNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const section = this.getAttribute('data-section');
            
            // Remove active class from all nav items
            document.querySelectorAll('.nav-item, .sub-item').forEach(navItem => navItem.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Show the corresponding section
            showSection(section);
        });
    });
    
    // Handle sub-item navigation for sections
    const subItems = document.querySelectorAll('.sub-item[data-section]');
    
    subItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const section = this.getAttribute('data-section');
            
            // Remove active class from all sub-items
            subItems.forEach(subItem => subItem.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Show the corresponding section
            showSection(section);
        });
    });
    
    function showSection(sectionName) {
        // Hide all sections
        const sections = document.querySelectorAll('.account-section');
        sections.forEach(section => {
            section.style.display = 'none';
        });
        
        // Hide the profile form container when showing other sections
        const profileFormContainer = document.querySelector('.profile-form-container');
        if (profileFormContainer) {
            if (sectionName === 'profile') {
                profileFormContainer.style.display = 'flex';
            } else {
                profileFormContainer.style.display = 'none';
            }
        }
        
        // Show the requested section (profile, addresses, and notifications are available)
        const targetSection = document.getElementById(sectionName + '-section');
        if (targetSection) {
            targetSection.style.display = 'block';
        }
        
        // Show profile section by default if it's profile
        if (sectionName === 'profile') {
            const profileSection = document.getElementById('profile-section');
            if (profileSection) {
                profileSection.style.display = 'block';
            }
        }
    }
    
    // Initialize: Open My Account submenu if we're on an account page
    const currentPath = window.location.pathname;
    if (currentPath.includes('my_account') || currentPath.includes('addresses') || currentPath.includes('notifications')) {
        const myAccountItem = document.querySelector('.nav-item.expandable');
        const subMenu = document.querySelector('.sub-menu');
        
        if (myAccountItem && subMenu) {
            myAccountItem.classList.add('expanded');
            subMenu.classList.add('open');
        }
        
        // Show profile section by default
        showSection('profile');
    }
});