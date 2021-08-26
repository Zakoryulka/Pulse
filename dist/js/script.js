$(document).ready(function () {


    // Карусель с помощью плагина 50: https://kenwheeler.github.io/slick/
    $('.carousel__inner').slick({
        autoplay: true,
        speed: 1000,
        infinite: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrow-left-icon.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/arrow-right-icon.svg"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab--active)', function () {
        $(this)
            .addClass('catalog__tab--active').siblings().removeClass('catalog__tab--active')
            .closest('div.container').find('ul.catalog__content').removeClass('catalog__content--active').eq($(this).index()).addClass('catalog__content--active');
    });

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content--active');
                $('.catalog-item__details').eq(i).toggleClass('catalog-item__details--active');
            })
        });
    }

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');


    //Modal:

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });

    $(".button--catalog-bye").each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__description').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    // настроили валидацию форм с помощью плагина 57: https://jqueryvalidation.org/

    function validateForms(forms) {
        $(forms).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                },
                phone: "required",
                email: {
                    required: true,
                    email: true,
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите не менее {0} символов")
                },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Пожалуйста, свой e-mail",
                    email: "Неправильно введен e-mail"
                }
              }
        });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    // подключили маску ввода номера телефона с помощью плагина 58: https://plugins.jquery.com/maskedinput/
    $('input[name=phone]').mask("+7 (999) 999-99-99");

     // настройка отправки писем из форм с помощью плагина Php-Mailer-60:  https://github.com/PHPMailer/PHPMailer

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");

            $('form').trigger('reset');
        });
        return false;
    });

    //Поведение стрелки скроллирования
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1200) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href=#up]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    //Подключение плагина WOW.js. Он необходим, чтобы проявлять анимацию, когда объект в пределах видимости пользователя. работает в связке с предыдущим Animate.css:
    new WOW().init();
});