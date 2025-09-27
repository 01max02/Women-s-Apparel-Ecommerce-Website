// JS for product card component
        function createProductCardElement(productCardData) {
            const productCardElement = document.createElement('div');
            productCardElement.className = 'product-card';
            
            productCardElement.innerHTML = `
                <div class="product-image-container">
                    <img src="${productCardData.primaryImage}" alt="${productCardData.name}" class="product-image primary">
                    <img src="${productCardData.secondaryImage}" alt="${productCardData.name}" class="product-image secondary">
                    <div class="hover-actions">
                        <button class="action-btn wishlist-btn" onclick="toggleProductCardWishlist('${productCardData.id}', this)">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </button>
                        <button class="add-to-cart-btn" onclick="addProductCardToCart('${productCardData.id}')">Add to Cart</button>
                        <button class="action-btn cart-btn" onclick="addProductCardToCart('${productCardData.id}')">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <path d="M16 10a4 4 0 0 1-8 0"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="product-details">
                    <div class="product-info">
                        <div class="product-left">
                            <h3 class="product-name">${productCardData.name}</h3>
                            <div class="color-swatches">
                                ${productCardData.colors.map((productCardColor, colorIndex) => 
                                    `<div class="color-swatch ${colorIndex === 0 ? 'active' : ''}" 
                                          style="background-color: ${productCardColor}" 
                                          onclick="selectProductCardColor(this, '${productCardColor}')"></div>`
                                ).join('')}
                            </div>
                            <div class="price-container">
                                <span class="price">₱${productCardData.price}</span>
                                ${productCardData.originalPrice ? `<span class="original-price">₱${productCardData.originalPrice}</span>` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            return productCardElement;
        }

        function selectProductCardColor(colorElement, selectedColor) {
            const colorSwatches = colorElement.parentElement.querySelectorAll('.color-swatch');
            colorSwatches.forEach(swatch => swatch.classList.remove('active'));
            colorElement.classList.add('active');
            console.log(`Selected product card color: ${selectedColor}`);
        }

        function toggleProductCardWishlist(productCardId, wishlistButton) {
            const isWishlistActive = wishlistButton.classList.contains('active');
            if (isWishlistActive) {
                wishlistButton.classList.remove('active');
                removeProductCardFromWishlist(productCardId);
            } else {
                wishlistButton.classList.add('active');
                addProductCardToWishlist(productCardId);
            }
        }

        function addProductCardToWishlist(productCardId) {
            let productCardWishlist = JSON.parse(localStorage.getItem('productCardWishlist') || '[]');
            if (!productCardWishlist.includes(productCardId)) {
                productCardWishlist.push(productCardId);
                localStorage.setItem('productCardWishlist', JSON.stringify(productCardWishlist));
            }
            console.log(`Added ${productCardId} to product card wishlist`);
        }

        function removeProductCardFromWishlist(productCardId) {
            let productCardWishlist = JSON.parse(localStorage.getItem('productCardWishlist') || '[]');
            productCardWishlist = productCardWishlist.filter(id => id !== productCardId);
            localStorage.setItem('productCardWishlist', JSON.stringify(productCardWishlist));
            console.log(`Removed ${productCardId} from product card wishlist`);
        }

        function addProductCardToCart(productCardId) {
            let productCardCart = JSON.parse(localStorage.getItem('productCardCart') || '[]');
            const existingCartItem = productCardCart.find(item => item.id === productCardId);
            
            if (existingCartItem) {
                existingCartItem.quantity += 1;
            } else {
                productCardCart.push({ id: productCardId, quantity: 1 });
            }
            
            localStorage.setItem('productCardCart', JSON.stringify(productCardCart));
            console.log(`Added ${productCardId} to product card cart`);
        }

        function navigateToProduct(productCardId) {
            // Navigate to the product detail page
            window.location.href = `/buyer/product_detail/${productCardId}`;
        }

        // Sample product card data
        const sampleProductCardData = {
            id: 'product-card-1',
            name: 'Premium Cotton T-Shirt',
            primaryImage: 'static/images/product_1.jpg',
            secondaryImage: 'static/images/product_2.jpg',
            colors: ['#000000', '#ffffff', '#ff4757', '#3742fa'],
            price: '1,299',
            originalPrice: '1,599'
        };

        // Initialize the product card
        document.addEventListener('DOMContentLoaded', function() {
            const productCardContainer = document.getElementById('product-card-container');
            if (productCardContainer) {
                const generatedProductCard = createProductCardElement(sampleProductCardData);
                productCardContainer.appendChild(generatedProductCard);
                
                // Load product card wishlist state
                const productCardWishlist = JSON.parse(localStorage.getItem('productCardWishlist') || '[]');
                if (productCardWishlist.includes(sampleProductCardData.id)) {
                    const productCardWishlistBtn = generatedProductCard.querySelector('.wishlist-btn');
                    if (productCardWishlistBtn) {
                        productCardWishlistBtn.classList.add('active');
                    }
                }
            }
        });
