var db = require("../core/db");
var httpMsgs = require("../core/httpMsgs");
var util = require("utility");
exports.getList = function(req, resp){
	db.executeSql("select * from emp",function(data, err){
		if(err){
			//resp.writeHead(500, "internal error", {"content-type":"text/html"});
			//resp.write("<html><body>internal error<body></html>");
			//i want response in json format
			//resp.writeHead(500, "internal error", {"content-type":"appication/json"});
			//resp.write(JSON.stringify({data:"internal error"+err}));
			//resp.end();
			httpMsgs.show500(req, resp, err);
		}
		else{
			//resp.writeHead(200, {"content-type":"appication/json"});
			//resp.write(JSON.stringify(data));
			//resp.end();
			httpMsgs.sendJson(req, resp, data);
		}
	})
};

exports.get = function(req, resp, empno){
	db.executeSql("select * from emp WHERE empno = "+empno,function(data, err){
		if(err){
			//resp.writeHead(500, "internal error", {"content-type":"text/html"});
			//resp.write("<html><body>internal error<body></html>");
			//i want response in json format
			//resp.writeHead(500, "internal error", {"content-type":"appication/json"});
			//resp.write(JSON.stringify({data:"internal error"+err}));
			//resp.end();
			httpMsgs.show500(req, resp, err);
		}
		else{
			//resp.writeHead(200, {"content-type":"appication/json"});
			//resp.write(JSON.stringify(data));
			//resp.end();
			httpMsgs.sendJson(req, resp, data);
		}
	})
};
exports.add = function(req, resp, reqBody){
	try{
		if(!reqBody) throw new Error("input not valid");
		var data = JSON.parse(reqBody);
		if(data){
			var sql = "INSERT INTO emp (empno, ename, sal, deptno) VALUES";
			sql += util.format("%d, %s, %d, %d", data.Empno, data.Ename, data.Sal, data.Deptno);
			db.executeSql(sql, function(data, err){
				if(err){
					httpMsgs.show500(req, resp, err);
				}
				else{
					httpMsgs.send200(req, resp);
				}
			})
		}
		else{
			throw new Error("input not valid");
		}
	}
	catch(ex){
		httpMsgs.show500(req, resp, ex);
	}

}
exports.update = function(req, resp, reqBody){
	try{
		if(!reqBody) throw new Error("input not valid");
		var data = JSON.parse(reqBody);
		if(data){
			if(!data.Empno) throw new Error("employee number not provided");
			var sql = "UPDATE emp set";
			var isDataProvided = false;
			if(data.Ename){
				sql += " Ename= '" + data.Ename + "',";
				isDataProvided = true;
			}
			if(data.Sal){
				sql += " Sal= " + data.Sal + ",";
				isDataProvided = true;
			}
			if(data.Deptno){
				sql += " Deptno= " + data.Deptno + ",";
				isDataProvided = true;
			}
			sql = sql.slice(0,-1);
			sql += " Where Empno= " + data.Empno; 
			db.executeSql(sql, function(data, err){
				if(err){
					httpMsgs.show500(req, resp, err);
				}
				else{
					httpMsgs.send200(req, resp);
				}
			})
		}
		else{
			throw new Error("input not valid");
		}
	}
	catch(ex){
		httpMsgs.show500(req, resp, ex);
	}

}
exports.delete = function(req, resp, reqBody){
	try{
		if(!reqBody) throw new Error("input not valid");
		var data = JSON.parse(reqBody);
		if(data){
			if(!data.Empno) throw new Error("employee number not provided");
			var sql = "DELETE FROM emp set";
			sql += " Where Empno= " + data.Empno; 
			db.executeSql(sql, function(data, err){
				if(err){
					httpMsgs.show500(req, resp, err);
				}
				else{
					httpMsgs.send200(req, resp);
				}
			})
		}
		else{
			throw new Error("input not valid");
		}
	}
	catch(ex){
		httpMsgs.show500(req, resp, ex);
	}
}