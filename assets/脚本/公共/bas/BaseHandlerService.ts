/**
 * 基础的组件封装的抽象类
 */
import GameInfo from "../GameInfo";
import {_decorator, Component, Node} from 'cc';
import Input from "../subtype/Input";
import WsMsgManager from "../WsMsgManager";

const {ccclass, property} = _decorator;

export default abstract class BaseHandlerService extends Component {
    public gameInfo = GameInfo.getInstance();
    private wsMsgManager: WsMsgManager = WsMsgManager.getInstance();

    // 处理来自ws消息
    abstract handWsMsgByInput(msg: Input);

    // 给后端发消息时调用
    sendOfInput(msg: Input) {
        this.wsMsgManager.sendOfInput(msg);
    }

    处理器自我注册(handlerService: BaseHandlerService) {
        this.wsMsgManager.处理器自我注册(handlerService.name, handlerService);
    }
}