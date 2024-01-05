class SocketManager {
    constructor(oScene, sRootUrl, iBoardId) {
        this.oScene = oScene;
        this.sRootUrl = sRootUrl;
        this.iBoardId = iBoardId;

        //Root Socket conenction
        this.socket = io(this.sRootUrl, {
            transports: ["websocket", "polling"],
            query: {
                authorization: this.sAuthToken,
            },
            extraHeaders: {
                authorization: this.sAuthToken,
            }
        });

        // Root Socket Connection Events - Start
        this.socket.on("connect", () => {
            this.ownSocketId = this.socket.id;
            console.log(
                "Connected to Socket :: ",
                this.socket.id,
            );
            console.log("Socket URL :: ", this.sRootUrl);
        });
        this.socket.on("disconnect", () => {
            console.log("Disconnected from Socket");
        });
        this.socket.on("reconnect", () => {
            console.log("Reconnecting to Socket");
        });
        this.socket.on("error", (error) => {
            console.log("Connection Error :: ", error);
        });
        // Root Socket Connection Events - End

        // Refresh Purpose
        this.socket.on(this.iBoardId, (data) => {
            this.onReceivedData(data);
        });

        // Socket Connection
        this.socket.emit(
            "reqJoinBoard",
            { iBoardId: this.iBoardId },
            (error, data) => {
                this.onReceivedData(data);
            }
        );

        // For Requesting Socket Emits
        this.emit = (sEventName, oData = {}, callback) => {
            this.socket.emit(this.iBoardId, { sEventName, oData }, callback);
        };
    }

    onReceivedData(data) {
        console.log(data.sEventName);
    }
}
