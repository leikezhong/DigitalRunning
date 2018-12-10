//会爆炸
var skillEntity = require("skillEntity");
cc.Class({
    extends:skillEntity,

    initParams:function(){
        this._super();
        this.entityType = gameConst.ENTITY_TYPE.SKILL101;
        this.prefabName = "monster/skill/bombMonsterSkill1_prefab";
    },

    resetStatus:function(xPos, yPos){
        this.setEntityPos(xPos, yPos);
    },

    onCollisionEnter:function(other){
        // console.log("enter");
        this._super();
        battle.battleManager.gameOver();
    },

    step:function(){
        this._super();
        this.clearStep();
    },

    clearStep:function(){
        if(this.baseFrame > 90){
            battle.poolManager.putInPool(this);
        }
    },

    clear:function(){
        this._super();
    }
});
