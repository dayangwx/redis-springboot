 String.prototype.trim = function () {
return this .replace(/^\s\s*/, '' ).replace(/\s\s*$/, '' );
 };
$('.pagination').twbsPagination({
	totalPages: 35,
	visiblePages: 1
});

$('.tree').on('click', '.tree-fourth-items.no-chirld', function() {
	if($(this).hasClass('active')){
		$(this).removeClass('active');//点击的这个添加active
	} else {
		$('.tree .tree-fourth-items.no-chirld').removeClass('active');//三级菜单没有四级菜单的移除class active
		$(this).addClass('active');//点击的这个添加active
	}
});
$('.form-right .form-select-btn').click(function(e) {
	$(this).parent().toggleClass('open');
});
$('.form-right').on('click','.form-select-menu li',function() {
	$(this).siblings('li').removeClass('choosed');
	$(this).addClass('choosed');
	var btnMenuChooseText = $(this).text();
	$(this).parent().siblings('button').children('p').text(btnMenuChooseText);
	$(this).parent().parent().removeClass('open');
	return false;
});
$('.tabs_main').on('click','.running .state-btn',function(){
	$(this).parent('.operation').parent().removeClass('running').addClass('suspend');
});

$('.tabs_main').on('click','.suspend .state-btn',function(){
	$(this).parent('.operation').parent().removeClass('suspend').addClass('running');
});
$('.tabs-wapper').on('click', 'td.name a', function() {
	$('.right-alert').fadeIn('fast').animate({
		marginRight: "0px"
	},300);
	$(".right-alert_head_title").text("查看用语模板");
	$(".edit-ul").hide();
	$(".view-ul").show();
});
/*$('.rightTopBtn').on("click", function() {
	$('.right-alert').fadeIn('fast').animate({
		marginRight: "0px"
	},300);
	$(".right-alert_head_title").text("新增用语模板");
	$(".edit-ul").show();
	$(".view-ul").hide();
});*/
$("#showFrame").on("click", function() {
	$('.right-alert').fadeIn('fast').animate({
		marginRight: "0px"
	},300);
	$(".right-alert_head_title").text("新增用户");
	$(".edit-ul").show();
	$(".view-ul").hide();
});
$("#batchAddShow").on("click", function() {
	$('.right-alert').fadeIn('fast').animate({
		marginRight: "0px"
	},300);
	$(".right-alert_head_title").text("批量导入");
	$(".edit-ul").hide();
	$(".view-ul").show();
});
$('.edit-btn').on("click", function() {
	$('.right-alert').fadeIn('fast').animate({
		marginRight: "0px"
	},300);
	$(".right-alert_head_title").text("修改用语模板")
	$(".edit-ul").show();
	$(".view-ul").hide();
});
$(function() {
	$(".special-tree").treemenu({
		delay: 300
	}).openActive();
});

$('body').on('click', '.special-tree a', function() {
	if($(this).hasClass("active")){
		$(this).removeClass("active");
	}else{
		$(this).parents(".special-tree").find("a").removeClass('active');
		$(this).addClass('active');		
	}
});
$(".form-location-input-more-btn").on("click", function() {
	$(this).parents(".form-LocationInput").find(".form-location-input-tree").slideToggle("fast");
});
$(".form-location-input-tree").each(function() {
	$(this).find("a").on("click", function() {
		var text = $(this).text();
		$(this).parents(".form-LocationInput").find("input").val(text).end().find("span.placeholder").slideUp();
		$(this).parents(".form-LocationInput").find(".form-location-input-tree").slideUp();
	})
});
$('body').on('click', '.right-alert-closeBtn,.right-alert-content-main .form-btns button.cancel', function() {
	$('.right-alert').animate({
		marginRight: "-875px",
	},300).fadeOut();
	$("body").css("overflow","hidden");
});

$('.radio-buttons').not('.disabled').click(function() {
	$('.table-wrapper .radio-buttons').not('.disabled').removeClass('checked');
	$(this).addClass('checked');
});

$('body').click(function(e) {
	var _a = $('.form-LocationInput'); // 设置目标区域
	if(!_a.is(e.target) && _a.has(e.target).length === 0) {
		$(".form-location-input-tree").slideUp();
	} else {
		$(this).children(".form-location-input-tree").slideDown();
	}
});