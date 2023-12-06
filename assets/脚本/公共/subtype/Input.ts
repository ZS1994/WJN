export default class Input {
    private siteId;
    private roomId;
    private playId;
    // false： 帧同步
    private isApi: boolean = false;
    // 组件名称，就是node的name，唯一
    private nodeName: string;
    // 方法，有时候一个node需要细分多种请求，则可以利用该字段区分
    private method: string;
    private data: any;
}