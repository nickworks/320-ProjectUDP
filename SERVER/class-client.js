exports.Client = class Client {
			constructor(socket, server){
			this.socket = socket;
			this.server = server;
			this.role = 0;
			this.username = "Unknown";

			this.buffer = Buffer.alloc(0);

			this.socket.on("error",e=>this.onError(e));
			this.socket.on("close",()=>this.onClose());
			this.socket.on("message",d=>this.onMessage(d));
		}

		onError(errmsg){
			console.log("ERROR:" + errmsg);

		}

		onClose(){
			this.server.onClientDisonnect(this);

		}

		onMessage(data){
			
			//console.log(this.buffer);
			console.log("data recived");

			if(this.buffer.length < 4) return; // not enough data

			const packetIdentifier = data.slice(0,4).toString();

			console.log("packet identifyer: " + packetIdentifier);

			switch(packetIdentifier){
				
				default:
					console.log("ERROR: packet identifyer not recognised (" +packetIdentifier+")");
					break;
			}
		}
		sendPacket(packet){
			console.log("sending packet: " + packet);
			this.socket.write(packet);
		}
}