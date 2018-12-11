//加减
var monsterEntity = require("monsterEntity");
cc.Class({
    extends:monsterEntity,

    initParams:function(){
        this._super();
        this.entityType = gameConst.ENTITY_TYPE.MONSTER101;
        this.prefabName = "monster/addAndSubMonster_prefab";
        this.moveXSpeed = battle.dungeonManager.dungeonMoveXSpeed;
    },

    resetStatus:function(xPos, yPos, type){
        this.entityYDirect = type;
        this.moveType = -1;
        this.moveXSpeed = battle.dungeonManager.dungeonMoveXSpeed;
        this.setEntityPos(xPos, type==1?(yPos+this.useCollisionHei*.5):(-yPos-this.useCollisionHei*.5));

        this.digitalType = (battle.battleManager.getRandom()<0.5?-1:1) * Math.floor(battle.battleManager.getRandom() * 4 + 2);
        this.digitalLabel.string = this.digitalType;
    },

    onCollisionEnter:function(other){
        // console.log("enter");
        if(other.entityType == gameConst.ENTITY_TYPE.CHARACTER){
            if(this.entityYDirect == 1){
                if(this.nowEntityPos.y >= other.nowEntityPos.y){
                    this.calculateRemaining(other);
                }else{
                    this.moveType = 1;
                    this.moveXSpeed = battle.dungeonManager.dungeonMoveXMaxSpeed;
                    // this.useCollision.enabled = false;
                }
            }else if(this.entityYDirect == -1){
                if(this.nowEntityPos.y <= other.nowEntityPos.y){
                    this.calculateRemaining(other);
                }else{
                    this.moveType = 1;
                    this.moveXSpeed = battle.dungeonManager.dungeonMoveXMaxSpeed;
                    // this.useCollision.enabled = false;
                }
            }
        }else if(other.entityType == gameConst.ENTITY_TYPE.MONSTER1){
            this.moveType = -this.moveType;
            this.moveXSpeed = battle.dungeonManager.dungeonMoveXMaxSpeed;
            this.useCollision.enabled = false;
        }
    },

    calculateRemaining:function(other){
        this._super(other);
        other.remainingTimeCount += (this.digitalType * 100);
        console.log("addAndSub calculate:" + battle.battleManager.mainEntity.remainingTimeCount);
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
