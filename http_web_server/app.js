var http = require("http");
var qs = require("querystring");
var port = 9000;
/*
//simple server which listen to every request
http.createServer(function(req, resp){
   resp.writeHead(200,{"content-type":"text/html"});
   resp.write("<html><body>hello world</body></html>");
   resp.end();
}).listen(port);
*/
function getHome(req, resp){
	resp.writeHead(200,{"content-type":"text/html"});
	resp.write("<html><title>Home</title><body>hello world, click <a href='/calc'>here</a> to calculate</body></html>");
	resp.end();
}
function get404(req, resp){
	resp.writeHead(404, "Resourse Not Found",{"content-type":"text/html"});
	resp.write("<html><title>404 Error</title><body>Resourse Not Found, go to <a href='/'>home</a></body></html>");
	resp.end();
}
function get405(req, resp){
	resp.writeHead(405,"method not supported",{"content-type":"text/html"});
	resp.write("<html><title>405 Error</title><body>method not supported click <a href='/'>home</a></body></html>");
	resp.end();
}
function get413(req, resp){
	resp.writeHead(413, "Request entity too large",{"content-type":"text/html"});
	resp.write("<html><title>413 Error</title><body>Request entity too large, go to <a href='/'>home</a></body></html>");
	resp.end();
}

function getCalcHtml(req, resp, data){
	//var sb = new stringBuilder({newline: "\r\n"})
	resp.write("<html><title>Calc Form</title><body><form method='post'><table><tr><td>Enter first number</td><td><input type='text' id='first' name='first' value=''></td></tr><tr><td>Enter second number</td><td><input type='text' id='second' name='second' value=''></td></tr> <tr><td><input type='submit' id='submit' name='submit' value='calulate'></td></tr><tr><td id='result'></td></tr></table></form></body></html>");
	resp.end();
}

function getCalcForm(req, resp, formData){
	resp.writeHead(200,{"content-type":"text/html"});
	getCalcHtml(req, resp, formData);
}
http.createServer(function(req, resp){
	switch(req.method){
		case "GET":
		    if(req.url === '/'){
		    	getHome(req, resp)
		    }
		    else if(req.url === '/calc'){
		    	getCalcForm(req, resp);
		    }
		    else{
		    	get404(req, resp);
		    }
		   	break;
		case "POST":
			var reqBody = "";
		    if(req.url === '/calc'){
		    	req.on("data", function(data){
		    		reqBody += data;
		    		if(reqBody.length > 1e7){
		    			get413(req, resp);
		    		}
		    	});
		    	req.on("end", function(data){
		    		//console.log(reqBody);
		    		var formData = qs.parse(reqBody);
		    		getCalcForm(req, resp, formData);
		    	});
		    }
			break;
		default:
		    get405(req, resp);
			break;
	}
}).listen(port);