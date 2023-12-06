/**
 * ws 消息处理器
 */
import UrlConfig from "./config/UrlConfig";
import GameInfo from "./GameInfo";
import BaseHandlerService from "./bas/BaseHandlerService";
import Input from "./subtype/Input";
import ValueUtil from "./util/ValueUtil";

export default class WsMsgManager {
    private webSocket;
    private gameInfo: GameInfo = GameInfo.getInstance();
    // 注册api和绑定的组件
    private apiHandlerMap: Map<String, BaseHandlerService> = new Map<String, BaseHandlerService>();

    // 单例模式
    private constructor() {
    }

    private static instance: WsMsgManager = new WsMsgManager();

    public static getInstance(): WsMsgManager {
        return this.instance;
    }

    处理器自我注册(nodeName: string, handlerService: BaseHandlerService) {
        this.apiHandlerMap.set(nodeName, handlerService);
    }

    // 建立连接
    initWebSocket() {
        // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
        var url = UrlConfig.BASE_URL_WS + `${this.gameInfo.playId}/${this.gameInfo.roomId}`;
        this.webSocket = new WebSocket(url);
        this.webSocket.onopen = this.webSocketOnOpen;
        this.webSocket.onerror = this.webSocketOnError;
        this.webSocket.onmessage = this.webSocketOnMessage;
        this.webSocket.onclose = this.webSocketClose;
    }

    // 连接成功后调用
    webSocketOnOpen() {
        console.error('WebSocket连接成功');
    }

    // 发生错误时调用
    webSocketOnError(e) {
        console.error("WebSocket连接发生错误", e);
    }

    // 给后端发消息时调用
    sendOfInput(msg: Input) {
        this.webSocket.send(JSON.stringify(msg, ["siteId", "roomId", "playId", "isApi", "nodeName", "method", "data"]));
    }


    // 接收后端消息
    // vue 客户端根据返回的cmd类型处理不同的业务响应
    webSocketOnMessage(e) {
        let data = JSON.parse(e.data);
        if (ValueUtil.isNotEmpty(data) && data.isApi === true) {
            // api请求
        } else if (ValueUtil.isNotEmpty(data) && data.isApi === true) {
            // 帧同步请求
            let handler = this.apiHandlerMap.get(data.nodeName);
            // 处理器存在，并且房间号相同，并且
            if (handler && ValueUtil.equalNum(data.roomId, this.gameInfo.roomId)) {
                handler.handWsMsgByInput(data);
            }
        }
    }

    // 关闭连接时调用
    webSocketClose(e) {
        console.log("WebSocket连接已关闭", e);
    }
}