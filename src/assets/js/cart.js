
// Cart functionality
$(document).ready(function() {
    // Initialize cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();

    // Add to cart button click
    $(document).on('click', '.add-to-cart', function(e) {
        e.preventDefault();
        
        // Get product details
        const productContainer = $(this).closest('.product-card, .product-detail');
        const productId = productContainer.data('id') || 1;
        const productName = productContainer.find('.product-title, .product-detail-title').text();
        const productPrice = parseFloat(productContainer.find('.product-price, .product-detail-price').text().replace('$', ''));
        const productImage = productContainer.find('img').first().attr('src');
        
        // Get product options (if on product detail page)
        let color = $('.color-option.active').data('color') || null;
        let size = $('.size-option.active').text() || null;
        let quantity = parseInt($('.quantity-input').val()) || 1;
        
        // If not on product detail page, set defaults
        if (!color && !size) {
            color = "Default";
            size = "One Size";
            quantity = 1;
        }
        
        // Check if product already in cart
        const existingProductIndex = cart.findIndex(item => 
            item.id === productId && 
            item.color === color && 
            item.size === size
        );
        
        if (existingProductIndex > -1) {
            // Update quantity if product already in cart
            cart[existingProductIndex].quantity += quantity;
        } else {
            // Add new item to cart
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                color: color,
                size: size,
                quantity: quantity
            });
        }
        
        // Save cart to localStorage
        saveCart();
        
        // Show success message
        showToast(`${productName} added to cart!`);
        
        // Update cart count
        updateCartCount();
    });

    // Handle cart item quantity changes
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

    // Handle cart item quantity input changes
    $(document).on('change', '.cart-quantity-input', function() {
        const itemIndex = $(this).closest('.cart-item').data('index');
        let newQuantity = parseInt($(this).val());
        
        if (isNaN(newQuantity) || newQuantity < 1) {
            newQuantity = 1;
            $(this).val(1);
        }
        
        updateCartItemQuantity(itemIndex, newQuantity);
    });

    // Remove item from cart
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
        updateCartSubtotal(index);
        updateCartTotal();
    }

    function removeCartItem(index) {
        cart.splice(index, 1);
        saveCart();
        updateCartCount();
        loadCartItems();
    }

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
                cartContainer.html('<div class="text-center py-5"><h3>Your cart is empty</h3><p>Explore our products and add items to your cart.</p><a href="index.html" class="btn btn-primary mt-3">Start Shopping</a></div>');
                $('.cart-summary').addClass('d-none');
            } else {
                cart.forEach((item, index) => {
                    const subtotal = item.price * item.quantity;
                    
                    cartContainer.append(`
                        <div class="cart-item" data-index="${index}">
                            <div class="cart-item-image">
                                <img src="${item.image}" alt="${item.name}">
                            </div>
                            <div class="cart-item-details">
                                <h5 class="cart-item-title">${item.name}</h5>
                                <p class="cart-item-variant">Color: ${item.color}, Size: ${item.size}</p>
                                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                            </div>
                            <div class="cart-item-quantity">
                                <button class="cart-quantity-btn minus">-</button>
                                <input type="number" class="cart-quantity-input" value="${item.quantity}" min="1">
                                <button class="cart-quantity-btn plus">+</button>
                            </div>
                            <div class="cart-item-total">$${subtotal.toFixed(2)}</div>
                            <button class="cart-item-remove"><i class="fas fa-trash"></i></button>
                        </div>
                    `);
                });
                
                $('.cart-summary').removeClass('d-none');
                updateCartTotal();
            }
        }
    }

    // Initialize cart page if we're on it
    loadCartItems();

    // Show toast messages
    function showToast(message) {
        // Create toast if it doesn't exist
        if ($('#cart-toast').length === 0) {
            $('body').append(`
                <div id="cart-toast" class="position-fixed bottom-0 end-0 p-3" style="z-index: 5">
                    <div class="toast align-items-center text-white bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true">
                        <div class="d-flex">
                            <div class="toast-body">
                                ${message}
                            </div>
                            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                    </div>
                </div>
            `);
        } else {
            $('.toast-body').text(message);
        }
        
        // Show the toast
        const toastElement = new bootstrap.Toast(document.getElementById('cart-toast').querySelector('.toast'), {
            autohide: true,
            delay: 3000
        });
        toastElement.show();
    }

    // Checkout button
    $(document).on('click', '#checkout-btn', function(e) {
        e.preventDefault();
        
        // In a real application, this would redirect to a checkout page
        alert('Checkout functionality would be implemented here');
        
        // Clear cart after checkout
        cart = [];
        saveCart();
        updateCartCount();
        loadCartItems();
    });
});
