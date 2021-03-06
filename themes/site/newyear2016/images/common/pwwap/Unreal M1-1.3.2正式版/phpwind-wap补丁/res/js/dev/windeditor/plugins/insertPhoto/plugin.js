/*
 * PHPWind WindEditor Plugin
 * @Copyright 	: Copyright 2011, phpwind.com
 * @Descript	: 上传图片插件
 * @Author		: chaoren1641@gmail.com
 * @Depend		: jquery.js(1.7 or later)
 * $Id: windeditor.js 4472 2012-02-19 10:41:01Z chris.chencq $			:
 */
;(function ( $, window, undefined ) {
	if(!window.ATTACH_CONFIG) {
		$.error('ATTACH_CONFIG没有定义，图片上传需要提供配置对象');
		return;
	}
	var WindEditor = window.WindEditor;
	var imgsArr = ['.jpg', '.gif', '.png', '.jpeg', '.bmp'];
	var helpText = function() {
		var arr = [];
		for(var i in IMAGE_CONFIG.filetype) {
			arr.push(i + ':' + ATTACH_CONFIG.filetype[i] + 'kb');
		}
		return arr.join('&nbsp; ');
	}();

	var pluginName = 'insertPhoto',
		dialog = $('\
		<div class="edit_menu">\
			<div class="edit_menu_photo">\
					<div class="edit_menu_top">\
						<a href="" class="edit_menu_close J_close">关闭</a>\
						<ul>\
							<li class="J_upload_tab" data-show="J_upload"><a href="">本地上传</a></li>\
							<!--<li data-show="J_upload_album"><a href="">相册上传</a></li>-->\
							<li data-show="J_network"><a href="">网络图片</a></li>\
						</ul>\
						<span class="edit_tips" title="可上传格式和大小 '+ helpText +'"></span>\
					</div>\
				<!--==========上传==========-->\
				<div id="J_upload" class="J_tab_content J_upload_tab" style="display:none;">\
					<div class="edit_menu_cont">\
						<div class="edit_uping">\
							<span class="num">附件上传数量限制<em id="J_num">'+ ATTACH_CONFIG.attachnum +'</em>个</span>\
							<input class="btn btn_submit" id="J_buttonPlaceHolder2" type="button" value="批量上传" />\
						</div>\
						<div class="eidt_uphoto">\
							<ul class="cc" id="J_photo_list">\
							</ul>\
						</div>\
					</div>\
					<div class="edit_menu_bot">\
						<button type="button" class="edit_menu_btn J_close">确定</button><!--点击编辑可编辑图片效果-->\
					</div>\
				</div>\
				<!--=========相册选择===========-->\
				<!--<div style="display:none;" class="J_tab_content" id="J_upload_album">\
					<div class="edit_menu_cont">\
						<div class="edit_uping">\
							<select><option>默认相册</option></select>\
						</div>\
						<div class="eidt_uphoto">\
							<ul class="cc">\
								<li>\
									<div class="get">\
										<img src="" width="78" height="98" />\
									</div>\
								</li>\
							</ul>\
						</div>\
					</div>\
					<div class="edit_menu_bot">\
						点击图片可插入到帖子\
					</div>\
				</div>-->\
				<!--=========网络图片===========-->\
				<div class="edit_menu_cont J_tab_content" style="display:none;" id="J_network">\
					<div class="edit_online_photo">\
						<em>图片地址：</em><input name="" type="text" id="J_input_net_photo" class="input" value="" placeholder="http://">\
					</div>\
					<div class="tac mb20"><button type="button" class="edit_menu_btn" id="J_insert_net_photo">插入图片</button></div>\
				</div>\
				<!--=========结束===========-->\
				</div>\
			</div>');

	//检查是否有设置可上传的图片类型
	var isAllowImg = false;
	for(var i in IMAGE_CONFIG.filetype) {
		isAllowImg = true;
		break;
	}
	//如果附件功能没打开，或者没有设置可上传图片类型，则去掉上传的tab
	if(window.ATTACH_CONFIG.ifopen != '1' || !isAllowImg) {
		dialog.find('.J_upload_tab').remove();
		//默认让第一个显示
		dialog.find('div.edit_menu_top li').eq(0).addClass('current');
		dialog.find('div.J_tab_content').eq(0).show();
	}

	WindEditor.plugin(pluginName,function() {
		var _self = this, uploader;
		var editorDoc = _self.editorDoc = _self.iframe[0].contentWindow.document,
			plugin_icon = $('<div class="wind_icon" data-control="'+ pluginName +'"><span class="'+ pluginName +'" title="插入图片"></span></div>').appendTo(  _self.pluginsContainer  );

		var file_list = ATTACH_CONFIG.list;
		var photo_list_ul = dialog.find('#J_photo_list');//没有添加进document时只能用find
		plugin_icon.on('click',function() {

			if($(this).hasClass('disabled')) {
				return;
			}
			//如果是编辑帖子，那么显示帖子中已有的附件
			var allowFileCount = ATTACH_CONFIG.attachnum,html = [];
			var has_file,
				has_file_num = 0;
			photo_list_ul.empty();//每次弹出窗口时清空重新填充Dom,因为会受限制上传的限制需要更新
			$.each(file_list,function(i,obj) {
				var att_desc_name = obj.is_new ? 'flashatt['+ i +'][desc]' : 'oldatt_desc['+ i +']';
				//var att_needrvrc_name = obj.is_new ? 'att_needrvrc['+ i +']' : 'oldatt_needrvrc['+ i +']';
				var name = obj.name;
				has_file = true;
				has_file_num ++;
				var file_extension = name.substring(name.lastIndexOf('.'),name.length).toLowerCase();
				//把附件中如果是图片的附件显示在图片里面
				if($.inArray(file_extension,imgsArr) < 0) {
					//附件里的不是图片不用显示并删除一个占位格
					photo_list_ul.find('li.J_empty').eq(0).remove();
					return;
				}
				var serverData = {aid:i,path:obj.path,thumbpath:obj.thumbpath,is_new:obj.is_new};
				//请注意这个uploaded的class添加，是因为每天上传的附件限制，只有在新上传的时候才会更新当前数量，编辑附件的时候不计算
				var upladedLi = $('<li class="'+ (obj.is_new ? 'uploaded' : '') +'"><div class="get">\
												<a href="" class="del">删除</a>\
												<!--a href="" class="edit">编辑</a-->\
												<img alt="已上传的" data-id="'+ serverData.aid +'" src="'+ (serverData.thumbpath || serverData.path) +'" width="78" height="98" data-path="'+ serverData.path +'"/>\
												<input style="width:68px" placeholder="请输入描述" type="text" name='+ att_desc_name +' value="'+ obj.desc +'" class="J_file_desc"/>\
											</div></li>').data('serverData',serverData);
				dialog.find('#J_photo_list').prepend(upladedLi);
			});

			//如果是编辑帖且有附件，那么显示有附件指示标
			if(has_file) {
				plugin_icon.after('<div class="wind_attachn"><span></span></div>');
			}
			//更新显示上传数量
			update_num();

			if(!$.contains(_self.container[0],dialog[0]) ) {
				dialog.appendTo( _self.container );
				//如果没有附件功能或者没有设置图片类型，则停止执行后面图片上传的逻辑代码
				if(window.ATTACH_CONFIG.ifopen != '1' || !isAllowImg) {
					_self.showDialog(dialog);
					return;
				}

				//加载上传组件
				var plupload_root = window.GV.JS_ROOT + "util_libs/plupload/";
                Wind.js(plupload_root + 'plupload.full.min.js?v=' + GV.JS_VERSION, plupload_root + 'zh_CN.js?v=' + GV.JS_VERSION, function() {
                	//实例化一个plupload上传对象
                	uploader = new plupload.Uploader({
                		runtimes: 'html5,flash,html4',
                		browse_button: 'J_buttonPlaceHolder2',
                		//触发文件选择对话框的按钮，为那个元素id
                		url: ATTACH_CONFIG.uploadUrl + '&_json=1',
                		//服务器端的上传页面地址
                		flash_swf_url: plupload_root + 'Moxie.swf',
                		//swf文件，当需要使用swf方式进行上传时需要配置该参数
                		filters: {
                			mime_types: [ //只允许上传图片文件和
                			{
                				title: "可上传的图片类型",
                				extensions: (function() {
                					var arr = [];
                					for (var i in IMAGE_CONFIG.filetype) {
                						if (i) {
                							arr.push(i);
                						}
                					}
                					return arr.join(',');
                				})()
                			}]
                		}
                	});
                	//在实例对象上调用init()方法进行初始化
                	uploader.init();
                	//绑定各种事件，并在事件监听函数中做你想做的事
                	uploader.bind('Error', uploadError);
                	uploader.bind('FilesAdded', fileQueued);
                	uploader.bind('UploadProgress', uploadProgress);
                	uploader.bind('FileUploaded', uploadSuccess);
				});
			}
			_self.showDialog(dialog);

		});

		//弹窗的关闭事件
		dialog.find('.edit_menu_close').on('click',function(e) {
			e.preventDefault();
			_self.hideDialog();
		});

		//顶部的tab选项卡
		dialog.find('.edit_menu_top li').on('click',function(e) {
			e.preventDefault();
			$(this).addClass('current').siblings().removeClass('current');
			dialog.find('.J_tab_content').hide();
			dialog.find('#'+$(this).data('show')).show();
		});
		//默认让第一个显示(不能默认显示第一个，因为根据权限不同要显示的也不同，所以默认显示第一个)
		dialog.find('div.edit_menu_top li').eq(0).addClass('current');
		dialog.find('div.J_tab_content').eq(0).show();


		//插入网络图片
		dialog.find('#J_insert_net_photo').on('click',function(e) {
			e.preventDefault();
			var url = $('#J_input_net_photo').val();
			if( url.indexOf('http')!== 0 ) {
				alert('路径格式不正确，请重新输入');
				return;
			}
			_self.getImgSize(url,function(width,height) {
				if(width > 500) {
					width = 500;
				}
				_self.insertHTML('<img style="width:'+ width +'px" src="'+ url +'" />');
			});
		});

		//上传好的图片点击插入
		dialog.find('#J_upload').on('click', 'img', function(e) {
			e.preventDefault();
			var img = this;
			var src = $(img).attr('data-path');
			_self.getImgSize(src,function(width,height) {
				if(width > 500) {
					width = 500;
				}
				_self.insertHTML('<img class="J_file_img" data-id="'+ $(img).data('id') +'" style="width:'+ width +'px" src="'+ src +'" />');
			});
		});

		//删除已经上传好的图片
		dialog.find('div.eidt_uphoto').on('click','a.del',function(e) {
			e.preventDefault();
			if(!window.confirm('你确定要删除该吗？')){
               return;
            }            
			var li = $(this).parent().parent();
			var serverData = li.data('serverData');
			var aid = serverData.aid;
			
			if(serverData.is_new) {
				//第一次发帖上传的附件直接删除DOM
				delete file_list[serverData.aid];
				li.remove();
				update_num();
				delFileEl(aid)
				return;
			}

			$.post(ATTACH_CONFIG.deleteUrl,{aid:aid},function(data) {
				if(data.state === 'success') {
					delete file_list[serverData.aid];
					li.remove();
					update_num();
					delFileEl(aid)
				}else {
					alert(data.message);
				}
			}, 'json');
		});

		function delFileEl(aid){
			//要删除的元素
			var del_el = $(editorDoc.body).find('.J_file_img[data-id='+ aid +']');
			if(del_el.length) {
				del_el.remove();
			}
		}

		//提交按钮关闭弹窗口
		dialog.find('.edit_menu_btn').on('click',function() {
			dialog.find('li div.get').each(function() {
				var data = $(this).parent().data('serverData');
				var id = data.aid;
				var desc = $(this).find('input.J_file_desc').val();
				file_list[id].desc = desc;
			});
			_self.hideDialog();
		});

		/* **********************
		   批量上传过程中的事件处理
		   ********************** */

        function fileQueued(uploader, files) {
        	for (var i = 0, len = files.length; i < len; i++) {
        		var file = files[i];
        		var file_list_box = $('#J_photo_list');
        		//填充图片显示位置
        		var empty_box = $('#J_photo_list > li.J_empty:eq(0)'),
        			name = file.name,
        			file_extension = name.substring(name.lastIndexOf('.') + 1, name.length).toLowerCase();
        		var invalid = false,
        			tip = '';
        		var allowSize = parseInt(ATTACH_CONFIG.filetype[file_extension]) * 1024;
        		var allowFileCount = parseInt(ATTACH_CONFIG.attachnum);
        		if (empty_box.length) {
        			//判断文件大小是否超过上传限制
        			if (allowSize && file.size > allowSize) {
        				tip = '大小超限制(' + allowSize / 1024 + 'kb)';
        				invalid = true;
        			} else if (file_list_box.find('li.uploaded,li.readying').size() - file_list_box.find('li.invalid').size() > allowFileCount) {
        				tip = '上传数量超出限制';
        				invalid = true;
        			} else {
        				invalid = false;
        				empty_box.replaceWith('<li id="' + file.id + '" class="readying"><div class="schedule"><em>0%</em><span style="width:0%;"></span></div></li>');
        			}
        			//如果是无效的则取消上传
        			if (invalid) {
        				uploader.removeFile(file);
        				alert('错误提示："'+file.name+'"'+tip);
        				empty_box.before('<li class="invalid"><div class="error" title="' + tip + '">' + tip + '<a href="javascript:;" class="del">删除</a></div></li>');
        			}
        		} else {
        			uploader.removeFile(file);
        			tip = '上传数量超出限制';
        			alert('错误提示："'+file.name+'"'+tip);
        			invalid = true;
        		}
        	}
        	//开始上传
        	if (files.length > 0) {
        		//准备POST参数
        		var postData = ATTACH_CONFIG.postData;
        		var cks = new Array();
        		cks['csrf_token'] = postData.csrf_token;
        		var cookieAry = document.cookie.split("; "); //得到Cookie数组
        		for (var i = 0; i < cookieAry.length; i++) {
        			var temp = cookieAry[i].split("=");
        			cks[temp[0]] = temp[1];
        		}
        		var jsonStr = '{"fid":' + postData.fid;
        		for (var k in cks) {
        			jsonStr += ', "' + k + '":"' + cks[k] + '"';
        		}
        		jsonStr += '}';
        		//设置参数开始上传
        		uploader.setOption('multipart_params', eval('(' + jsonStr + ')'));
        		uploader.start();
        	}
        }

		function uploadProgress(uploader,file) {
			var file_detail = $('#'+file.id);
			file_detail.removeClass('readying').addClass('uploading');
			try {
				var percent = file.percent;
				file_detail.find('em').text(percent + '%');//显示进度
				file_detail.find('span').css('width',percent + '%');//使用宽度来显示进度条
			} catch (ex) {
				$.error(ex);
			}
		}

		function uploadSuccess(uploader,file,responseObject) {
			try {
				var file_detail = $('#'+file.id);
				var json = $.parseJSON(responseObject.response);
				if(json.state !== 'success') {
					var message = json.message[0];
					file_detail.html('<div class="error" title="'+ message +'">'+ message +'<a href="" class="del">删除</a></div>').addClass('invalid');
					return;
				}
				var data = json.data;
				data.is_new = true;//is_new表示为新上传的，而不是编辑的
				file_list[''+ data['aid']] = {name : file.name, size : file.size, path : data.path, desc : '',is_new : true, thumbpath:data.thumbpath };//图片则有缩略图
				file_detail.data('serverData',data).removeClass('uploading').addClass('uploaded');
				file_detail.html('<div class="get">\
											<a href="javascript:;" class="del">删除</a>\
											<img title="'+ file.name +'" alt="上传完成" data-path="'+ data.path +'" data-id="'+ data.aid +'" src="'+ data.thumbpath +'" width="78" height="98"/>\
											<input style="width:68px" placeholder="请输入描述" type="text" name="flashatt['+ data.aid +'][desc]" class="J_file_desc"/>\
										</div>');
				//上传成功后，点击可改描述
				//更新显示可上传数量
				update_num();
			} catch (ex) {
				$.error(ex);
			}
		}

		//上传错误
		function uploadError(uploader,errObject) {
			alert('错误提示："'+errObject.file.name+'"'+errObject.message);
		}

		//更新显示可上传数量，并更新图片的上传占位区
		function update_num () {
			var new_file_count = 0;
			//因为附件和图片是共用的附件机制，所以要把附件中新上传的减掉
			$.each(file_list,function(i,obj) {
				new_file_count ++ ;
			});
			var allow_count = ATTACH_CONFIG.attachnum - new_file_count;
			if(allow_count < 0) {//以防算错，界面上出现可上传数量为负数
				allow_count = 0;
			}
			//需要填充图片待上传占位的数量
			photo_list_ul.find('li.J_empty').remove();
			var need_fill_length = allow_count - photo_list_ul.find('li.readying,li.uploading').length;
			//填充占位
			for(var i = 0;i < need_fill_length; i++) {
				photo_list_ul.append('<li class="J_empty"><div class="no">暂无</div></li>');
			}
			return allow_count;
		}
	});
})( jQuery, window);