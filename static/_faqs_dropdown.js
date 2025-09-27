class FAQManager {
    constructor() {
        this.faqs = JSON.parse(localStorage.getItem('storeFaqs')) || [];
        this.currentEditId = null;
        this.currentDeleteId = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderFaqs();
        this.updateStats();
    }

    bindEvents() {
        // Add FAQ button
        document.getElementById('addFaqBtn').addEventListener('click', () => this.openAddModal());
        
        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => this.searchFaqs(e.target.value));
        
        // Form submission
        document.getElementById('faqForm').addEventListener('submit', (e) => this.handleFormSubmit(e));
        
        // Modal close events
        document.getElementById('modalOverlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) this.closeModal();
        });
        
        document.getElementById('deleteModal').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) this.closeDeleteModal();
        });

        // Confirm delete
        document.getElementById('confirmDeleteBtn').addEventListener('click', () => this.confirmDelete());

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.menu-btn')) {
                this.closeAllDropdowns();
            }
        });
    }

    openAddModal() {
        document.getElementById('modalTitle').textContent = 'Add New FAQ';
        document.getElementById('faqForm').reset();
        document.getElementById('faqPublished').checked = true;
        this.currentEditId = null;
        document.getElementById('modalOverlay').classList.add('show');
    }

    openEditModal(id) {
        const faq = this.faqs.find(f => f.id === id);
        if (!faq) return;

        document.getElementById('modalTitle').textContent = 'Edit FAQ';
        document.getElementById('faqQuestion').value = faq.question;
        document.getElementById('faqAnswer').value = faq.answer;
        document.getElementById('faqCategory').value = faq.category;
        document.getElementById('faqPublished').checked = faq.published;
        this.currentEditId = id;
        document.getElementById('modalOverlay').classList.add('show');
    }

    closeModal() {
        document.getElementById('modalOverlay').classList.remove('show');
        this.currentEditId = null;
    }

    openDeleteModal(id) {
        this.currentDeleteId = id;
        document.getElementById('deleteModal').classList.add('show');
    }

    closeDeleteModal() {
        document.getElementById('deleteModal').classList.remove('show');
        this.currentDeleteId = null;
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = {
            question: document.getElementById('faqQuestion').value.trim(),
            answer: document.getElementById('faqAnswer').value.trim(),
            category: document.getElementById('faqCategory').value,
            published: document.getElementById('faqPublished').checked
        };

        if (!formData.question || !formData.answer) {
            alert('Please fill in all required fields.');
            return;
        }

        if (this.currentEditId) {
            this.updateFaq(this.currentEditId, formData);
        } else {
            this.addFaq(formData);
        }

        this.closeModal();
    }

    addFaq(faqData) {
        const newFaq = {
            id: Date.now().toString(),
            ...faqData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.faqs.unshift(newFaq);
        this.saveFaqs();
        this.renderFaqs();
        this.updateStats();
        this.showNotification('FAQ added successfully!', 'success');
    }

    updateFaq(id, faqData) {
        const index = this.faqs.findIndex(f => f.id === id);
        if (index === -1) return;

        this.faqs[index] = {
            ...this.faqs[index],
            ...faqData,
            updatedAt: new Date().toISOString()
        };

        this.saveFaqs();
        this.renderFaqs();
        this.updateStats();
        this.showNotification('FAQ updated successfully!', 'success');
    }

    confirmDelete() {
        if (!this.currentDeleteId) return;

        this.faqs = this.faqs.filter(f => f.id !== this.currentDeleteId);
        this.saveFaqs();
        this.renderFaqs();
        this.updateStats();
        this.closeDeleteModal();
        this.showNotification('FAQ deleted successfully!', 'success');
    }

    toggleFaq(id) {
        const faqElement = document.querySelector(`[data-faq-id="${id}"]`);
        const answerElement = faqElement.querySelector('.faq-answer');
        const expandBtn = faqElement.querySelector('.expand-btn');

        answerElement.classList.toggle('show');
        expandBtn.classList.toggle('expanded');
    }

    toggleDropdown(id) {
        this.closeAllDropdowns();
        const dropdown = document.querySelector(`[data-faq-id="${id}"] .dropdown-menu`);
        dropdown.classList.add('show');
    }

    closeAllDropdowns() {
        document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
            dropdown.classList.remove('show');
        });
    }

    searchFaqs(query) {
        const filteredFaqs = query.trim() === '' 
            ? this.faqs 
            : this.faqs.filter(faq => 
                faq.question.toLowerCase().includes(query.toLowerCase()) ||
                faq.answer.toLowerCase().includes(query.toLowerCase()) ||
                faq.category.toLowerCase().includes(query.toLowerCase())
            );
        
        this.renderFaqs(filteredFaqs);
    }

    renderFaqs(faqsToRender = this.faqs) {
        const container = document.getElementById('faqsContainer');
        const emptyState = document.getElementById('emptyState');

        if (faqsToRender.length === 0) {
            container.innerHTML = '';
            emptyState.classList.add('show');
            return;
        }

        emptyState.classList.remove('show');
        
        container.innerHTML = faqsToRender.map(faq => `
            <div class="faq-item" data-faq-id="${faq.id}">
                <div class="faq-header" onclick="faqManager.toggleFaq('${faq.id}')">
                    <div class="faq-question-section">
                        <div class="faq-question">${this.escapeHtml(faq.question)}</div>
                        <div class="faq-meta">
                            <span class="faq-category">${this.getCategoryLabel(faq.category)}</span>
                            <span class="faq-status ${faq.published ? 'status-published' : 'status-draft'}">
                                <i class="fas ${faq.published ? 'fa-eye' : 'fa-eye-slash'}"></i>
                                ${faq.published ? 'Published' : 'Draft'}
                            </span>
                            <span>${this.formatDate(faq.createdAt)}</span>
                        </div>
                    </div>
                    <div class="faq-controls">
                        <button class="expand-btn" onclick="event.stopPropagation()">
                            <i class="fas fa-chevron-down"></i>
                        </button>
                        <div class="menu-btn" onclick="event.stopPropagation(); faqManager.toggleDropdown('${faq.id}')">
                            <i class="fas fa-ellipsis-v"></i>
                            <div class="dropdown-menu">
                                <button class="dropdown-item" onclick="faqManager.openEditModal('${faq.id}')">
                                    <i class="fas fa-edit"></i> Edit
                                </button>
                                <button class="dropdown-item" onclick="faqManager.togglePublishStatus('${faq.id}')">
                                    <i class="fas ${faq.published ? 'fa-eye-slash' : 'fa-eye'}"></i> 
                                    ${faq.published ? 'Unpublish' : 'Publish'}
                                </button>
                                <button class="dropdown-item delete" onclick="faqManager.openDeleteModal('${faq.id}')">
                                    <i class="fas fa-trash"></i> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="faq-answer">
                    ${this.escapeHtml(faq.answer).replace(/\n/g, '<br>')}
                </div>
            </div>
        `).join('');
    }

    togglePublishStatus(id) {
        const faq = this.faqs.find(f => f.id === id);
        if (!faq) return;

        faq.published = !faq.published;
        faq.updatedAt = new Date().toISOString();

        this.saveFaqs();
        this.renderFaqs();
        this.updateStats();
        this.closeAllDropdowns();
        
        const status = faq.published ? 'published' : 'unpublished';
        this.showNotification(`FAQ ${status} successfully!`, 'success');
    }

    updateStats() {
        const total = this.faqs.length;
        const published = this.faqs.filter(f => f.published).length;
        const drafts = total - published;

        document.getElementById('totalFaqs').textContent = total;
        document.getElementById('publishedFaqs').textContent = published;
        document.getElementById('draftFaqs').textContent = drafts;
    }

    getCategoryLabel(category) {
        const labels = {
            general: 'General',
            shipping: 'Shipping',
            returns: 'Returns & Exchanges',
            payment: 'Payment',
            products: 'Products',
            account: 'Account'
        };
        return labels[category] || category;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    saveFaqs() {
        localStorage.setItem('storeFaqs', JSON.stringify(this.faqs));
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        `;

        // Add notification styles if not already added
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 2rem;
                    right: 2rem;
                    background: white;
                    padding: 1rem 1.5rem;
                    border-radius: 0.5rem;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    z-index: 1001;
                    transform: translateX(100%);
                    transition: transform 0.3s ease;
                }
                .notification.success {
                    border-left: 4px solid #10b981;
                    color: #065f46;
                }
                .notification.success i {
                    color: #10b981;
                }
                .notification.show {
                    transform: translateX(0);
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);

        // Hide and remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize the FAQ manager when the page loads
const faqManager = new FAQManager();

// Global functions for onclick handlers
window.openAddModal = () => faqManager.openAddModal();
window.closeModal = () => faqManager.closeModal();
window.closeDeleteModal = () => faqManager.closeDeleteModal();