(function($) {
	"use strict";
	var msie = (function(w, d) {
			return ("XMLHttpRequest" in w ? d.querySelector ? d.documentMode : 7 : 6);
		})(top, top.document),
		minWidth = msie < 7 ? "width" : "minWidth",
		selectQueue,
		fixie,
		defaultOptions = {
			// 自動計算寬
			autoWidth: true,
			// 是否定義定時器刷新本文
			interval: true,
			// 從Option標籤獲取本文，做為顯示的文案
			label: function() {
				return $(this).text();
			}
		};

	function create(className, nodeName) {
		return $("<" + (nodeName || "div") + "/>").addClass(className);
	}

	if (msie < 7) {
		//IE6下方案，用1px大小div包裹select，並跟隨滑鼠
		fixie = function(selectui, select) {
			var posWrap = create("select_poswrap");
			posWrap.append(select);
			selectui.append(posWrap);
			selectui.mousemove(function(e) {
				// 鼠标移動時，posWrap變為1像素宽高，並跟隨屬標指針
				var maxTop = selectui[0].clientHeight,
					pixeTop;

				posWrap.offset({
					left: e.pageX,
					top: e.pageY
				}).css({
					height: 1,
					width: 1
				});

				if (posWrap[0].offsetTop > maxTop) {
					posWrap.css({
						top: maxTop
					});
				}

				// select的位置根據posWrap調整，使之保持與外層.select_ui位置重叠
				pixeTop = posWrap[0].offsetTop;

				$(select).css({
					width: selectui[0].clientWidth,
					marginLeft: -posWrap[0].offsetLeft,
					marginTop: pixeTop + select.offsetHeight > maxTop ? maxTop - select.offsetHeight - pixeTop : 0
				});
			}).on("mouseleave click", function() {
				posWrap.height(0).width(0);
			});
		};
	} else if (msie < 8) {
		//IE7下只需處理一下select的大小即可
		fixie = function(selectui, select) {
			selectui.mouseenter(function() {
				$(select).height(selectui[0].clientHeight).width(selectui[0].clientWidth);
			});
		};
	}

	function modifyText(select) {
		//select方式變化，寫入當時本文
		var select_ui = $(select).closest(".select_ui"),
			options = select_ui.data("selectuiopts") || {},
			index = select.selectedIndex,
			labelFn = options.label,
			text = index < 0 ? '' : labelFn.call(select.options[index]),
			textdiv = select_ui.find(".select_text_ui"),
			length = 0;
		if (!textdiv.length) {
			textdiv = create("select_text_ui", "span").prependTo(select_ui);
		}
		text = text || "&nbsp;";
		if (textdiv.text() !== text) {
			textdiv.text(text);
		}

		if (options.autoWidth) {
			//計算算select宽度
			$.each(select.options, function() {
				var text = labelFn.call(this),
					width = text.match(/[u0000-u00FF]/g);
				width = text.length - (width ? width.length / 2 : 0) + 0.5;
				length = Math.max(width, length);
			});
			length += "em";

			$(function() {
				if (msie < 7) {
					textdiv.css(minWidth, "");
					if (textdiv[0].currentStyle[minWidth] !== "auto") {
						return;
					}
				}
				textdiv.css(minWidth, length);
			});
		}
	}

	//使用定时器來刷select文字
	function startInterval(select) {
		if (selectQueue) {
			selectQueue.push(select);
		} else {
			selectQueue = [select];
			setInterval(function() {
				$.each(selectQueue, function(i,v) {
					//解决bug，火狐下selectIndex會随菜单滑動變化
					if (document.activeElement !== this) {
						modifyText(this);
					}
				});
			}, 200);
		}
	}

	$.fn.selectui = function(options) {
		options = $.extend({}, defaultOptions, options);
		var labelPropName = options.label;
		if (typeof labelPropName === "string") {
			options.label = function() {
				return $(this).prop(labelPropName);
			};
		}
		return this.each(function() {

			var modifyTextTimer,
				select = $(this),
				selectui = select.closest(".select_ui");

			if (select.css("display") !== "none") {

				//给select標籤加包裹
				if (!selectui.length) {
					selectui = create("select_ui", "span");
					selectui.insertAfter(select);
					selectui.append(create("select_arrow", "b")).append(select);
				}

				selectui.data("selectuiopts", options);

				//監聽可能改變select選中项的事件
				select.bind("change propertychange DOMAttrModified DOMNodeInserted DOMNodeRemoved keypress keyup input", function() {
					//利用定时器過濾多次事件触發，短時間內運行最后一次
					clearTimeout(modifyTextTimer);
					var select = this;
					modifyTextTimer = setTimeout(function() {
						modifyText(select);
					}, 10);
				}).each(function() {
					modifyText(this);
				});

				//其他瀏覽器添加焦點样式即可
				selectui.focusin(function() {
					selectui.addClass("select_focus_ui");
				}).focusout(function() {
					selectui.removeClass("select_focus_ui");
				});

				if (fixie) {
					//IE6、7中模拟select，並非原生
					fixie(selectui, this);
				}

				// 選項中有，才啟用定时器
				if (options.interval) {
					startInterval(this);
				}
			}
		});
	};

	//對外暴漏修改默認設置的接口
	$.fn.selectui.options = defaultOptions;

})(window.jQuery || require("jquery"));