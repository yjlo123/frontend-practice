
dbUtil.addUser({name:"user2", password:"pass2", email:"user2@gmail.com"});


for(var i = 0; i < 2; i++){
	dbUtil.addUser({name:randomId(5), password:randomId(10), email:randomId(5)+"@"+randomId(3)+".com"});
}

var userList = [];
var searchResult = [];
var orderBy = "id";
var page = {
	current: 1,
	limit: 5
}


$("#updateDialog").hide();
$("#message").hide();

$("#search-input").on('input', function() {
	if($(this).val() === ""){
		currentList = userList;
		updateUserTable(userList);
	}else{
		var val = $(this).val();
		searchResult = jQuery.grep(userList, function( a ) {
			return ( a["name"].indexOf(val) !== -1 );
		});
		currentList = searchResult;
		updateUserTable(searchResult);
	}
});

reloadAndUpdateUserTable();
//generatePagination();


function reloadAndUpdateUserTable(){
	//userList = dbUtil.getUser(page.limit*(page.current-1), page.limit);
	userList = dbUtil.getAllUser();
	currentList = userList;
	sortAndUpdateUserTable(orderBy);
}

function updateUserTable(list){
	$("#db-json").text(JSON.stringify(list, null, 4));

	var userTable = $("#userTable");
	userTable.find('tr').remove();
	var columns = ["id", "name", "password", "email"];

	var headers = $("<tr>");
	$(columns).each(function(i, e){
		var header = $("<th>").html($("<a>").html(e)
											.attr("href", "#")
											.attr("onclick", "sortAndUpdateUserTable('"+e+"')"));
		headers.append(header);
	})
	headers.append($("<th>").text("Ops"));
	userTable.append(headers);

	$(list).each(function(i, e){
		var row = $("<tr>");
		$.each(e, function(key, value){
			if(columns.indexOf(key) !== -1){
				row.append($("<td>").html(value));
			}
		});
		var ops = $("<td>");
		ops.append($("<button>")
					.attr("class", "btn btn-default btn-sm")
					.attr("onclick", "editUser("+i+")")
					.text("Edit"));
		ops.append($("<span>").html(" "));
		ops.append($("<button>")
					.attr("class", "btn btn-danger btn-sm")
					.attr("onclick", "delUser("+i+")")
					.text("Del"));
		row.append(ops);
		userTable.append(row);
	});
}

function addNewUser(){
	var newUsername = $("#new-name");
	var newEmail = $("#new-email");
	if(newUsername.val() && newEmail.val()){
		dbUtil.addUser({name:newUsername.val(), password:randomId(10), email:newEmail.val()});
		reloadAndUpdateUserTable();
		newUsername.val("");
		newEmail.val("");
		showAlert("New user added.", "success");
	}else{
		showAlert("Empty field. Random data used.", "warning");
		dbUtil.addUser({name:randomId(5), password:randomId(10), email:randomId(5)+"@"+randomId(3)+".com"});
		reloadAndUpdateUserTable();
	}
}

function delUser(index){
	var uid = currentList[index]["id"];
	dbUtil.delUser(uid);
	showAlert("User [ " + currentList[index]["name"] + " ] is deleted.", "success");
	reloadAndUpdateUserTable();
}

function editUser(index){
	$("#updateDialog").show();
	var curUser = currentList[index];
	$("#uid-edit").val(curUser["id"]);
	$("#uname-edit").val(curUser["name"]);
	$("#uemail-edit").val(curUser["email"]);
}

function updateUser(){
	var uid = $("#uid-edit");
	var newUsername = $("#uname-edit");
	var newEmail = $("#uemail-edit");
	if(newUsername.val() && newEmail.val()){
		dbUtil.updateUser({name:newUsername.val(), email:newEmail.val()}, uid.val());
		reloadAndUpdateUserTable();
		closeEdit();
		showAlert("Updated successfully.", "success");
	}else{
		showAlert("Empty field.", "danger");
	}
}

function closeEdit(){
	$('#updateDialog input[type="text"]').each(function(i, e){
		$(e).val("");
	});
	$("#updateDialog").hide();
}

var alertTimer;
function showAlert(message, type){
	$("#message").text(message).attr("class", "alert alert-"+type).show();
	//$("#message").delay(5000).fadeOut('slow');
	clearTimeout(alertTimer);
	alertTimer = setTimeout(function(){
					$("#message").fadeOut();
				}, 3000);
}

function sortAndUpdateUserTable(key) {
	orderBy = key;
	currentList = currentList.sort(function(a, b) {
		var x = a[key]; var y = b[key];
		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		//return ((x > y) ? -1 : ((x < y) ? 1 : 0));
	});
	updateUserTable(currentList);
}

function generatePagination(){
	var userCount = dbUtil.countUser()[0].num;
	var numOfPages = Math.ceil(userCount/page.limit);
	for(var i = 2; i < numOfPages+1; i++){
		$('<li><a href="#">'+i+'</a></li>').insertAfter('#pagination li:last-child');
	}
}




function randomId(n){
	var text = "";
	var possible = "abcdefghijkmnpqrstuvwxyz23456789";
	for( var i = 0; i < n; i++ )
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	return text;
}
