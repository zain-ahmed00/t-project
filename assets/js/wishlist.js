
$(document).ready(function() {
    // Load wishlist items from localStorage
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    // Update wishlist count text
    $('.wishlist-count-text').text(`${wishlist.length} ${wishlist.length === 1 ? 'item' : 'items'} in your wishlist`);
    
    // Toggle empty wishlist message based on wishlist length
    if (wishlist.length === 0) {
        $('#empty-wishlist').removeClass('d-none');
    } else {
        loadWishlistItems(wishlist);
        loadRelatedProducts();
    }
    
    // Add all to cart button
    $('#add-all-to-cart').on('click', function() {
        if (wishlist.length === 0) {
            showToast('Cart', 'Your wishlist is empty');
            return;
        }
        
        // In a real app, this would add all items to cart
        let cartCount = parseInt($('.cart-count').text()) || 0;
        $('.cart-count').text(cartCount + wishlist.length);
        
        showToast('Cart', `${wishlist.length} items added to your cart`);
    });
    
    // Clear wishlist button
    $('#clear-wishlist').on('click', function() {
        if (wishlist.length === 0) {
            showToast('Wishlist', 'Your wishlist is already empty');
            return;
        }
        
        // Show confirmation dialog
        if (confirm('Are you sure you want to clear your wishlist?')) {
            // Clear wishlist in localStorage
            localStorage.setItem('wishlist', '[]');
            
            // Update UI
            $('.wishlist-items-container').empty();
            $('.wishlist-count').text('0');
            $('.wishlist-count-text').text('0 items in your wishlist');
            $('#empty-wishlist').removeClass('d-none');
            
            showToast('Wishlist', 'Your wishlist has been cleared');
        }
    });
    
    // Function to load wishlist items
    function loadWishlistItems(wishlistIds) {
        $.getJSON('assets/data/products.json', function(data) {
            const wishlistContainer = $('.wishlist-items-container');
            
            // Filter products to only include those in wishlist
            const wishlistItems = data.products.filter(product => wishlistIds.includes(product.id));
            
            // Add each product to wishlist container
            wishlistItems.forEach((product, index) => {
                const productElement = createWishlistItem(product, index);
                wishlistContainer.append(productElement);
            });
            
            // Initialize remove from wishlist buttons
            initRemoveButtons();
            
            // Initialize add to cart buttons
            initAddToCartButtons();
            
            // Refresh AOS animations
            AOS.refresh();
        })
        .fail(function() {
            console.error('Error loading products data');
            showToast('Error', 'Failed to load wishlist items');
        });
    }
    
    // Function to create wishlist item
    function createWishlistItem(product, index) {
        const delay = Math.min(index * 50, 300); // Cap delay at 300ms
        
        return `
            <div class="col-md-6 col-lg-3 mb-4" data-aos="fade-up" data-aos-delay="${delay}">
                <div class="product-card" data-id="${product.id}">
                    <div class="product-image">
                        <img src="${product.imageUrl}" alt="${product.name}" class="img-fluid">
                        <button class="product-wishlist active remove-from-wishlist" data-product-id="${product.id}">
                            <i class="fas fa-heart text-theme-primary"></i>
                        </button>
                        ${product.isNew ? '<span class="badge bg-success position-absolute top-0 start-0 m-2">New</span>' : ''}
                        ${product.discount ? `<span class="badge bg-danger position-absolute top-0 start-0 m-2">${product.discount}% Off</span>` : ''}
                    </div>
                    <div class="card-body p-3">
                        <div class="product-rating">
                            ${getRatingStars(product.rating)}
                            <span class="product-rating-text">(${product.rating.toFixed(1)})</span>
                        </div>
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-price">
                            ${product.discount ? 
                                `<span class="text-decoration-line-through text-muted me-2">$${product.originalPrice.toFixed(2)}</span>` : ''}
                            $${product.price.toFixed(2)}
                        </p>
                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <a href="product-detail.html?id=${product.id}" class="btn btn-sm btn-outline-theme-primary">Details</a>
                            <button class="btn btn-sm btn-theme-primary add-to-cart btn-animated" data-product-id="${product.id}">
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
    
    // Function to initialize remove buttons
    function initRemoveButtons() {
        $('.remove-from-wishlist').on('click', function() {
            const productId = $(this).data('product-id');
            const productCard = $(this).closest('.col-md-6');
            const productName = productCard.find('.product-title').text();
            
            // Get current wishlist
            const currentWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
            
            // Remove product from wishlist
            const newWishlist = currentWishlist.filter(id => id !== productId);
            localStorage.setItem('wishlist', JSON.stringify(newWishlist));
            
            // Update wishlist count
            $('.wishlist-count').text(newWishlist.length);
            $('.wishlist-count-text').text(`${newWishlist.length} ${newWishlist.length === 1 ? 'item' : 'items'} in your wishlist`);
            
            // Add animation to card before removing
            productCard.addClass('fade-out');
            
            // Remove card after animation
            setTimeout(() => {
                productCard.remove();
                
                // Show empty wishlist message if no items left
                if (newWishlist.length === 0) {
                    $('#empty-wishlist').removeClass('d-none');
                }
            }, 300);
            
            showToast('Wishlist', `${productName} removed from your wishlist`);
        });
    }
    
    // Function to initialize add to cart buttons
    function initAddToCartButtons() {
        $('.add-to-cart').on('click', function() {
            const productId = $(this).data('product-id');
            const productName = $(this).closest('.product-card').find('.product-title').text();
            
            // In a real app, this would add the product to cart
            let cartCount = parseInt($('.cart-count').text()) || 0;
            $('.cart-count').text(cartCount + 1);
            
            showToast('Cart', `${productName} added to your cart`);
            
            // Add animation to button
            $(this).addClass('pulse-animation');
            setTimeout(() => {
                $(this).removeClass('pulse-animation');
            }, 1000);
        });
    }
    
    // Function to load related products
    function loadRelatedProducts() {
        $.getJSON('assets/data/products.json', function(data) {
            // Get featured products
            const featuredProducts = data.products.filter(product => product.isFeatured);
            
            // Get current wishlist
            const currentWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
            
            // Only show products not in wishlist
            const relatedProducts = featuredProducts.filter(product => !currentWishlist.includes(product.id));
            
            // Take 4 random products
            const randomProducts = relatedProducts.sort(() => 0.5 - Math.random()).slice(0, 4);
            
            // Add products to featured container
            const container = $('.featured-products-container');
            randomProducts.forEach((product, index) => {
                const productElement = createRelatedProductCard(product, index);
                container.append(productElement);
            });
        })
        .fail(function() {
            console.error('Error loading products data');
        });
    }
    
    // Function to create related product card
    function createRelatedProductCard(product, index) {
        const delay = Math.min(index * 50, 300); // Cap delay at 300ms
        
        return `
            <div class="col-md-6 col-lg-3 mb-4" data-aos="fade-up" data-aos-delay="${delay}">
                <div class="product-card" data-id="${product.id}">
                    <div class="product-image">
                        <img src="${product.imageUrl}" alt="${product.name}" class="img-fluid">
                        <button class="product-wishlist add-to-wishlist" data-product-id="${product.id}">
                            <i class="far fa-heart text-theme-primary"></i>
                        </button>
                        ${product.isNew ? '<span class="badge bg-success position-absolute top-0 start-0 m-2">New</span>' : ''}
                        ${product.discount ? `<span class="badge bg-danger position-absolute top-0 start-0 m-2">${product.discount}% Off</span>` : ''}
                    </div>
                    <div class="card-body p-3">
                        <div class="product-rating">
                            ${getRatingStars(product.rating)}
                            <span class="product-rating-text">(${product.rating.toFixed(1)})</span>
                        </div>
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-price">
                            ${product.discount ? 
                                `<span class="text-decoration-line-through text-muted me-2">$${product.originalPrice.toFixed(2)}</span>` : ''}
                            $${product.price.toFixed(2)}
                        </p>
                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <a href="product-detail.html?id=${product.id}" class="btn btn-sm btn-outline-theme-primary">Details</a>
                            <button class="btn btn-sm btn-theme-primary add-to-cart btn-animated" data-product-id="${product.id}">
                                <i class="fas fa-shopping-cart me-1"></i> Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Initialize add to wishlist buttons for related products
    $(document).on('click', '.add-to-wishlist', function() {
        const productId = $(this).data('product-id');
        const productName = $(this).closest('.product-card').find('.product-title').text();
        
        // Get current wishlist
        const currentWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        
        // Add product to wishlist if not already there
        if (!currentWishlist.includes(productId)) {
            const newWishlist = [...currentWishlist, productId];
            localStorage.setItem('wishlist', JSON.stringify(newWishlist));
            
            // Update wishlist count
            $('.wishlist-count').text(newWishlist.length);
            
            // Change button to active
            $(this).addClass('active');
            $(this).find('i').removeClass('far').addClass('fas');
            
            showToast('Wishlist', `${productName} added to your wishlist`);
            
            // Refresh the page to show the updated wishlist
            setTimeout(() => {
                location.reload();
            }, 1500);
        }
    });
});
