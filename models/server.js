
module.exports = class Server {

    constructor(serverId) {
        this.serverId = serverId;
        this.queue = [];
        this.dispatcher = null;
    }
    
}