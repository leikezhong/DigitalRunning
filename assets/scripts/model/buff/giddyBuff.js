var baseBuff = require("baseBuff");
cc.Class({
    extends:baseBuff,
    ctor: function () {
        this.buffName = "giddyBuff";
    },

    buffStart:function(){
        this._super();
        this.host.canOperate = false;
        console.log("start giddy!");
    },

    buffComplete:function(){
        this._super();
        this.host.canOperate = true;
        console.log("end giddy!");
    }
})