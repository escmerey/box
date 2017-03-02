$(document).ready(function(){
	//s_main slider
	if($('*').is('.s_main__slider')){
		var sl_main = $('.s_main__slider').lightSlider({
			item: 1,
			speed: 1500,
			controls: false,
			pager: false,
		})
		$('.s_main__menu_item').click(function(e){
			e.preventDefault();
			var el = $(this),
				n = el.index();
			el.siblings('._current').find('progress').animate({
				value: 0
			},400);
			el.addClass('_current')
				.siblings().removeClass('_current');
			el.find('progress').animate({
				value: 100
			},1000);
			setTimeout(function(){
				sl_main.goToSlide(n);
			},1000);
		});
	}
	
	
	$('.header__top_call').click(function(){
		$('form').each(function() {
            $(this)[0].reset();
        });
		$('.header__pop').addClass('active');
		setTimeout(function() {
            $('.header__pop').find('.input').eq(0).focus();
        }, 700);
	});
	$('.header__pop_close').click(function(){
		$('.header__pop').removeClass('active');
	});
	$('.header__bot_btn').click(function(){
		$('.header__bot nav, .header__bot_btnmenu').removeClass('_active');
		$('.header__bot_btn, .header__menu').toggleClass('_active');
	});
	$('.header__bot_btnmenu').click(function(){
		$('.header__bot_btn, .header__menu').removeClass('_active');
		$('.header__bot nav, .header__bot_btnmenu').toggleClass('_active');
	});
	if (window.matchMedia('(max-width: 900.5px)').matches) {
		$('.s_catalog__left_btn').nextAll().toggle();
	}
	//popups
	$('._open_pop').click(function(e){
		e.preventDefault();
		$('form').each(function() {
            $(this)[0].reset();
        });
		var name = $(this).data('name');
		setTimeout(function() {
            $('.popup').find('input').eq(0).focus();
        }, 1000);
		if ($(this).closest('.header')) {
			$('.header__nav_cont').removeClass('active');
		}
		$('.overlay, .popup._'+name).addClass('visible');
		var px = window.pageYOffset;
		$('.popup').css('top',px+'px');
	});
	//close popups
	$('.overlay, .close_pop').click(function(){
		$('.popup, .overlay').removeClass('visible');
		var px = window.pageYOffset;
		$('.popup').css('top','0');
	});
	
	//mask
	$('input[name="phone"]').mask('+7 (999) 999-99-99');
	
	//validate
	$("form").each(function () {
		var it = $(this);
		it.validate({
			rules: {
				name: {required: true},
				phone: {required: true},
				mail: {required: true}
			},
			messages: {},
			errorPlacement: function (error, element) {},
			submitHandler: function (form) {
				$.ajax({
					type: "POST",
					url: "../mail.php",
					data: it.serialize()
				}).done(function () {
					$('.popup').removeClass('visible');
					$('.popup._thnx, .overlay').addClass('visible');
					setTimeout(function () {
						if ($('.popup._thnx').hasClass('visible')) {
							$('.popup._thnx, .overlay').removeClass('visible');
						}
					}, 2800);
				});
				return false;
			},
			success: function () {},
			highlight: function (element, errorClass) {
				$(element).addClass('_error');
			},
			unhighlight: function (element, errorClass, validClass) {
				$(element).removeClass('_error');
			}
		});	
	});
	
	//item slider
	if($('*').is('.s_item__slider')){
		$('.s_item__slider').lightSlider({
			gallery: true,
			item: 1,
			controls: false
		});
	}
	
	//aside toogle
	$('.s_catalog__left_btn').click(function(e){
		e.preventDefault();
		$(this).nextAll().toggle();
	});
	
	//gallery
	if($('*').is('.s_portfolio__body')){
		$('.s_portfolio__body').lightGallery({
			selector: 'a'
		});
	}
	
	//sub left
	$('.s_catalog__left_subbtn').click(function(e){
		e.preventDefault();
		$(this).toggleClass('_active').nextAll('.s_catalog__left_sub').first().toggleClass('_active');
	});
	
	
	//file input
	if($('*').is('input[type=file]')){
		var text = $("input[type=file]").attr('data-text');
		$("input[type=file]").nicefileinput({
			label : 'Загрузить файл'
		});
		$(".NFI-filename").val(text);
		$("input[type=file]").on('change',function(){
			$(".NFI-button").addClass('hide-for-pre');
			$(".NFI-filename").addClass('_active');
			$('#close-input').show();
			if($(".NFI-filename").val()==""){
				$(".NFI-filename").val(text).removeClass('_active');
				$(".NFI-button").removeClass('hide-for-pre');
				$('#close-input').hide();
			}
			setTimeout(function(){
				$('#close-input').addClass('big');
			},1000);
		});
		$('.NFI-wrapper').append('<div id="close-input"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M18 1.4L16.6 0 9 7.6 1.4 0 0 1.4 7.6 9 0 16.6 1.4 18 9 10.4 16.6 18 18 16.6 10.4 9 18 1.4Z" fill="rgb(204, 204, 204)"/></svg></div><div class="NFI-wrapper_label"><span>Макс. размер 25 мб</span><small>*doc *txt *pdf *xls</small></div>');
		$('#close-input').click(function(){
			$(this).hide();
			$(".NFI-filename").val(text).removeClass('_active');
			$('.NFI-current').trigger("click");
			$(".NFI-button").removeClass('hide-for-pre');
		});
		$('.NFI-button').wrapInner('<span></span>');
	}
    
	//gmap init
	if($('*').is('.s_contacts__map')){
		mapInitialize('s_contacts__map');
	}
});

//gmap init
function mapInitialize(el_id) {
	var moscow = new google.maps.LatLng(55.759119, 37.624978);
	var mapOptions = {
		zoom: 17,
		center: moscow,
		mapTypeControl: false,
		scrollwheel: false,
		navigationControl: false,
		scaleControl: false
	};
	map = new google.maps.Map(document.getElementById(el_id), mapOptions);
	moscow = new google.maps.Marker({
		map: map,
		position: moscow,
		title: "Мы находимся тут!",
		icon: '../images/ico/marker.svg'
	});
}