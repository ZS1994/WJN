import {_decorator, Component, Node, Label, EventTouch, Button} from 'cc';
import BaseHandlerService from "../公共/bas/BaseHandlerService";
import Request from "../公共/util/Request";
import GamePeople from "../公共/entity/GamePeople";
import ValueUtil from "../公共/util/ValueUtil";

const {ccclass, property} = _decorator;

/**
 * 英雄选择布局
 */
@ccclass('PeopleSelectHandler')
export class PeopleSelectHandler extends BaseHandlerService {

    // 人物选择node集合
    private peopleSelectArr: Array<Node>;

    // 远端给的可选任务集合
    private peopleList: Array<GamePeople>;

    start() {
        this.初始化人物选择组件();
        this.获取随机英雄以供玩家选择();
    }

    update(deltaTime: number) {

    }

    初始化人物选择组件() {
        let layout = this.node.getChildByName("Layout");
        let 预选人物1 = layout.getChildByName("预选人物1");
        let 预选人物2 = layout.getChildByName("预选人物2");
        let 预选人物3 = layout.getChildByName("预选人物3");
        this.peopleSelectArr = [预选人物1, 预选人物2, 预选人物3];
    }

    获取随机英雄以供玩家选择() {
        const that = this;
        Request.post('people/randomPeopleList', {
            limit: 3,
        }).then(value => {
            console.log("随机英雄", value.data);
            that.peopleList = value.data;
            that.显示可选英雄();
        });
    }

    显示可选英雄() {
        for (let i = 0; i < this.peopleSelectArr.length; i++) {
            let node: Node = this.peopleSelectArr[i];
            let people: GamePeople = this.peopleList[i];
            let 人物名称 = node.getChildByName("人物名称").getComponent(Label);
            人物名称.string = people.name;
        }
    }

    选择英雄(ev: EventTouch) {
        console.log("第几个英雄", ev);
        let node: Node = ev.currentTarget;
        // 找到选择的节点
        let targetNode;
        let targetPeople;
        for (let i = 0; i < this.peopleSelectArr.length; i++) {
            let itemNode = this.peopleSelectArr[i];
            if (itemNode.name == node.name) {
                targetNode = itemNode;
                targetPeople = this.peopleList[i];
                break;
            }
        }
        if (ValueUtil.isNotEmpty(targetNode)) {
            // 选择该英雄
            Request.post('people/selectPeople', {
                playId: this.gameInfo.playId,
                roomId: this.gameInfo.roomId,
                peopleId: targetPeople.id,
            }).then(value => {
                console.log('===选择任务结果==', value);
            });
            // 所有的英雄选择组件禁用
            for (let i = 0; i < this.peopleSelectArr.length; i++) {
                let itemNode = this.peopleSelectArr[i];
                itemNode.getComponent(Button).interactable = false;
            }

        }
    }
}


