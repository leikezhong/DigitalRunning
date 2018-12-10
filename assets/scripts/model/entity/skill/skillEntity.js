var baseEntity = require("baseEntity");
cc.Class({
    extends:baseEntity,

    init:function(){
        this._super();
        this.initParams();
        this.initEntity();
    },

    initParams:function(){
        this.nowEntityPos = cc.p(0, 0);
    },

    initEntity:function(){
        this.useEntity = cc.instantiate(cc.loader.getRes("prefab/" + this.prefabName));
        this.useEntity.parent = battle.layerManager.playerLayer;

        this.useCollision = this.useEntity.getChildByName("monster_collision").getComponent(cc.BoxCollider);
        if(this.useCollision){
            this.useCollisionWid = this.useCollision.size.width;
            this.useCollisionHei = this.useCollision.size.height;
            this.useCollision.host = this;
        }

        this.dragon = this.useEntity.getChildByName("monster_ani").getComponent(dragonBones.ArmatureDisplay);
        if(this.dragon){
            this.dragon.addEventListener(dragonBones.EventObject.COMPLETE,this.animEventListenerHandler,this);
        }
    },

    getFromPool:function(){
        this._super();
        this.useCollision.enabled = true;
        this.useEntity.active = true;
    },

    putInPool:function(){
        this._super();
        this.useCollision.enabled = false;
        this.useEntity.active = false;
        // this.setEntityPos(-1000, 0);
    },

    calculateRemaining:function(other){

    },

    onCollisionEnter:function(other){
        // console.log("enter");
        this.calculateRemaining(other);
    },

    onCollisionStay:function(other){
        // console.log("stay");
    },

    onCollisionExit:function(other){
        // console.log("exit");
    },

    setEntityPos:function(xPos, yPos){
        this.nowEntityPos.x = xPos;
        this.nowEntityPos.y = yPos;
        this.useEntity.x = xPos;
        this.useEntity.y = yPos;
    },

    setEntityPosX:function(xPos){
        this.nowEntityPos.x = xPos;
        this.useEntity.x = xPos;
    },

    setEntityPosY:function(yPos){
        this.nowEntityPos.y = yPos;
        this.useEntity.y = yPos;
    },

    step:function(){
        this._super();
    },

    clear:function(){
        this._super();
    }
});
