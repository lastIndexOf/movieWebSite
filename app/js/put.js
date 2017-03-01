$(function() {
	$('.remove-item').click(function() {
		var _id = $(this).data('id');
		var tr = $('.item-id-' + _id);
		$.ajax({
			type: 'DELETE',
			url: '/admin/remove?id=' + _id
		})
		.done(function(results) {
			if (results.status == 1) {
				if (tr.length)
					tr.remove();
			} 
		});
	});
});