/*!
 * MEDZ RegisterWebsite JS
 * @Copyright Copyright 2014, medz.cn
 * @Descript: 前台-用户注册
 * @Author	: lovevipdsw@vip.qq.com, Medz Seven
 * $Id$
 */

;(function() {
	Wind.css(GV.JS_EXTRES + '/MedzRegisterWebsite/css/medz.css?website=http://www.medz.cn');
	var $DomId = '#J_register_form div.reg_form';
	var $html = '<dl>\
					<dt><label>网站域名：</label></dt>\
					<dd>\
						<span class="must_red">*</span>\
						<input id="medz-reg-url"  name="websiteurl" type="text" class="input length_4">\
					</dd>\
					<dd class="dd_r" id="medz-reg-url-tip"></dd>\
				</dl>\
				<dl id="medz-reg-url-v" style="display: none;">\
					<span style="display: none;" id="medz-reg-config" data-v="false" data-type="file"></span>\
					<div class="medz-reg-main">\
						<div class="medz-reg-warp">\
						</div>\
						<p>3.完成请点击<a class="btn" id="medz-reg-btn-a">开始认证</a>按钮进行认证。如果您无法验证，请<a class="btn" id="medz-reg-btn-s">点击这里</a>更换验证方式。</p>\
					</div>\
				</dl>';
	$($DomId).prepend($html);
	
	$("#medz-reg-url").blur(function() {
		exec();
	});
	
	$("#medz-reg-btn-a").click(function(e) {
		e.preventDefault();
		var $conf = {
			action: 'v',
			url: $("#medz-reg-url").val(),
			type: $("#medz-reg-config").attr("data-type")
		};
		$.post($medz.api, $conf, function($data) {
			var $tip = $("#medz-reg-url-tip");
			if($data == 1) {
				$tip.html("<span class=\"tips_icon_success\">校验成功！</span>");
				$("#medz-reg-config").attr("data-v", "true");
				$("#medz-reg-url-v").css("display", "none");
			} else {
				$tip.html("<span class=\"tips_icon_error\">校验失败！</span>");
				$("#medz-reg-config").attr("data-v", "false");
			}
		});
	});
	
	$("#medz-reg-btn-s").click(function() {
		var $type = $("#medz-reg-config").attr("data-type");
		if($type == 'file') {
			$("#medz-reg-config").attr("data-type", "meta");
			getHtml(2);
		} else {
			$("#medz-reg-config").attr("data-type", "file");
			getHtml(1);
		}
	});
	
	$("#medz-reg-url").focus(function() {
		var $tip = $("#medz-reg-url-tip");
		$tip.html("<span class=\"reg_tips\">请输入网站域名，例如“www.medz.cn”</span>");
		$("#medz-reg-config").attr("data-v", "false");
		$("#medz-reg-config").attr("data-type", "file");
		$("#medz-reg-url-v").css("display","none");
	});
	
	$("#J_register_form button.btn_submit").click(function(e) {
		var $v = $("#medz-reg-config").attr("data-v");
		if($v == true || $v == 'true') {
			return true;
		}
		alert('对不起，请先验证网站！');
		e.preventDefault();
		return false;
	});
	
	function exec() {
		var $tip = $("#medz-reg-url-tip");
		var $input = $("#medz-reg-url").val();
		var $conf = {
			action: 'checkurl',
			url: $input
		};
		$.post($medz.api, $conf, function($data) {
			if($data == 1) {
				$tip.html("<span class=\"tips_icon_success\">“" + $input + "”可以注册，请验证权限</span>");
				$("#medz-reg-url-v").css("display","block");
				getHtml(1);
			} else {
				$tip.html($data);
			}
		});
	}
	
	function getHtml($type) {
		var $conf = {
			action: 'gethtml',
			url: $("#medz-reg-url").val(),
			type: $type
		}
		
		$.post($medz.api, $conf, function($data) {
			$(".medz-reg-main div.medz-reg-warp").html($data);
		});
	}
	
})();