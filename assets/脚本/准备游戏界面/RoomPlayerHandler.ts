import {_decorator, Component, Node, Label} from 'cc';
import BaseHandlerService from "../公共/bas/BaseHandlerService";
import ValueUtil from "../公共/util/ValueUtil";

const {ccclass, property} = _decorator;

@ccclass('RoomPlayerHandler')
export class RoomPlayerHandler extends BaseHandlerService {

    // 所有玩家人物node
    private peopleNodeArr: Array<Node>;

    start() {
        this.拿到所有布局();
        this.显示房间里面所有玩家信息();
    }

    update(deltaTime: number) {
    }

    拿到所有布局() {
        // 拿到所有布局
        let layout1 = this.node.getChildByName("Layout1");
        let layout2 = this.node.getChildByName("Layout2");
        let 人物1 = layout1.getChildByName("人物1");
        let 人物2 = layout1.getChildByName("人物2");
        let 人物3 = layout1.getChildByName("人物3");
        let 人物4 = layout1.getChildByName("人物4");
        let 人物5 = layout2.getChildByName("人物1");
        let 人物6 = layout2.getChildByName("人物2");
        let 人物7 = layout2.getChildByName("人物3");
        let 人物8 = layout2.getChildByName("人物4");
        this.peopleNodeArr = [人物1, 人物2, 人物3, 人物4, 人物5, 人物6, 人物7, 人物8];
    }

    显示房间里面所有玩家信息() {
        if (ValueUtil.isNotEmpty(this.gameInfo.roomInfo) && ValueUtil.isNotEmpty(this.gameInfo.roomInfo.gameRoomPlayerRelList)) {
            for (let i = 0; i < this.gameInfo.roomInfo.gameRoomPlayerRelList.length; i++) {
                let item = this.gameInfo.roomInfo.gameRoomPlayerRelList[i];
                let node = this.peopleNodeArr[i];
                let 玩家名称 = node.getChildByName("玩家名称").getComponent(Label);
                let 人物名称 = node.getChildByName("人物名称").getComponent(Label);
                玩家名称.string = item.playerName;
                人物名称.string = ValueUtil.getStrWithDefault(item.peopleName, "正在选择英雄...");
            }
        }
    }

}


