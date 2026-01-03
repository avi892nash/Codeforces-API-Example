
import { Codeforces } from './codeforces.js';

var codeforces = new Codeforces();
var tmp;

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('button0').addEventListener('click', sendURL);
	document.getElementById('methodList').addEventListener('change', update);
	document.getElementById('input0').addEventListener('keyup', function(event) {
		if(event.keyCode == 13) {
			document.getElementById('button0').click();
		}
	});
});
function ev(){
	
	codeforces.obj = JSON.parse(this.responseText);
	console.log(codeforces.obj);
	codeforces.alpha = 0;

	document.getElementById("para").innerHTML = "Welcome";
	display(codeforces.obj,codeforces.meathod);
}

function er(){
	alert("Unable to fetch data  ...check the  input or your  internet connection");
	codeforces.alpha = 0;

	document.getElementById("para").innerHTML = "Welcome";
}


function update(){
	document.getElementById("user").style.display = "none";
	document.getElementById("blogEntry").style.display = "none";
	document.getElementById("recentAction").style.display = "none";
	document.getElementById("ratingChange").style.display = "none";
	document.getElementById("Problem").style.display = "none";

	codeforces.meathod = document.getElementsByName("meathodList")[0].value;
	var hea = document.getElementById("top");
	document.getElementById("input0").style.display = "";

	if(codeforces.meathod == "user"){

		hea.innerHTML = " Enter Your Codeforces Handle";
		codeforces.url = "https://codeforces.com/api/user.info?handles=";
	}else if(codeforces.meathod == "blogEntry"){

		hea.innerHTML = " Enter Id Of The Blog";
		codeforces.url = "https://codeforces.com/api/blogEntry.view?blogEntryId=";
	}else if(codeforces.meathod == "recentAction"){

		//max 30
		hea.innerHTML = "Submit To Get Max(30) Recent Action";
		document.getElementById("input0").style.display = "none";
		document.getElementById("recentAction").style.display = "none";
		codeforces.url = "https://codeforces.com/api/recentActions?maxCount=30";
	}else if(codeforces.meathod == "ratingChange"){

	document.getElementById("ratingChange").style.display = "none";
		hea.innerHTML = " Enter Your Codeforces Handle";
		codeforces.url = "https://codeforces.com/api/user.rating?handle=";
	}else if(codeforces.meathod == "contest"){

		hea.innerHTML = "Submit To Get contest with gym=true";
		document.getElementById("input0").style.display = "none";
		codeforces.url = "https://codeforces.com/api/contest.list?gym=true";
	}else if(codeforces.meathod == "problem"){

	document.getElementById("Problem").style.display = "none";
		hea.innerHTML = "Enter The Tag Of Problems";
		codeforces.url = "https://codeforces.com/api/problemset.problems?tags=";
	}else if(codeforces.meathod == "submission"){

		//max = 10
		hea.innerHTML = "Submit To Get Recent Submission max(10)";
		document.getElementById("input0").style.display = "none";
		codeforces.url = "https://codeforces.com/api/problemset.recentStatus?count=10";
	}
}

function sendURL(){
	document.getElementById("para").innerHTML = "Loading...";
	codeforces.reset();
	update();
	if(codeforces.meathod != "submission"&&codeforces.meathod != "contest"&&codeforces.meathod != "recentAction")
	codeforces.url+=document.getElementById("input0").value;
	codeforces.sendURL(ev,er);
}

function display(obj,meathod){
		
		
	if(meathod == "user"){
		obj = obj.result[0];
		console.log(document.getElementById("avatar"));
		document.getElementById("avatar").src = obj.avatar;
		document.getElementById("titlePhoto").src = obj.titlePhoto;
		document.getElementById("handle").innerHTML = "Handle : "+obj.handle;
		document.getElementById("rank").innerHTML = "Rank : "+obj.rank;
		document.getElementById("maxRank").innerHTML = "MaxRank : "+obj.maxRank;
		document.getElementById("rating").innerHTML = "Rank : "+obj.rating;
		document.getElementById("maxRating").innerHTML = "Rank : "+obj.maxRating;
		document.getElementById("firstName").innerHTML = "";
		document.getElementById("lastName").innerHTML = "";

		if(obj.hasOwnProperty("firstName")){
			document.getElementById("firstName").innerHTML = "First Name : "+obj.firstName;			 
		}	

		if(obj.hasOwnProperty("lastName")){
			document.getElementById("lastName").innerHTML = "Last Name : "+obj.lastName;
		}
		document.getElementById("user").style.display = "";

		
	}else if(meathod == "blogEntry"){
		obj = obj.result;
		console.log(document.getElementById("titl"));
		document.getElementById("titl").innerHTML = obj.title;
		document.getElementById("authorHandle").innerHTML ="Author : " + obj.authorHandle + " ( " +obj.originalLocale+ " )";
		document.getElementById("tags").innerHTML = "Tags : " + obj.tags;
		document.getElementById("content").innerHTML = obj.content;
		document.getElementById("blogEntry").style.display="";
		document.getElementById("comment").innerHTML = "";
		getComment("https://codeforces.com/api/blogEntry.comments?blogEntryId="+obj.id);

	}else if(meathod == "blogEntryComment"){
		var jagah = document.getElementById("comment");
		console.log(obj);

		for(var i=0; i<obj.result.length; ++i){
			var div = document.createElement("div");
			
			var p = document.createElement("div");

			var img = document.createElement("img");
				
				div.id = obj.result[i].id;
				p.id = obj.result[i].commentatorHandle;
				img.id = "true:"+obj.result[i].commentatorHandle;
				p.appendChild(img);
				p.innerHTML+="<br><b>"+obj.result[i].commentatorHandle + " : </b>";

			//p.style.float = "left";
			div.appendChild(p);
			div.style["border-style"]="solid";
			div.style["border-radius"]="25px";
			div.style["padding-top"] = "10px";
			div.style["padding-bottom"] = "10px";
			
			div.innerHTML+=obj.result[i].text;
			if(!obj.result[i].parentCommentId){
			div.style["padding-left"]="10px";
			jagah.appendChild(div);
			}
			else{
			div.style["padding-left"]="40px";
			document.getElementById(""+obj.result[i].parentCommentId).appendChild(div);

			
			}
			
		}

	}else if(meathod == "recentAction"){

			document.getElementById("recentAction-table").innerHTML = "<tr> <th>Blog ID</th> <th>Tags</th><th>Author</th></tr>";
			document.getElementById("recentAction").style.display = "";
		for (var i = 0 ; i < obj.result.length ; i++) {
			var ob = obj.result[i];
			//console.log(ob);
			var tr = document.createElement("tr");
			var td ;
			td = document.createElement("td");
			td.innerHTML += ob.blogEntry.id;
			tr.appendChild(td);
			td = document.createElement("td");
			td.innerHTML += ob.blogEntry.tags;
			tr.appendChild(td);
			td = document.createElement("td");
			td.innerHTML += ob.blogEntry.authorHandle;
			tr.appendChild(td);
			document.getElementById("recentAction-table").appendChild(tr);

		}
	}else if(meathod == "ratingChange"){

	document.getElementById("ratingChange-table").innerHTML = "<tr>	<th>Change of Rating</th><th>Contest Name</th><th>Rank</th><th>New Rating</th></tr>";
	document.getElementById("ratingChange").style.display = "";
		for (var i = 0 ; i < obj.result.length ; i++) {
			var ob = obj.result[i];
			//console.log(ob);
			var tr = document.createElement("tr");
			var td ;
			td = document.createElement("td");
			td.innerHTML += ""+ob.newRating - ob.oldRating;
			tr.appendChild(td);
			td = document.createElement("td");
			td.innerHTML += ob.contestName + "( id = " + ob.contestId+ " )" ;
			tr.appendChild(td);
			td = document.createElement("td");
			td.innerHTML += ob.rank;
			tr.appendChild(td);
			td = document.createElement("td");
			td.innerHTML += ob.newRating;
			tr.appendChild(td);
			document.getElementById("ratingChange-table").appendChild(tr);

		}
	}else if(meathod == "problem"){

		document.getElementById("Problem").style.display = "";
		document.getElementById("Problem").innerHTML = "";
		for (var i = 0;i < obj.result.problems.length ; i++) {
			var ob = obj.result.problems[i];
			var p = document.createElement("p");
			p.innerHTML = i+1 + "  Contest ID : "+ ob.contestId + "<br>";
			p.innerHTML += "Problem : "+ ob.index + " " +ob.name;
			document.getElementById("Problem").appendChild(p);
		}
		if(obj.result.problems.length == 0){
			document.getElementById("Problem").innerHTML ="<h2>No question found with this tag</h2>";
		}

	}else if(meathod == "contest"){

		document.getElementById("Problem").style.display = "";
		document.getElementById("Problem").innerHTML = "";
		for (var i = 0; i<obj.result.length ; i++) {
			var ob = obj.result[i];
			var p = document.createElement("p");
			var st = "Name : "+ob.name+" Phase : "+ ob.phase+"<br>";
			st += "ICPC Region : " +ob.icpcRegion +" Prepared By : "+ ob.preparedBy + "<br>";
			st += "City : "+ob.city + " Country : "+ob.country+"<br>";
			st += "Season : "+ob.season + "<br>";
			p.innerHTML = st;
			document.getElementById('Problem').appendChild(p);
		}
			
	}else if(meathod == "submission"){

		document.getElementById("Problem").style.display = "";
		document.getElementById("Problem").innerHTML = "";
		for (var i = 0; i<obj.result.length ; i++) {
			var ob = obj.result[i];
			var p = document.createElement("p");
			var st ="";
			if(ob.verdict){
				st+= "<h2>" + ob.verdict + "</h2>"; 
			}
			st += "Contest Id : "+ob.contestId + "<br>";
			st += "Problem : "+ ob.problem.index + " " + ob.problem.name +"<br>";
			st += "Type : " + ob.problem.type+" Tags : "+ ob.problem.tags+"<br>";

			st += "Members : ";
			for(var j=0;j<ob.author.members.length; ++j)
			st += ob.author.members[j].handle+ " ";

			st += "<br>";
			st += "Passed Test Case : "+ ob.passedTestCount+"<br>";
			st += "<b> Programming Language </b>" + ob.programmingLanguage+"<br>"; 
			
			p.innerHTML = st;
			document.getElementById('Problem').appendChild(p);
		}

	}
	
	para.style.display = "";
}









/*
A aeroplane is  flying
Voutch  is so hard
I am very happy for
Not having good tricks
A table is turned 
So that i win and u will
Hesitage
*/







function getComment(url){

	codeforces.url = url;
	codeforces.meathod = "blogEntryComment";
	codeforces.sendURL(ev,er);
}
