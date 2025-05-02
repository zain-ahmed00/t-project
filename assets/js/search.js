
$(document).ready(function() {
    // Parse URL parameters to get search query
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q') || '';
    
    // Initialize search input with query from URL
    $('#search-input').val(searchQuery);
    
    // Perform search on page load if there's a query
    if (searchQuery) {
        performSearch(searchQuery);
    } else {
        // Show all products if no query
        $('#loading-indicator').hide();
        loadAllProducts();
    }
    
    // Search form submission
    $('#search-form').on('submit', function(e) {
        e.preventDefault();
        const query = $('#search-input').val().trim();
        
        // Update URL with search query
        if (query) {
            const newUrl = `${window.location.pathname}?q=${encodeURIComponent(query)}`;
            window.history.pushState({ path: newUrl }, '', newUrl);
            performSearch(query);
        } else {
            loadAllProducts();
        }
    });
    
    // Filter badge click
    $('.filter-badge').on('click', function() {
        $('.filter-badge').removeClass('active');
        $(this).addClass('active');
        
        const filterType = $(this).data('filter');
        applyFilter(filterType);
    });
    
    // Sort dropdown change
    $('#sort-by').on('change', function() {
        const sortType = $(this).val();
        sortProducts(sortType);
    });
    
    // Function to perform search
    function performSearch(query) {
        // Show loading indicator
        $('#loading-indicator').show();
        $('.search-results-container').empty();
        $('#no-results').addClass('d-none');
        
        // Delay to simulate API call
        setTimeout(function() {
            $.getJSON('assets/data/products.json', function(data) {
                // Filter products based on search query
                const results = data.products.filter(product => {
                    const searchText = `${product.name} ${product.category} ${product.description}`.toLowerCase();
                    return searchText.includes(query.toLowerCase());
                });
                
                displaySearchResults(results);
            })
            .fail(function() {
                console.error('Error loading products data');
                $('#loading-indicator').hide();
                $('#no-results').removeClass('d-none');
            });
        }, 800); // Simulated delay
    }
    
    // Function to load all products
    function loadAllProducts() {
        $.getJSON('assets/data/products.json', function(data) {
            displaySearchResults(data.products);
        })
        .fail(function() {
            console.error('Error loading products data');
            $('#no-results').removeClass('d-none');
        });
    }
    
    // Function to display search results
    function displaySearchResults(results) {
        // Hide loading indicator
        $('#loading-indicator').hide();
        
        // Update result count
        $('#result-count').text(results.length);
        
        if (results.length === 0) {
            // Show no results message
            $('#no-results').removeClass('d-none');
            return;
        }
        
        // Clear previous results
        const resultsContainer = $('.search-results-container');
        resultsContainer.empty();
        
        // Add each product to results
        results.forEach((product, index) => {
            const productCard = createSearchResultCard(product, index);
            resultsContainer.append(productCard);
        });
        
        // Initialize wishlist buttons
        initWishlistButtons();
        
        // Create pagination if needed
        createPagination(results.length);
        
        // Apply AOS animations
        AOS.refresh();
    }
    
    // Function to create search result card
    function createSearchResultCard(product, index) {
        const isWishlisted = isInWishlist(product.id);
        const wishlistClass = isWishlisted ? 'active' : '';
        const wishlistIcon = isWishlisted ? 'fas' : 'far';
        
        const delay = Math.min(index * 50, 300); // Cap delay at 300ms
        
        return `
            <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="${delay}">
                <div class="product-card" data-id="${product.id}">
                    <div class="product-image">
                        <img src="${product.imageUrl}" alt="${product.name}" class="img-fluid">
                        <div class="product-wishlist ${wishlistClass}" data-product-id="${product.id}">
                            <i class="${wishlistIcon} fa-heart text-theme-primary"></i>
                        </div>
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
    
    // Function to create pagination
    function createPagination(totalItems) {
        const itemsPerPage = 12;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        
        if (totalPages <= 1) {
            $('#search-pagination').empty();
            return;
        }
        
        let paginationHtml = `
            <li class="page-item disabled">
                <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
            </li>
        `;
        
        for (let i = 1; i <= totalPages; i++) {
            const activeClass = i === 1 ? 'active' : '';
            paginationHtml += `
                <li class="page-item ${activeClass}"><a class="page-link" href="#">${i}</a></li>
            `;
        }
        
        paginationHtml += `
            <li class="page-item">
                <a class="page-link" href="#">Next</a>
            </li>
        `;
        
        $('#search-pagination').html(paginationHtml);
    }
    
    // Function to apply filter
    function applyFilter(filterType) {
        // Show loading indicator
        $('#loading-indicator').show();
        $('.search-results-container').empty();
        
        $.getJSON('assets/data/products.json', function(data) {
            let filteredProducts = data.products;
            
            // Apply filter based on type
            if (filterType !== 'all') {
                switch (filterType) {
                    case 'color':
                        filteredProducts = data.products.filter(p => p.category === 'Color Lenses');
                        break;
                    case 'eyesight':
                        filteredProducts = data.products.filter(p => p.category === 'Eyesight Lenses');
                        break;
                    case 'kits':
                        filteredProducts = data.products.filter(p => p.category === 'Travel Kits');
                        break;
                    case 'price-low':
                        filteredProducts = [...data.products].sort((a, b) => a.price - b.price);
                        break;
                    case 'price-high':
                        filteredProducts = [...data.products].sort((a, b) => b.price - a.price);
                        break;
                    case 'rating':
                        filteredProducts = [...data.products].sort((a, b) => b.rating - a.rating);
                        break;
                    case 'new':
                        filteredProducts = data.products.filter(p => p.isNew);
                        break;
                }
            }
            
            // Apply additional filtering if search query exists
            const searchQuery = $('#search-input').val().trim();
            if (searchQuery) {
                filteredProducts = filteredProducts.filter(product => {
                    const searchText = `${product.name} ${product.category} ${product.description}`.toLowerCase();
                    return searchText.includes(searchQuery.toLowerCase());
                });
            }
            
            // Display filtered results
            displaySearchResults(filteredProducts);
        })
        .fail(function() {
            console.error('Error loading products data');
            $('#loading-indicator').hide();
            $('#no-results').removeClass('d-none');
        });
    }
    
    // Function to sort products
    function sortProducts(sortType) {
        const resultsContainer = $('.search-results-container');
        const products = [];
        
        // Collect all product data
        resultsContainer.find('.product-card').each(function() {
            const productId = $(this).data('id');
            const productElement = $(this).parent();
            
            $.getJSON('assets/data/products.json', function(data) {
                const productData = data.products.find(p => p.id == productId);
                if (productData) {
                    products.push({
                        element: productElement,
                        data: productData
                    });
                    
                    // Once all products are collected, sort and reappend
                    if (products.length === resultsContainer.find('.product-card').length) {
                        sortAndReappend(products, sortType, resultsContainer);
                    }
                }
            });
        });
    }
    
    // Helper function to sort and reappend products
    function sortAndReappend(products, sortType, container) {
        // Sort products based on sort type
        switch (sortType) {
            case 'price-low':
                products.sort((a, b) => a.data.price - b.data.price);
                break;
            case 'price-high':
                products.sort((a, b) => b.data.price - a.data.price);
                break;
            case 'rating':
                products.sort((a, b) => b.data.rating - a.data.rating);
                break;
            case 'newest':
                products.sort((a, b) => (b.data.isNew ? 1 : 0) - (a.data.isNew ? 1 : 0));
                break;
            default:
                // Default sorting (relevance) - maintain original order
                return;
        }
        
        // Clear container and reappend sorted items
        container.empty();
        products.forEach(product => {
            container.append(product.element);
        });
    }
    
    // Add to cart functionality
    $(document).on('click', '.add-to-cart', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const productId = $(this).data('product-id');
        const productName = $(this).closest('.product-card').find('.product-title').text();
        
        // Add product to cart (in a real app, this would update a cart object)
        showToast('Cart', `${productName} added to your cart!`);
        
        // Update cart count for demo
        let cartCount = parseInt($('.cart-count').text()) || 0;
        $('.cart-count').text(cartCount + 1);
        
        // Add animation to button
        $(this).addClass('pulse-animation');
        setTimeout(() => {
            $(this).removeClass('pulse-animation');
        }, 1000);
    });
    
    // Function to check if product is in wishlist
    function isInWishlist(productId) {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        return wishlist.includes(productId);
    }
    
    // Function to initialize wishlist buttons
    function initWishlistButtons() {
        $('.product-wishlist').off('click').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productId = $(this).data('product-id');
            const productName = $(this).closest('.product-card').find('.product-title').text();
            const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
            
            if (wishlist.includes(productId)) {
                // Remove from wishlist
                const newWishlist = wishlist.filter(id => id !== productId);
                localStorage.setItem('wishlist', JSON.stringify(newWishlist));
                $(this).removeClass('active');
                $(this).find('i').removeClass('fas').addClass('far');
                showToast('Wishlist', `${productName} removed from your wishlist!`);
            } else {
                // Add to wishlist
                wishlist.push(productId);
                localStorage.setItem('wishlist', JSON.stringify(wishlist));
                $(this).addClass('active');
                $(this).find('i').removeClass('far').addClass('fas');
                showToast('Wishlist', `${productName} added to your wishlist!`);
            }
            
            // Update wishlist count
            $('.wishlist-count').text(wishlist.length);
        });
    }
});
