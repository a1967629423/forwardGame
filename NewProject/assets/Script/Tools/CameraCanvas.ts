const {ccclass, property} = cc._decorator;
@ccclass
export default class CameraCanvas extends cc.Component {
    mainCamera:cc.Camera = null;
    private static _instantiation:CameraCanvas = null;
    public static get Instantiation():CameraCanvas
    {
        if(!this._instantiation){this._instantiation = cc.find("Canvas/Main Camera/CameraCanvas").getComponent(CameraCanvas)}
        return this._instantiation;
    }
    start () {
        this.mainCamera = cc.Camera.findCamera(this.node);
    }

    update (dt) {
        if(this.mainCamera)
        {
            this.node.scale = 1/this.mainCamera.zoomRatio;
        }
    }
}
