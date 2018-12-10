//会爆炸
var skillEntity = require("skillEntity");
cc.Class({
    extends:skillEntity,

    initParams:function(){
        this._super();
        this.entityType = gameConst.ENTITY_TYPE.SKILL102;
        this.prefabName = "monster/skill/divideMonsterSkill1_prefab";
        this.divideNum = Math.floor(battle.battleManager.getRandom() * 3 + 2);
    },

    resetStatus:function(xPos, yPos){
        this.moveType = 1;
        this.moveXSpeed = 15;
        this.divideNum = Math.floor(battle.battleManager.getRandom() * 3 + 2);
        this.setEntityPos(xPos, yPos);
    },

    onCollisionEnter:function(other){
        // console.log("enter");
        this._super();
        battle.poolManager.putInPool(this);
    },

    calculateRemaining:function(other){
        other.remainingTimeCount = Math.floor(other.remainingTimeCount/this.divideNum);
    },

    step:function(){
        this._super();
        this.moveStep();
    },

    moveStep:function(){
        this.setEntityPosX(this.nowEntityPos.x + this.moveType * this.moveXSpeed);
        if(this.nowEntityPos.x < -200 || this.nowEntityPos.x > battle.battleManager.winSize.width + 200){
            battle.poolManager.putInPool(this);
        }
    },

    clear:function(){
        this._super();
    }
});
