// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
export enum CoroutinesTypeEnum
{
    frame=1,second=2,sleepTime=3,sleepFrame
}
/**
 * 用于确定下一次调用的时间间隔
 */
export class CoroutinesType
{
    Enum:CoroutinesTypeEnum = CoroutinesTypeEnum.frame;
    SleepTime:number = 1;
    SleepFram:number = 1;
    constructor(CTE:CoroutinesTypeEnum,SleepTime:number = 1)
    {
        this.Enum = CTE;
        this.SleepTime = SleepTime;
    }
    /**下一帧 */
    public static get frame():CoroutinesType
    {
        return new CoroutinesType(CoroutinesTypeEnum.frame);
    }
    /**下一秒 */
    public static get second():CoroutinesType
    {
        return new CoroutinesType(CoroutinesTypeEnum.second);
    }
    /**下x秒 */
    public static SleepTime(time:number):CoroutinesType
    {
        return new CoroutinesType(CoroutinesTypeEnum.sleepTime,time);
    }
    /**
     * 下x帧
     * @param Frame 
     */
    public static SleepFrame(Frame:number):CoroutinesType
    {
        return new CoroutinesType(CoroutinesTypeEnum.sleepFrame,Frame);
    }
}
const {ccclass, property} = cc._decorator;
class CoroutinesProgram {
    type:CoroutinesType = null;
    time:number = 0;
    frame:number = 0;
    done:boolean = false;
    reDoneFun:(iter:CoroutinesProgram)=>void;
    private Iter:IterableIterator<CoroutinesType> 
    constructor(ii:IterableIterator<CoroutinesType>)
    {
        this.Iter = ii;
    }
    next(dt:number)
    {
        if(!this.done)
        {
            if(!this.type||this.type.Enum == CoroutinesTypeEnum.frame)
            {
                var ne = this.Iter.next();
                this.type = ne.value;
                this.done = ne.done;
            }
            else if(this.type.Enum === CoroutinesTypeEnum.second)
            {
                if(this.time<1)this.time+=dt;
                else
                {
                    this.time= 0;
                    var ne = this.Iter.next();
                    this.type = ne.value;
                    this.done = ne.done;
                }
            } else if(this.type.Enum === CoroutinesTypeEnum.sleepTime)
            {
                if(this.time<this.type.SleepTime)this.time+=dt;
                else
                {
                    this.time = 0;
                    var ne = this.Iter.next();
                    this.type = ne.value;
                    this.done = ne.done;

                }
            } else if(this.type.Enum == CoroutinesTypeEnum.sleepFrame)
            {
                if(this.frame<this.type.SleepFram)this.frame++;
                else
                {
                    this.frame = 0;
                    var ne = this.Iter.next();
                    this.type = ne.value;
                    this.done = ne.done;
                }
            }
        }
        else
        {
            this.reDoneFun(this);
        }
    }
}
@ccclass
export default class GlobalTime extends cc.Component {
    @property
    speedTime:number = 1;
    private static _instantiation:GlobalTime = null;
    
    public static get Instantiation() : GlobalTime {
        if(!this._instantiation){this._instantiation = cc.find("System/GlobalTime").getComponent(GlobalTime)}
        return this._instantiation;
    }
    private coroutines:CoroutinesProgram[] = new Array();
    Coroutines(iteralbe:IterableIterator<CoroutinesType>)
    {
        var co:CoroutinesProgram = new CoroutinesProgram(iteralbe);
        co.reDoneFun = (iter:CoroutinesProgram)=>{
            
            this.coroutines.map((value:CoroutinesProgram,index:number,array:CoroutinesProgram[])=>{
                if(value === iter)
                {        
                    array.splice(index,1);
                }
            })
        }
        this.coroutines.push(co);
    }
    start () {
        
    }
    
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}


     update (dt) {
         if(this.coroutines)
         {
            
             for(var cor of this.coroutines)
             {
                 cor.next(dt);
             }
         }
     }
}
