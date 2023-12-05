/**
 * 存放公共数据
 */
import GameRoom from "./entity/GameRoom";
import GameRoomPlayerRel from "./entity/GameRoomPlayerRel";
import ValueUtil from "./util/ValueUtil";
import BaseSingleton from "./bas/BaseSingleton";

export default class GameInfo {

    // 房间id
    public roomId: number;
    // 玩家id
    public playId: number;
    // 房间详细对象信息
    public roomInfo: GameRoom;
    // 玩家自己人物
    public playerPeopleInfo: GameRoomPlayerRel;
    // 本回合敌人人物信息
    public foePeopleInfo: GameRoomPlayerRel;
    // 当前回合数
    public round: number = 1;

    // 单例模式
    private constructor() {
    }

    private static instance: GameInfo = new GameInfo();

    public static getInstance(): GameInfo {
        return this.instance;
    }


    初始化玩家和房间id(roomId, playId) {
        this.roomId = roomId;
        this.playId = playId;
    }

    更新房间及其房间内的所有玩家人物信息(room: GameRoom) {
        this.roomInfo = room;
        if (ValueUtil.isNotEmpty(this.roomInfo)) {
            // 找到自己的人物信息
            for (let i = 0; i < this.roomInfo.gameRoomPlayerRelList.length; i++) {
                let item = this.roomInfo.gameRoomPlayerRelList[i];
                if (ValueUtil.equalNum(item.playId, this.playId)) {
                    this.playerPeopleInfo = item;
                    break;
                }
            }
            // 找到本局敌人信息
            if (ValueUtil.isNotEmptyOrZero(this.playerPeopleInfo.foeId)) {
                for (let i = 0; i < this.roomInfo.gameRoomPlayerRelList.length; i++) {
                    let item = this.roomInfo.gameRoomPlayerRelList[i];
                    if (ValueUtil.equalNum(item.playId, this.playerPeopleInfo.foeId)) {
                        this.foePeopleInfo = item;
                        break;
                    }
                }
            }
        }
    }
}