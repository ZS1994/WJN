import GameRoomPlayerRel from "./GameRoomPlayerRel";

export default interface GameRoom {
    /**
     * 房间名称
     */
    name: string;

    /**
     * 状态：等待、游戏开始、游戏结束。如果在匹配的过程中取消则直接删除该条数据
     */
    status: string;

    /**
     * 房主，创建房间的玩家id，房主可直接解散删除房间
     */
    master: number;

    /**
     * 房间人数，默认8人，可设置2的倍数
     */
    playerCount: number;

    // -------------额外属性--------------
    gameRoomPlayerRelList: Array<GameRoomPlayerRel>;

}