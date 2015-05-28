jQuery(function($)
{
	
	$(document).on( "focusout", "form input.required", function(event)
	{

		ip = $( event.target );
		if(ip.val()=="")
		{
			//ip.addClass('error');
			ip.closest(':has(p.g)').addClass('error');
			$(this).closest(':has(p.g)').find('p.g').html('Phần này không được để trống');
		}
	});
	
	$(document).on( "submit", "form", function(event)
	{
		
		var f = $( event.target );
		
		form_c = f.serializeArray();
		var error = 0;
		if(f.hasClass('validate') === true)
		{
		$.each(f.find('input.required'),function(){
			if($(this).val() == "") {error = 1;
			$(this).trigger('focusout')
			}
			
		});
		}
		if(error == 1) {event.preventDefault(); show_ntf('Lỗi. Bạn cần điền đầy đủ các mục bắt buộc')}
		else
		{
			if(f.hasClass('ajax') === true)
			{
				event.preventDefault();
				c = $.ajax({
					url: f.attr('action'),
					type:f.attr('method'),
					data:form_c,
					success: function(data)
					{
						$("#temp").append(data);
					}
				});
			}
		}
	});
	$(document).on( "focus", "form input, form textarea, form select", function(event)
	{
		$(this).closest(':has(p.g)').find('p.g').html('&nbsp');
		//ip.addClass('error');
		$(this).closest(':has(p.g)').removeClass('error');
		
	})
	})