function loading_list(url,data)
{
	if($('#content-product .loading-page').length == 0)
	{
			$("input.onChangeAjax, #filter_price input").prop('disabled', true);
			$('#price-range').attr('disabled', 'disabled');
			$('.filter_price').addClass('disabled');
			$("input.onChangeAjax").parent().addClass('disabled');
			loading = '<div class="loading-page"><div class="msg">Loading...</div></div>';
			$pl_loading = $(loading);
			$('#content-product').append($pl_loading);
			prd_loading_pos();
			$(window).scroll(function () {
				prd_loading_pos();
			});
			$(window).resize(function () {
				prd_loading_pos();
			});
			$.ajax({
				url: url,
				data:data,
				dataType: "text",
				success: function(data){
					var scrollTop = $(document).scrollTop();
					var p_offset = $('#right').offset().top;
					var json_pl = $.parseJSON(data);
					if(scrollTop > p_offset) $.scrollTo('#right', 800);
					$("input.onChangeAjax").prop('disabled', false);
					$("input.onChangeAjax").parent().removeClass('disabled');
					$pl_loading.remove();
					$.each( json_pl.snippets, function( i, item ) {
						$('#'+i).html(item);
					});
					filter_h();
					$('#price-range').removeAttr('disabled');
					$('.filter_price').removeClass('disabled');
				}
			});
	}
}
function filter_h()
{
	if($('#l-filter').length)
	{
	var brands_offset = $('#snippet-brands .box-content').position().top;
	var weights_offset = $('#snippet-weights .box-content').position().top;
	var brands_h = $('#snippet-brands ul').outerHeight();
	var weights_h = $('#snippet-weights ul').outerHeight();
	var filter_h = $(window).height()-20;
	if(brands_offset+brands_h+brands_h+weights_h > filter_h)
	{
		if(brands_offset+brands_h+150 > filter_h && brands_h+weights_h > 150)
		{
			$('#snippet-brands .box-content').height(filter_h-150-brands_offset-weights_offset);
			$('#snippet-weights .box-content').height(150)
		}
		else if(brands_offset+brands_h+150 < filter_h && brands_h+weights_h > 150)
		{
			$('#snippet-brands .box-content').height('auto');
			$('#snippet-weights .box-content').height(filter_h-brands_h-brands_offset-weights_offset)
		}
		else
		{
			$('#snippet-weights .box-content').height('auto');
			$('#snippet-brands .box-content').height(filter_h-widgets_h-widgets_offset-brands_offset);
		}
	}
	else 
	{
		$('#snippet-brands .box-content').height('auto');
		$('#snippet-weights .box-content').height('auto');
	}
	$('#l-filter .box-content').perfectScrollbar({
				suppressScrollX: true,
				wheelPropagation: true
	});
	}
}
function filter_pos()
{
	if($('#l-filter').length)
	{
	var min_height = 400;
	var weight_h = 150;
	
	offset_filter = $('#l-filter-loc').offset().top;
	
	a = $('#l-filter');
	footer = $('#footer').height();
	page_w = $('#header .wrap').width();
	var view = $(window).height();
	var bodyHeight = $('body').height();
	var page = $(document).height();
	var top = $(document).scrollTop();
	var larger = top < offset_filter ? top : offset_filter;
	var shorter;
	a.css({'max-height':view})
	//$('#cart').html(pos_top_mnft);
	if (top > page - view - footer) {
		shorter = footer - (page - top - view);
	} else {
		shorter = 0;
	}
	var height = view - offset_filter + larger - shorter;
	if (bodyHeight < view) {
				height -= view - bodyHeight;
	}
	
	if (offset_filter < top) {
		a.css({'margin-top':top-offset_filter})
		if(top+view > page-footer)
		{
			a.css({'margin-top':top-offset_filter-(top+view-page+footer)-1})
		}
	}
	else a.css({'margin-top':0})
	
	}
}
function prd_loading_pos()
{
	var page_offset = $('#content-product').offset().top;
	var footer = $('#footer').outerHeight();
	var w_h = $(window).height();
	var page = $(document).height();
	var ct_h = $('#content-product').outerHeight();
	var l_h = $('#content-product .loading-page .msg').outerHeight();
	var top = $(document).scrollTop();
	if( top < page_offset) w_visible = page_offset-top+(w_h-page_offset+top-l_h)*0.5;
	else if (top+w_h > page-footer) w_visible = (page-top-footer-l_h)*0.5;
	
	else w_visible = (w_h-l_h)*0.5;
	//else if (w_h > page_offset-footer) w_visible = (top+w_h-footer)*0.5;
	$('#content-product .loading-page .msg').css({'top':w_visible,'left':$('#content-product').offset().left,'width':$('#content-product').outerWidth()});
}
jQuery(function($){
	
	$(document).on('slide', '#price-range',function(event)
	{
		$("#filter_price_min").text($("#price-range").val()[0]+' Kč');
		$("#filter_price_max").text($("#price-range").val()[1]+' Kč');
	});
	$(document).on('change', '#price-range',function(event)
	{
		loading_list($("#price-range").attr('data-onchange-href'),{from:$("#price-range").val()[0], to:$("#price-range").val()[1]})
	});
	
	$('#sidebar .header button').click(function(){
	var a = $("#sidebar .categories");
	if(a.hasClass('hide-all') === true)
	{
		$(this).text('Show less');
							a.removeClass('hide-all');
							
							$('#sidebar ul.categories > li').removeClass('hide');
						}
						else {
							$(this).text('Show all');
							a.addClass('hide-all');
							
							$('#sidebar ul.categories > li').addClass('hide');
						}
					})
					$('#sidebar ul.categories > li button').each(function(index, element) {
						var a = $(this);
						a.click(function(){
								var b = a.parent();
								if(b.hasClass('hide') === true)
								{
									b.removeClass('hide');
									
								}
								else
								{
									b.addClass('hide');
									
								}
						})
					});
	$(document).on('click', 'a.nav-page',function(event)
	{
		event.preventDefault();
		a = $( event.target );
		if(a.hasClass('btn-loading') === false)
		{
			a.addClass('btn-loading');
			a.text('Loading...')
			$.ajax({
				url: a.attr('href'),
				success:function(data)
				{
					a.parent().remove();
					$("#content-product").append(data);
				}
			});
			
		}
	});
	jQuery.expr[':'].contains = function(a, i, m) {
  return jQuery(a).text().toUpperCase()
      .indexOf(m[3].toUpperCase()) >= 0;
};
	$(document).on('keyup', '#l-filter .m-search input',function(event)
	{
		
		a = $( event.target );
		b = a.parent().parent().find('span.label');
		kw = remove_special_char(a.val());
		if(kw !="")
		{
			
			//alert(kw);
			b.parent().parent().removeClass('hide');
			b.each(function(index, element) {
				
				d = $(this);
				var str = remove_special_char(d.text())
				d.addClass('ok');
				n = str.search(kw);
				if(n==-1)d.parent().parent().addClass('hide');
			});
			
			//n = b.text().search("/"+a.val()+"/i");
			//if(n)c.parent().parent().addClass('hide');
			//b.parent().parent().removeClass('hide');
			//c = b.not(':contains('+a.val()+')');
			//c.parent().parent().addClass('hide');
		}
		else
		{
			b.parent().parent().removeClass('hide');
		}
		filter_h();
	});
	$(document).on('click', 'input.onChangeAjax',function(event)
	{
		a = $( event.target );
		data = "";
		if(a.hasClass('guest') === true)
		{
			//a.parent().addClass('disabled');
			a.prop('checked', false);
			inline_error(a.parent(),'Bạn cần <a href="login.html">Đăng nhập</a>');
		}
		else
		{
			loading_list(a.attr('data-onchange-href'),data);
			
		}
		});
	filter_pos();
	filter_h();
	$(window).scroll(function () {
		filter_pos();
	});
	$(window).resize(function () {
		filter_pos();
		filter_h();
	});
	
});