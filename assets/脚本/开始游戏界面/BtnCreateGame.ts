import {_decorator, Component, Node, Label, EditBox} from 'cc';
import Request from "../公共/util/Request";
import GameInfo from "../公共/GameInfo";

const {ccclass, property} = _decorator;

@ccclass('BtnCreateGame')
export class BtnCreateGame extends Component {
    start() {

    }

    update(deltaTime: number) {

    }

    // 创建房间
    createRoom() {
        // 获取id
        let playId: number = this.getIdByNode("playId");
        let playerCount: number = this.getIdByNode("playerCount");
        Request.post("room/createRoom", {
            masterPlayerId: playId,
            playerCount: playerCount,
        }).then(value => {
            console.log("11111111111111111", value);
            // 初始化人物和房间信息
            GameInfo.getInstance().初始化玩家和房间id(playId, value.data.id);
            // 更新房间信息
            GameInfo.getInstance().更新房间及其房间内的所有玩家人物信息(value.data);
            // 进入下一个场景

        });
    }

    getIdByNode(nodeName: string): number {
        return parseInt(this.node.getParent().getChildByName(nodeName).getComponent(EditBox).string);
    }

}


