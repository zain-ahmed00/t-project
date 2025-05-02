
$(document).ready(function() {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    // Product thumbnails
    $('.product-thumbnail').on('click', function() {
        const src = $(this).find('img').attr('src');
        $('.product-main-image img').attr('src', src);
        $('.product-thumbnail').removeClass('active');
        $(this).addClass('active');
    });

    // Color options
    $('.color-option').on('click', function() {
        $('.color-option').removeClass('active');
        $(this).addClass('active');
    });

    // Size options
    $('.size-option').on('click', function() {
        $('.size-option').removeClass('active');
        $(this).addClass('active');
    });

    // Quantity selector
    $('.quantity-btn').on('click', function() {
        const input = $(this).parent().find('.quantity-input');
        let value = parseInt(input.val());
        
        if ($(this).hasClass('minus')) {
            value = value > 1 ? value - 1 : 1;
        } else {
            value = value + 1;
        }
        
        input.val(value);
    });

    // Newsletter form
    $('#newsletter-form').on('submit', function(e) {
        e.preventDefault();
        const email = $('#newsletter-email').val();
        if (email) {
            // Show success message
            $('#newsletter-success').removeClass('d-none');
            $('#newsletter-form').addClass('d-none');
            // In a real application, you would send this data to a server
            console.log('Newsletter subscription: ' + email);
        }
    });

    // Mobile menu
    $('.navbar-toggler').on('click', function() {
        $('.navbar-collapse').toggleClass('show');
    });

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if( target.length ) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 100
            }, 1000);
        }
    });

    // Add some animations when scrolling
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        
        // Add shadow to navbar on scroll
        if (scroll >= 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
        
        // Animate elements when they come into view
        $('.animate-on-scroll').each(function() {
            var position = $(this).offset().top;
            
            if (position < scroll + $(window).height() - 100) {
                $(this).addClass('animated');
            }
        });
    });
});
