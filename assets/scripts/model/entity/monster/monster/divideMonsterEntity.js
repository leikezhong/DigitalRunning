//除
var monsterEntity = require("monsterEntity");
var divideMonsterSkill1Entity = require("divideMonsterSkill1Entity");
cc.Class({
    extends:monsterEntity,

    initParams:function(){
        this._super();
        this.entityType = gameConst.ENTITY_TYPE.MONSTER105;
        this.prefabName = "monster/divideMonster_prefab";
        this.moveXSpeed = battle.nowDungeonManager.dungeonMoveXSpeed;
        this.divideNum = Math.floor(battle.battleManager.getRandom() * 3 + 2);
    },

    resetStatus:function(xPos, yPos, type){
        this.entityYDirect = type;
        this.divideNum = Math.floor(battle.battleManager.getRandom() * 3 + 2);
        this.moveType = -1;
        this.moveXSpeed = battle.nowDungeonManager.dungeonMoveXSpeed;
        this.hasShoot = false;
        this.setEntityPos(xPos, type==1?(yPos+this.useCollisionHei*.5):(-yPos-this.useCollisionHei*.5));
    },

    calculateRemaining:function(other){
        this._super(other);
        other.remainingTimeCount = Math.floor(other.remainingTimeCount/this.divideNum);
    },

    startShoot:function(){
        this.hasShoot = true;
        var skill = battle.poolManager.getFromPool(gameConst.ENTITY_TYPE.SKILL102);
        if(!skill){
            skill = new divideMonsterSkill1Entity();
            skill.init();
        }
        skill.resetStatus(this.nowEntityPos.x, this.nowEntityPos.y);
    },

    step:function(){
        this._super();
        this.moveStep();
        this.shootStep();
    },

    moveStep:function(){
        this.setEntityPosX(this.nowEntityPos.x + this.moveType * this.moveXSpeed);
        if(this.nowEntityPos.x < -200 || this.nowEntityPos.x > battle.battleManager.winSize.width + 200){
            battle.poolManager.putInPool(this);
        }
    },

    shootStep:function(){
        if(!this.hasShoot){
            if(this.nowEntityPos.x < battle.battleManager.winSize.width - 300){
                this.startShoot();
            }
        }
    },

    clear:function(){
        this._super();
    }
});
