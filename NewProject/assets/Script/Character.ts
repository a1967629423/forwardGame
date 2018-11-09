
const {ccclass, property} = cc._decorator;
/**角色类
 * 
*/
@ccclass
export default class Character extends cc.Component implements ITouchEvent {
    onTouch(touch:cc.Event.EventTouch,sourceNode:cc.Node)
    {

    }
    onTouchV2(v2?:cc.Vec2,sourceNode?:cc.Node)
    {

    }
    onTouchLocal(v2:cc.Vec2)
    {

    }
    endTouch()
    {

    }
    getNode():cc.Node
    {
        return this.node;
    }
}
//定义了ITouch接口但是没用上
/**
 * Touch接口
 */
export  interface ITouchEvent{
    onTouch(touch:cc.Event.EventTouch,sourceNode:cc.Node);
    onTouchV2(v2?:cc.Vec2,sourceNode?:cc.Node);
    onTouchLocal(v2:cc.Vec2);
    endTouch(touch:cc.Event.EventTouch,sourceNode:cc.Node);
    getNode():cc.Node;
}