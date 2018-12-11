//乘
var monsterEntity = require("monsterEntity");
cc.Class({
    extends:monsterEntity,

    initParams:function(){
        this._super();
        this.entityType = gameConst.ENTITY_TYPE.MONSTER106;
        this.prefabName = "monster/multiplyMonster_prefab";
        this.moveXSpeed = battle.dungeonManager.dungeonMoveXSpeed * 4;
    },

    resetStatus:function(xPos, yPos, type){
        this.entityYDirect = type;
        this.moveType = -1;
        this.moveXSpeed = battle.dungeonManager.dungeonMoveXSpeed;
        this.setEntityPos(xPos, type==1?(yPos+this.useCollisionHei*.5):(-yPos-this.useCollisionHei*.5));

        this.multiplyNum = Math.floor(battle.battleManager.getRandom() * 2 + 2);
        this.digitalLabel.string = "*" + this.multiplyNum;
    },

    calculateRemaining:function(other){
        this._super(other);
        other.remainingTimeCount *= this.multiplyNum;
        console.log("multiply calculate:" + battle.battleManager.mainEntity.remainingTimeCount);
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
