$(function() {
	$('#movie-comment').submit(function() {
		if ($('.content').val() === '') {
			alert('请输入评论内容!')
			return false
		}
	})

	$('.a-comment').click(function() {
		let cid = $(this).data('cid')
		let tid = $(this).data('tid')

		if ($('[name="comment[tid]"]').length) 
			$('[name="comment[tid]"]').val(tid)
		else
			$('#movie-comment')
				.prepend($(`<input type="hidden" name="comment[tid]" value="${ tid }">`))
		
		if ($('[name="comment[cid]"]').length)
			$('[name="comment[cid]"]').val(cid)
		else
			$('#movie-comment')
			.prepend($(`<input type="hidden" name="comment[cid]" value="${ cid }">`))
		
		$('.content')
			.attr('placeholder', `@${ $(this).text() }`)
	})
})
