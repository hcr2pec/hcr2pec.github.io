$(function() {

	$('div.season-button').click(function() {
		$('div.episode-button').hide();
		$('div.episode-button[data-season=' + $(this).attr('data-season') + ']').show();
		$('div.episode-button.selected[data-season=' + $(this).attr('data-season') + ']').trigger('click');
	});

	$('div.episode-button').click(function() {
		if (!$(this).hasClass('selected')) {
			var s = $(this).attr('data-season');
			if (parseInt(s, 10) < 10) s = "0" + s;
			var e = $(this).attr('data-episode');
			if (parseInt(e, 10) < 10) e = "0" + e;
			var url = "../../s" + s + "/e" + e;
			var params = [ "", "" ];
			if ($('div.type-button[data-type="teams"]').hasClass('selected')) {
				params[0] = "teams";
			}
			else if ($('div.type-button[data-type="nations"]').hasClass('selected')) {
				params[0] = "nations";
			}
			if (!$('div.e-button').hasClass('selected') || !$('div.s-button').hasClass('selected')) {
				if ($('div.e-button').hasClass('selected')) {
					params[1] = "e";
				}
				else if ($('div.s-button').hasClass('selected')) {
					params[1] = "s";
				}
			}
			if (params[0] || params[1]) {
				url += "?" + params[0] + (params[1] != "" ? "." + params[1] : "");
			}
			document.location.href = url;
		}
	});

	var _params = window.location.search.substr(1);
	if (_params) {
		var params = _params.split('.');
	}

	$('div.e-button, div.s-button').click(function() {
		if ($(this).hasClass('selected')) {
			$(this).removeClass('selected');
		}
		else {
			$(this).addClass('selected');
		}
		$('div.type-button.selected').trigger('click');
	});

	if (typeof params != "undefined" && (params[1] == "e" || params[1] == "s")) {
		$('div.' + params[1] + '-button').trigger('click');
	}
	else {
		$('div.e-button, div.s-button').trigger('click');
	}

	$('div.type-button').click(function() {
		$('div.type-button').removeClass('selected');
		$(this).addClass('selected');
		$('div.tables').hide();
		if ($('div.e-button').hasClass('selected')) {
			$('div.tables.' + $(this).attr('data-type') + '.e').show();
		}
		if ($('div.s-button').hasClass('selected')) {
			$('div.tables.' + $(this).attr('data-type') + '.s').show();
		}
	});

	if (typeof params != "undefined" && (params[0] == "individual" || params[0] == "teams" || params[0] == "nations")) {
		$('div.type-button[data-type="' + params[0] + '"]').trigger('click');
	}
	else {
		$('div.type-button[data-type="individual"]').trigger('click');
	}

	$('div.season-button.selected').trigger('click');

});
