//黑名单、红名单、免打扰  管理
var start=1;
var pageSize=10;
var tableUrl;
var tableData;
var place="";
var clickTag="";
var currentPage = 1;
var totalpage = 0;




$(document).ready(function(){
	importExample();
	initCustTypeSelect();
	tableUrl = rootPath + "/query/getCustomerList.do";
	tableData = {
		start : start,
		limit : pageSize
	};
	initCustListPage();
});

var custType = "";//用户类型
var custNo = "";//用户号码
var custTypeId ="";
function initCustTypeSelect() {
	$.ajax({
		url: rootPath + "/query/getCustTypes.do",
		type: "POST",
		dataType: 'json',
		async: false,
		cache: false,
		success: function (response) {
			$.each(response.custTypes, function(i, item){
				$("#ul_custType_all").append(
					'<li value="' + item.id + '">' + item.custType + '</li>'
				);
				$("#custType_add").append(
					'<li value="' + item.id + '">' + item.custType + '</li>'
				);
				$("#batch_custType_add").append(
					'<li value="' + item.id + '">' + item.custType + '</li>'
				);

			});
			$("#ul_custType_all").find("li").on("click", function () {
				custTypeId = $(this).val();
				custType = $(this).text();

			});
//            		alert($("#custType_add").text());
		},
		error: function (response) {
			operationTipsFailed();
		}
	});
}

custType = $("#custType_p").text();//用户类型

custNo = $("#custNo").val();//用户号码
function initCustListPage() {
	$.ajax({
		url:tableUrl,
		type:'POST',
		data:tableData,
		cache: false,
		async:false,
		success:function(result){
			var resp = eval('('+result+')');
			$("#customerList").html("");//清空内容
			$.each(resp.customerList, function(i, item){
				//if(item.no !=null){
				var no = item.no;
				var nowNo="-";
				if(item.no !=null){
//	    				var nowNo = no.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
					var nowNo =hideString(no);
				}
				var typeName =item.typeName==null?"-":item.typeName;
				var channel =item.channel==null?"-":item.channel;
				//var source =item.source==null?"-":item.source;
				var intervalTime =item.intervalTime==null?"-":item.intervalTime;
				var desc =	item.desc==null?"-":item.desc;
				var creator =item.creator	==null?"-":item.creator;
				if(item.source!=null){
					var delText = item.source==1||item.source==3 ?"-":"删除";
					var sourceNo =item.source;
					var source ='';
					if(item.source==0){
						source = '前台添加';
					}else if(item.source==1){
//							source = '后台导入';
						source = '大数据平台'
					}else if(item.source==2){
						source = '前台导入';
					}else if(item.source==3){
						source = '限呼库';
					}
				}else{
					source = '-';
				}
				$("#customerList").append(
					'<tr class="running subscription">'
					+'<td>'+nowNo+'</td>'
					+'<td>'+item.pdInstId+'</td>'
					+'<td>'+typeName+'</td>'
					/*+'<td>'+channel+'</td>'
                    +'<td>'+intervalTime+'</td>'*/
					//	    				+'<td>'+desc+'</td>'
					+'<td>'+source+'</td>'
					//	    				+'<td>'+creator+'</td>'
					+'<td class="operation" style="text-align:center">'
					//+'<button class="last-child" align="center" onclick="removeCustomer(\'' + item.no + '\',\'' + item.type + '\',\'' + item.pdInstId +'\',\'' + sourceNo +'\')">删除</button>'
					+'<button class="last-child" align="center" onclick="removeCustomer(\'' + item.no + '\',\'' + item.type + '\',\'' + item.pdInstId +'\',\'' + sourceNo +'\')">'+delText+'</button>'
					+'</td></tr>'
				);
				//}

			});
			//总的记录数
			var s = $('.pagination-info .totalCount').text(resp.custTotalCount);

			$('.pagination-info .limit').text(pageSize);

			$('.pagination-goto input').val("");


			//向上取整，有小数就整数部分加1
			var countTotal =resp.custTotalCount;
			totalpage = Math.ceil(countTotal/pageSize);

			place = "end";

			if(clickTag!="onclick"){
				var $pager = $('.pagination');
				// 下面三行代码是解决分页不刷行的bug
				$pager.empty(); // 移除pagination
				$pager.removeData("twbs-pagination"); // 移除导入的数据
				$pager.unbind("page"); //移除事件处理器
			}else{
				clickTag = "";
				place = "";
			}

			/* bootstrap 分页 */
			$('.pagination').twbsPagination({
				totalPages: totalpage==0?1:totalpage,  //总页数
				visiblePages: 5,      //当前页数
				startPage : currentPage,
				//获取分页组件的所有点击事件
				onPageClick : function(event, page) {
					if (place == "end") {
						place = "";
						return;
					}
					start = (page - 1) * pageSize + 1;
					currentPage = Number(page);

					tableUrl = rootPath + "/query/getCustomerList.do";
					tableData = {
						number : custNo,
						type : custType,
						start : start,
						limit : pageSize,
					};

					initCustListPage();
					clickTag = "onclick";
				}
			});
		},
		failure : function(response) {
			operationTipsFailed();
		}
	});
	$(".loading").remove();
}

//动态数据绑定事件,为活动列表‘go’按钮添加事件
function jumpPage(){
	//将要跳转的页数
	var page = $('.pagination-goto input').val();
	currentPage = parseInt(page);
	page = parseInt(page);
	//在此加上对于输入的校验
	if (!/^[1-9]*[1-9][0-9]*$/.test(page)|| page <=0 || page>totalpage){
		$('#conTable').find('#conTips').html(totalpage);
		$('#conTable').find('.page-tips').css("display","block");
		return;
	}
	start = (page-1)*pageSize+1;
	clickTag = "";
	tableUrl = rootPath + "/query/getCustomerList.do";
	tableData = {
		number : custNo,
		type : custType,
		start : start,
		limit : pageSize
	};
	initCustListPage();
}


//查询
function query() {
	cancelBtnCss('addSaveBtn');
	cancelBtnCss('batchAddSaveBtn');
	custType = custTypeId;//用户类型
	custNo = $("#custNo").val().trim();//用户号码
	currentPage = 1;
	start = 1;
	tableUrl = rootPath + "/query/getCustomerList.do";
	tableData = {
		number : custNo,
		type : custType,
		start : start,
		limit : pageSize
	};
	initCustListPage();
}

function reset(){
	$("#custNo").val("");
	custType_add_id = "";
	custTypeId = "";
	batch_custType_add_id = "";
	$("#custType_p").text("");
	$("#textfield").val("");
}

//删除信息
function removeCustomer(number,type,pdInstId,sourceNo) {
	if(sourceNo == 1 || sourceNo == 3){
//		var t ={
//				Stext:'该数据由后台导入，不可删除，请重新选择！'
//		};
//		operationTipsFailed(t);
		return;
	}
	var t={};

	var warn = {
		func : function(){
			$.ajax({
				url:rootPath + "/query/delCustByNo.do",
				type:"POST",
				data:{
					number:number,
					type:type,
					pdInstId:pdInstId
				},
				cache:false,
				success:function(msg){
					var msg=eval("("+msg+")");
					if(msg.message=="Y"){
						t = {
							Stext : "删除成功"
						};
						query();
						operationTipsTrue(t);
					}else{
						operationTipsFailed();
					}
					query();
				},
				error:function(msg){
					operationTipsFailed();
				}
			});
		}
	};
	operationTipsWarn(warn);
}

var custType_add_id = ""; //新增用户类型 对应id
var custType_add = ""; //新增用户类型
var custNoAdd = "";//新增用户号码

function showFrame(){
	resetAlert();
	$("#custType_add").find("li").on("click", function () {
		custType_add_id = $(this).val();
		custType_add = $(this).text();
	});
	$("#batch_custType_add").find("li").on("click", function () {
		batch_custType_add_id = $(this).val();
		batch_custType_add = $(this).text();
	});
}


var batch_custType_add_id ="";
var batch_custType_add = "";

function batchAdd(){document.getElementById('fileText').value=this.value
	resetAlert();
	$("#batch_custType_add").find("li").on("click", function () {
		batch_custType_add_id = $(this).val();
		batch_custType_add = $(this).text();
	});
}
function setFileText(obj){
	var fileField =obj.value;
	var index = fileField.lastIndexOf("\\");
	fileField  = fileField.substring(index +1,fileField.length);
	$("#fileText").val(fileField);
}
/*
 * 检查输入是否正确
 */
function notNullCheck(){
	var flag = true;

	$('.right-alert-content-main').find("input.required").each(function() {
		if($(this).val() === "") {
			$(this).siblings("p.error").remove();
			var top = $(this).height();
			$("<p class='check error'>这是必填字段  </p>").css("top", top).appendTo($(this).parent());
			flag = false;
			return false;
		} else {
			$(this).siblings("p.error").remove();
			flag = true;
		}
	});

	if(flag == false){
		return flag;
	}
	custNoAdd = $("#custNoAdd").val().trim();
	$.ajax({
		url : rootPath + "/query/getCustomerList.do",
		type : "POST",
		async : false,
		cache : false,
		dataType:"json",
		data :{
			pdInstId : encodeURI(custNoAdd,"UTF-8"),
			type:custType_add_id,
		},
		success: function ( data ) {
			if(data.custTotalCount==1){
				returnFlag = false;
				errorCheck($('#custNoAdd'),"该类型实例号码已存在，请重新输入");
			}else{
				returnFlag = true;
			}
		},
		error : function() {
			operationTipsFailed();
		}
	});
	return returnFlag;
}

/*
 * 保存信息
 */
function save() {
	if(!notNullCheck()){
		return false;
	}
	setBtnCss('addSaveBtn');
	if($("#custTypeAdd").text()==""){
		var t ={
			Stext:'请选择用户类型！'
		};
		operationTipsFailed(t);
		cancelBtnCss('addSaveBtn');
		return;
	}
	document.getElementById('addSaveBtn').disabled=true;
	var params = {
		pdInstId:custNoAdd,
		custType:custType_add_id,
	};
	$.ajax({
		url : rootPath + "/query/addCustomer.do",
		type : "POST",
		async : false,
		cache : false,
		data : params,
		success: function ( response ) {
			var result=eval("("+response+")");
			if(result.resultCode=="0"){
				var t = {
					Stext : '保存成功',
					func : function(){
						$('.right-alert').animate({
							marginRight: "-875px",
						},300).fadeOut();
						$("body").css("overflow","hidden");
						query();
					}
				};
				document.getElementById('addSaveBtn').disabled=false;
				query();
				reset();
				operationTipsTrue(t);
			}else{
				document.getElementById('addSaveBtn').disabled=false;
				var t ={
					Stext:result.resultMsg
				};
				operationTipsFailed(t);
				cancelBtnCss('addSaveBtn');
			}
		},
		error : function() {
			document.getElementById('addSaveBtn').disabled=false;
			operationTipsFailed();
			cancelBtnCss('addSaveBtn');
		}
	});

}
function batchImport(){
	setBtnCss('batchAddSaveBtn');
	var fileData = new FormData(document.forms.namedItem("formdata" ));
	fileData.append("custType",batch_custType_add_id);
	var fileUrl = $("#fileText").val();

	if($("#batch-custTypeAdd").text()==""){
		var t ={
			Stext:'请选择用户类型！'
		};
		operationTipsFailed(t);
		cancelBtnCss('batchAddSaveBtn');
		return;
	}
	var isFileNmaeEnd = fileUrl.endsWith(".csv")||fileUrl.endsWith(".xlsx")||fileUrl.endsWith(".xls");
	if (!isFileNmaeEnd) {
		var t ={
			Stext:'请先选择CSV或EXCEL文件！EXCEL仅支持xlsx和xls后缀文件!'
		};
		operationTipsFailed(t);
		cancelBtnCss('batchAddSaveBtn');
		return;
	}
	document.getElementById('batchAddSaveBtn').disabled=true;
//	var params = {
//			fileUrl:fileUrl,
//			custType:batch_custType_add_id,
//			file:fileData
//	};
	$.ajax({
		url : rootPath + "/query/batchAdd.do",
		type : "POST",
		processData: false,  // 不处理数据
		contentType: false ,  // 不设置内容类型
		async : true,
		cache : false,
		data : fileData,
		success: function ( response ) {
			var result=eval("("+response+")");

			if(result.resultCode=="0"){
				var t = {
					Stext : '成功导入【'+result.realImportNum+'】条数据 !',
					func : function(){
						$('.right-alert').animate({
							marginRight: "-875px",
						},300).fadeOut();
						$("body").css("overflow","hidden");
						query();
					}
				};
				document.getElementById('batchAddSaveBtn').disabled=false;
				query();
				reset();
				if(result.duplicateNumList.length>0 ||(result.unMatchPdInstNumList!=undefined && result.unMatchPdInstNumList.length>0)){
					t.Stext= t.Stext+'<br/><br/><a style="color:red;">文件存在异常数据,请查看下载文件<a/>';
					operationTipsTrue(t);
				}else{
					if(result.selfDupNum>0){
						t.Stext = t.Stext+'<br/><br/><a style="color:red;">'+'文件本身重复过滤：【'+result.selfDupNum+ '】条<a/>';
					}
					operationTipsTrue(t);
				}
				if(result.duplicateNumList.length>0){
					var detail ="【文件本身重复过滤："+result.selfDupNum+ "条;导入过滤已存在数据："+result.duplicateNum+" 条;实际导入： "+result.realImportNum+ " 条;】以下是导入过滤已存在数据:";
					var exportData = list2Str(detail,result.duplicateNumList);
					exportRaw("errorDetail_"+getTime()+".csv",exportData);
				}
				if(result.unMatchPdInstNumList!=undefined && result.unMatchPdInstNumList.length>0){
					var detail ="无匹配号码的实例共"+result.unMatchPdInstNum+"条数据:";
					var exportData = list2Str(detail,result.unMatchPdInstNumList);
					exportRaw("unMatchPdInstNum_"+getTime()+".csv",exportData);
				}
			}else{
				document.getElementById('batchAddSaveBtn').disabled=false;
				var t ={
					Stext:result.resultMsg
				};
				operationTipsFailed(t);
				cancelBtnCss('batchAddSaveBtn');
			}
//			if(result.message=="Y"){
//
//			}else{
//				document.getElementById('batchAddSaveBtn').disabled=false;
//				var t ={
//						Stext:'该文件存在无匹配信息号码或存在重复类型号码，请检查文件信息是否有误！'
//				};
//				operationTipsFailed(t);
//				cancelBtnCss('batchAddSaveBtn');
//			}
		},
		error : function() {
			document.getElementById('batchAddSaveBtn').disabled=false;
			operationTipsFailed();
			cancelBtnCss('batchAddSaveBtn');
		}
	});

}

function errorCheck(obj, content) {
	var top = obj.height();
	obj.siblings("p.check").remove();
	$("<p class='check error'><i class='iconfont icon-false-circle'></i>" + content + "</p>").css("top", top).appendTo(obj.parent());
}

function resetAlert(){
	$("#alertBtn button.reset").show();
	$(".iconfont").addClass('icon-bitian');
	$("#custNoAdd").val("");
	$("#fileText").val("");
	$('.form-select-btn p').html("");
	$('.right-alert-content-main').find('.error').remove();
	var obj = document.getElementById("fileField") ;
	obj.outerHTML=obj.outerHTML;
}


//失去焦点时验证input必填、手机号
$("input.required").blur(function() {
	if($(this).val().trim() === "") {
		$(this).siblings("p.error").remove();
		var top = $(this).height();
		$("<p class='check error'>这是必填字段</p>").css("top", top).appendTo($(this).parent());
	} else {
		$(this).siblings("p.error").remove();
	}
});

//下拉框点击下拉按钮时验证必选代码
$('.form-right .form-select-btn').click(function() {
	if($(this).children("p").is('.required')&&$(this).children("p.required").text() === "") {
		$(this).children("p.required").siblings("span.error").remove();
		var top = $(this).children("p.required").height();
		$("<span class='check error'>这是必填字段</span>").css("top", top).appendTo($(this));
	} else {
		$(this).children("p.required").siblings("span.error").remove();
	}
	$(this).siblings(".form-select-menu").one('click', 'li', function() {
		$(this).parent().siblings("button").find("span.error").remove();
	});
});

//设置保存和导入按钮变灰
function setBtnCss (obj){
	document.getElementById(obj).style.cssText = "background-color:#ADADB6; border-color:#ADADB6;"
}

//设置保存和导入按钮变灰
function cancelBtnCss (obj){
	document.getElementById(obj).removeAttribute('style');
}

//下载导入文本模板
function importExample(){
	$("#batchAddDemo").attr("title","" +
		"温馨提示：(点击下载)\n" +
		"1、创建方式：\n  " +
		"(1)新建一个文本文档;\n  " +
		"(2)打开“xxx.txt”，进行编辑;\n  " +
		"(3)文件内容以英文逗号分隔;\n  " +
		"(4)以“xxx.csv”,保存文本;\n " +
		"(5)导入内容为用户实例;\n" +
		"2、示例模板：\n  " +
		"(1)点击示例下载模板;\n  " +
		"(2)用记事本打开文本查看;\n  " +
		"(3)参照示例模本创建csv文本导入;");
}

//设置导入文本温馨提示
function downImpExample(fileName){
	location.href=rootPath+"/query/downImportExa.do?fileName="+fileName;
}

function getTime(){     	//获取时间
	var date=new Date();
	var year=date.getFullYear();
	var month = (date.getMonth()+1) > 9 ? (date.getMonth()+1) : "0" + (date.getMonth()+1);
	var day = (date.getDate()) > 9 ? (date.getDate()) : "0" + (date.getDate());
	var hour=date.getHours();
	var minute=date.getMinutes();
	var second=date.getSeconds();
	//这样写显示时间在1~9会挤占空间；所以要在1~9的数字前补零;
	if (hour<10) {
		hour='0'+hour;
	}
	if (minute<10) {
		minute='0'+minute;
	}
	if (second<10) {
		second='0'+second;
	}
	var time=year+'_'+month+'_'+day+'_'+hour+'_'+minute+'_'+second;
	return time;
}
/**********************异常号码自动下载start*****************/
function fakeClick(obj) {
	var ev = document.createEvent("MouseEvents");
	ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	obj.dispatchEvent(ev);
}

function exportRaw(name, data) {
	var urlObject = window.URL || window.webkitURL || window;
	data ="\ufeff"+data;
	var export_blob = new Blob([data],{type:'text/csv,charset=UTF-8'});
	var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
	save_link.href = urlObject.createObjectURL(export_blob);
	save_link.download = name;
	fakeClick(save_link);
}
//list数据换行输出
function list2Str(str,data){
	str +=",\n";
	for(j = 0,len=data.length; j < len; j++) {
		if(j!=len-1){
			str+=data[j]+"\n";
		}else{
			str+=data[j]+",\n";
		}
	}
	return str;
}
/**********************异常号码自动下载end*****************/



/**
 *
 * @param str
 * @returns
 */
function hideString(str){
	var hiddenStr;
	str=str.trim();
	var len = str.length;
	if(len>11 || len==11){
		hiddenStr = this.hideCode(str,3,4);

	}else if((3<len &&len<7 ) || len==7){
		hiddenStr = this.hideCode(str,1,2);

	}else if((7<len &&len<10 ) || len==10){
		hiddenStr = this.hideCode(str,2,3);
	}else if((1<len &&len<3 )|| len==3){
		hiddenStr=this.hideCode(str,1,0);
	}else{
		hiddenStr =str;
	}

	return hiddenStr;
}
/**
 * 关键信息隐藏
 * @param str 字符串
 * @param frontLen 字符串前面保留位数
 * @param endLen 字符串后面保留位数
 * @returns {string}
 */
function hideCode(str, frontLen, endLen) {
	var len = str.length - frontLen - endLen;
	var xing = '';
	for (var i = 0; i < len; i++) {
		xing += '*';
	}
	return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
}
