var settings = require("../settings");

exports.show404 = function(req,resp){
	if(settings.httpMsgsFormat === "HTML"){
			resp.writeHead(404, "resourse not found", {"content-type":"text/html"});
			resp.write("<html><body>resourse not found<body></html>");
			resp.end();
	}
	else{
			resp.writeHead(404, "resourse not found", {"content-type":"appication/json"});
			resp.write(JSON.stringify({data:"resourse not found"}));
			resp.end();
	}
}

exports.show405 = function(req,resp){
	if(settings.httpMsgsFormat === "HTML"){
			resp.writeHead(405, "method not supported", {"content-type":"text/html"});
			resp.write("<html><body>method not supported<body></html>");
			resp.end();
	}
	else{
			resp.writeHead(405, "method not supported", {"content-type":"appication/json"});
			resp.write(JSON.stringify({data:"method not supported"}));
			resp.end();
	}
}

exports.show413 = function(req,resp){
	if(settings.httpMsgsFormat === "HTML"){
			resp.writeHead(413, "data entity received is too large", {"content-type":"text/html"});
			resp.write("<html><body>data entity received is too large<body></html>");
			resp.end();
	}
	else{
			resp.writeHead(413, "data entity received is too large", {"content-type":"appication/json"});
			resp.write(JSON.stringify({data:"data entity received is too large"}));
			resp.end();
	}
}

exports.show500 = function(req,resp, err){
	if(settings.httpMsgsFormat === "HTML"){
			resp.writeHead(500, "internal error", {"content-type":"text/html"});
			resp.write("<html><body>internal error<body></html>");
			resp.end();
	}
	else{
			resp.writeHead(500, "internal error", {"content-type":"appication/json"});
			resp.write(JSON.stringify({data:"internal error"+err}));
			resp.end();
	}
}

exports.send200 = function(req,resp){
		resp.writeHead(200, {"content-type":"text/html"});
		resp.end();
}


exports.sendJson = function(req, resp, data){
		resp.writeHead(200, {"content-type":"appication/json"});
		if(data)
			resp.write(JSON.stringify(data));
		resp.end()
}

exports.showHome = function(req,resp, err){
	if(settings.httpMsgsFormat === "HTML"){
			resp.writeHead(200, {"content-type":"text/html"});
			resp.write("<html><body>/employees to get list of all employees <br> /employees/empno to search an employee <body></html>");
			resp.end();
	}
	else{
			resp.writeHead(200, {"content-type":"appication/json"});
			resp.write(JSON.stringify([
				{url: "/employees", operation: "GET", description:"to list all Employees"},
				{url: "/employees/<empno>", operation: "GET", description:"to search an Employee"}
				]));
			resp.end();
	}
}