var readlineSync = require("readline-sync")
var net = require("net");
var colors = require("colors");

var HOST = "127.0.0.1";
var PORT = 9000;

var client = null;

function openConnection(){
	if(client){
		console.log("connection is alreay open".red);
		setTimeout(function(){
    	    	menu();
    	},0);
        return; 
	}
	client = new net.Socket();
	client.on("error",function(err){
		client.destroy();
		client = null;
		console.log("an error occured %s".red, err.message);
		setTimeout(function(){
    	    	menu();
    	},0);
	});
	client.on("data", function(data){
		console.log("data received is: %s".cyan, data);
		setTimeout(function(){
    	    	menu();
    	},0);
	});
	client.connect(PORT, HOST, function(){
		console.log("connection b/w client & server is open now".green);
		setTimeout(function(){
    	    	menu();
    	},0);
	});
}

function sendData(data){
	if(!client){
		console.log("connection is not open".red);
		setTimeout(function(){
    	    	menu();
    	    },0);
		return;
	}
	client.write(data);
}
function closeConnection(){
    if(!client){
		console.log("connection is not open".red);
		setTimeout(function(){
    	    	menu();
    	    },0);
		return;
	}
	client.destroy();
	client = null;
	setTimeout(function(){
    	    	menu();
    	    },0);
}

function menu(){
	var lineRead = readlineSync.question("\n\n Enter option(1-open, 2-send data, 3-close, 4-quit):");
    switch(lineRead){
    	case "1":
    	    console.log("option 1 selected");
    	    /*setTimeout(function(){
    	    	menu();
    	    },0);*/
    	    openConnection();
    	    break;
    	case "2":
    	    console.log("option 2 selected");
    	    /*setTimeout(function(){
    	    	menu();
    	    },0);*/
    	    var data = readlineSync.question("\n\n enter data to send:");
    	    sendData(data);
    	    break;
    	case "3":
    	    console.log("option 3 selected");
    	    /*setTimeout(function(){
    	     	menu();
    	    },0);*/
    	    closeConnection();
    	    break;
    	case "4":
    	    console.log("option 4 selected");
    	    break;
    	default:
    	    console.log("default option");
    	    setTimeout(function(){
    	    	menu();
    	    },0);
    	    break;
    }
}
setTimeout(function(){
    	    	menu();
    	    },0);
