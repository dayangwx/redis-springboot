<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%	String path = request.getContextPath() + "/static";%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta charset="UTF-8">
<script type="text/javascript">	
		var rootPath =  "<%=request.getContextPath()%>";
</script>
<title>用户清单</title>
<link rel="stylesheet" href="<%=path%>/css/normal.css" />
<link rel="stylesheet" href="<%=path%>/css/font/iconfont.css" />
<link rel="stylesheet" href="<%=path%>/css/current.css" />
<link rel="stylesheet" href="<%=path%>/css/ui.css" />
<link rel="stylesheet" href="<%=path%>/css/table.css" />
<link rel="stylesheet" href="<%=path%>/css/activity-audit.css" />
<link rel="stylesheet" href="<%=path%>/css/iframe.css" />
</head>
<body>
	<!---<<<<  内容区域外层    >>>>-->
	<div class="viewFramework-index-body">
		<!---<<<<  标题    >>>>-->
		<span class="viewFramework-index-title">红黑名单管理</span>
		<button id="batchAddShow" type="button"
			class="rightTopBtn iconTextBtn-import" style="position: absolute; top: 77; right: 100px; height: 32px;" onclick="batchAdd()">
			<i class="iconfont icon-arrowdropdown"></i>批量导入
		</button>
		<button id="showFrame" type="button"
			class="rightTopBtn iconTextBtn-import" onclick="showFrame()">
			<i class="iconfont icon-add"></i>新增
		</button>
		<!---<<<<  tabs div    >>>>-->
		<!-- <div class="viewFramework-index-tabs"> -->
		<!---<<<<  tabs按钮    >>>>-->
		<div class="tabs_box">
			<!---<<<<  tabs div 外层    >>>>-->
			<div class="tabs-wapper open"
				style="margin-bottom: 100px; float: left; margin-left: 0px;">
				<div class="top-part">
					<li class="form-items">
						<div class="form-left">
							<span>用户号码：</span>
						</div>
						<div class="form-right">
							<input type="text" id="custNo" />
						</div>
					</li>
					<li class="form-items">
						<div id="customer-type" class="form-items">
							<div class="form-left">
								<span>类型：</span>
							</div>
							<div class="form-right">
								<button type="button" class="form-select-btn">
									<p id="custType_p"></p>
									<div>
										<i class="iconfont icon-expandmore"></i>
									</div>
								</button>
								<ul class="form-select-menu" id="ul_custType_all"></ul>
							</div>
						</div>
					</li>
					<li class="form-items">
						<div class="form-btns top-part-btn">
							<button class="iconTextBtn-import" onclick="query()">
								<i class="iconfont icon-search"></i>查询
							</button>
							<!-- <button id="showFrame" class="iconTextBtn-import" style="margin-left: 10px;" onclick="showFrame('N',0)">
									<i class="iconfont icon-add"></i>新增
								</button> -->
							<!-- <div class="form-right" style="margin-left: 10px;">
								<input type='text' name='textfield' id='textfield'
									readonly="readonly" />
							</div> -->
							<!-- <input type="file" name="fileField"
								style="position: absolute; top: 77; left: 777px; height: 35px; filter: alpha(opacity : 0); opacity: 0; width: 323px"
								id="fileField" size="20"
								onchange="document.getElementById('textfield').value=this.value" />

							<button type='button' class='iconTextBtn-import'
								style="margin-left: 10px;">
								<i class="iconfont icon-search"></i>浏览
							</button>
							<button type="file" id="showFrame" class="iconTextBtn-import"
								style="margin-left: 10px;">
								<i class="iconfont icon-down"></i>批量导入
							</button> -->
							<button class="TextBtn reset" type="button" onclick="reset()">重置</button>
						</div>

					</li>
				</div>

				<!---<<<<  tabs div 主体   >>>>-->
				<div class="tabs_body">
					<!---<<<<  表格   >>>>-->
					<table id="conTable">
						<!---<<<<  表格头部   >>>>-->
						<thead>
							<th class="name">用户号码</th>
							<th>用户类型</th>
							<th>渠道</th>
							<th>免打扰时段</th>
							<th>描述</th>
							<th>数据来源</th>
							<th>创建人</th>
							<!-- <th class="current-state">当前状态</th> -->
							<th class="operation">操作</th>
						</thead>
						<!---<<<<  表格正文   >>>>-->
						<tbody id="customerList">

						</tbody>

						<!---<<<<  表格底部   >>>>-->
						<tfoot>
							<tr>
								<td colspan="8">
									<div class="page-box pull-right">
										<div class="pagination-info">
											共有<font class="totalCount"></font>条，每页显示<font class="limit"></font>条
										</div>
										<ul class="pagination">

										</ul>
										<div class="pagination-goto">
											<input type="text" class="ipt form-control gotoPageNo">
											<button type="button" onclick="jumpPage()"
												class="btn btn-default goBtn">GO</button>
											<input type="hidden" class="totalCount" name="totalCount" />
										</div>
										<p class="page-tips">
											请输入1-<span id="conTips"></span>之间的有效页码
										</p>
									</div>
								</td>
							</tr>
						</tfoot>
					</table>
				</div>
			</div>
		</div>
		<!-- <div> -->
	</div>

	<!---<<<<   右弹窗   >>>>-->
	<div class="right-alert" id="add_right_alert">
		<div class="right-alert-closeBg">
			<div class="right-alert-boxShadow" style="width: 0px;"></div>
		</div>
		<div class="right-alert-main" style="width: 597px;">
			<div class="right-alert_head">
				<button type="button" class="right-alert-closeBtn">
					<i class="iconfont icon-close"></i>
				</button>
				<span class="right-alert_head_title"></span>
			</div>
			<div class="right-alert_content">
				<div class="right-alert-content-main" style="display: block;">
					<ul class="edit-ul">
						<li class="form-items">
							<!---<<<<  列表   >>>>-->
							<div class="form-left">
								<span><i class="iconfont icon-bitian"></i>用户号码：</span>
							</div>
							<div class="form-right">
								<input type="text" id="custNoAdd" class="required" />
							</div>
						</li>
						<li class="form-items"  style="position: absolute; top: 287px; right: 151px;" >
							<div class="form-left" >
								<span><i class="iconfont icon-bitian"></i>用户类型：</span>
							</div>
							<div class="form-right" id="custTypeSelect" >
								<button type="button" class="form-select-btn" id="add-btn-select">
									<p id="custTypeAdd" class="required"></p>
									<div>
										<i class="iconfont icon-expandmore"></i>
									</div>
								</button>
								<ul class="form-select-menu" id="custType_add">
								</ul>
							</div>
						</li>
						
						<!-- <li class="form-items">
							<div class="form-left">
								<span><i class="iconfont icon-bitian"></i>类型描述：</span>
							</div>
							<div class="form-right" id="custDescSelect">
								<button type="button" class="form-select-btn">
									<p id="custDescAdd" class="required"></p>
									<div>
										<i class="iconfont icon-expandmore"></i>
									</div>
								</button>
								<ul class="form-select-menu" id="custDescAddSelect">
								</ul>
							</div>
						</li> -->
						<div class="form-btns col-full" style="position: absolute; top: 350px; right: 0px;">
							<div id="alertBtn">
								<!-- <button type="button" class="TextBtn cancel">取消</button> -->
								<button class="TextBtn reset" type="button"
									onclick="resetAlert();">重置</button>
								<button type="button" id="addSaveBtn" class="TextBtn-import" onclick="save()">保存</button>
							</div>
						</div>
					</ul>
					
					<ul class="view-ul">
						<li class="form-items">
							<div class="form-left" >
								<span><i class="iconfont icon-bitian"></i>用户类型：</span>
							</div>
							<div class="form-right" id="batch-custTypeSelect" >
								<button type="button" class="form-select-btn" id="batch-btn-select">
									<p id="batch-custTypeAdd" class="required"></p>
									<div>
										<i class="iconfont icon-expandmore"></i>
									</div>
								</button>
								<ul class="form-select-menu" id="batch_custType_add">
								</ul>
							</div>
						</li>
						<li class="form-items"  style="position: absolute; top: 287px; right: 151px;">
							<!---<<<<  列表   >>>>-->
							<div class="form-left">
								<span><i class="iconfont icon-bitian" id="textfield"></i>导入路径：</span>
							</div>
							<div class="form-right">
							<form action=""  name="formdata" enctype="multipart/form-data">
								<input type="text" id="fileText"  />
								<input type="file"  id="fileField" name="fileField" style="position: absolute;
									   top: 0px; right: 0px; height: 35px;opacity: 0; width: 240px" size="20" 
									   onchange="setFileText(this)" />
						    </form>
							</div>
						</li>
						<div class="form-btns col-full" style="position: absolute; top: 350px; right: 0px;">
							<div id="alertBtn">
								<!-- <button type="button" class="TextBtn cancel">取消</button> -->
								<button class="TextBtn reset" type="button"
									onclick="resetAlert();">重置</button>
								<button type="button" id="batchAddSaveBtn" class="TextBtn-import" onclick="batchImport()">导入</button>
							</div>
						</div>
					</ul>
				</div>
			</div>
		</div>
	</div>
	
	<script type="text/javascript" src="<%=path%>/js/jquery.min.js"></script>
	<script type="text/javascript" src="<%=path%>/js/jquery.twbsPagination.js"></script>
	<script type="text/javascript" src="<%=path%>/js/jquery.treemenu.js"></script>
	<script type="text/javascript" src="<%=path%>/js/jquery-smartMenu.js"></script>
	<script type="text/javascript" src="<%=path%>/js/current.js"></script>
	<script type="text/javascript" src="<%=path%>/js/customerList.js"></script>
	<script type="text/javascript" src="<%=path%>/js/WdatePicker.js"></script>
	<script type="text/javascript" src="<%=path%>/js/diction-template.js"></script>

</body>
</html>