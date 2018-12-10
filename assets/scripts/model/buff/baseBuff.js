cc.Class({
    extends:cc.Class,
    ctor: function () {
        this.buffName = "";
    },
    
    init:function(host, time){
        this.host = host;
        this.buffTotalFrame = time;
        this.buffCountFrame = 0;
        this.buffStart();
    },

    buffStart:function(){

    },

    buffComplete:function(){

    },

    step:function(){
        this.buffCountFrame++;
        if(this.buffCountFrame >= this.buffTotalFrame){
            this.buffComplete();
            this.clear();
        }
    },

    clear:function(){
        if(this.host){
            this.host.removeBuff(this.buffName);
        }
    }
});
