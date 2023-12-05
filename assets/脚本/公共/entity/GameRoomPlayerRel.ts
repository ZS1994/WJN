export default interface GameRoomPlayerRel {
    /**
     * 房间id
     */
    roomId: number;

    /**
     * 玩家id
     */
    playId: number;

    /**
     * 人物id
     */
    peopleId: number;

    /**
     * 人物名称
     */
    name: string;

    /**
     * 玩家血量
     */
    hpPlayer: number;

    /**
     * 玩家总血量
     */
    hpPlayerTotal: number;

    /**
     * 人物血量
     */
    hpPeople: number;

    /**
     * 人物总血量
     */
    hpPeopleTotal: number;

    /**
     * 攻击速度
     */
    attackSpeed: number;

    /**
     * 攻击伤害
     */
    attackDamage: number;

    /**
     * 是否出局
     */
    isOut: string;

    /**
     * 子弹纹理
     */
    bulletSpriteFramePath: string;

    /**
     * 原始id，如果不是0，则代表是镜像玩家，完成回合后回自动删除，该值为原始玩家人物信息的id
     */
    originId: number;

    /**
     * 匹配的对手玩家id，每个回合战斗结束会自动清空为0
     */
    foeId: number;

    /**
     * 本回合结果，默认为空，胜利；失败。如果战斗重新开始，则会自动清空该字段
     */
    battleResult: string;

    /**
     * 回合数
     */
    round: number;

    /**
     * 胜利的回合数
     */
    winRound: number;

    /**
     * 当前战斗状态：等待战斗，战斗开始，战斗结束
     */
    status: string;

    //----------额外属性---------------
    playerName: string;

    peopleName: string;
}