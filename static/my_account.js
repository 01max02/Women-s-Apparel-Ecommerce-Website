document.addEventListener('DOMContentLoaded', function() {
    // Initialize date dropdowns
    initializeDateDropdowns();
    
    // Initialize event listeners
    initializeEventListeners();
    
    // Load saved profile data
    loadProfileData();
});

function initializeDateDropdowns() {
    const daySelect = document.getElementById('day');
    const monthSelect = document.getElementById('month');
    const yearSelect = document.getElementById('year');
    
    // Populate days (1-31)
    for (let i = 1; i <= 31; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        daySelect.appendChild(option);
    }
    
    // Populate months
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    months.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.textContent = month;
        monthSelect.appendChild(option);
    });
    
    // Populate years (current year - 100 to current year - 13)
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 13; i >= currentYear - 100; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }
}

function initializeEventListeners() {
    // Profile form submission
    document.getElementById('profileForm').addEventListener('submit', handleProfileSubmit);
    
    // Change email button
    document.getElementById('changeEmailBtn').addEventListener('click', openEmailModal);
    
    // Add phone button
    document.getElementById('addPhoneBtn').addEventListener('click', openPhoneModal);
    
    // Select image button
    document.getElementById('selectImageBtn').addEventListener('click', function() {
        document.getElementById('imageUpload').click();
    });
    
    // Image upload
    document.getElementById('imageUpload').addEventListener('change', handleImageUpload);
    
    // Email modal events
    document.getElementById('closeEmailModal').addEventListener('click', closeEmailModal);
    document.getElementById('cancelEmailChange').addEventListener('click', closeEmailModal);
    document.getElementById('confirmEmailChange').addEventListener('click', handleEmailChange);
    
    // Phone modal events
    document.getElementById('closePhoneModal').addEventListener('click', closePhoneModal);
    document.getElementById('cancelPhoneAdd').addEventListener('click', closePhoneModal);
    document.getElementById('confirmPhoneAdd').addEventListener('click', handlePhoneAdd);
    
    // Close modals when clicking outside
    document.getElementById('emailModal').addEventListener('click', function(e) {
        if (e.target === this) closeEmailModal();
    });
    
    document.getElementById('phoneModal').addEventListener('click', function(e) {
        if (e.target === this) closePhoneModal();
    });
    
    // Navigation menu toggle (for mobile)
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Toggle active state for main nav items
            if (!item.querySelector('.sub-menu')) {
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
            }
        });
    });

    // Address management
    const addAddressBtn = document.getElementById('addAddressBtn');
    if (addAddressBtn) {
        addAddressBtn.addEventListener('click', handleAddAddress);
    }

    // Edit and delete buttons for addresses
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', handleEditAddress);
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', handleDeleteAddress);
    });

    // Set default address buttons
    document.querySelectorAll('.set-default-btn').forEach(btn => {
        btn.addEventListener('click', handleSetDefault);
    });

    // Delete account button
    const deleteAccountBtn = document.querySelector('.delete-account-btn');
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', handleDeleteAccount);
    }

    // Toggle switches for notifications
    document.querySelectorAll('.toggle-switch input[type="checkbox"]').forEach(toggle => {
        toggle.addEventListener('change', handleNotificationToggle);
    });
}

function handleProfileSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const profileData = {
        name: formData.get('name'),
        gender: formData.get('gender'),
        day: formData.get('day'),
        month: formData.get('month'),
        year: formData.get('year')
    };
    
    // Validate required fields
    if (!profileData.name.trim()) {
        showToast('Please enter your name', 'error');
        return;
    }
    
    // Save to localStorage
    localStorage.setItem('profileData', JSON.stringify(profileData));
    
    showToast('Profile updated successfully!');
}

function openEmailModal() {
    document.getElementById('emailModal').classList.add('show');
    document.getElementById('newEmail').focus();
}

function closeEmailModal() {
    document.getElementById('emailModal').classList.remove('show');
    document.getElementById('newEmail').value = '';
    document.getElementById('password').value = '';
}

function handleEmailChange() {
    const newEmail = document.getElementById('newEmail').value;
    const password = document.getElementById('password').value;
    
    if (!newEmail || !password) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(newEmail)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate email change
    const maskedEmail = maskEmail(newEmail);
    document.querySelector('.masked-email').textContent = maskedEmail;
    
    closeEmailModal();
    showToast('Email updated successfully!');
}

function openPhoneModal() {
    document.getElementById('phoneModal').classList.add('show');
    document.getElementById('phoneNumber').focus();
}

function closePhoneModal() {
    document.getElementById('phoneModal').classList.remove('show');
    document.getElementById('phoneNumber').value = '';
    document.getElementById('countryCode').selectedIndex = 0;
}

function handlePhoneAdd() {
    const countryCode = document.getElementById('countryCode').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    
    if (!phoneNumber.trim()) {
        showToast('Please enter a phone number', 'error');
        return;
    }
    
    if (!isValidPhone(phoneNumber)) {
        showToast('Please enter a valid phone number', 'error');
        return;
    }
    
    // Update the phone field display
    const phoneField = document.querySelector('.phone-field');
    phoneField.innerHTML = `
        <span class="masked-phone">${countryCode} ${maskPhone(phoneNumber)}</span>
        <button type="button" class="change-btn" onclick="openPhoneModal()">Change</button>
    `;
    
    closePhoneModal();
    showToast('Phone number added successfully!');
}

function handleImageUpload(e) {
    const file = e.target.files[0];
    
    if (!file) return;
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
        showToast('Please select a JPEG or PNG image', 'error');
        return;
    }
    
    // Validate file size (1MB = 1048576 bytes)
    if (file.size > 1048576) {
        showToast('File size must be less than 1 MB', 'error');
        return;
    }
    
    // Create preview
    const reader = new FileReader();
    reader.onload = function(e) {
        const avatar = document.querySelector('.current-avatar');
        avatar.innerHTML = `<img src="${e.target.result}" alt="Profile" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
        showToast('Profile picture updated!');
    };
    reader.readAsDataURL(file);
}

function loadProfileData() {
    const savedData = localStorage.getItem('profileData');
    if (savedData) {
        const data = JSON.parse(savedData);
        
        // Populate form fields
        if (data.name) document.getElementById('name').value = data.name;
        if (data.gender) {
            const genderRadio = document.querySelector(`input[name="gender"][value="${data.gender}"]`);
            if (genderRadio) genderRadio.checked = true;
        }
        if (data.day) document.getElementById('day').value = data.day;
        if (data.month) document.getElementById('month').value = data.month;
        if (data.year) document.getElementById('year').value = data.year;
    }
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-$$$$]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 7;
}

function maskEmail(email) {
    const [username, domain] = email.split('@');
    const maskedUsername = username.charAt(0) + '*'.repeat(Math.max(0, username.length - 2)) + username.charAt(username.length - 1);
    return `${maskedUsername}@${domain}`;
}

function maskPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const masked = '*'.repeat(Math.max(0, cleaned.length - 4)) + cleaned.slice(-4);
    return masked;
}

// Address management functions
function handleAddAddress() {
    showToast('Add address functionality would be implemented here');
}

function handleEditAddress(e) {
    showToast('Edit address functionality would be implemented here');
}

function handleDeleteAddress(e) {
    if (confirm('Are you sure you want to delete this address?')) {
        e.target.closest('.address-item').remove();
        showToast('Address deleted successfully');
    }
}

function handleSetDefault(e) {
    // Remove default tag from all addresses
    document.querySelectorAll('.default-tag').forEach(tag => tag.remove());
    
    // Add default tag to current address
    const addressItem = e.target.closest('.address-item');
    const tagsContainer = addressItem.querySelector('.address-tags');
    
    const defaultTag = document.createElement('span');
    defaultTag.className = 'tag default-tag';
    defaultTag.textContent = 'Default';
    tagsContainer.appendChild(defaultTag);
    
    showToast('Default address updated successfully');
}

function handleDeleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        showToast('Account deletion request submitted', 'error');
    }
}

function handleNotificationToggle(e) {
    const toggle = e.target;
    const label = toggle.closest('.notification-item') ? 
        toggle.closest('.notification-item').querySelector('.notification-title').textContent :
        toggle.closest('.notification-header').querySelector('h3').textContent;
    
    if (toggle.checked) {
        showToast(`${label} notifications enabled`);
    } else {
        showToast(`${label} notifications disabled`);
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
}

// Add mobile menu button for responsive design
if (window.innerWidth <= 768) {
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 1000;
        background: #1976d2;
        color: white;
        border: none;
        padding: 10px;
        border-radius: 4px;
        font-size: 18px;
        cursor: pointer;
    `;
    mobileMenuBtn.onclick = toggleMobileMenu;
    document.body.appendChild(mobileMenuBtn);
}