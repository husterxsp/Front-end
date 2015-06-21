	var storage  = window.localStorage;
	var todolist = JSON.parse( storage.getItem("todolist") ) || null;

	var items    = [];
	if(todolist) {
		items = todolist.items;
	}
	var taskNum = 0;	// taskNum用于记录taskid

	function $(a){
		return document.querySelector(a);
	}
	
	function addTask(){
		$("#addTaskLink").style.display = "none";
		$("#addTask").style.display = "block";
	}

	$("#taskCancle").onclick = function(){
		$("#addTaskLink").style.display = "block";
		$("#addTask").style.display = "none";
	}

	$("#addTaskBtn").onclick = function(){
		var content  = $("input[name='content']").value;
		var	itemIndex = $("select").selectedIndex;
		var item 	 = $("select").options[itemIndex].text;
		var	deadline = $("input[name='deadline']").value;
		var	task 	 = {"id": taskNum,"content": content, "itemIndex":itemIndex,"item":item,"deadline":deadline};

		if(!content) {
			alert("请输入任务描述");
			return;
		}
		if (todolist) {
			if(Value == "up") {
				items.splice(taskNum-1,0,task);
				Value = "";
			}else if(Value == "down") {
				items.splice(taskNum,0,task);
				Value = "";
			}else {
				// 任务修改部分
				for(var i=0;i<items.length;i++){
					if(todolist.items[i].id === task.id){
						todolist.items[i] = task;
						break;
					}
				}
				//不需修改直接添加到末尾
				if(i === todolist.items.length){
					items.push(task);
				}
			}

			// 刷新存储id
			upID();
			upStorage();
		}else {
			storage.setItem("todolist",JSON.stringify({"items":[task]}));
		}

		location.reload();
	}

	function upID(){
		for( var i=0;i<items.length;i++){
			items[i].id = i+1;
		}
		upStorage();
	}

	function upStorage(){
		storage.setItem( "todolist",JSON.stringify({"items":items}) );
	}

	// 刷新ul列表
	showStorage();
	function showStorage(){
		if(todolist){
		    upID();
			for(var i=0;i<items.length;i++){
				$("#taskList").insertAdjacentHTML("beforeend",
					"<li><label><input type='checkbox' class='check' id="+items[i].id+"><span>"
					+items[i].id+" ,"+items[i].content+" ,"+items[i].item+" ,"+items[i].deadline+
					"</span></label><span class='icon menu'>···</span></li>");
			}
		}
	}

	// 移除操作
	var remove = document.querySelectorAll(".check");
	for( var i=0;i<remove.length;i++){
		(function(i){
			//remTask ,remLocation用于记忆删除的信息，便于回复以及操作storage
			var remTask,remLocation;
			remove[i].onclick = function(){
				var	removeId   = remove[i].getAttribute("id");
				if( remove[i].checked ){
					for(var j=0;j<items.length;j++){
						if(items[j].id == removeId){
							remTask 	 = items[j];
							remLocation  = j;
							items.splice(j,1);
							break;
						}
					}
					upStorage();
				}else{
					items.splice(remLocation,0,remTask);
					upStorage();
				}

			};
		}(i));
	}

	// 显示icon menu操作
	var taskList = document.querySelectorAll("ul#taskList li");
	for( var i=0;i<taskList.length;i++){
		(function(i){
			taskList[i].onmouseover = function(){
				taskList[i].style.backgroundColor = "#f5f5f5";
				taskList[i].children[1].style.visibility = "visible";
			}
			taskList[i].onmouseout = function(){
				taskList[i].style.backgroundColor = "#fff";
				taskList[i].children[1].style.visibility = "hidden";
			}
		}(i))
	}

	// 为icon绑定显示菜单操作
	var showIconMenu = document.querySelectorAll(".icon.menu");
	var iconMenuNum;
	for( var i=0;i<showIconMenu.length;i++){
		(function(i){
			showIconMenu[i].onclick = function(e){
				$("#iconMenu").style.top = e.clientY-10+"px";
				$("#iconMenu").style.left = e.clientX-30+"px";
				$("#iconMenu").style.display = "block";
				iconMenuNum = i;	
			}

		}(i))
	}

	$("#iconMenu").onmouseout = function(e){
		if(e.target == $("#iconMenu") ){
			$("#iconMenu").style.display = "none";
		}
	}

	var Value = "";   //记录点击的事件
	// 添加任务到上方
	$(".addUp.menulist").onclick = function(){
		$("#iconMenu").style.display = "none";
		Value = "up";
		taskNum = items[iconMenuNum].id;
		addTask();
	}

	// 添加任务到下方
	$(".addDown.menulist").onclick = function(){
		$("#iconMenu").style.display = "none";
		Value = "down";
		taskNum = items[iconMenuNum].id;
		addTask();
	}

	// 编辑任务
	$(".edit.menulist").onclick = function(){
		$("#iconMenu").style.display = "none";
		$("input[name='content']").value 	= items[iconMenuNum].content;
		$("select").selectedIndex			= items[iconMenuNum].itemIndex;
		$("input[name='deadline']").value 	= items[iconMenuNum].deadline;
		taskNum = items[iconMenuNum].id;
		addTask();
	};

	//移除任务
	$(".remove.menulist").onclick = function(){
		$("#iconMenu").style.display = "none";
		var remove = document.querySelectorAll(".check");
		remove[iconMenuNum].click();
	};