var baseEntity = require("baseEntity");
cc.Class({
    extends:baseEntity,

    init:function(){
        this._super();
        this.initParams();
        this.initEntity();
        this.initDigital();
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
    },

    initDigital:function(){
        this.digitalLabel = this.useEntity.getChildByName("label").getComponent(cc.Label);
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

    setDead:function(){
        battle.poolManager.putInPool(this);
    },

    onCollisionEnter:function(other){
        // console.log("enter");
        if(other.entityType == gameConst.ENTITY_TYPE.CHARACTER){
            if(this.entityYDirect == 1){
                if(this.nowEntityPos.y >= other.nowEntityPos.y){
                    this.calculateRemaining(other);
                }else{
                    this.setDead();
                }
            }else if(this.entityYDirect == -1){
                if(this.nowEntityPos.y <= other.nowEntityPos.y){
                    this.calculateRemaining(other);
                }else{
                    this.setDead();
                }
            }
        }
    },

    calculateRemaining:function(other){
        this.setDead();
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
