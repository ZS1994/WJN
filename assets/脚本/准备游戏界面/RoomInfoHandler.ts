import {_decorator, Component, Node, Label} from 'cc';
import GameInfo from "../公共/GameInfo";

const {ccclass, property} = _decorator;

@ccclass('RoomInfoHandler')
export class RoomInfoHandler extends Component {
    private gameInfo: GameInfo = GameInfo.getInstance();

    start() {
        this.显示房间信息();
    }

    update(deltaTime: number) {
    }

    显示房间信息() {
        let 房间名称: Label = this.node.getChildByName("房间名称").getComponent(Label);
        let 房间ID: Label = this.node.getChildByName("房间ID").getComponent(Label);
        房间名称.string = this.gameInfo.roomInfo.name;
        房间ID.string = this.gameInfo.roomId + "";
    }
}


