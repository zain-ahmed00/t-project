
$(document).ready(function() {
    // Initialize cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();

    // Add to cart button click
    $(document).on('click', '.add-to-cart', function(e) {
        e.preventDefault();
        
        const productId = $(this).data('product-id');
        
        // Fetch product details from JSON
        $.getJSON('assets/data/products.json', function(data) {
            const product = data.products.find(p => p.id === productId.toString());
            
            if (product) {
                addToCart(product);
            }
        });
    });

    // Function to add product to cart
    function addToCart(product, quantity = 1) {
        // Check if product already in cart
        const existingProductIndex = cart.findIndex(item => item.id === product.id);
        
        if (existingProductIndex > -1) {
            // Update quantity if product already in cart
            cart[existingProductIndex].quantity += quantity;
        } else {
            // Add new item to cart
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.imageUrl,
                quantity: quantity
            });
        }
        
        // Save cart to localStorage
        saveCart();
        
        // Show success message
        showToast('Cart', `${product.name} added to cart!`);
        
        // Update cart count
        updateCartCount();
    }

    // Handle cart item quantity changes (for cart page)
    $(document).on('click', '.cart-quantity-btn', function() {
        const itemIndex = $(this).closest('.cart-item').data('index');
        let newQuantity = parseInt($(this).siblings('.cart-quantity-input').val());
        
        if ($(this).hasClass('minus')) {
            newQuantity = newQuantity > 1 ? newQuantity - 1 : 1;
        } else {
            newQuantity += 1;
        }
        
        $(this).siblings('.cart-quantity-input').val(newQuantity);
        updateCartItemQuantity(itemIndex, newQuantity);
    });

    // Handle cart item quantity input changes (for cart page)
    $(document).on('change', '.cart-quantity-input', function() {
        const itemIndex = $(this).closest('.cart-item').data('index');
        let newQuantity = parseInt($(this).val());
        
        if (isNaN(newQuantity) || newQuantity < 1) {
            newQuantity = 1;
            $(this).val(1);
        }
        
        updateCartItemQuantity(itemIndex, newQuantity);
    });

    // Remove item from cart (for cart page)
    $(document).on('click', '.cart-item-remove', function() {
        const itemIndex = $(this).closest('.cart-item').data('index');
        removeCartItem(itemIndex);
    });

    // Functions to manage the cart
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function updateCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        $('.cart-count').text(totalItems);
    }

    function updateCartItemQuantity(index, quantity) {
        cart[index].quantity = quantity;
        saveCart();
        
        // Update subtotal on cart page if we're on it
        if ($('.cart-items').length) {
            updateCartSubtotal(index);
            updateCartTotal();
        }
    }

    function removeCartItem(index) {
        const productName = cart[index].name;
        cart.splice(index, 1);
        saveCart();
        updateCartCount();
        
        // Reload cart items if on cart page
        if ($('.cart-items').length) {
            loadCartItems();
        }
        
        showToast('Cart', `${productName} removed from cart!`);
    }

    // Cart page specific functions
    function updateCartSubtotal(index) {
        const item = cart[index];
        const subtotal = item.price * item.quantity;
        $(`.cart-item[data-index="${index}"] .cart-item-total`).text(`$${subtotal.toFixed(2)}`);
    }

    function updateCartTotal() {
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const shipping = subtotal > 0 ? 10 : 0;
        const total = subtotal + shipping;
        
        $('.summary-subtotal').text(`$${subtotal.toFixed(2)}`);
        $('.summary-shipping').text(`$${shipping.toFixed(2)}`);
        $('.summary-total-value').text(`$${total.toFixed(2)}`);
    }

    // Load cart items on cart page
    function loadCartItems() {
        const cartContainer = $('.cart-items');
        
        if (cartContainer.length) {
            cartContainer.empty();
            
            if (cart.length === 0) {
                cartContainer.html(`
                    <div class="text-center py-5">
                        <div class="mb-4">
                            <i class="fas fa-shopping-cart fa-3x text-theme-primary-light"></i>
                        </div>
                        <h3 class="fw-bold text-theme-accent">Your cart is empty</h3>
                        <p class="text-theme-accent">Explore our products and add items to your cart.</p>
                        <a href="products.html" class="btn btn-theme-primary mt-3">Start Shopping</a>
                    </div>
                `);
                $('.cart-summary').addClass('d-none');
            } else {
                cart.forEach((item, index) => {
                    const subtotal = item.price * item.quantity;
                    
                    cartContainer.append(`
                        <div class="cart-item card mb-3 p-3" data-index="${index}">
                            <div class="row align-items-center g-3">
                                <div class="col-md-2 col-4">
                                    <img src="${item.image}" alt="${item.name}" class="img-fluid rounded">
                                </div>
                                <div class="col-md-4 col-8">
                                    <h5 class="cart-item-title">${item.name}</h5>
                                    <p class="cart-item-price text-theme-primary fw-bold">$${item.price.toFixed(2)}</p>
                                </div>
                                <div class="col-md-3 col-6">
                                    <div class="input-group cart-quantity-wrapper">
                                        <button class="btn btn-outline-secondary cart-quantity-btn minus">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                        <input type="number" class="form-control text-center cart-quantity-input" value="${item.quantity}" min="1">
                                        <button class="btn btn-outline-secondary cart-quantity-btn plus">
                                            <i class="fas fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="col-md-2 col-4">
                                    <span class="cart-item-total fw-bold">$${subtotal.toFixed(2)}</span>
                                </div>
                                <div class="col-md-1 col-2 text-end">
                                    <button class="btn btn-sm btn-outline-danger cart-item-remove">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `);
                });
                
                $('.cart-summary').removeClass('d-none');
                updateCartTotal();
            }
        }
    }

    // Initialize cart page if we're on it
    if ($('.cart-items').length) {
        loadCartItems();
    }

    // Checkout button (for cart page)
    $(document).on('click', '#checkout-btn', function(e) {
        e.preventDefault();
        
        // In a real application, this would redirect to a checkout page
        alert('Checkout functionality would be implemented here');
        
        // Clear cart after checkout
        cart = [];
        saveCart();
        updateCartCount();
        
        if ($('.cart-items').length) {
            loadCartItems();
        }
        
        showToast('Checkout', 'Thank you for your purchase!');
    });
});
