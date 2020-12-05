$('input,textarea').not('input.ipt.form-control.gotoPageNo').bind('input propertychange change', function() {
    var inputVal = $(this).val();
    $input = $(this);
    $placeholder = $(this).siblings('.placeholder');
    if (inputVal == "") {
        $placeholder.show();
    } else {
        $placeholder.hide();
    }
});

$('.choose-phone-number input').keyup(function() {
    var c = $(this);
    if (/[^\d]/.test(c.val())) {
        var temp_amount = c.val().replace(/[^\d]/g, '');
        $(this).val(temp_amount);
    };
});

//$('input.ipt.form-control.gotoPageNo').keyup(function() {
//	var c = $(this);
//	if(/[^\d]/.test(c.val())) {
//		var temp_amount = c.val().replace(/[^\d]/g, '');
//		$(this).val(temp_amount);
//	};
//
//	if(c.val() > 35 || c.val() < 1) {
//		c.css({
//			"border-color": "#E85F5C",
//			"color": "#E85F5C"
//		});
//		$(this).parent().next('.page-tips').show();
//	} else {
//		c.css({
//			"border-color": "#24AC7E",
//			"color": "#555"
//		});
//		$(this).parent().next(".page-tips").hide();
//	};
//});

$('.goBtn').blur(function() {
    $(this).parent().next(".page-tips").hide();
});

$('.search-phoneNum').keyup(function() {
    var c = $(this);
    if (/[^\d]/.test(c.val())) {
        var temp_amount = c.val().replace(/[^\d]/g, '');
        $(this).val(temp_amount);
    };
});

$('.tree-secondary-items_search button').click(function() {
    var inputVal = $('.tree-secondary-items_search input').val();
    $('span.tree-third-items').each(function() {
        if (inputVal === $(this).text()) {
            $('span.tree-third-items').removeClass('active');
            $(this).addClass('active');
            $(this).parent('li').parent('ul').addClass('open');
        }
    });
});

$('.tree-secondary-items_search input').keydown(function(e) {
    if (e.keyCode == 13) {
        var inputVal = $('.tree-secondary-items_search input').val();
        $('span.tree-third-items').each(function() {
            if (inputVal === $(this).text()) {
                $('span.tree-third-items').removeClass('active');
                $(this).addClass('active');
                $(this).parent('li').parent('ul').addClass('open');
            }
        });
    }
});

$(function() {
    $('.date_selector').on('click', function(e) {
        e.stopPropagation();
    });
});

$('body').click(function(e) {
	var _strategyName = $('.strategy-name'); // 设置目标区域
	if (_strategyName.hasClass('edit')) {
		// 防止点击ifarme，无法获取父窗口对象
		_strategyName = _strategyName.length > 0 ? _strategyName : parent.$('.strategy-name');
		if(!_strategyName.is(e.target) && _strategyName.has(e.target).length === 0) {
			_strategyName.removeClass('edit').attr('readonly',"readonly");
		}
	}

    var _fastNewBuilt = $('.fast-new-built'); // 设置目标区域
    // 防止点击ifarme，无法获取父窗口对象
    _fastNewBuilt = _fastNewBuilt.length > 0 ? _fastNewBuilt : parent.$('.fast-new-built');
    if (!_fastNewBuilt.is(e.target) && _fastNewBuilt.has(e.target).length === 0) {
        _fastNewBuilt.removeClass('open');
    } else {
        _fastNewBuilt.toggleClass('open');
    }
//
//    var _waitMeTask = $('.wait-me-task'); // 设置目标区域
//    // 防止点击ifarme，无法获取父窗口对象
//    _waitMeTask = _waitMeTask.length > 0 ? _waitMeTask : parent.$('.wait-me-task');
//    if (!_waitMeTask.is(e.target) && _waitMeTask.has(e.target).length === 0) {
//        _waitMeTask.removeClass('open');
//    } else {
//        _waitMeTask.toggleClass('open');
//    }

    var _userProfile = $('.user-profile'); // 设置目标区域
    // 防止点击ifarme，无法获取父窗口对象
    _userProfile = _userProfile.length > 0 ? _userProfile : parent.$('.user-profile');
    if (!_userProfile.is(e.target) && _userProfile.has(e.target).length === 0) {
        _userProfile.removeClass('open');
    } else {
        _userProfile.toggleClass('open');
    }

    var _myCollect = $('.my-collect'); // 设置目标区域
    // 防止点击ifarme，无法获取父窗口对象
    _myCollect = _myCollect.length > 0 ? _myCollect : parent.$('.my-collect');
    if (!_myCollect.is(e.target) && _myCollect.has(e.target).length === 0) {
        _myCollect.removeClass('open');
    } else {
        _myCollect.toggleClass('open');
    }
//
//    var _search = $('.header_search'); // 设置目标区域
//    // 防止点击ifarme，无法获取父窗口对象
//    _search = _search.length > 0 ? _search : parent.$('.header_search');
//    if (!_search.is(e.target) && _search.has(e.target).length === 0) {
//        _search.find(".dropdown-menu").hide();
//        _search.find("input").removeClass('focus');
//    }

    var _formSelectMenu = $('.form-select-menu').parents(".form-right"); // 设置目标区域
    // 防止点击ifarme，无法获取父窗口对象
    _formSelectMenu = _formSelectMenu.length > 0 ? _formSelectMenu : parent.$('.form-select-menu');
    if (!_formSelectMenu.is(e.target) && _formSelectMenu.has(e.target).length === 0) {
	    _formSelectMenu.removeClass('open');
	} else {
//		$(e.target).parents('.form-items').siblings().find('.open').removeClass('open');
    }
    
    var _formSelectMenu1 = $('#channel-name').find(".form-right"); // 设置目标区域
    // 防止点击ifarme，无法获取父窗口对象
    _formSelectMenu1 = _formSelectMenu1.length > 0 ? _formSelectMenu1 : parent.$('#channel-name');
    if (!_formSelectMenu1.is(e.target) && _formSelectMenu1.has(e.target).length === 0) {
        _formSelectMenu1.removeClass('open');
    }
    
    var _formSelectMenu2 = $('#operation-name').find(".form-right"); // 设置目标区域
    // 防止点击ifarme，无法获取父窗口对象
    _formSelectMenu2 = _formSelectMenu2.length > 0 ? _formSelectMenu2 : parent.$('#operation-name');
    if (!_formSelectMenu2.is(e.target) && _formSelectMenu2.has(e.target).length === 0) {
        _formSelectMenu2.removeClass('open');
    }
   
});

// 选择上传文件js
$('body').on('change', '.select-file', function() {
    $('.show-path').html($(this).val());
})

$("body").on('focus','.Wdate',function(){
	$('.form-LocationInput').children("ul.special-tree").slideUp();
	$('.form-right').removeClass('open');
	$(".viewFramework-index-body").scroll(function(){
		if($(window.document).find(".myDate97").length > 0){
			$(window.document).find(".myDate97").hide();
		};
	});
});

$('body').on('click','.form-right .form-select-btn',function(){
    var $parent=$(this).parent();
    $('.form-right.open').not($parent).removeClass('open');
});

// 初始化
function init_state(obj) {
    obj.find('.right-alert-tabs_menu li').each(function(index, item) {
        $(item).removeClass('current');
        $(item).find('a').addClass('no-click');
        if (index == 0) {
            $(item).addClass('current');
            $(item).find('a').removeClass('no-click');
        }
    })
    obj.find('p.check,span.check').remove();
    obj.find('.form-input-step').hide();
    obj.find('.form-input-step:first').show();

    obj.find('.right-alert-content-main').removeClass("current");
    obj.find('.right-alert-content-main:first').addClass("current");

    obj.find('.form-items .form-right input,.form-items .form-right textarea').val(null);

    obj.find('.form-select-menu li').removeClass('choosed');
    obj.find('.form-select-btn p').html('');
}
// 免打扰规则控制初始化
function start_staus(obj) {
    var JQ_parent;
    if (obj) {
        JQ_parent = obj;
    } else {
        JQ_parent = $('.right-alert_content');
    }

    JQ_parent.find('.form-items .checked-box').each(function() {
        if (!$(this).hasClass('disabled')) {
            $(this).removeClass('checked');
        }
    })

    JQ_parent.find('.switches-items').each(function(index, item) {

        var JQ_obj = $(item);
        // switches-left初始化
        if (!JQ_obj.hasClass('must-open')) {
            JQ_obj.find('.no-control').show();
            JQ_obj.find('.count-g').hide();
            JQ_obj.find('span.green').text(0);
            JQ_obj.find('.switches').removeClass('open');
        }

        JQ_obj.find('.switches-hidden').hide();

        if (!JQ_obj.hasClass('checkbox-items')) {
            //switches-right初始化
            JQ_obj.find('.input').val(null);
        } else {
            if (!JQ_obj.find('.switches-hidden').hasClass('start-end-time')) {
                JQ_obj.find('.switches-hidden').find('.checked-box').removeClass('checked');
            } else {
                $('.start-end-time .form-items').each(function(index, item) {
                    if (index > 0) {
                        $(this).remove();
                    }
                })
                JQ_obj.find('.Wdate').val(null);
            }
        }
    })
}

$('body').on('click', '.right-alert-closeBtn,.right-alert .ok,.right-alert .cancel,.right-alert .return,.right-alert .cancel-btn', function() {
    $('.right-alert').animate({
        marginRight: "-875px"
    }, 300).fadeOut();
    $("body").css("overflow-y", "auto");
    init_state($(this).parents('.right-alert'));
    start_staus();
});


//以下几个提示框函数使用方法:
//定义一个对象
//var warnTips = {
//	Ptext: "警告！",
//	Stext: "请查看警告",
//	func: function(){
//		alert("此处写函数逻辑");
//	}
//}
//然后将该对象作为下列函数的参数,对象中的三个属性都为可选,不必须.也可以不传参数直接调用函数.

function operationTipsTrue(obj) {
    if (!obj) {
        var TruePrimaryText = "操作成功";
        var TrueSecondaryText = "点击确认按钮返回操作界面";
    } else {
        var TruePrimaryText = obj.Ptext ? obj.Ptext : "操作成功";
        var TrueSecondaryText = obj.Stext ? obj.Stext : "点击确认按钮返回操作界面";
        if (typeof(obj.func) === "function") {
            $(window.document).find("body").one("click", ".grayTextBtn.true-ok", obj.func);
        }
    }
    $(window.document).find("body").append(
        '<div class="operation-tips-bg">' +
        '<div class="operation-tips-shade"/>' +
        '<div class="operation-tips operation-tips-true">' +
        '<div class="operation-tips-title"><span>操作成功</span><i class="operation-tip-close"></i></div>' +
        '<div class="operation-tips-img"></div>'

        +
        '<span class="primary-content">' + TruePrimaryText + '</span>' +
        '<span class="secondary-content">' + TrueSecondaryText + '</span>'

        +
        '<div class="operation-tips-true-btn">' +
        '<button class="grayTextBtn true-ok">确定</button>' +
        '</div>' +
        '</div>' +
        '</div>'
    );
    $(window.document).find('.operation-tips-bg').fadeIn();
};

function operationTipsFailed(obj) {
    if (!obj) {
        var FailedPrimaryText = "操作失败";
        var FailedSecondaryText = "请解决操作失败原因后再重新尝试";
    } else {
        var FailedPrimaryText = obj.Ptext ? obj.Ptext : "操作失败";
        var FailedSecondaryText = obj.Stext ? obj.Stext : "请解决操作失败原因后再重新尝试";
        if (typeof(obj.func) === "function") {
            $(window.document).find("body").one("click", ".grayTextBtn.fail-ok", obj.func);
        }
    }
    $(window.document).find("body").append(
        '<div class="operation-tips-bg">' +
        '<div class="operation-tips-shade"/>' +
        '<div class="operation-tips operation-tips-failed">' +
        '<div class="operation-tips-title"><span>操作失败</span><i class="operation-tip-close"></i></div>' +
        '<div class="operation-tips-img"></div>'
        +
        '<span class="primary-content">' + FailedPrimaryText + '</span>' +
        '<span class="secondary-content">' + FailedSecondaryText + '</span>'

        +
        '<div class="operation-tips-failed-btn">' +
        '<button class="grayTextBtn fail-ok">确定</button>' +
        '</div>' +
        '</div>' +
        '</div>'
    );
    $(window.document).find('.operation-tips-bg').fadeIn();
};

function operationTipsWarn(obj) {
	var WarnFunc=function(){};
	
    if (!obj) {
        var WarnPrimaryText = "您确认要删除吗";
        var WarnSecondaryText = "一经删除不可恢复";
    } else {
        var WarnPrimaryText = obj.Ptext ? obj.Ptext : "您确认要删除吗";
        var WarnSecondaryText = obj.Stext ? obj.Stext : "一经删除不可恢复";
        WarnFunc=obj.func;
    }
    $(window.document).find("body").append(
        '<div class="operation-tips-bg">' +
        '<div class="operation-tips-shade"/>' +
        '<div class="operation-tips operation-tips-warn">' +
        '<div class="operation-tips-title"><span>操作提示</span><i class="operation-tip-close"></i></div>' +
        '<div class="operation-tips-img"></div>'
        +
        '<span class="primary-content">' + WarnPrimaryText + '</span>' +
        '<span class="secondary-content">' + WarnSecondaryText + '</span>'

        +
        '<div class="operation-tips-warn-btn">' +
        '<button class="blankTextBtn">取消</button>' +
        '<button class="TextBtn-import confirm">确定</button>' +
        '</div>' +
        '</div>' +
        '</div>'
    );
    if (typeof(WarnFunc) === "function") {
        $(window.document).find("body .TextBtn-import.confirm").on("click", WarnFunc);
    }
    $(window.document).find('.operation-tips-bg').fadeIn();
};

function operationTipsLoading(obj) {
    if (!obj) {
        var LoadingPrimaryText = "上传中";
        var LoadingSecondaryText = "请等待上传完成";
    } else {
        var LoadingPrimaryText = obj.Ptext ? obj.Ptext : "上传中";
        var LoadingSecondaryText = obj.Stext ? obj.Stext : "请等待上传完成";
    }
    $("body").append(
        '<div class="operation-tips-bg">' +
        '<div class="operation-tips operation-tips-true loading-tips">' + '<div class="operation-tips-img">' + '<img src="img/loading.gif" width="50" height="50" />' + '</div>'

        + '<span class="primary-content">' + LoadingPrimaryText + '</span>' + '<span class="secondary-content">' + LoadingSecondaryText + '</span>' + '</div>' +
        '</div>'
    );
    $(window.document).find('.operation-tips-bg').fadeIn();
};
//function operationBtnOnclick() {
//	$('body').on('click', '.operation-tips button', function() {
//		if($(this).hasClass('TextBtn-import')) {
//			return true;
//		} else {
//			return false;
//		}
//	});
//}



$('body').on('click', '.operation-tips .operation-tip-close,.operation-tips .icon-close,.operation-tips button', function() {
    $('body').off("click", ".TextBtn-import.confirm");
    $(this).parents('.operation-tips-bg').fadeOut(function() {
        $(this).remove();
    });
});


function loadingImg() {
    $('body').append(
        '<div class="loading">' + '<img src="img/loading.gif" />' + '<span>Loading</span>' + '</div>'
    )
}

$('input[readonly], textarea[readonly]').not('.Wdate').attr('UNSELECTABLE', 'on');
//校验时间
function checkOverTime() {
    var startTime = $(this).val();
    $(this).parent().siblings(".over-date").find("input.Wdate").attr("onfocus", "WdatePicker({onpicked:checkStartTime, minDate:'" + startTime + "',dateFmt:'HH:mm:00',skin:'twoer'})");
}

function checkStartTime() {
    var overTime = $(this).val();
    $(this).parent().siblings(".start-date").find("input.Wdate").attr("onfocus", "WdatePicker({onpicked:checkOverTime, maxDate:'" + overTime + "',dateFmt:'HH:mm:00',skin:'twoer'})");
}


//校验日期
function checkOverDate() {
    var startTime = $(this).val();
    $(this).parent().siblings(".over-date").find("input.Wdate").attr("onfocus", "WdatePicker({onpicked:checkStartDate,minDate:'" + startTime + "',dateFmt:'yyyy-MM-dd',skin:'twoer'})");
}

function checkStartDate() {
    var overTime = $(this).val();
    $(this).parent().siblings(".start-date").find("input.Wdate").attr("onfocus", "WdatePicker({onpicked:checkOverDate,maxDate:'" + overTime + "',dateFmt:'yyyy-MM-dd',skin:'twoer'})");
}

//构建树形菜单
//入参：
//parentField 父节点id字段名
//idField 父节点id字段名
//generateTagA a标签生成函数
//出参：
//<ul>
//  <li><a>...</a></li>
//</ul>
//用法示例：var menu = new treeMenu(data.root).init("COST_SUB_PARENT", "COST_SUB_ID", function(a, level) {
//              return "<a data-id='" + a.COST_SUB_ID + "'>" + a.COST_SUB_NAME + '</a>'
//          })
//demo：详见cost-subject.js line 223~226
function treeMenu(a) {
    this.tree = a || [];
    this.groups = {};
};
treeMenu.prototype = {
    init: function(parentField, idField, generateTagA) {
        this.group(parentField);
        return this.getDom(this.groups[0], 1, idField, generateTagA);
    },
    group: function(parentField) {
        for (var i = 0; i < this.tree.length; i++) {
            if (!this.groups[this.tree[i][parentField]]) {
                this.groups[this.tree[i][parentField]] = [];
            }
            this.groups[this.tree[i][parentField]].push(this.tree[i]);
        }
    },
    getDom: function(a, dept, idField, generateTagA) {
        if (!a) {
            return ''
        }
        var html = '<ul>';
        for (var i = 0; i < a.length; i++) {
            html += "<li>" + generateTagA(a[i], dept);
            html += this.getDom(this.groups[a[i][idField]], dept + 1, idField, generateTagA);
            html += '</li>';
        };
        html += '</ul>';
        return html;
    }
};
function callMask() {
    $('body').append(
        '<div class="loading-mask"><div class="loading">'
        +'<div class="loading-bg">'
        +'<img src="'+rootPath+'/theme/img/splash-loading.gif" />'
        +'<span>Loading</span>'
        +'</div>'
        +'</div></div>'
    )
}
function cancelMask() {
    $(".loading-mask").remove();
}
function alertFailed(ptext,stext){
    operationTipsFailed({Ptext:ptext,Stext:stext});
}