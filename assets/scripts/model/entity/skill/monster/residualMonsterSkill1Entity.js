//取余
var skillEntity = require("skillEntity");
cc.Class({
    extends:skillEntity,

    initParams:function(){
        this._super();
        this.entityType = gameConst.ENTITY_TYPE.SKILL101;
        this.prefabName = "monster/skill/residualMonsterSkill1_prefab";
        this.residualNum = Math.floor(battle.battleManager.mainEntity.remainingTimeCount / 2 + battle.battleManager.getRandom() * (battle.battleManager.mainEntity.remainingTimeCount / 2));
    },

    resetStatus:function(xPos, yPos){
        this.setEntityPos(xPos, yPos);
        this.residualNum = Math.floor(battle.battleManager.mainEntity.remainingTimeCount / 2 + battle.battleManager.getRandom() * (battle.battleManager.mainEntity.remainingTimeCount / 2));
    },
    
    calculateRemaining:function(other){
        this._super(other);
        other.remainingTimeCount = Math.floor(other.remainingTimeCount % this.divideNum);
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
