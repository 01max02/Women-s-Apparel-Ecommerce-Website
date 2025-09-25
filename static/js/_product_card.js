// JS for product card component
        function createProductCard(productData) {
            const card = document.createElement('div');
            card.className = 'product-card';
            
            card.innerHTML = `
                <div class="product-image-container">
                    <img src="${productData.primaryImage}" alt="${productData.name}" class="product-image primary">
                    <img src="${productData.secondaryImage}" alt="${productData.name}" class="product-image secondary">
                    <div class="hover-actions">
                        <button class="action-btn wishlist-btn" onclick="toggleWishlist('${productData.id}', this)">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </button>
                        <button class="add-to-cart-btn" onclick="addToCart('${productData.id}')">Add to Cart</button>
                        <button class="action-btn cart-btn" onclick="addToCart('${productData.id}')">
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
                            <h3 class="product-name">${productData.name}</h3>
                            <div class="color-swatches">
                                ${productData.colors.map((color, index) => 
                                    `<div class="color-swatch ${index === 0 ? 'active' : ''}" 
                                          style="background-color: ${color}" 
                                          onclick="selectColor(this, '${color}')"></div>`
                                ).join('')}
                            </div>
                            <div class="price-container">
                                <span class="price">₱${productData.price}</span>
                                ${productData.originalPrice ? `<span class="original-price">₱${productData.originalPrice}</span>` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            return card;
        }

        function selectColor(element, color) {
            const swatches = element.parentElement.querySelectorAll('.color-swatch');
            swatches.forEach(swatch => swatch.classList.remove('active'));
            element.classList.add('active');
            console.log(`Selected color: ${color}`);
        }

        function toggleWishlist(productId, button) {
            const isActive = button.classList.contains('active');
            if (isActive) {
                button.classList.remove('active');
                removeFromWishlist(productId);
            } else {
                button.classList.add('active');
                addToWishlist(productId);
            }
        }

        function addToWishlist(productId) {
            let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
            if (!wishlist.includes(productId)) {
                wishlist.push(productId);
                localStorage.setItem('wishlist', JSON.stringify(wishlist));
            }
            console.log(`Added ${productId} to wishlist`);
        }

        function removeFromWishlist(productId) {
            let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
            wishlist = wishlist.filter(id => id !== productId);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            console.log(`Removed ${productId} from wishlist`);
        }

        function addToCart(productId) {
            let cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id: productId, quantity: 1 });
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            console.log(`Added ${productId} to cart`);
        }

        // Sample product data
        const sampleProduct = {
            id: 'product-1',
            name: 'Premium Cotton T-Shirt',
            primaryImage: 'static/images/product_1.jpg',
            secondaryImage: 'static/images/product_2.jpg',
            colors: ['#000000', '#ffffff', '#ff4757', '#3742fa'],
            price: '1,299',
            originalPrice: '1,599'
        };

        // Initialize the product card
        document.addEventListener('DOMContentLoaded', function() {
            const container = document.getElementById('product-container');
            const productCard = createProductCard(sampleProduct);
            container.appendChild(productCard);
            
            // Load wishlist state
            const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
            if (wishlist.includes(sampleProduct.id)) {
                const wishlistBtn = productCard.querySelector('.wishlist-btn');
                wishlistBtn.classList.add('active');
            }
        });
