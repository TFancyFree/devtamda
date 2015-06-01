var searched;
var check = 0;
var ntf_time;
(function(){function o(e){this._n=e}function u(e,t,n){var r=Math.pow(10,t),i;i=(Math.round(e*r)/r).toFixed(t);if(n){var s=new RegExp("0{1,"+n+"}$");i=i.replace(s,"")}return i}function a(e,t){var n;t.indexOf("$")>-1?n=l(e,t):t.indexOf("%")>-1?n=c(e,t):t.indexOf(":")>-1?n=h(e,t):n=d(e,t);return n}function f(e,t){if(t.indexOf(":")>-1)e._n=p(t);else if(t===i)e._n=0;else{var s=t;n[r].delimiters.decimal!=="."&&(t=t.replace(/\./g,"").replace(n[r].delimiters.decimal,"."));var o=new RegExp(n[r].abbreviations.thousand+"(?:\\)|(\\"+n[r].currency.symbol+")?(?:\\))?)?$"),u=new RegExp(n[r].abbreviations.million+"(?:\\)|(\\"+n[r].currency.symbol+")?(?:\\))?)?$"),a=new RegExp(n[r].abbreviations.billion+"(?:\\)|(\\"+n[r].currency.symbol+")?(?:\\))?)?$"),f=new RegExp(n[r].abbreviations.trillion+"(?:\\)|(\\"+n[r].currency.symbol+")?(?:\\))?)?$"),l=["KB","MB","GB","TB","PB","EB","ZB","YB"],c=!1;for(var h=0;h<=l.length;h++){c=t.indexOf(l[h])>-1?Math.pow(1024,h+1):!1;if(c)break}e._n=(c?c:1)*(s.match(o)?Math.pow(10,3):1)*(s.match(u)?Math.pow(10,6):1)*(s.match(a)?Math.pow(10,9):1)*(s.match(f)?Math.pow(10,12):1)*(t.indexOf("%")>-1?.01:1)*Number((t.indexOf("(")>-1?"-":"")+t.replace(/[^0-9\.'-]+/g,""));e._n=c?Math.ceil(e._n):e._n}return e._n}function l(e,t){var i=t.indexOf("$")<=1?!0:!1,s="";if(t.indexOf(" $")>-1){s=" ";t=t.replace(" $","")}else if(t.indexOf("$ ")>-1){s=" ";t=t.replace("$ ","")}else t=t.replace("$","");var o=a(e,t);if(i)if(o.indexOf("(")>-1||o.indexOf("-")>-1){o=o.split("");o.splice(1,0,n[r].currency.symbol+s);o=o.join("")}else o=n[r].currency.symbol+s+o;else if(o.indexOf(")")>-1){o=o.split("");o.splice(-1,0,s+n[r].currency.symbol);o=o.join("")}else o=o+s+n[r].currency.symbol;return o}function c(e,t){var n="";if(t.indexOf(" %")>-1){n=" ";t=t.replace(" %","")}else t=t.replace("%","");e._n=e._n*100;var r=a(e,t);if(r.indexOf(")")>-1){r=r.split("");r.splice(-1,0,n+"%");r=r.join("")}else r=r+n+"%";return r}function h(e,t){var n=Math.floor(e._n/60/60),r=Math.floor((e._n-n*60*60)/60),i=Math.round(e._n-n*60*60-r*60);return n+":"+(r<10?"0"+r:r)+":"+(i<10?"0"+i:i)}function p(e){var t=e.split(":"),n=0;if(t.length===3){n+=Number(t[0])*60*60;n+=Number(t[1])*60;n+=Number(t[2])}else if(t.lenght===2){n+=Number(t[0])*60;n+=Number(t[1])}return Number(n)}function d(e,t){var s=!1,o=!1,a="",f="",l="",c=Math.abs(e._n);if(e._n===0&&i!==null)return i;if(t.indexOf("(")>-1){s=!0;t=t.slice(1,-1)}if(t.indexOf("a")>-1){if(t.indexOf(" a")>-1){a=" ";t=t.replace(" a","")}else t=t.replace("a","");if(c>=Math.pow(10,12)){a+=n[r].abbreviations.tillion;e._n=e._n/Math.pow(10,12)}else if(c<Math.pow(10,12)&&c>=Math.pow(10,9)){a+=n[r].abbreviations.billion;e._n=e._n/Math.pow(10,9)}else if(c<Math.pow(10,9)&&c>=Math.pow(10,6)){a+=n[r].abbreviations.million;e._n=e._n/Math.pow(10,6)}else if(c<Math.pow(10,6)&&c>=Math.pow(10,3)){a+=n[r].abbreviations.thousand;e._n=e._n/Math.pow(10,3)}}if(t.indexOf("b")>-1){if(t.indexOf(" b")>-1){f=" ";t=t.replace(" b","")}else t=t.replace("b","");var h=["B","KB","MB","GB","TB","PB","EB","ZB","YB"],p,d;for(var v=0;v<=h.length;v++){p=Math.pow(1024,v);d=Math.pow(1024,v+1);if(e._n>=p&&e._n<d){f+=h[v];p>0&&(e._n=e._n/p);break}}}if(t.indexOf("o")>-1){if(t.indexOf(" o")>-1){l=" ";t=t.replace(" o","")}else t=t.replace("o","");l+=n[r].ordinal(e._n)}if(t.indexOf("[.]")>-1){o=!0;t=t.replace("[.]",".")}var m=e._n.toString().split(".")[0],g=t.split(".")[1],y=t.indexOf(","),b="",w=!1;if(g){if(g.indexOf("[")>-1){g=g.replace("]","");g=g.split("[");b=u(e._n,g[0].length+g[1].length,g[1].length)}else b=u(e._n,g.length);m=b.split(".")[0];b.split(".")[1].length?b=n[r].delimiters.decimal+b.split(".")[1]:b="";o&&Number(b)===0&&(b="")}else m=u(e._n,null);if(m.indexOf("-")>-1){m=m.slice(1);w=!0}y>-1&&(m=m.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1"+n[r].delimiters.thousands));t.indexOf(".")===0&&(m="");return(s&&w?"(":"")+(!s&&w?"-":"")+m+b+(l?l:"")+(a?a:"")+(f?f:"")+(s&&w?")":"")}function v(e,t){n[e]=t}var e,t="1.4.5",n={},r="en",i=null,s=typeof module!="undefined"&&module.exports;e=function(t){e.isNumeral(t)?t=t.value():Number(t)||(t=0);return new o(Number(t))};e.version=t;e.isNumeral=function(e){return e instanceof o};e.language=function(t,i){if(!t)return r;t&&!i&&(r=t);(i||!n[t])&&v(t,i);return e};e.language("en",{delimiters:{thousands:",",decimal:"."},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(e){var t=e%10;return~~(e%100/10)===1?"th":t===1?"st":t===2?"nd":t===3?"rd":"th"},currency:{symbol:"$"}});e.zeroFormat=function(e){typeof e=="string"?i=e:i=null};e.fn=o.prototype={clone:function(){return e(this)},format:function(t){return a(this,t?t:e.defaultFormat)},unformat:function(t){return f(this,t?t:e.defaultFormat)},value:function(){return this._n},valueOf:function(){return this._n},set:function(e){this._n=Number(e);return this},add:function(e){this._n=this._n+Number(e);return this},subtract:function(e){this._n=this._n-Number(e);return this},multiply:function(e){this._n=this._n*Number(e);return this},divide:function(e){this._n=this._n/Number(e);return this},difference:function(e){var t=this._n-Number(e);t<0&&(t=-t);return t}};s&&(module.exports=e);typeof ender=="undefined"&&(this.numeral=e);typeof define=="function"&&define.amd&&define([],function(){return e})}).call(this);
function tab(a,b)
{c=jQuery("#tab_"+a+"_"+b);d=jQuery("#tab_ct_"+a+"_"+b);jQuery("#"+a+" .tabs li, #"+a+" .tab_ct").removeClass("c");c.addClass('c');d.addClass('c');}
function remove_special_char(str){
str= str.trim();
str= str.toLowerCase();
str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
str= str.replace(/č/g,"c");
str= str.replace(/ď|đ/g,"d");
str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ|ě/g,"e");
str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
str= str.replace(/ň/g,"n");
str= str.replace(/ř/g,"r");
str= str.replace(/š/g,"s");
str= str.replace(/ť/g,"t");
str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ|ů/g,"u");
str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
str= str.replace(/ž/g,"z");
//str= str.replace(/!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\'| |\"|\&|\#|\[|\]|~/g,"-");
//str= str.replace(/-+-/g,"-");
//str= str.replace(/^\-+|\-+$/g,"");
return str;

}
function loading_pos(id)
{
	var page_offset = $(id).offset().top;
	var footer = $('#footer').outerHeight();
	var w_h = $(window).height();
	var page = $(document).height();
	var ct_h = $(id).outerHeight();
	var l_h = $(id+' .loading-page .msg').outerHeight();
	var top = $(document).scrollTop();
	if( top < page_offset) w_visible = page_offset-top+(w_h-page_offset+top-l_h)*0.5;
	else if (top+w_h > page-footer) w_visible = (page-top-footer-l_h)*0.5;
	
	else w_visible = (w_h-l_h)*0.5;
	//else if (w_h > page_offset-footer) w_visible = (top+w_h-footer)*0.5;
	$(id+' .loading-page .msg').css({'top':w_visible,'left':$(id).offset().left,'width':$(id).outerWidth()});
}
function toggle_show(obj)
{
	if($(obj).hasClass('h') === false)
	{
		$(obj).addClass('h')
	}
	else $(obj).removeClass('h')
}
function executeFunctionByName(functionName, context , args) {
  var args = Array.prototype.slice.call(arguments).splice(2);
  var namespaces = functionName.split(".");
  var func = namespaces.pop();
  for(var i = 0; i < namespaces.length; i++) {
    context = context[namespaces[i]];
  }
  return context[func].apply(this, args);
}

function show_invoice(id)
{
	var a = $('#invoice_'+id);
	if(a.hasClass('show') === true)
	{
		a.removeClass('show');
		$('#list_invoice_'+id).removeClass('show');
	}
	else
	{
		a.addClass('show');
		$('#list_invoice_'+id).addClass('show');
	}
}
function update_cart_listen(obj)
{
	
	oldval = parseFloat(obj.attr('data-incart'));
	s_price =  parseFloat(obj.attr('data-price'));
	c_total = parseFloat($('#cart').attr('data-total'));
	c_delivery =  parseFloat($('#cart').attr('data-delivery'));
	c_f_delivery =  parseFloat($('#cart').attr('data-free-delivery'));
	cal_delivery(c_total,c_delivery,c_f_delivery);
	$('#cart form.change input[type=text]').not(obj).each(function(index, element) {
		$(this).parent().parent().removeClass('change');
		$(this).val($(this).attr('data-incart'));
		$(this).parentsUntil('.info','.desc').find('div.price_tt span.n').text($(this).attr('data-incart')*$(this).attr('data-incart'));
	});		
		
			newval = obj.val();
			if(newval !=oldval && check_quantity(obj,1) === true)
			{	obj.parent().parent().addClass('change');
				obj.parentsUntil('.add2cart','.updatecart-form').addClass('change');
				obj.parentsUntil('.info','.desc').find('div.price_tt .n').text(newval*s_price);
				
				cal_delivery(c_total-oldval*s_price+newval*s_price,c_delivery,c_f_delivery);
				
				
			}
			else 
			{	obj.parent().parent().removeClass('change');
				
				obj.parentsUntil('.info','.desc').find('.price_tt span.n').text(oldval*s_price);
				cal_delivery(c_total,c_delivery,c_f_delivery);
			}
		$(document).mousedown(function(){
				obj.parent().parent().removeClass('change');
				obj.val(oldval);
				obj.parentsUntil('.info','.desc').find('.price_tt span.n').text(oldval*s_price);
				cal_delivery();			
			})
		obj.parentsUntil('.add2cart').mousedown(function(event){
			
    		event.stopPropagation();
			
		});
		obj.parentsUntil('.add2cart').find('button').addClass('1')
		$(document).mousedown(function(event){event.stopPropagation();
		});
		
}

function check_quantity(obj,check)
{
	
	if(!check) check = 0;
	
	var step = parseFloat(obj.attr('data-step-amount'));
  	if(!step) step = 1;
  	var min = parseFloat(obj.attr('data-min-amount'));
  	if(!min) min = 1;
  	var max = parseFloat(obj.attr('data-max-amount'));
  	if(!max) max = 0;
  	var oldValue = obj.val();
  	var check_valid = oldValue/step;
	if(oldValue > max && max !=0)
	{
		inline_error(obj, 'Bạn chỉ được chọn số lượng tối đa là '+ max);  
		if(check == 0 ) obj.val(max);
		return false;
	}
	else if(oldValue < min)
	{
		inline_error(obj, 'Bạn chỉ được chọn số lượng tối thiểu là '+ min);  
		if(check == 0 ) obj.val(min);
		return false;
	}
	else if(isInt(check_valid)===false)
  	{
	  inline_error(obj, 'Bạn chỉ được chọn số lượng là '+ parseInt(check_valid)*step +' hoặc '+(parseInt(check_valid)+1)*step); 
	  if(check == 0 ) obj.val(parseInt(check_valid)*step);
	  return false;
  	}
	else
	{
		rm_inline_error(obj);
		return true;
	}
}
function isInt(n) {
   return n % 1 === 0;
}
function update_product(data)
{
	if(data.id)
	{
		obj = '#body .product_'+data.id;
		obj2 = 'ul.product_'+data.id;
		obj3 = '#product.product_'+data.id;
		if(data.error)
		{
			$(obj).addClass('soldout');
			$(obj2+' dl.price dd').html('&nbsp;');
			$(obj2+' .add2cart').html('<p>Hết hàng</p>');
			$(obj3+' .cart').html('<p>Hết hàng</p>')
		}
		else
		{
			$.each($(obj), function()
			{
				if($(this).find('.basket').length) {$(this).find('.basket').text(data.incart);}
				else $(this).find('.inner').append('<div class="basket">'+data.incart+'</div>')
			})
			
			if(data.min)
			{
				$(obj+' .qty input').val(data.min);
				$(obj+' .qty input').attr('data-min-amount', data.min)
			}
			if(data.max) $(obj+' .qty input').attr('data-max-amount', data.max);
			if(data.step) $(obj+' .qty input').attr('data-step-amount', data.step);
		}
	}
}
function update_cart(data)
{
	if( $('#cart ul.products').length )
	{
		 p_list = $('#cart ul.products');
	}
	else 
	{
		l_html = "<ul class='products list'></ul>";
		$l = $(l_html)
		$('#cart .items').append($l);
		p_list = $l;
	}
	if(data.cartCount)
	{	
		$('#cart .header').html('<h6>Cart<span class="cart_count">'+data.cartCount+'</span></h6><p><b class="cart_price">$<span class="n">'+data.total+'</span></b><a href="checkout.html" class="button">Order</a>');
		$('body').addClass('prdincart');
		$('#cart').attr('data-total',data.total);
		free_delivery = $('#cart').attr('data-free-delivery');
		delivery = $('#cart').attr('data-delivery');
		cal_delivery(data.total,delivery,free_delivery);
	}
	
	if(data.delete)
	{
		$('#cart ul.products li.product_'+data.delete).remove();
		$('.product_'+data.delete).removeClass('incart');
	}
	else
	{
		if($('#cart ul.products li').hasClass('product_'+data.id) === true)
		{
			
		}
		else
		{
			p_list.append(data.html)
		}
		update_product(data);
	}
}
function cal_delivery(total,delivery,free_delivery)
{
	tip = parseFloat($('#input-tip').val());
	var delivery_check = 0;
	
	if(!total) total = total = parseFloat($('#cart').attr('data-total'));
	if(!delivery) delivery =  $('#cart').attr('data-delivery');
	if(!free_delivery) free_delivery =  parseFloat($('#cart').attr('data-free-delivery'));
	if($.isNumeric(delivery) === false || delivery == '--') n_delivery = 0;
	else n_delivery = delivery;
	if ($('#no_delivery').prop('checked') === true) delivery_check = n_delivery;
	if(parseFloat(total) >= parseFloat(free_delivery)) 
	{	$('#cart .cart_delivery, #cart-address .price_d').text('Free');
		$('#cart div.deliveryUpsell').html('Đơn hàng của bạn sẽ được miễn phí vận chuyển');
		$('#cart div.deliveryUpsell').addClass('free');
		$('#cart .cart_price .n, #cart-address .price_p').text(parseFloat(total)+' Kč');
		$('#cart .cart_price_t .n, #cart-address .price_t').text(parseFloat(total)+parseFloat(tip)+' Kč');
	}
	else {
		get_free = parseFloat(free_delivery)-parseFloat(total);
		$('#cart div.deliveryUpsell').html('Khách hàng cần đặt thêm <span class="n curr">'+ get_free +' Kč</span> nữa để được miễn phí vận chuyển');
		$('#cart div.deliveryUpsell').removeClass('free');
		$('#cart .cart_delivery, #cart-address .price_d').text(delivery+' Kč');
		$('#cart .cart_price .n, #cart-address .price_p').text(parseFloat(total)+' Kč');
		$('#cart .cart_price_t .n, #cart-address .price_t').text(parseFloat(total)+parseFloat(n_delivery)-delivery_check+parseFloat(tip)+' Kč');
	}
}
function close_confirm_box()
{
	$('#confirm-box').remove();
	$('body').removeClass('confirm');
}
function confirm_box(func,attr,msg,ok,cancel)
{
	if(!msg) msg = 'Bạn có muốn thực hiện tác vụ này không?';
	if(!ok) ok = 'Có';
	if(!cancel) cancel = 'Không';
	$('#confirm-box').remove();
	check = 0;
	$('body').addClass('confirm');
	c_ct = '<div id="confirm-box" class="page-ovl"><div class="va"></div><div class="container box"><div class="msg">'+msg+'</div><p><button class="primary">'+ok+'</button> <button class="cancel">'+cancel+'</button></p></div></div>';
	$c_ct = $(c_ct);
	$('body').append($c_ct);
	c = $c_ct.find('button');
	c.click(function(){
		close_confirm_box();
		b = $(this);
		if(b.hasClass('primary') === true)
		{
			check = 1;
			executeFunctionByName(func, window, attr);
			return true;
		}
		else
		{	
			check = 0;
			return false;
		}
		
	});
	$('#confirm-box').perfectScrollbar();
}
function inline_error(obj,msg)
{
	rm_inline_error();
	offset = obj.offset();
	$('#inline-error').html(msg);
	$('#inline-error').addClass('show');
	$('#inline-error').css({'top':offset.top-$('#inline-error').outerHeight()-5,'left':offset.left-($('#inline-error').outerWidth()/2)+obj.outerWidth()*0.5});
	obj.addClass('error');
	obj.addClass('inline-error');
}
function rm_inline_error(obj)
{
	if(!obj) $('.inline-error').removeClass('error');
	else obj.removeClass('error');
	$('#inline-error').removeClass('show');
}

function do_search(value,page)
{
	if(value!=searched) 
	{
	$.ajax({url:"demo/ajax_search.html",data:{kw:value,p:page}, cache:false,success: function(data)
	{
		
		$('#search-result').html(data+'<button class="close" onclick="close_search()"></button>');
		show_search();
		searched=value;
	}
	})
	}
	else show_search();
}
function close_search()
{
	$('#search').removeClass('a');
	$('body').removeClass('q_search');
}
function show_search()
{
	$('#search').addClass('a');
	$('body').addClass('q_search');
	if($('#search-ovl').length ==0)$('body').append('<div id="search-ovl"></div>');
	$('#search-ovl').click(function(){close_search()})
}
function pos_cart()
{
	var offset = $('#breadcrumb').offset().top;
	a = $('#header #cart');
	if(a.length)
	{
	footer = $('#footer').height();
	page_w = $('#header .wrap').width();
	items = $('#cart div.items').height();
	head = $('#cart div.header').height();
	foot = $('#cart div.footer').height();
	var view = $(window).height();
	var bodyHeight = $('body').height();
	var page = $(document).height();
	var top = $(document).scrollTop();
	var larger = top < offset ? top : offset;
	var shorter;
	if (top > page - view - footer) {
		shorter = footer - (page - top - view);
	} else {
		shorter = 0;
	}
	var height = view - offset - head - foot + larger - shorter;
	if (bodyHeight < view) {
		height -= view - bodyHeight;
	}
	$('#cart div.items').height(height + "px");
	if (offset < top) {
		a.addClass('fixed');
		
		a.css('margin-left',$('#cart_pos').offset().left-$(document).scrollLeft());
	} else {
		a.removeClass('fixed');
		a.css('margin-right',0);
	}
	$('#cart div.items').perfectScrollbar({
		suppressScrollX: true,
		wheelPropagation: true
	});
	}
}
function close_ntf()
{
	clearTimeout(ntf_time);
	$('#notification').removeClass('show');
	$('#notification').css('margin-bottom',1);
	$('body').removeClass('show-ntf');
	$('body').animate({marginTop:0},500);
}
function show_ntf(data)
{
	clearTimeout(ntf_time);
	$('#notification-msg').html(data);
	msg_h = $('#notification-msg').outerHeight();
	$('body').addClass('show-ntf');
	$('#notification').css('margin-bottom',-msg_h);
	$('body').animate({marginTop:msg_h},500);
	ntf_time = setTimeout(function(){close_ntf()},5000)
}
jQuery(function($){
	
	//$('select.ui').selectmenu();
	$(document).on( "click", "a.ajax", function(event)
	{
		event.preventDefault();
		var fav = $( event.target );
		
		$.ajax({
			url:fav.attr('href'),
			cache:false,
			success:function(data)
			{
				if(data == 0) // chưa login
				{
					
				}
				else
				{
					$('#temp').html(data);
				}
			}
		});
	});
	
	
	$('#user-area').mouseenter(function(){$(this).addClass('hover')}).mouseleave(function(){$(this).removeClass('hover')});
	pos_cart();
	
	$(window).scroll(function () {
		pos_cart();
	});
	$(window).resize(function () {
		pos_cart();
	});
	$("img.lazy").lazyload({
    effect : "fadeIn",
	threshold : 200
	});
	
	$('#search-value').focus(function()
	{
		s_vl = $(this).val();
		if(s_vl == searched) show_search();
		else
		{$('#search-value').keyup(function(){
			s_vl2 = $(this).val();
			if(s_vl2 !="") do_search($('#search-value').val());	
			else close_search();
			
		});
		}
	});
	
});