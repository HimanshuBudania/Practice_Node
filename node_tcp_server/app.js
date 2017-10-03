var net = require("net");
var colors = require("colors");
var server = net.createServer();
server.on("connection", function(socket){
	var remoteAddress = socket.remoteAddress + socket.remotePort;
	console.log("new client connection is made %s".green, remoteAddress);
	socket.on("data",function(buffer){
		console.log("data sent by server %s is %s".cyan, remoteAddress, buffer);
		socket.write("hello"+buffer);
	});
	socket.once("close",function(){
		console.log("connection from %s is closed".yellow, remoteAddress);
	});
	socket.on("error",function(err){
		console.log("connection %s error, %s".red, remoteAddress, err.message);
	});
});
server.listen(9000,function(){
	console.log("server listening to port 9000 %j", server.address());
});