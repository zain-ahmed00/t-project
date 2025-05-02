$(document).ready(function() {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    // Add shadow to navbar on scroll
    $(window).scroll(function() {
        if ($(window).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
        
        // Show or hide the back-to-top button
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
        
        // Animate elements when they come into view
        $('.animate-on-scroll').each(function() {
            if ($(this).offset().top < $(window).scrollTop() + $(window).height() - 100) {
                $(this).addClass('animated');
            }
        });
    });

    // Smooth scroll for anchor links
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 100
            }, 800);
        }
    });

    // Back to top button click
    $('.back-to-top').click(function() {
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });

    // Newsletter form submission
    $('#newsletter-form').on('submit', function(e) {
        e.preventDefault();
        const email = $('#newsletter-email').val();
        if (email) {
            $('#newsletter-success').removeClass('d-none');
            $('#newsletter-form').addClass('d-none');
            // In a real application, you would send this data to a server
            console.log('Newsletter subscription: ' + email);
            showToast('Success', 'Thanks for subscribing to our newsletter!');
        }
    });

    // Show toast message function
    window.showToast = function(title, message) {
        $('.toast-title').text(title);
        $('.toast-body').text(message);
        var toast = new bootstrap.Toast(document.getElementById('toastNotification'));
        toast.show();
    };
    
    // Load featured products on the homepage
    if ($('.featured-products-container').length) {
        loadFeaturedProducts();
    }
    
    // Function to load featured products
    function loadFeaturedProducts() {
        $.getJSON('assets/data/products.json', function(data) {
            const featuredProducts = data.products.filter(product => product.isFeatured);
            const container = $('.featured-products-container');
            
            featuredProducts.forEach(product => {
                container.append(createProductCard(product));
            });
            
            // Initialize wishlist functionality
            initWishlistButtons();
            
            // Add AOS animation to product cards
            $('.product-card').attr('data-aos', 'fade-up');
            
            // Make product cards clickable
            $('.product-card').on('click', function(e) {
                if (!$(e.target).closest('.product-wishlist, .add-to-cart').length) {
                    const productId = $(this).data('id');
                    window.location.href = `product-detail.html?id=${productId}`;
                }
            });
        })
        .fail(function() {
            console.error('Error loading featured products');
        });
    }
    
    // Function to create product card HTML
    window.createProductCard = function(product) {
        const isWishlisted = isInWishlist(product.id);
        const wishlistClass = isWishlisted ? 'active' : '';
        const wishlistIcon = isWishlisted ? 'fas' : 'far';
        
        return `
            <div class="col-md-6 col-lg-3 mb-4">
                <div class="product-card premium-card product-card-hover" data-id="${product.id}">
                    <div class="product-image position-relative overflow-hidden rounded-top">
                        <img src="${product.imageUrl}" alt="${product.name}" class="img-fluid w-100 h-100 object-fit-cover">
                        <div class="product-wishlist ${wishlistClass}" data-product-id="${product.id}">
                            <i class="${wishlistIcon} fa-heart text-theme-primary"></i>
                        </div>
                        ${product.isNew ? '<span class="badge bg-success position-absolute top-0 start-0 m-2">New</span>' : ''}
                        ${product.discount ? `<span class="badge bg-danger position-absolute top-0 start-0 m-2">${product.discount}% Off</span>` : ''}
                        <div class="position-absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-0 product-overlay"></div>
                    </div>
                    <div class="card-body p-3 bg-white rounded-bottom">
                        <div class="product-rating">
                            ${getRatingStars(product.rating)}
                            <span class="product-rating-text">(${product.rating.toFixed(1)})</span>
                        </div>
                        <h3 class="product-title fw-semibold text-theme-accent">${product.name}</h3>
                        <p class="product-price fw-bold text-theme-primary">
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
    };
    
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
        const wishlist = getWishlist();
        const isInWishlistAlready = wishlist.includes(productId);
        
        if (isInWishlistAlready) {
            // Remove from wishlist
            const newWishlist = wishlist.filter(id => id !== productId);
            localStorage.setItem('wishlist', JSON.stringify(newWishlist));
            wishlistButton.removeClass('active');
            wishlistButton.find('i').removeClass('fas').addClass('far');
            updateWishlistCount();
            showToast('Wishlist', 'Product removed from your wishlist!');
        } else {
            // Add to wishlist
            wishlist.push(productId);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            wishlistButton.addClass('active');
            wishlistButton.find('i').removeClass('far').addClass('fas');
            updateWishlistCount();
            showToast('Wishlist', 'Product added to your wishlist!');
            
            // Add animation when adding to wishlist
            wishlistButton.addClass('pulse-animation');
            setTimeout(function() {
                wishlistButton.removeClass('pulse-animation');
            }, 1000);
        }
    }
    
    function getWishlist() {
        return JSON.parse(localStorage.getItem('wishlist') || '[]');
    }
    
    function isInWishlist(productId) {
        const wishlist = getWishlist();
        return wishlist.includes(productId);
    }
    
    function updateWishlistCount() {
        const wishlist = getWishlist();
        $('.wishlist-count').text(wishlist.length);
    }
    
    // Add to cart functionality
    $('.add-to-cart').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const productId = $(this).data('product-id');
        addToCart(productId);
    });
    
    function addToCart(productId) {
        // In a real app, you would handle cart logic here
        showToast('Cart', 'Product added to your cart!');
        
        // Update cart count for demo purposes
        let cartCount = parseInt($('.cart-count').text()) || 0;
        $('.cart-count').text(cartCount + 1);
    }
    
    // Initialize wishlist count on page load
    updateWishlistCount();
    
    // Product image hover zoom effect
    $('.product-image').hover(
        function() {
            $(this).find('img').css('transform', 'scale(1.05)');
            $(this).find('.product-overlay').css('opacity', '0.3');
        },
        function() {
            $(this).find('img').css('transform', 'scale(1)');
            $(this).find('.product-overlay').css('opacity', '0');
        }
    );
    
    // Make all product cards clickable across the site
    $('.product-card').on('click', function(e) {
        if (!$(e.target).closest('.product-wishlist, .add-to-cart, a').length) {
            const productId = $(this).data('id');
            window.location.href = `product-detail.html?id=${productId}`;
        }
    });
    
    // Pulse animation for call-to-action buttons
    $('.btn-primary').addClass('btn-animated');
});

// Function to handle search form submission
$('#search-form').on('submit', function(e) {
    e.preventDefault();
    const searchQuery = $('#search-input').val().trim();
    
    if (searchQuery) {
        window.location.href = `search.html?q=${encodeURIComponent(searchQuery)}`;
    }
});

// Add animation classes to elements
$(window).on('load', function() {
    // Add fade-in animation to hero content
    $('.hero-content h1, .hero-content p, .hero-content .btn').addClass('fade-in');
    
    // Add slide-in animation to section titles
    $('section h2').addClass('slide-in');
    
    // Add animation delay to staggered elements
    $('.featured-products-container .col-lg-3').each(function(index) {
        $(this).css('animation-delay', `${0.1 * index}s`);
    });
});
