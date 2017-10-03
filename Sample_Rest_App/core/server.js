var http = require("http");
var employees = require("../controllers/employee");
var httpMsgs = require("/httpMsgs");
http.createServer(function(req, resp){
	switch(req.method){
		case "GET":
			if(req.url ==='/'){
				httpMsgs.showHome(req, resp);
			}
			else if(req.url ==='/employees'){
        		employees.getList(req, resp);
			}
			else{
				var empnoPatt = "[0-9]+";
				var patt = new RegExp("/employees/"+empnoPatt);
				if(patt.test(req.url)){
					patt = new RegExp(empnoPatt);
					var empno = patt.exec(req.url);
					employees.get(req, resp, empno);
				}
				else{
					httpMsgs.show404(req, resp);
				}
			}
			break;
		case "POST":
			if(req.url ==='/employees'){
				var reqBody = "";
				req.on("data", function(data){
					reqBody += data;
					if(reqBody.length>1e7){
							httpMsgs.show413(req, resp);
					}
				});
				req.on("end", function(){
					employees.add(req, resp, reqBody);
				});
			}
			else{
				httpMsgs.show404(req, resp);
			}
			break;
		case "UPDATE":
			if(req.url ==='/employees'){
				var reqBody = "";
				req.on("data", function(data){
					reqBody += data;
					if(reqBody.length>1e7){
							httpMsgs.show413(req, resp);
					}
					});
				req.on("end", function(){
				employees.update(req, resp, reqBody);
				});	
			}
			else{
				httpMsgs.show404(req, resp);
			}
			break;
		case "DELETE":
			if(req.url ==='/employees'){
				var reqBody = "";
				req.on("data", function(data){
					reqBody += data;
					if(reqBody.length>1e7){
							httpMsgs.show413(req, resp);
					}
				});
				req.on("end", function(){
				employees.delete(req, resp, reqBody);
				});	
			}
			else{
				httpMsgs.show404(req, resp);
			}
			break;
		default:
			httpMsgs.show405(req,resp);
			break;
	}
});