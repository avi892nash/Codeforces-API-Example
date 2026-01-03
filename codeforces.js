

export function Codeforces(){
	this.alpha = 0;
	this.url = "https://codeforces.com/api/user.info?handles=";
	this.meathod = "user";
	this.obj = null;
	this.reset = function(){
		this.url="https://codeforces.com/api/user.info?handles=";
		this.meathod = "user";
		this.obj=null;
		}

	this.sendURL = function(loadEventFunction,errorEventFunction){
		if(this.alpha==0){
			this.alpha=1;
			var oReq = new XMLHttpRequest();
			oReq.addEventListener("load",loadEventFunction);
			oReq.addEventListener("error",errorEventFunction);
			//load event ...not error event
			//console.log(this.url);
			oReq.open("GET",this.url);
			oReq.send();
		}
	}
}



