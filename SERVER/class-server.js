const Game = require("./class-game.js").Game;

exports.Server = class Server {
	constructor(){

		this.clients = [];

		// create socket:
		this.sock = require("dgram").createSocket("udp4");

		// setup event-listeners:
		this.sock.on("error", (e)=>this.onError(e));
		this.sock.on("listening", ()=>this.onStartListen());
		this.sock.on("message", (msg,rinfo)=>this.onPacket(msg,rinfo));

		this.game = new Game(this);

		// start listening:
		this.port = 320;
		this.sock.bind(this.port);
	}
	onError(e){
		console.log("ERROR: "+e);
	}
	onStartListen(){
		console.log("Server is listening on port "+this.port);
	}
	onPacket(msg, rinfo){


		if(msg.length < 4) return;

		const packetID = msg.slice(0,4).toString();

		switch(packetID){
			case "JOIN":
				if(!this.doesClientExist(rinfo)) this.clients.push(rinfo);
				break;
		}

		//console.log("message received from "+rinfo.address+" : "+rinfo.port);
	}
	doesClientExist(rinfo){

		let value = false;

		this.clients.forEach(c=>{
			if(c.address == rinfo.addess && c.port == rinfo.port) value = true;
		});

		return value;
	}
	broadcastToConnectedClients(packet){

		this.clients.forEach(c=>{
			this.sock.send(packet, 0, packet.length, c.port, c.address, ()=>{});
		});
	}
}