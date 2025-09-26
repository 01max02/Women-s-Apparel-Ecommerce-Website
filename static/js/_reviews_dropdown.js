document.addEventListener('DOMContentLoaded', function() {
    // Get filter elements
    const ratingFilter = document.getElementById('rating-filter');
    const variationFilter = document.getElementById('variation-filter');
    const reviewsList = document.getElementById('reviews-list');
    const reviewItems = document.querySelectorAll('.review-item');

    // Like button functionality
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const heartIcon = this.querySelector('i');
            const likeCount = this.querySelector('span');
            let currentCount = parseInt(likeCount.textContent);

            if (heartIcon.classList.contains('far')) {
                // Like the review
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas');
                heartIcon.style.color = '#ef4444';
                likeCount.textContent = currentCount + 1;
            } else {
                // Unlike the review
                heartIcon.classList.remove('fas');
                heartIcon.classList.add('far');
                heartIcon.style.color = '';
                likeCount.textContent = currentCount - 1;
            }
        });
    });

    // Filter functionality
    function filterReviews() {
        const selectedRating = ratingFilter.value;
        const selectedVariation = variationFilter.value;

        reviewItems.forEach(item => {
            const itemRating = item.getAttribute('data-rating');
            const itemVariation = item.getAttribute('data-variation');
            
            let showItem = true;

            // Filter by rating
            if (selectedRating !== 'all' && itemRating !== selectedRating) {
                showItem = false;
            }

            // Filter by variation
            if (selectedVariation !== 'all' && itemVariation !== selectedVariation) {
                showItem = false;
            }

            // Show or hide the item
            if (showItem) {
                item.classList.remove('hidden');
                item.style.animation = 'fadeIn 0.3s ease-in';
            } else {
                item.classList.add('hidden');
            }
        });

        // Update reviews count
        const visibleReviews = document.querySelectorAll('.review-item:not(.hidden)').length;
        const reviewsCount = document.querySelector('.reviews-count');
        reviewsCount.textContent = `4.3 (${visibleReviews})`;
    }

    // Add event listeners for filters
    ratingFilter.addEventListener('change', filterReviews);
    variationFilter.addEventListener('change', filterReviews);

    // Sort functionality
    const sortBtn = document.querySelector('.sort-btn');
    let currentSort = 'latest';

    sortBtn.addEventListener('click', function() {
        const reviewsArray = Array.from(reviewItems);
        
        if (currentSort === 'latest') {
            // Sort by oldest
            reviewsArray.reverse();
            sortBtn.innerHTML = '<i class="fas fa-sort"></i> Oldest <i class="fas fa-chevron-down"></i>';
            currentSort = 'oldest';
        } else if (currentSort === 'oldest') {
            // Sort by highest rating
            reviewsArray.sort((a, b) => {
                return parseInt(b.getAttribute('data-rating')) - parseInt(a.getAttribute('data-rating'));
            });
            sortBtn.innerHTML = '<i class="fas fa-sort"></i> Highest Rated <i class="fas fa-chevron-down"></i>';
            currentSort = 'highest';
        } else if (currentSort === 'highest') {
            // Sort by lowest rating
            reviewsArray.sort((a, b) => {
                return parseInt(a.getAttribute('data-rating')) - parseInt(b.getAttribute('data-rating'));
            });
            sortBtn.innerHTML = '<i class="fas fa-sort"></i> Lowest Rated <i class="fas fa-chevron-down"></i>';
            currentSort = 'lowest';
        } else {
            // Back to latest
            reviewsArray.sort((a, b) => {
                const dateA = new Date(a.querySelector('.review-date').textContent.replace('Posted on ', ''));
                const dateB = new Date(b.querySelector('.review-date').textContent.replace('Posted on ', ''));
                return dateB - dateA;
            });
            sortBtn.innerHTML = '<i class="fas fa-sort"></i> Latest <i class="fas fa-chevron-down"></i>';
            currentSort = 'latest';
        }

        // Re-append sorted items
        reviewsArray.forEach(item => {
            reviewsList.appendChild(item);
        });
    });

    // Load more functionality
    const loadMoreBtn = document.querySelector('.load-more-btn');
    loadMoreBtn.addEventListener('click', function() {
        // Simulate loading more reviews
        this.textContent = 'Loading...';
        this.disabled = true;

        setTimeout(() => {
            // In a real application, you would fetch more reviews from an API
            alert('More reviews would be loaded here!');
            this.textContent = 'Load More Reviews';
            this.disabled = false;
        }, 1000);
    });

    // Write review functionality
    const writeReviewBtn = document.querySelector('.write-review-btn');
    writeReviewBtn.addEventListener('click', function() {
        alert('Write review modal would open here!');
    });

    // More options functionality
    const moreButtons = document.querySelectorAll('.more-btn');
    moreButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('More options menu would appear here!');
        });
    });

    // Add fade-in animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
});