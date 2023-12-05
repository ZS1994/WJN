/**
 * 基础的组件封装的抽象类
 */
import GameInfo from "../GameInfo";
import {_decorator, Component, Node} from 'cc';

const {ccclass, property} = _decorator;

export default abstract class BaseHandlerService extends Component {
    public gameInfo = GameInfo.getInstance();
}