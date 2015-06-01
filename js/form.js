(function( $ ){

  // plugin variables
  var months = {
    "short": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    "long": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] },
      todayDate = new Date(),
      todayYear = todayDate.getFullYear(),
      todayMonth = todayDate.getMonth() + 1,
      todayDay = todayDate.getDate();


  $.fn.birthdaypicker = function( options ) {

    var settings = {
      "maxAge"        : 120,
      "minAge"        : 0,
      "futureDates"   : false,
      "maxYear"       : todayYear,

      "placeholder"   : true,
      "defaultDate"   : false,
      "hiddenDate"    : true,
      "onChange"      : null,
      "tabindex"      : null,
	  "fieldName"     : "birthdate",
      "fieldId"       : "birthdate",
    };

    return this.each(function() {

      if (options) { $.extend(settings, options); }

      // Create the html picker skeleton
      var $fieldset = $("<fieldset class='birthday-picker'></fieldset>"),
	  		$year = $("<select class='birth-year' name='birth[year]'></select>"),
          $month = $("<select class='birth-month' name='birth[month]'></select>"),
          $day = $("<select class='birth-day' name='birth[day]'></select>");

      

      var tabindex = settings["tabindex"];

      // Deal with the various Date Formats
      
        //$fieldset.append($month).append($day).append($year);
        if (tabindex != null) {
          $month.attr('tabindex', tabindex);
          $day.attr('tabindex', tabindex++);
          $year.attr('tabindex', tabindex++);
        }
     

      // Add the option placeholders if specified
      if (settings["placeholder"]) {
        $("<option value='0'>Year:</option>").appendTo($year);
        $("<option value='0'>Month:</option>").appendTo($month);
        $("<option value='0'>Day:</option>").appendTo($day);
      }

      var hiddenDate;
	  
	dd	= $(this).find("input[name='birth[date]']").val();
	dm	= $(this).find("input[name='birth[month]']").val();
	dy	= $(this).find("input[name='birth[year]']").val();
	defaultDate = dy + '-'+dm+'-'+dd;
		
        var defDate = new Date(defaultDate + "T00:00:00"),
        defYear = defDate.getFullYear(),
        defMonth = defDate.getMonth() + 1,
        defDay = defDate.getDate();
        if (defMonth<10) defMonth="0"+defMonth;
        if (defDay<10) defDay="0"+defDay;
        hiddenDate = defYear + "-" + defMonth + "-" + defDay;
      

      // Create the hidden date markup
      if (settings["hiddenDate"]) {
        $("<input type='hidden' name='" + settings["fieldName"] + "'/>")
            .attr("id", settings["fieldId"])
            .val(hiddenDate)
            .appendTo($(this));
      }

      // Build the initial option sets
      var startYear = todayYear - settings["minAge"];
      var endYear = todayYear - settings["maxAge"];
      if (settings["futureDates"] && settings["maxYear"] != todayYear) {
        if (settings["maxYear"] > 1000) { startYear = settings["maxYear"]; }
        else { startYear = todayYear + settings["maxYear"]; }
      }
      for (var i=startYear; i>=endYear; i--) { $("<option></option>").attr("value", i).text(i).appendTo($year); }
      for (var j=0; j<12; j++) { $("<option></option>").attr("value", j+1).text(j+1).appendTo($month); }
      for (var k=1; k<32; k++) { $("<option></option>").attr("value", k).text(k).appendTo($day); }
      $(this).wrap($fieldset);
	  $(this).find("input[name='birth[date]']").hide().after($day);
		$(this).find("input[name='birth[month]']").hide().after($month);
		$(this).find("input[name='birth[year]']").hide().after($year);
      // Set the default date if given
        var date = new Date(defaultDate + "T00:00:00");
        $year.val(date.getFullYear());
        $month.val(date.getMonth() + 1);
        $day.val(date.getDate());
      

      // Update the option sets according to options and user selections
     $(this).find('select').change(function() {
            // todays date values
        var todayDate = new Date(),
            todayYear = todayDate.getFullYear(),
            todayMonth = todayDate.getMonth() + 1,
            todayDay = todayDate.getDate(),
            // currently selected values
            selectedYear = parseInt($year.val(), 10),
            selectedMonth = parseInt($month.val(), 10),
            selectedDay = parseInt($day.val(), 10),
            // number of days in currently selected year/month
            actMaxDay = (new Date(selectedYear, selectedMonth, 0)).getDate(),
            // max values currently in the markup
            curMaxMonth = parseInt($month.children(":last").val()),
            curMaxDay = parseInt($day.children(":last").val());

        // Dealing with the number of days in a month
        // http://bugs.jquery.com/ticket/3041
        if (curMaxDay > actMaxDay) {
          while (curMaxDay > actMaxDay) {
            $day.children(":last").remove();
            curMaxDay--;
          }
        } else if (curMaxDay < actMaxDay) {
          while (curMaxDay < actMaxDay) {
            curMaxDay++;
            $day.append("<option value=" + curMaxDay + ">" + curMaxDay + "</option>");
          }
        }

        // Dealing with future months/days in current year
        // or months/days that fall after the minimum age
        if (!settings["futureDates"] && selectedYear == startYear) {
          if (curMaxMonth > todayMonth) {
            while (curMaxMonth > todayMonth) {
              $month.children(":last").remove();
              curMaxMonth--;
            }
            // reset the day selection
            $day.children(":first").attr("selected", "selected");
          }
          if (selectedMonth === todayMonth) {
              while (curMaxDay > todayDay) {
                  $day.children(":last").remove();
                  curMaxDay -= 1;
              }
          }
        }

        // Adding months back that may have been removed
        // http://bugs.jquery.com/ticket/3041
        if (selectedYear != startYear && curMaxMonth != 12) {
          while (curMaxMonth < 12) {
            $month.append("<option value=" + (curMaxMonth+1) + ">" + months[settings["monthFormat"]][curMaxMonth] + "</option>");
            curMaxMonth++;
          }
        }

        // update the hidden date
        if ((selectedYear * selectedMonth * selectedDay) != 0) {
          if (selectedMonth<10) selectedMonth="0"+selectedMonth;
          if (selectedDay<10) selectedDay="0"+selectedDay;
          hiddenDate = selectedYear + "-" + selectedMonth + "-" + selectedDay;
          $(this).find('#'+settings["fieldId"]).val(hiddenDate);
          if (settings["onChange"] != null) {
            settings["onChange"](hiddenDate);
          }
        }
      });
    });
  };
})( jQuery );

function error_input(obj, msg)
{
	obj.closest(':has(p.g)').find('p.g').html(msg);
		//ip.addClass('error');
	obj.closest(':has(p.g)').addClass('error');
}
function error_input_clear(obj)
{
	if(obj)
	{
		obj.each(function()
		{
			$(this).closest(':has(p.g)').find('p.g').html('&nbsp');
			$(this).closest(':has(p.g)').removeClass('error');
			
		})
		
	}
}
jQuery(function($)
{
	$('.birthdaypicker').birthdaypicker();
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