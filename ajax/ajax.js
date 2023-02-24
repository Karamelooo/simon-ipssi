class AjaxRequest {
	constructor() {
		this.xhttp = new XMLHttpRequest();
		this.res;
		this.data;
		this.init();
	}

	init(){
		this.getData();
	}

	sendRequest() {
		this.xhttp.open("POST", "ajax/ajax.php?action=send", true); 
		this.xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		this.data = "name="+game.firstName.value+"&score="+game.score+"&stage="+game.stage;
		this.xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				 this.res = this.responseText;
			}
		}
		this.xhttp.send(this.data);
	}

	getData() {
		this.xhttp.open("GET", "ajax/ajax.php?action=get", true); 
		this.xhttp.setRequestHeader("Content-Type", "application/json");
		this.xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				game.scoreboardData = JSON.parse(this.responseText);
				display.update = true;
				display.updateScoreboard();
			}
		}
		this.xhttp.send();
	}
}

