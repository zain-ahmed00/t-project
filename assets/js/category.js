
$(document).ready(function() {
    // Get current category from page URL
    const currentPath = window.location.pathname;
    const categoryName = currentPath.split('/').pop().split('.')[0];
    
    // Load products for the current category
    loadCategoryProducts(categoryName);
    
    // Function to load category products
    function loadCategoryProducts(category) {
        $.getJSON('../assets/data/products.json', function(data) {
            // Filter products by category
            let categoryProducts;
            
            switch(category) {
                case 'colour-lenses':
                    categoryProducts = data.products.filter(product => product.category === 'colour-lenses');
                    break;
                case 'eyesight-lens':
                    categoryProducts = data.products.filter(product => product.category === 'eyesight-lens');
                    break;
                case 'travel-kits':
                    categoryProducts = data.products.filter(product => product.category === 'travel-kits');
                    break;
                default:
                    categoryProducts = [];
                    break;
            }
            
            // Display products
            displayCategoryProducts(categoryProducts);
        })
        .fail(function() {
            console.error('Error loading products data');
        });
    }
    
    // Function to display category products
    function displayCategoryProducts(products) {
        const categoryClass = window.location.pathname.split('/').pop().split('.')[0] + '-container';
        const container = $('.' + categoryClass);
        
        if (container.length === 0) {
            console.error('Product container not found');
            return;
        }
        
        // Clear container
        container.empty();
        
        // Display products
        products.forEach(product => {
            container.append(createProductCard(product));
        });
        
        // Initialize wishlist buttons
        initWishlistButtons();
    }
    
    // Function to create product card HTML
    function createProductCard(product) {
        const isWishlisted = isInWishlist(product.id);
        const wishlistClass = isWishlisted ? 'active' : '';
        const wishlistIcon = isWishlisted ? 'fas' : 'far';
        
        return `
            <div class="col-md-6 col-lg-4 col-xl-3">
                <div class="product-card" data-id="${product.id}">
                    <div class="product-image">
                        <img src="${product.imageUrl}" alt="${product.name}" class="img-fluid">
                        <div class="product-wishlist ${wishlistClass}" data-product-id="${product.id}">
                            <i class="${wishlistIcon} fa-heart text-theme-primary"></i>
                        </div>
                        ${product.isNew ? '<span class="badge bg-success position-absolute top-0 start-0 m-2">New</span>' : ''}
                    </div>
                    <div class="card-body p-3">
                        <div class="product-rating">
                            ${getRatingStars(product.rating)}
                            <span class="product-rating-text">(${product.rating.toFixed(1)})</span>
                        </div>
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-price">$${product.price.toFixed(2)}</p>
                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <a href="../product-detail.html?id=${product.id}" class="btn btn-sm btn-outline-theme-primary">Details</a>
                            <button class="btn btn-sm btn-theme-primary add-to-cart" data-product-id="${product.id}">
                                <i class="fas fa-shopping-cart me-1"></i> Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Function to generate rating stars
    function getRatingStars(rating) {
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
                starsHtml += '<i class="fas fa-star"></i>';
            } else if (i - 0.5 <= rating) {
                starsHtml += '<i class="fas fa-star-half-alt"></i>';
            } else {
                starsHtml += '<i class="far fa-star"></i>';
            }
        }
        return starsHtml;
    }
    
    // Function to check if product is in wishlist
    function isInWishlist(productId) {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        return wishlist.includes(productId.toString());
    }
    
    // Wishlist functionality
    function initWishlistButtons() {
        $('.product-wishlist').off('click').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productId = $(this).data('product-id');
            toggleWishlist(productId, $(this));
        });
    }
    
    function toggleWishlist(productId, wishlistButton) {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        const isInWishlistAlready = wishlist.includes(productId.toString());
        
        if (isInWishlistAlready) {
            // Remove from wishlist
            const newWishlist = wishlist.filter(id => id !== productId.toString());
            localStorage.setItem('wishlist', JSON.stringify(newWishlist));
            wishlistButton.removeClass('active');
            wishlistButton.find('i').removeClass('fas').addClass('far');
            updateWishlistCount();
            showToast('Wishlist', 'Product removed from your wishlist!');
        } else {
            // Add to wishlist
            wishlist.push(productId.toString());
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            wishlistButton.addClass('active');
            wishlistButton.find('i').removeClass('far').addClass('fas');
            updateWishlistCount();
            showToast('Wishlist', 'Product added to your wishlist!');
        }
    }
    
    function updateWishlistCount() {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        $('.wishlist-count').text(wishlist.length);
    }
});
