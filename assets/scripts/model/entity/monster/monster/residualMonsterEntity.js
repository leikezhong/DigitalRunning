//取余
var monsterEntity = require("monsterEntity");
var bombMonsterSkill1Entity = require("residualMonsterSkill1Entity");
cc.Class({
    extends:monsterEntity,

    initParams:function(){
        this._super();
        this.entityType = gameConst.ENTITY_TYPE.MONSTER104;
        this.prefabName = "monster/residualMonster_prefab";
        this.moveXSpeed = battle.nowDungeonManager.dungeonMoveXSpeed;
        this.residualNum = Math.floor(battle.battleManager.mainEntity.remainingTimeCount / 2 + battle.battleManager.getRandom() * (battle.battleManager.mainEntity.remainingTimeCount / 2));
    },

    resetStatus:function(xPos, yPos, type){
        this.entityYDirect = type;
        this.moveType = -1;
        this.moveXSpeed = battle.nowDungeonManager.dungeonMoveXSpeed;
        this.residualNum = Math.floor(battle.battleManager.mainEntity.remainingTimeCount / 2 + battle.battleManager.getRandom() * (battle.battleManager.mainEntity.remainingTimeCount / 2));
        this.setEntityPos(xPos, type==1?(yPos+this.useCollisionHei*.5):(-yPos-this.useCollisionHei*.5));
    },

    calculateRemaining:function(other){
        this._super(other);
        other.remainingTimeCount = Math.floor(other.remainingTimeCount % this.divideNum);
    },


    startBomb:function(){
        var skill = battle.poolManager.getFromPool(gameConst.ENTITY_TYPE.SKILL101);
        if(!skill){
            skill = new residualMonsterSkill1Entity();
            skill.init();
        }
        skill.resetStatus(this.nowEntityPos.x, this.nowEntityPos.y);
        battle.poolManager.putInPool(this);
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
        if(this.nowEntityPos.x <= battle.battleManager.mainEntity.nowEntityPos.x + 50){
            this.startBomb();
        }
    },

    clear:function(){
        this._super();
    }
});
