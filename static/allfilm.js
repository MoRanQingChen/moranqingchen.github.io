define(function(require, exports, module){
	var weixin = require('./common/weixin');
	var tenvideo = require('./common/tenvideo');
	var lazyLoad = require('./common/lazyload');
	var template = require("./common/template");
	var util = require("./common/util");
	var zhongxin = require('./common/zhongxin');
	var normalizer = require('./common/urlFactory').createNormalizer();

	var $doc = $(document);

	var PAGESIZE 	= 21;
	var PAGENO		= 1;
	var HASMORE		= true;

	var queryParams = {};

	var API_URLS = {
		movie: {
			list: "//list.video.qq.com/fcgi-bin/list_common_cgi?novalue=1&otype=json&platform=5&version=10000&tid=573&uappkey=d2a6457eb8ae927a&uappid=20001172&intfname=hollywood_movie&sourcetype=1&type=1",
			cate: "//list.video.qq.com/fcgi-bin/list_select_cgi?platform=5&version=10000&otype=json&intfname=hollywood_movie"
		},
		tv: {
			list: "//list.video.qq.com/fcgi-bin/list_common_cgi?novalue=1&otype=json&platform=5&version=10000&tid=573&uappkey=d2a6457eb8ae927a&uappid=20001172&intfname=hollywood_tv&sourcetype=1&type=2",
			cate: "//list.video.qq.com/fcgi-bin/list_select_cgi?platform=5&version=10000&otype=json&intfname=hollywood_tv"
		},
		doco: {
			list: "//list.video.qq.com/fcgi-bin/list_common_cgi?novalue=1&otype=json&platform=5&version=10000&tid=573&uappkey=d2a6457eb8ae927a&uappid=20001172&intfname=hollywood_doco&sourcetype=1&type=9",
			cate: "//list.video.qq.com/fcgi-bin/list_select_cgi?platform=5&version=10000&otype=json&intfname=hollywood_doco"
		},
		cartoon: {
			list: "//list.video.qq.com/fcgi-bin/list_common_cgi?otype=json&novalue=1&platform=5&version=20304&intfname=vip_cartoon_h5&tid=573&uappkey=d2a6457eb8ae927a&uappid=20001172&type=3&sourcetype=1",
			cate: "//list.video.qq.com/fcgi-bin/list_select_cgi?platform=5&version=20304&otype=json&intfname=vip_cartoon_h5"
		},
		music: {
			list: "//list.video.qq.com/fcgi-bin/list_common_cgi?otype=json&novalue=1&platform=5&version=20304&intfname=vip_music_h5&tid=573&uappkey=d2a6457eb8ae927a&uappid=20001172&type=22&sourcetype=1",
			cate: "//list.video.qq.com/fcgi-bin/list_select_cgi?platform=5&version=20304&otype=json&intfname=vip_music_h5"
		},
		knowledge: {
			list: "//list.video.qq.com/fcgi-bin/list_common_cgi?otype=json&novalue=1&platform=5&version=10000&intfname=h5_pay_for_knowledge&tid=573&uappkey=d2a6457eb8ae927a&uappid=20001172&type=27&sourcetype=1",
			//cate: "//list.video.qq.com/fcgi-bin/list_select_cgi?platform=5&version=10000&otype=json&intfname=hollywood_education",
			cate: "//list.video.qq.com/fcgi-bin/list_select_cgi?platform=5&version=10000&otype=json&intfname=h5_pay_for_knowledge"
		},
		variety: {
			list: "//list.video.qq.com/fcgi-bin/list_common_cgi?otype=json&novalue=1&platform=7&version=20340&intfname=vip_variety&tid=573&uappkey=d2a6457eb8ae927a&uappid=20001172&type=10&sourcetype=3",
			cate: "//list.video.qq.com/fcgi-bin/list_select_cgi?platform=5&version=10000&otype=json&intfname=hollywood_variety"
		},
		children: {
			list: "//list.video.qq.com/fcgi-bin/list_common_cgi?otype=json&novalue=1&platform=5&version=10000&intfname=m_vip_children&tid=573&uappkey=d2a6457eb8ae927a&uappid=20001172&type=106&sourcetype=1",
			cate: "//list.video.qq.com/fcgi-bin/list_select_cgi?platform=5&version=10000&otype=json&intfname=m_vip_children"
		},
		666: {}
	}

	/*
	for(var i in API_URLS){
		if(i == 666){continue;}
		API_URLS[i].list = API_URLS[i].list.replace('list.video.qq.com', '10.49.120.9');
		API_URLS[i].cate = API_URLS[i].cate.replace('list.video.qq.com', '10.49.120.9');
	}*/

	var buildCateDom = function(ftype){
		if(ftype == '666'){
			var cate = queryParams.cate ? queryParams.cate : 0;
			var catehtml = '<div class="slide_show_out"><div class="slide_show"><ul class="show_list">';
			catehtml += '<li class="item cate-item '+(cate == 0 ? 'current' : '')+'" data-cate-prop="stype" data-cate-value="0"><a href="javascript:void(0);">全部电影</a></li>';
			catehtml += '<li class="item cate-item '+(cate == 1 ? 'current' : '')+'" data-cate-prop="stype" data-cate-value="1"><a href="javascript:void(0);">好莱坞大片</a></li>';
			catehtml += '<li class="item cate-item '+(cate == 2 ? 'current' : '')+'" data-cate-prop="stype" data-cate-value="2"><a href="javascript:void(0);">华语院线</a></li>';
			catehtml += '<li class="item cate-item '+(cate == 3 ? 'current' : '')+'" data-cate-prop="stype" data-cate-value="3"><a href="javascript:void(0);">动作电影</a></li>';
			catehtml += '<li class="item cate-item '+(cate == 4 ? 'current' : '')+'" data-cate-prop="stype" data-cate-value="4"><a href="javascript:void(0);">喜剧电影</a></li>';
			catehtml += '<li class="item cate-item '+(cate == 5 ? 'current' : '')+'" data-cate-prop="stype" data-cate-value="5"><a href="javascript:void(0);">爱情电影</a></li>';
			catehtml += '<li class="item cate-item '+(cate == 6 ? 'current' : '')+'" data-cate-prop="stype" data-cate-value="6"><a href="javascript:void(0);">电视剧</a></li>';
			catehtml += '<li class="item cate-item '+(cate == 7 ? 'current' : '')+'" data-cate-prop="stype" data-cate-value="7"><a href="javascript:void(0);">纪录片</a></li>';
			catehtml += '<li class="item cate-item '+(cate == 8 ? 'current' : '')+'" data-cate-prop="stype" data-cate-value="8"><a href="javascript:void(0);">动漫</a></li>';
			catehtml += '<li class="item cate-item '+(cate == 9 ? 'current' : '')+'" data-cate-prop="stype" data-cate-value="9"><a href="javascript:void(0);">娱乐</a></li>';
			catehtml += '<li class="item cate-item '+(cate == 10 ? 'current' : '')+'" data-cate-prop="stype" data-cate-value="10"><a href="javascript:void(0);">教育</a></li>';
			catehtml += '<li class="item cate-item '+(cate == 11 ? 'current' : '')+'" data-cate-prop="stype" data-cate-value="11"><a href="javascript:void(0);">少儿</a></li>';
			catehtml += '</ul></div></div>';
			$("#film-cate-list").html(catehtml);
			var offset = $('#film-cate-list .cate-item.current').offset();
			$('#film-cate-list .slide_show').scrollLeft(offset.left);
			PAGENO = 1;
			window.scrollTo(0,0);
			buildFilmDom();
			return;
		}

		if(API_URLS[ftype]){
			$.ajax({
				url: API_URLS[ftype].cate,
				dataType: "jsonp",
				success: function(json){
					//console.log(json);
					if(json.ret == 0){

						var catehtml = "";

						/*
						var sorts = [
								[19, "最新"],
								[17, "最热"],
								[12, "好评"]
						]
						var cs = queryParams["sort"] ? queryParams["sort"] : 17;

						catehtml += '<div class="slide_show_out"><div class="slide_show"><ul class="show_list">';
						for(var s = 0; s < sorts.length; s ++){
							var v = sorts[s];
							catehtml += '<li class="item cate-item '+(cs == v[0] ? "current" : "")+'" data-cate-prop="sort" data-cate-value="'+v[0]+'"><a href="javascript:void(0);">'+v[1]+'</a></li>';
						}

						catehtml += '</ul></div></div>';*/

						var sortOptons = [];
						var cs = queryParams["sort"] ? queryParams["sort"] : 0;
						for(var i = 0; i < json.index.length; i ++){
							if(json.index[i].name === 'sort'){
								sortOptons = json.index[i].option;
								if(cs === 0){
									cs = json.index[i].default_value;
								}
							}
						}

						if(sortOptons.length > 0){
							catehtml += '<div class="slide_show_out"><div class="slide_show"><ul class="show_list">';
							for(var s = 0; s < sortOptons.length; s ++){
								var item = sortOptons[s];
								catehtml += '<li class="item cate-item '+(cs == item.value ? "current" : "")+'" data-cate-prop="sort" data-cate-value="'+item.value+'"><a href="javascript:void(0);">'+item.display_name+'</a></li>';
							}
							catehtml += '</ul></div></div>';
						}

						for(var i = 0; i < json.index.length; i ++){
							if(json.index[i].name === 'sort'){
								continue;
							}

							catehtml += '<div class="slide_show_out"><div class="slide_show"><ul class="show_list">';

							for(var n = 0; n < json.index[i].option.length; n ++){
								if(queryParams[json.index[i].name]){
									if(queryParams[json.index[i].name] == json.index[i].option[n].value){
										catehtml += '<li class="item cate-item current" data-cate-prop="'+json.index[i].name+'" data-cate-value="'+json.index[i].option[n].value+'"><a href="javascript:void(0);">'+json.index[i].option[n].display_name+'</a></li>';
									}else{
										catehtml += '<li class="item cate-item" data-cate-prop="'+json.index[i].name+'" data-cate-value="'+json.index[i].option[n].value+'"><a href="javascript:void(0);">'+json.index[i].option[n].display_name+'</a></li>';
									}
								}else{
									if(json.index[i].option[n].display_name === '全部'){
										catehtml += '<li class="item cate-item current" data-cate-prop="'+json.index[i].name+'" data-cate-value="'+json.index[i].option[n].value+'"><a href="javascript:void(0);">'+json.index[i].option[n].display_name+'</a></li>';
									}else{
										catehtml += '<li class="item cate-item" data-cate-prop="'+json.index[i].name+'" data-cate-value="'+json.index[i].option[n].value+'"><a href="javascript:void(0);">'+json.index[i].option[n].display_name+'</a></li>';
									}
								}
							}
							catehtml += '</ul></div></div>';
						}

						$("#film-cate-list").html(catehtml);

						PAGENO = 1;

						window.scrollTo(0,0);

						buildFilmDom();
					}
				},
				error: function(){
					alert("无法连接到网络\n请检查网络设置后重试");
				}
			});
		}
	}

	var buildFilmDom = function(){
		var ftype = $("li.film-type.current").data("ftype");

		if(ftype == 666){
			var cate = $("#film-cate-list li.current").data('cate-value');
			console.log(ftype, cate)
			if(video666[cate]){
				var offset = (PAGENO - 1) * PAGESIZE;
				var total = video666[cate].length;
				if(offset > total){
					return;
				}

				buildQueryString();

				var films = video666[cate].slice(offset, offset + PAGESIZE);

				var filmhtml = "";
				for(var i = 0; i < films.length; i ++){
					var row = films[i];

					filmhtml += '<li class="item">';
					var cid = getCidFromUrl(row.play_url);
					filmhtml += '<a href="'+row.play_url+'" class="figure js_play" data-cid="'+cid+'">';
					filmhtml += '<span class="figure_pic">';
					filmhtml += '<img src="'+ normalizer(row.pic) +'" />';

					if(row.tag_img){
						filmhtml += '<i class="mark_v"><img src="'+row.tag_img+'" /></i>';
					}

					filmhtml += '</span>';
					filmhtml += '<span class="figure_title figure_title_multirow"><span class="txt">'+row.title+'</span></span>';
					filmhtml += '</a>';
					filmhtml += '</li>';
				}

				if(PAGENO == 1){
					$(".mod_film_box ul.mod_figure").html(filmhtml);
				}else{
					$(".mod_film_box ul.mod_figure").append(filmhtml);
				}

				$(".mod_film_box").show();

				//页面上已经加载的电影数量
				var loaded_film_count = $(".mod_film_box li.item").length;
				console.log(total, loaded_film_count);
				if(total > loaded_film_count){
					setTimeout(function(){
						HASMORE = true;

						var $imgs = $(".mod_film_box li.item img");
						var lastImg = $imgs[$imgs.length - 1];
						var offset = $(lastImg).offset().top - 100;

						//console.log(offset);

						lazyLoad.more.init(offset, function(){
							PAGENO ++;
							buildFilmDom();
						});
					}, 400);
				}else{
					HASMORE = false;
				}
			}
			return;
		}

		if(API_URLS[ftype]){
			var query = buildQueryString();

			var url = API_URLS[ftype].list;
			url += "&pagesize=" + PAGESIZE;
			url += "&offset=" + (PAGESIZE * (PAGENO - 1));
			if(query){
				url += "&"+query;
			}

			$(".g_pop_loading").show();

			$.ajax({
				url: url,
				dataType: "jsonp",
				success: function(json){
					//console.log(json);
					$(".g_pop_loading").hide();
					lazyLoad.reset();
					queryParams = {};

					if(json.total == 0 && PAGENO == 1){
						$(".mod_no_match").show();
						$(".mod_film_box").hide();
						PAGENO = 1;
						HASMORE = false;
						return;
					}

					if(json.ret === 0 && json.jsonvalue.results){

						if(json.jsonvalue.results.length == 0){
							if(PAGENO == 1){
								$(".mod_no_match").show();
								$(".mod_film_box").hide();
							}else{
								$(".mod_no_match").hide();
								$(".mod_film_box").show();
							}
							return;
						}

						var filmhtml = "";
						for(var i = 0; i < json.jsonvalue.results.length; i ++){
							var row = json.jsonvalue.results[i].fields;

							filmhtml += '<li class="item">';
							var play_url = "//m.v.qq.com/x/cover/"+row.cover_id.substr(0, 1)+"/"+row.cover_id+".html";
							filmhtml += '<a href="'+play_url+'" class="figure js_play" data-cid="'+row.cover_id+'">';
							filmhtml += '<span class="figure_pic">';
							var pic_url = row.new_pic_vt.replace(/\/0$/ig, "/220");
							filmhtml += '<img lz_src="'+ normalizer(pic_url) +'" />';
							if(row.score){
								var score = row.score.score.substr(0, 3);
								if(score == '10.'){
									score = "10";
								}
								filmhtml += '<span class="mask_scroe_single"><span class="mask_scroe">'+score+'</span></span>';
							}


							if(row.aphone40_imgtag){
								try{

									var tags = eval("("+row.aphone40_imgtag+")");

									if(tags.tag_2.param2 && tags.tag_2.text){
										filmhtml += '<i class="mark_v"><img src="'+tags.tag_2.param2.replace("1X=http://", "//")+'" /></i>';
									}
								}catch(e){}
							}

							filmhtml += '</span>';
							filmhtml += '<span class="figure_title figure_title_multirow"><span class="txt">'+row.title+'</span></span>';
							filmhtml += '</a>';
							filmhtml += '</li>';
						}

						if(PAGENO == 1){
							$(".mod_film_box ul.mod_figure").html(filmhtml);
						}else{
							$(".mod_film_box ul.mod_figure").append(filmhtml);
						}

						lazyLoad.init(["img"]);

						//页面上已经加载的电影数量
						var loaded_film_count = $(".mod_film_box li.item").length;
						if(json.total > loaded_film_count){

							setTimeout(function(){
								HASMORE = true;

								var $imgs = $(".mod_film_box li.item img");
								var lastImg = $imgs[$imgs.length - 1];
								var offset = $(lastImg).offset().top - 100;

								//console.log(offset);

								lazyLoad.more.init(offset, function(){
									PAGENO ++;
									buildFilmDom();
								});
							}, 400);
						}else{
							HASMORE = false;
						}

						$(".mod_no_match").hide();
						$(".mod_film_box").show();
					}else{
						//alert("电影接口数据读取失败");
					}
				},
				error: function(){
					alert("无法连接到网络\n请检查网络设置后重试");
					$(".g_pop_loading").hide();
				}
			});
		}
	}

	//构建请求字符串
	var buildQueryString = function(){
		var query = [];
		var cates = "|";

		$("#film-cate-list li.current").each(function(idx, ele){
			var $dom = $(ele);
			query.push($dom.data("cate-prop")+"="+$dom.data("cate-value"));

			if(ele.innerText !== "全部" && cates.indexOf("|"+ele.innerText+"|") === -1){
				cates += ele.innerText+"|";
			}
		});

		var cates_arr = [$(".film-type.current")[0].innerText];
		var tmps = cates.split("|");
		for(var i = 0; i < tmps.length; i ++){
			if(tmps[i]){
				cates_arr.push(tmps[i]);
			}
		}

		if(cates_arr.length === 1){
			cates_arr.push("全部");
		}

		var new_arr = [];
		$.each(cates_arr, function(idx, ele){
			new_arr.push('<span class="txt">' + ele + '</span>');
		});

		$(".mod_selected_cate .selected_cate").html(new_arr.join('<span class="dot"></span>'));

		return query.join("&");
	}

	var getQueryParams = function(qs) {
	    qs = qs.split('+').join(' ');

	    var params = {},
	        tokens,
	        re = /[?&]?([^=]+)=([^&]*)/g;

	    while (tokens = re.exec(qs)) {
	        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
	    }

	    return params;
	}

	var initUrlOption = function(){
		queryParams = getQueryParams(document.location.search);

		if(queryParams.t && !API_URLS[queryParams.t]){
			delete queryParams.t;
		}
	}

	var isEmptyObject = function(o){
		for(var i in o){
			return false;
		}
		return true;
	}

	var getCidFromUrl = function(url){
		var res = url.match(/\/(\w+)\.html$/);
		if(res){
			return res[1];
		}
		return '';
	}

	var initEvent = function(){
		$doc.delegate(".film-type", "click", function(){
			var $this = $(this);
			$this.parent().find("li").removeClass("current");

			$this.addClass("current");

			var ftype = $this.data("ftype");

			buildCateDom(ftype);

			reportBOSS('h5_allfilm_type_' + ftype);

			return false;
		});

		$doc.delegate(".cate-item", "click", function(){
			var $this = $(this);

			$this.parent().find("li").removeClass("current");

			$this.addClass("current");

			var cprop = $this.data("cate-prop");
			var cvalue = $this.data("cate-value");

			PAGENO = 1;

			window.scrollTo(0, 0);

			buildFilmDom();

			reportBOSS('h5_allfilm_cate_' + cprop + '_' + cvalue);

			return false;
		});

		$('.mod_selected_cate').hide();
		$(window).scroll(function(){
		    if( $(window).scrollTop() >= 120 ){
		        $('.mod_selected_cate').addClass('mod_selected_cate_fixed').show();

		    }else{
		        $('.mod_selected_cate').removeClass('mod_selected_cate_fixed').hide();
		    }
		});

		function initScroll(){
			document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
			document.addEventListener('DOMContentLoaded', function(){
				new IScroll(".main_container", {
					onScrollEnd: function(){
						buildFilmDom();
					}
				});
			}, false);
		}

		weixin.setShare({
			title: "腾讯视频VIP影院",
			desc: "享受更好的，因为我是VIP"
		});
	}

	var init = function(){

		initEvent();

		initUrlOption();

		$(".mod_no_match, .mod_film_box, .g_container_loading").hide();
		$(".main_container").show();

		$("li.film-type[data-ftype='666']").hide();

		if(queryParams.t){
			$("li.film-type[data-ftype='"+queryParams.t+"']").trigger("click");
			if(queryParams.t == '666'){
				$("li.film-type[data-ftype='666']").show();
			}
			var offset = $('#film-type-list .film-type.current').offset();
			$('#film-type-list .slide_show').scrollLeft(offset.left);
		}else{
			$("li.film-type[data-ftype=movie]").trigger("click");
		}

		$(document).on('click', '.js_play', function(){
			var cid = $(this).data('cid');
			if (cid && tenvideo.isTenvideo()){
				tenvideo.tenvideoReady(function(){
		            try {
		                var url = "tenvideo2://?action=1&cover_id="+cid;
		                TenvideoJSBridge.invoke('openView', {url: url, close: 1}, function (res) {
		                    
		                });
		            } catch (e) {
		            }
		        });
				return false;
			}
		});
	}

	function reportBOSS(tag) {
        window.HLWSTATE && window.HLWSTATE.clickStat(tag);
    }


	module.exports = {
		init : init
	};
});
