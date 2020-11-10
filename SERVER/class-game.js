exports.Game = class Game {
	constructor(server){

		this.time = 0;
		this.dt = 16/1000;
		this.server = server;
		this.update();

	}
	update(){

		this.time += this.dt;


		setTimeout(()=>this.update(), 16);
	}
}