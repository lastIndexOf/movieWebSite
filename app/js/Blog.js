$(function() {
	setTimeout(updataTime, 250)
	$('.nav-content').on('click', (e) => {
		if(e.target !== $('img')[0]) 
			$('.nav-content').toggleClass('active')
	})
	$('.nav-heading').on('click', (e) => {
		if(e.target !== $('img')[0]) 
			$('.nav-content').toggleClass('active')
	})
})
let canvas = $('#canvas')[0]
	, context = canvas.getContext('2d')



function updataTime() {
	$('.nav-time').text(moment(new Date()).format('MM/DD HH:mm:ss'))
	setTimeout(updataTime, 250)
}