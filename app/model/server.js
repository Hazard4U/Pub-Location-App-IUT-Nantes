class Server {
    static server = null
    constructor() {
        this.data = {}
    }

    static getServer(){
        if(this.server == null){
            this.server = new Server();
        }
        return this.server;
    }

    setData(data){
        Object.assign(this.data, data)
    }
    getData(){
        return this.data;
    }
}

module.exports = Server;