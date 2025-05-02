
$(document).ready(function() {
    // Variables for product filtering and pagination
    let allProducts = [];
    let filteredProducts = [];
    let currentPage = 1;
    const productsPerPage = 12;
    let currentFilters = {
        category: [],
        brand: [],
        color: [],
        priceRange: [0, 1000],
        sortBy: 'popular'
    };

    // Load product data
    $.getJSON('assets/data/products.json', function(data) {
        allProducts = data.products;
        filteredProducts = [...allProducts];
        
        // Initialize category filters
        initCategoryFilters(data.categories);
        
        // Initialize brand filters
        initBrandFilters(data.brands);
        
        // Initialize color filters if on the product page
        if ($('.color-filters').length) {
            initColorFilters(data.colors);
        }
        
        // Display products with pagination
        displayProductsWithPagination();
    }).fail(function() {
        console.error('Error loading products data');
    });

    // Function to initialize category filters
    function initCategoryFilters(categories) {
        const filterContainer = $('.category-filters');
        
        if (filterContainer.length) {
            categories.forEach(category => {
                filterContainer.append(`
                    <div class="form-check mb-2">
                        <input class="form-check-input category-filter" type="checkbox" value="${category.id}" id="category-${category.id}">
                        <label class="form-check-label d-flex justify-content-between" for="category-${category.id}">
                            ${category.name} <span class="badge bg-light text-dark">${category.count}</span>
                        </label>
                    </div>
                `);
            });
        }
    }

    // Function to initialize brand filters
    function initBrandFilters(brands) {
        const filterContainer = $('.brand-filters');
        
        if (filterContainer.length) {
            brands.forEach(brand => {
                filterContainer.append(`
                    <div class="form-check mb-2">
                        <input class="form-check-input brand-filter" type="checkbox" value="${brand.id}" id="brand-${brand.id}">
                        <label class="form-check-label d-flex justify-content-between" for="brand-${brand.id}">
                            ${brand.name} <span class="badge bg-light text-dark">${brand.count}</span>
                        </label>
                    </div>
                `);
            });
        }
    }

    // Function to initialize color filters
    function initColorFilters(colors) {
        const filterContainer = $('.color-filters');
        
        if (filterContainer.length) {
            colors.forEach(color => {
                filterContainer.append(`
                    <div class="form-check mb-2">
                        <input class="form-check-input color-filter" type="checkbox" value="${color.id}" id="color-${color.id}">
                        <label class="form-check-label d-flex justify-content-between" for="color-${color.id}">
                            ${color.name} <span class="badge bg-light text-dark">${color.count}</span>
                        </label>
                    </div>
                `);
            });
        }
    }

    // Event listeners for filter changes
    $(document).on('change', '.category-filter', function() {
        updateCategoryFilters();
        applyFilters();
    });

    $(document).on('change', '.brand-filter', function() {
        updateBrandFilters();
        applyFilters();
    });

    $(document).on('change', '.color-filter', function() {
        updateColorFilters();
        applyFilters();
    });

    // Price range filter change
    $(document).on('change', '#price-range', function() {
        const priceRange = $(this).val().split(',');
        currentFilters.priceRange = [parseInt(priceRange[0]), parseInt(priceRange[1])];
        
        // Update price display
        $('#price-min').text('$' + priceRange[0]);
        $('#price-max').text('$' + priceRange[1]);
        
        applyFilters();
    });

    // Sort by change
    $(document).on('change', '#sort-by', function() {
        currentFilters.sortBy = $(this).val();
        applyFilters();
    });

    // Update filter functions
    function updateCategoryFilters() {
        currentFilters.category = [];
        $('.category-filter:checked').each(function() {
            currentFilters.category.push($(this).val());
        });
    }

    function updateBrandFilters() {
        currentFilters.brand = [];
        $('.brand-filter:checked').each(function() {
            currentFilters.brand.push($(this).val());
        });
    }

    function updateColorFilters() {
        currentFilters.color = [];
        $('.color-filter:checked').each(function() {
            currentFilters.color.push($(this).val());
        });
    }

    // Apply all filters and sort
    function applyFilters() {
        // Reset to page 1 when filters change
        currentPage = 1;
        
        // Start with all products
        filteredProducts = [...allProducts];
        
        // Apply category filter
        if (currentFilters.category.length > 0) {
            filteredProducts = filteredProducts.filter(product => 
                currentFilters.category.includes(product.category)
            );
        }
        
        // Apply brand filter
        if (currentFilters.brand.length > 0) {
            filteredProducts = filteredProducts.filter(product => 
                currentFilters.brand.includes(product.brand.toLowerCase().replace(' ', '-'))
            );
        }
        
        // Apply color filter
        if (currentFilters.color.length > 0) {
            filteredProducts = filteredProducts.filter(product => 
                product.color && currentFilters.color.includes(product.color)
            );
        }
        
        // Apply price range filter
        filteredProducts = filteredProducts.filter(product => 
            product.price >= currentFilters.priceRange[0] && 
            product.price <= currentFilters.priceRange[1]
        );
        
        // Apply sorting
        switch(currentFilters.sortBy) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                filteredProducts.sort((a, b) => b.isNew ? 1 : -1);
                break;
            default: // popular or featured
                filteredProducts.sort((a, b) => b.isFeatured ? 1 : -1);
                break;
        }
        
        // Update product count
        $('.product-count').text(filteredProducts.length);
        
        // Display products with pagination
        displayProductsWithPagination();
    }

    // Function to display products with pagination
    function displayProductsWithPagination() {
        const container = $('.product-grid-container');
        if (!container.length) return;
        
        // Calculate pagination
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = Math.min(startIndex + productsPerPage, filteredProducts.length);
        
        // Clear product container
        container.empty();
        
        // Display no products message if none match filters
        if (filteredProducts.length === 0) {
            container.html(`
                <div class="col-12 text-center py-5">
                    <div class="mb-4">
                        <i class="fas fa-search fa-3x text-theme-primary-light"></i>
                    </div>
                    <h3 class="fw-bold text-theme-accent">No products found</h3>
                    <p class="text-theme-accent">Try adjusting your filters to find what you're looking for.</p>
                    <button id="clear-filters" class="btn btn-theme-primary mt-3">Clear Filters</button>
                </div>
            `);
            
            // Hide pagination
            $('.pagination-container').addClass('d-none');
            return;
        }
        
        // Show pagination if needed
        if (totalPages > 1) {
            $('.pagination-container').removeClass('d-none');
            updatePagination(totalPages);
        } else {
            $('.pagination-container').addClass('d-none');
        }
        
        // Display products for current page
        for (let i = startIndex; i < endIndex; i++) {
            const product = filteredProducts[i];
            container.append(createProductCard(product));
        }
        
        // Initialize wishlist buttons
        initWishlistButtons();
    }

    // Update pagination controls
    function updatePagination(totalPages) {
        const paginationContainer = $('.pagination');
        paginationContainer.empty();
        
        // Previous button
        paginationContainer.append(`
            <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                <button class="page-link" data-page="${currentPage - 1}" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </button>
            </li>
        `);
        
        // Page numbers
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);
        
        for (let i = startPage; i <= endPage; i++) {
            paginationContainer.append(`
                <li class="page-item ${i === currentPage ? 'active' : ''}">
                    <button class="page-link" data-page="${i}">${i}</button>
                </li>
            `);
        }
        
        // Next button
        paginationContainer.append(`
            <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
                <button class="page-link" data-page="${currentPage + 1}" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </button>
            </li>
        `);
    }

    // Pagination click handler
    $(document).on('click', '.pagination .page-link', function() {
        if (!$(this).parent().hasClass('disabled')) {
            currentPage = parseInt($(this).data('page'));
            displayProductsWithPagination();
            
            // Scroll to top of products
            $('html, body').animate({
                scrollTop: $('.product-grid-container').offset().top - 100
            }, 200);
        }
    });

    // Clear filters button
    $(document).on('click', '#clear-filters', function() {
        // Uncheck all filter checkboxes
        $('.category-filter, .brand-filter, .color-filter').prop('checked', false);
        
        // Reset price range
        $('#price-range').val('0,1000');
        $('#price-min').text('$0');
        $('#price-max').text('$1000');
        
        // Reset sort
        $('#sort-by').val('popular');
        
        // Reset filter object
        currentFilters = {
            category: [],
            brand: [],
            color: [],
            priceRange: [0, 1000],
            sortBy: 'popular'
        };
        
        // Apply reset filters
        applyFilters();
    });

    // Mobile filter toggle
    $('#filter-toggle').on('click', function() {
        $('.filter-sidebar').toggleClass('show');
    });

    // Close mobile filter when clicking outside
    $(document).on('click', function(event) {
        if (!$(event.target).closest('.filter-sidebar').length && 
            !$(event.target).closest('#filter-toggle').length && 
            $('.filter-sidebar').hasClass('show')) {
            $('.filter-sidebar').removeClass('show');
        }
    });

    // Function to initialize wishlist buttons
    function initWishlistButtons() {
        $('.product-wishlist').off('click').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productId = $(this).data('product-id');
            toggleWishlist(productId, $(this));
        });
    }
});
