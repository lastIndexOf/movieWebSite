$(function() {
	$('#form-signup').submit(function() {
		let username = $('[name="user[nickname]"]').val()
			, password = $('[name="user[password]"]').val()

		
		if (username.length < 7 || username.length > 16) {
			if ($($('#form-username')[0]).hasClass('has-error')) {
				$('#form-user-help').text('用户名的长度请限制在7-16位')	
				return false
			} else {
				$($('#form-username')[0]).addClass('has-error')
				$($($('#form-username')[0])
					.children()[1])
					.append($(`
						<span class="glyphicon glyphicon-remove form-control-feedback" ></span>
						<span class="help-block" id="form-user-help">用户名的长度请限制在7-16位</span>`))

					return false
			}	
		} else {
			$($($('#form-username')[0])
				.removeClass('has-error')
				.children()[1])
				.children('span')
				.remove()
				
		}

		if (password.length < 7 || password.length > 25) {
			if ($($('#form-password')[0]).hasClass('has-error')) {

				$('#form-user-help').text('密码长度请限制在7-24位')	

				return false
			} else {
				$($('#form-password')[0]).addClass('has-error')
				$($($('#form-password')[0])
					.children()[1])
					.append($(`
						<span class="glyphicon glyphicon-remove form-control-feedback" ></span>
						<span class="help-block" id="form-user-help">密码长度请限制在7-24位</span>`))

					return false
			}	
		} else {
			$($($('#form-password')[0])
				.removeClass('has-error')
				.children()[1])
				.children('span')
				.remove()
		}
	})
})