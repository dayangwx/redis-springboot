/* 树形菜单js */
$('.tree').on('click', '.tree-primary-items', function() {
    $(this).toggleClass('open');//三级菜单添加open
	$(this).siblings('ul').slideToggle('fast');//兄弟元素ul 打开
});

//二、三级菜单有子级菜单点击事件
$('.tree').on('click', '.tree-secondary-items.have-chirld,.tree-third-items.have-chirld', function() {
    if($(this).hasClass("open")){
    	$(this).toggleClass('open');//点击添加active
    	$(this).siblings('ul').slideToggle('fast').find("li span").removeClass("open").end().find("ul").slideUp();//兄弟元素ul 打开	
    }else{
    	$(this).toggleClass('open');//点击添加active
    	$(this).siblings('ul').slideToggle('fast').removeAttr('overflow');
    }
});

//二、三级菜单没有子级菜单点击事件
$('.tree').on('click', '.tree-secondary-items.no-chirld,.tree-third-items.no-chirld', function() {
	if($(this).hasClass('active')){
		$(this).removeClass('active');//点击的这个添加active
	} else {
		$('.tree .tree-secondary-items.no-chirld,.tree .tree-third-items.no-chirld').removeClass('active');//三级菜单没有四级菜单的移除class active
		$(this).addClass('active');//点击的这个添加active
	}
});

