function cart_clear()
{
	window.location.href= 'success.html';
}
function test()
{
	
	
	
}
jQuery(function($){
	
	$(document).on( "click", "ul.products a.remove", function(event)
	{
		event.preventDefault();
		var fav = $( event.target );
		
		var loading = '<div class="loading msg"><div class="av"></div><div class="ct"><p>Loading...</p><p></p></div></div>';
		f_p = fav;
		$jq_loading = $(loading);  
		f_p.after($jq_loading);
		$.ajax({
			url:fav.attr('href'),
			dataType: "text",
			cache:false,
			success:function(data)
			{
				var json = $.parseJSON(data);
				update_cart(json);
				$jq_loading.remove();
				show_ntf('Bạn vừa mới xóa một sản phẩm khỏi giỏ hàng');
			}
		});
	});
	$(document).on( "click", "ul.products a.fav.ajax", function(event)
	//$('a.fav').click(function(e)
	{
		event.preventDefault();
		var fav = $( event.target );
		
		var loading = '<div class="loading msg"><div class="av"></div><div class="ct"><p>Loading...</p><p></p></div></div>';
		f_p = fav;
		$jq_loading = $(loading);  
		f_p.after($jq_loading);
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
				$jq_loading.remove();
			}
		});
	});
	$(document).on( "keyup", ".qty input", function(event)
	//$('.qty input').keyup(function()
	{
		obj1 = $(event.target);
		check_quantity(obj1,1)
		$('body').click(function(event){check_quantity(obj1)});
		obj1.click(function(event){event.stopPropagation();})
		obj1.parent().parent().find('button.button-cart').click(function(event){event.stopPropagation();});
	});
	$(document).on( "keyup", "form.updatecart-form .qty input", function(event)
	//$('form.updatecart-form .qty input').focus(function()
	{
		obj2 = $(event.target);
		update_cart_listen(obj2);
	});
	$(document).on( "click", "form.updatecart-form .qty button", function(event)
	//$('form.updatecart-form .qty button').click(function()
	{
		obj3 = $(event.target).parent().find('input');
		oldval = obj3.val();
		
	});
	$(document).on( "submit", "form.add2cart-form", function(event)
	//$('form.add2cart-form').on('submit',function(e)
	{
		//event.stopPropagation();
		var domElement = $( event.target );
		event.preventDefault();
		
		f= domElement;
		qty = f.find('.qty input');
		var check = check_quantity(qty);
		if(check ===true)
		{
		form_c = f.serializeArray();
		f_p = f.parent().parent();
		var loading = '<div class="loading msg"><div class="av"></div><div class="ct"><p>Loading...</p><p></p></div></div>';
		$jq_loading = $(loading);  
		f_p.after($jq_loading);
		c = $.ajax({
			// ví dụ add thành công:
			// demo/ajax_add2cart.json
			url:f.attr('action'),
			type:'POST',
			// ví dụ lỗi quá số lượng:
			//url:"demo/ajax_add2cart_error_1.json",
			
			// ví dụ lỗi đã hết hàng
			//url:"demo/ajax_add2cart_error_2.json",
			
			
			data:form_c, // id, quantity
			//async: false,
     		
 			dataType: "text",
			cache :false,
			success: function(data) {
				var json = $.parseJSON(data);
				if(json.error)
				{
					if(json.error==1) // quá số lượng tối đa
					{
						inline_error(qty,json.msg);
						$jq_loading.remove();
					}
					else // hết hàng
					{
						$jq_loading.remove();
						var msg_s = '<div class="error msg"><div class="av"></div><div class="ct">Hết hàng</div></div>';
						$jq_s = $(msg_s);
						f_p.after($jq_s);
						update_product(json);
						setTimeout(function(){$jq_s.remove()}, 2000);
						
					}
				}
				
				else // check thành công
				{
					update_cart(json);
					update_product(json);
					$('.product_'+json.id).addClass('incart');
					//alert(response.id);
					$jq_loading.remove();
					if(f.hasClass('updatecart-form')===false)
					{
					var msg_s = '<div class="success msg"><div class="av"></div><div class="ct"><div class="icon"></div><p>Đã thêm vào giỏ hàng</p></div></div>';
					}
					else
					{
						var msg_s = '<div class="success msg"><div class="av"></div><div class="ct"><div class="icon"></div><p>Số lượng đã được thay đổi</p></div></div>';
					}
					$jq_s = $(msg_s);
					f_p.after($jq_s);
					setTimeout(function(){$jq_s.remove()}, 2000);
				}
			},
			error: function(xhr, status, error) {
				var error_msg = '<div class="error msg"><div class="av"></div><div class="ct"><p>Lỗi kết nối</p><p><button>Thử lại</button></p></div></div>';
				$jq_elem = $(error_msg);
				f_p.after($jq_elem);
				$jq_elem.find('button').click($jq_elem.remove());
        }
		
	});
		$jq_loading.click(function(){c.abort(); $jq_loading.remove()})
		}
	});
	//$(".qty input").change(function(){check_quantity($(this))})
	$(document).on( "click", ".qty button", function(event)
	//$(".qty button").on("click", function()
	{
		
 var button = $(event.target);
  var obj = button.parent().find("input");
  var orgVal = obj.attr('data-incart');
  rm_inline_error(obj);
  check_quantity(obj);
  obj.trigger('keyup');
  var step = parseFloat(obj.attr('data-step-amount'));
  if(!step) step = 1;
  var min = parseFloat(obj.attr('data-min-amount'));
  if(!min) min = 1;
  var max = parseFloat(obj.attr('data-max-amount'));
  if(!max) max = 0;
  var oldValue = obj.val();
  var check_valid = oldValue/step;
  
	if(oldValue > max && max !=0) oldValue = max;
	
	if (button.text() == "+") {
	  var newVal = parseFloat(oldValue) + parseFloat(step);
	}
	else {
   // Don't allow decrementing below zero
    	if (oldValue > min) {
      	var newVal = parseFloat(oldValue) - parseFloat(step);
    	} else {
			
      		newVal = min;
			//inline_warning(obj, 'Số lượng không được vượt quá '+max); newVal = max
    	}
		
  	}
	if(newVal > max && max !=0) {
		//inline_warning(obj, 'Số lượng không được vượt quá '+max);
		newVal = max}
	obj.val(newVal);
	if(orgVal)
	{
		//obj.trigger('focus');
		update_cart_listen(obj)
		//update_cart_listen(obj);
		/*
  		if(orgVal != newVal) {
			button.parentsUntil('.add2cart','.updatecart-form').addClass('change');
			button.parentsUntil('.info','.desc').find('span.n').text(newVal*obj.attr('data-price'));
			
		}
 		else button.parentsUntil('.add2cart','.updatecart-form').removeClass('change');
		*/
		
	}

});
});