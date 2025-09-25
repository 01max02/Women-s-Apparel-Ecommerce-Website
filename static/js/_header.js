/* JavaScript for _header.html */

// Enhanced dynamic dropdowns with smoother animations
document.addEventListener('DOMContentLoaded', function() {
    // Utility function for smooth transitions
    function smoothTransition(element, property, startValue, endValue, duration = 300) {
        const startTime = performance.now();
        const startVal = parseFloat(startValue);
        const endVal = parseFloat(endValue);
        const difference = endVal - startVal;
        
        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Use easing function for smoother animation
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentValue = startVal + (difference * easeOutCubic);
            
            element.style[property] = currentValue + (property === 'opacity' ? '' : 'px');
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    }

    // Enhanced animation for dropdown items
    function animateDropdownItems(container, delay = 50) {
        const items = container.querySelectorAll('.dropdown-list li');
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * delay);
        });
    }

    // --- Clothing ---
    var clothingCategorySubitems = {
        'tops': [
            'T-Shirts', 'Blouses', 'Button-downs', 'Tank Tops', 'Crop Tops', 'Tube Tops', 'Tunics', 'Wrap Tops', 'Peplum Tops', 'Bodysuits', 'Sweaters', 'Cardigans', 'Sweatshirts  Hoodies'
        ],
        'bottoms': [
            'Jeans', 'Pants & Trousers', 'Leggings & Jeggings', 'Skirts', 'Shorts', 'Culottes & Capris'
        ],
        'dresses': [
            'Casual Dresses', 'Work / Office', 'Shirt Dresses', 'Wrap Dresses', 'Maxi Dresses', 'Midi Dresses', 'Mini Dresses', 'Bodycon', 'A-line', 'Cocktail', 'Evening Gowns', 'Sundresses'
        ],
        'outwear': [
            'Jackets', 'Coats', 'Blazers', 'Vests & Gilets', 'Capes & Ponchos', 'Cardigans'
        ],
        'activewear': [
            'Sports Bras', 'Active Tops', 'Leggings & Yoga Pants', 'Joggers & Track Pants', 'Biker Shorts', 'Hoodies & Sweatshirts', 'Tracksuits & Co-ords'
        ],
        'sleepwear': [
            'Pajama Sets', 'Nightgowns & Chemises', 'Robes & Kimonos', 'Sleep Shirts', 'Lounge Tops', 'Lounge Pants & Shorts', 'Matching Loungewear Sets'
        ],
        'undergarments': [
            'Bras', 'Panties', 'Shapewear', 'Slips & Camisoles', 'Lingerie Sets', 'Hosiery'
        ],
        'swimwear': [
            'Bikinis', 'One-piece Swimsuits', 'Tankinis', 'Monokinis / Cut-out Suits', 'Cover-ups', 'Rash Guards & Swim Tops'
        ],
        'occasionwear': [
            'Formal Wear', 'Party Wear', 'Wedding Wear', 'Festive Wear', 'Cultural / Traditional Wear'
        ]
    };

    var clothingCategoryLabels = {
        'tops': 'WOMEN TOPS',
        'bottoms': 'WOMEN BOTTOMS',
        'dresses': 'WOMEN DRESSES',
        'outwear': 'WOMEN OUTWEAR',
        'activewear': 'WOMEN ACTIVEWEAR',
        'sleepwear': 'WOMEN SLEEPWEAR',
        'undergarments': 'WOMEN UNDERGARMENTS',
        'swimwear': 'WOMEN SWIMWEAR',
        'occasionwear': 'WOMEN OCCASIONWEAR'
    };

    var clothingSubitemsList = document.querySelector('ul.dropdown-list[data-section-title="women tops-clothing"]');
    var clothingSectionTitle = document.getElementById('category-section-title-clothing');
    var clothingOriginalSectionTitle = clothingSectionTitle ? clothingSectionTitle.innerHTML : '';
    var clothingOriginalSubitems = clothingSubitemsList ? clothingSubitemsList.innerHTML : '';

    function showClothingCategorySubitems(category) {
        if (clothingSubitemsList && clothingCategorySubitems[category]) {
            // Fade out current items
            const currentItems = clothingSubitemsList.querySelectorAll('li');
            currentItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-20px)';
                }, index * 20);
            });

            // Update content after fade out
            setTimeout(() => {
                clothingSubitemsList.innerHTML = clothingCategorySubitems[category].map(function(item) {
                    return '<li><a href="#" onclick="return false;">' + item + '</a></li>';
                }).join('');

                // Animate new items in
                animateDropdownItems(clothingSubitemsList);

                if (clothingSectionTitle && clothingCategoryLabels[category]) {
                    clothingSectionTitle.style.transition = 'all 0.3s ease';
                    clothingSectionTitle.innerHTML = clothingCategoryLabels[category] + '<span>→</span>';
                }
            }, 200);
        }
    }

    function restoreClothingOriginalSubitems() {
        if (clothingSubitemsList) {
            clothingSubitemsList.innerHTML = clothingOriginalSubitems;
            animateDropdownItems(clothingSubitemsList);
        }
        if (clothingSectionTitle) clothingSectionTitle.innerHTML = clothingOriginalSectionTitle;
    }

    Object.keys(clothingCategorySubitems).forEach(function(cat) {
        var link = document.querySelector('.category-link[data-category="' + cat + '"][data-nav="clothing"]');
        if (link) {
            link.addEventListener('mouseenter', function() { 
                showClothingCategorySubitems(cat); 
            });
            link.addEventListener('click', function(e) { 
                e.preventDefault(); 
                // Navigate to the specific category page
                if (cat === 'tops') {
                    window.location.href = '/shop/clothing/tops';
                } else if (cat === 'bottoms') {
                    window.location.href = '/shop/clothing/bottoms';
                } else if (cat === 'dresses') {
                    window.location.href = '/shop/clothing/dresses';
                } else if (cat === 'outwear') {
                    window.location.href = '/shop/clothing/outwear';
                } else if (cat === 'activewear') {
                    window.location.href = '/shop/clothing/activewear';
                } else if (cat === 'sleepwear') {
                    window.location.href = '/shop/clothing/sleepwear';
                } else if (cat === 'undergarments') {
                    window.location.href = '/shop/clothing/undergarments';
                } else if (cat === 'swimwear') {
                    window.location.href = '/shop/clothing/swimwear';
                } else if (cat === 'occasionwear') {
                    window.location.href = '/shop/clothing/occasionwear';
                } else {
                    showClothingCategorySubitems(cat); 
                }
            });
        }
    });

    var clothingDropdownContent = clothingSubitemsList ? clothingSubitemsList.closest('.dropdown-content') : null;
    
    if (clothingDropdownContent) {
        clothingDropdownContent.addEventListener('mouseleave', function() {
            restoreClothingOriginalSubitems();
        });
        clothingDropdownContent.addEventListener('mouseenter', function() {
            showClothingCategorySubitems('tops');
        });
    }

    // --- Shoes ---
    var shoesCategorySubitems = {
        'heels': [
            'Stilettos', 'Pumps', 'Block Heels', 'Wedge Heels', 'Kitten Heels', 'Platform Heels', 'Ankle Strap Heels', 'Mules', 'Peep Toe Heels', 'Slingbacks'
        ],
        'flats': [
            'Ballet Flats', 'Loafers', 'Moccasins', 'Espadrilles', 'Flat Sandals'
        ],
        'sandals': [
            'Strappy Sandals', 'Gladiator Sandals', 'Slide Sandals', 'Slingback Sandals'
        ],
        'sneakers': [
            'Casual Sneakers', 'Fashion / Lifestyle Sneakers', 'Chunky / Platform Sneakers', 'Slip-on Sneakers'
        ],
        'boots': [
            'Ankle Boots', 'Knee-High Boots', 'Over-the-Knee / Thigh-High Boots', 'Chelsea Boots', 'Combat Boots'
        ],
        'slippers&comfortwear': [
            'Indoor Slippers', 'Flip-Flops', 'Slip-on Comfort Sandals'
        ],
        'occasion/dressshoes': [
            'Party Shoes', 'Wedding Shoes', 'Formal Dress Shoes'
        ]
    };

    var shoesCategoryLabels = {
        'heels': 'HEELS',
        'flats': 'FLATS',
        'sandals': 'SANDALS',
        'sneakers': 'SNEAKERS',
        'boots': 'BOOTS',
        'slippers&comfortwear': 'SLIPPERS & COMFORT WEAR',
        'occasion/dressshoes': 'OCCASION / DRESS SHOES'
    };

    var shoesSubitemsList = document.querySelector('ul.dropdown-list[data-section-title="heels-shoes"]');
    var shoesSectionTitle = document.getElementById('category-section-title-shoes');
    var shoesOriginalSectionTitle = shoesSectionTitle ? shoesSectionTitle.innerHTML : '';
    var shoesOriginalSubitems = shoesSubitemsList ? shoesSubitemsList.innerHTML : '';

    function showShoesCategorySubitems(category) {
        if (shoesSubitemsList && shoesCategorySubitems[category]) {
            const currentItems = shoesSubitemsList.querySelectorAll('li');
            currentItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-20px)';
                }, index * 20);
            });

            setTimeout(() => {
                shoesSubitemsList.innerHTML = shoesCategorySubitems[category].map(function(item) {
                    return '<li><a href="#" onclick="return false;">' + item + '</a></li>';
                }).join('');

                animateDropdownItems(shoesSubitemsList);

                if (shoesSectionTitle && shoesCategoryLabels[category]) {
                    shoesSectionTitle.style.transition = 'all 0.3s ease';
                    shoesSectionTitle.innerHTML = shoesCategoryLabels[category] + '<span>→</span>';
                }
            }, 200);
        }
    }

    function restoreShoesOriginalSubitems() {
        if (shoesSubitemsList) {
            shoesSubitemsList.innerHTML = shoesOriginalSubitems;
            animateDropdownItems(shoesSubitemsList);
        }
        if (shoesSectionTitle) shoesSectionTitle.innerHTML = shoesOriginalSectionTitle;
    }

    Object.keys(shoesCategorySubitems).forEach(function(cat) {
        var link = document.querySelector('.category-link[data-category="' + cat + '"][data-nav="shoes"]');
        if (link) {
            link.addEventListener('mouseenter', function() { showShoesCategorySubitems(cat); });
            link.addEventListener('click', function(e) { 
                e.preventDefault(); 
                // Navigate to specific shoe category page
                if (cat === 'heels') {
                    window.location.href = '/shop/shoes/heels';
                } else if (cat === 'flats') {
                    window.location.href = '/shop/shoes/flats';
                } else if (cat === 'sandals') {
                    window.location.href = '/shop/shoes/sandals';
                } else if (cat === 'sneakers') {
                    window.location.href = '/shop/shoes/sneakers';
                } else if (cat === 'boots') {
                    window.location.href = '/shop/shoes/boots';
                } else if (cat === 'slippers&comfortwear') {
                    window.location.href = '/shop/shoes/slippers';
                } else if (cat === 'occasion/dressshoes') {
                    window.location.href = '/shop/shoes/occasion-shoes';
                } else {
                    showShoesCategorySubitems(cat);
                }
            });
        }
    });

    var shoesDropdownContent = shoesSubitemsList ? shoesSubitemsList.closest('.dropdown-content') : null;
    if (shoesDropdownContent) {
        shoesDropdownContent.addEventListener('mouseleave', function() {
            restoreShoesOriginalSubitems();
        });
        shoesDropdownContent.addEventListener('mouseenter', function() {
            var firstCat = Object.keys(shoesCategorySubitems)[0];
            showShoesCategorySubitems(firstCat);
        });
    }

    // --- Accessories ---
    var accessoriesCategorySubitems = {
        'bags': ['Handbags', 'Shoulder Bags', 'Tote Bags', 'Crossbody Bags', 'Clutches / Evening Bags', 'Backpacks', 'Wallets & Pouches'],
        'jewelry': ['Necklaces & Pendants', 'Earrings', 'Bracelets & Bangles', 'Rings', 'Anklets', 'Brooches & Pins'],
        'hair-accessories': ['Hairbands / Headbands', 'Hair Clips & Barrettes', 'Scrunchies', 'Hair Scarves & Wraps', 'Hair Claws'],
        'belts': ['Waist Belts', 'Skinny Belts', 'Wide / Statement Belts', 'Chain Belts'],
        'scarves-&-wraps': ['Silk Scarves', 'Shawls', 'Wraps / Stoles', 'Bandanas'],
        'hats-&-caps': ['Sun Hats', 'Fedoras', 'Beanies', 'Baseball Caps', 'Berets'],
        'eyewear': ['Sunglasses', 'Eyeglass Frames', 'Reading Glasses'],
        'watches': ['Dress Watches', 'Casual Watches', 'Smartwatches'],
        'gloves': ['Fashion Gloves', 'Winter Gloves', 'Evening Gloves'],
        'others': ['Keychains / Bag Charms', 'Phone Charms / Cases', 'Tights & Socks']
    };

    var accessoriesCategoryLabels = {
        'bags': 'BAGS',
        'jewelry': 'JEWELRY',
        'hair-accessories': 'HAIR ACCESSORIES',
        'belts': 'BELTS',
        'scarves-&-wraps': 'SCARVES & WRAPS',
        'hats-&-caps': 'HATS & CAPS',
        'eyewear': 'EYEWEAR',
        'watches': 'WATCHES',
        'gloves': 'GLOVES',
        'others': 'OTHERS'
    };

    var accessoriesSubitemsList = document.querySelector('ul.dropdown-list[data-section-title="accessories-accessories"]');
    var accessoriesSectionTitle = document.getElementById('category-section-title-accessories');
    var accessoriesOriginalSectionTitle = accessoriesSectionTitle ? accessoriesSectionTitle.innerHTML : '';
    var accessoriesOriginalSubitems = accessoriesSubitemsList ? accessoriesSubitemsList.innerHTML : '';

    function showAccessoriesCategorySubitems(category) {
        if (accessoriesSubitemsList && accessoriesCategorySubitems[category]) {
            const currentItems = accessoriesSubitemsList.querySelectorAll('li');
            currentItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-20px)';
                }, index * 20);
            });

            setTimeout(() => {
                accessoriesSubitemsList.innerHTML = accessoriesCategorySubitems[category].map(function(item) {
                    return '<li><a href="#" onclick="return false;">' + item + '</a></li>';
                }).join('');

                animateDropdownItems(accessoriesSubitemsList);

                if (accessoriesSectionTitle && accessoriesCategoryLabels[category]) {
                    accessoriesSectionTitle.style.transition = 'all 0.3s ease';
                    accessoriesSectionTitle.innerHTML = accessoriesCategoryLabels[category] + '<span>→</span>';
                }
            }, 200);
        }
    }

    function restoreAccessoriesOriginalSubitems() {
        if (accessoriesSubitemsList) {
            accessoriesSubitemsList.innerHTML = accessoriesOriginalSubitems;
            animateDropdownItems(accessoriesSubitemsList);
        }
        if (accessoriesSectionTitle) accessoriesSectionTitle.innerHTML = accessoriesOriginalSectionTitle;
    }

    Object.keys(accessoriesCategorySubitems).forEach(function(cat) {
        var link = document.querySelector('.category-link[data-category="' + cat + '"][data-nav="accessories"]');
        if (link) {
            link.addEventListener('mouseenter', function() { showAccessoriesCategorySubitems(cat); });
            link.addEventListener('click', function(e) { 
                e.preventDefault(); 
                // Navigate to specific accessory category page
                if (cat === 'bags') {
                    window.location.href = '/shop/accessories/bags';
                } else if (cat === 'jewelry') {
                    window.location.href = '/shop/accessories/jewelry';
                } else if (cat === 'hair-accessories') {
                    window.location.href = '/shop/accessories/hair-accessories';
                } else if (cat === 'belts') {
                    window.location.href = '/shop/accessories/belts';
                } else if (cat === 'scarves-&-wraps') {
                    window.location.href = '/shop/accessories/scarves-&-wraps';
                } else if (cat === 'hats-&-caps') {
                    window.location.href = '/shop/accessories/hats-&-caps';
                } else if (cat === 'eyewear') {
                    window.location.href = '/shop/accessories/eyewear';
                } else if (cat === 'watches') {
                    window.location.href = '/shop/accessories/watches';
                } else if (cat === 'gloves') {
                    window.location.href = '/shop/accessories/gloves';
                } else if (cat === 'others') {
                    window.location.href = '/shop/accessories/others';
                } else {
                    showAccessoriesCategorySubitems(cat);
                }
            });
        }
    });

    var accessoriesDropdownContent = accessoriesSubitemsList ? accessoriesSubitemsList.closest('.dropdown-content') : null;
    if (accessoriesDropdownContent) {
        accessoriesDropdownContent.addEventListener('mouseleave', function() {
            restoreAccessoriesOriginalSubitems();
        });
        accessoriesDropdownContent.addEventListener('mouseenter', function() {
            var firstCat = Object.keys(accessoriesCategorySubitems)[0];
            showAccessoriesCategorySubitems(firstCat);
        });
    }

    // Enhanced search functionality with smooth animations
    const searchInput = document.querySelector('.search-input');
    const searchIcon = document.querySelector('.search-icon');
    
    searchInput.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    searchInput.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });

    // Enhanced cart animation
    const cartBtn = document.querySelector('.cart-btn');
    const cartCount = document.querySelector('.cart-count');
    
    cartBtn.addEventListener('click', function() {
        cartCount.style.animation = 'none';
        setTimeout(() => {
            cartCount.style.animation = 'pulse 0.6s ease';
        }, 10);
    });

    // Smooth scroll behavior for any internal navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
// Profile dropdown logic
const profileBtn = document.getElementById('profileBtn');
const profileDropdown = document.getElementById('profileDropdown');
let profileDropdownOpen = false;

function closeProfileDropdown() {
    if (profileDropdown) {
        profileDropdown.style.display = 'none';
        profileBtn.setAttribute('aria-expanded', 'false');
        profileDropdownOpen = false;
    }
}

function openProfileDropdown() {
    if (profileDropdown) {
        profileDropdown.style.display = 'block';
        profileBtn.setAttribute('aria-expanded', 'true');
        profileDropdownOpen = true;
    }
}

if (profileBtn && profileDropdown) {
    profileBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (profileDropdownOpen) {
            closeProfileDropdown();
        } else {
            openProfileDropdown();
        }
    });
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (profileDropdownOpen && !profileDropdown.contains(e.target) && e.target !== profileBtn) {
            closeProfileDropdown();
        }
    });
    // Keyboard accessibility
    profileBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeProfileDropdown();
    });
}
