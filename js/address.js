function c_delete(id)
{
	if($('#address_'+id).hasClass('default') ===true) show_ntf('Bạn không thể xóa địa chỉ mặc định.');
	else confirm_box('delete_address', id,'Bạn có chắc chắn muốn xóa địa chỉ này không?','Có','Không');
}

function delete_address(id)
{	
	$.ajax({
		url:'demo/address_delete.html',
		success: function(data){
			show_ntf('Địa chỉ đã được xóa');
			$('#address_'+id).remove();
			$('#edit_address_'+id).remove();
			$('#address_'+id).next('tr.spacer').remove();
		}
		
	})
}
function c_edit(id)
{
	var c;
	if($('#edit_address_'+id).length)
	{
		 close_c_edit(id);
	}
	else
	{
	$('#edit_address_'+id).remove();
	$('#address_'+id).after('<tr id="edit_address_'+id+'" class="ex"><td colspan="8"><p class="loading">Loading...</p></td></tr>');
	c = $.ajax({
		cache:false,
		url:'demo/address_edit.html',
		success: function(data){
			$('#edit_address_'+id).html(data);
		}
		
	})
	}
}
function close_c_edit(id)
{
	$('#edit_address_'+id).remove();
}
var tamda_address = 'Libušská 319/126, 142 00 Praha 4';
//var tamda_ll = new google.maps.LatLng(50.004333,14.472132);
var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();
var placeSearch, autocomplete;
var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};

function initialize() {
  // Create the autocomplete object, restricting the search
  // to geographical location types.
  autocomplete = new google.maps.places.Autocomplete(
      /** @type {HTMLInputElement} */(document.getElementById('input-address')),
      { types: ['geocode'], componentRestrictions: {country: "cz"} });
  // When the user selects an address from the dropdown,
  // populate the address fields in the form.
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    fillInAddress('',autocomplete);
	var place = autocomplete.getPlace();
	markers = [];
    var bounds = new google.maps.LatLngBounds();
    
      var start = tamda_address;
  var end = place.geometry.location;
  var request = {
      origin:start,
      destination:end,
      travelMode: google.maps.TravelMode.DRIVING,
	  unitSystem: google.maps.UnitSystem.METRIC
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
	  computeTotalDistance(directionsDisplay.getDirections());
    }
  });
  });
  
  
}

// [START region_fillform]
function fillInAddress(id,autocomplete_2) {
	if(!id) id = "";
	else id = "_"+id;
  // Get the place details from the autocomplete object.
  var place = autocomplete_2.getPlace();

  for (var component in componentForm) {
    document.getElementById(component+id).value = '';
    document.getElementById(component+id).disabled = false;
  }

  // Get each component of the address from the place details
  // and fill the corresponding field on the form.
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      document.getElementById(addressType+id).value = val;
    }
  }
}
// [END region_fillform]

// [START region_geolocation]
// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = new google.maps.LatLng(
          position.coords.latitude, position.coords.longitude);
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}
function computeTotalDistance(result) {
  var total = 0;
  var myroute = result.routes[0];
  for (var i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
  }
  total = (total / 1000)*1.2;
  if(total < 10) ship_cost = 50;
  else ship_cost = numeral(total).format('0,0')*5;
  document.getElementById('distance_n').innerHTML = numeral(total).format('0.0') + ' km';
  document.getElementById('ship_cost_n').innerHTML = numeral(ship_cost).format('0') +' Kč';
  
  
			
			c_total = parseFloat($('#cart').attr('data-total'));
			$('#cart').attr('data-delivery',numeral(ship_cost).format('0'));
			$('#new-delivery').val(numeral(ship_cost).format('0'));
			c_f_delivery =  parseFloat($('#cart').attr('data-free-delivery'));
			cal_delivery(c_total,numeral(ship_cost).format('0'),c_f_delivery);
  
}
jQuery(function($)
{
	initialize();
})