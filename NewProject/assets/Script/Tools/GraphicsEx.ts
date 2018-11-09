

/**
 * 绘图扩展类
 */
export default class GraphicsEx  {
    //static
    public static beginColor:cc.Color = cc.color(255,255,255);
    public static endColor:cc.Color = cc.color(0,0,0);
    /**
     * 绘制圆形，可以加内径
     * 默认从外向内画
     */
    public static circle(g:cc.Graphics,cx?:number,cy?:number,ro?:number,ri?:number) 
    {
        for(var i=0;i<ri;i++)
        {
            g.circle(cx,cy,ro-i);
            this.SetStroke(g,i/ri);
            g.stroke();
        }
        
    }
    static SetStroke(g:cc.Graphics,insert:number)
    {
        g.strokeColor = this.beginColor.lerp(this.endColor,insert);
    }

    //instance
    graphics:cc.Graphics = null;
    constructor(g:cc.Graphics)
    {
        this.graphics = g;
    }
    public Stroke()
    {
        this.graphics.stroke();
    }



}
