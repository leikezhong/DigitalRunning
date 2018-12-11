//随机乘
var monsterEntity = require("monsterEntity");
cc.Class({
    extends:monsterEntity,

    initParams:function(){
        this._super();
        this.entityType = gameConst.ENTITY_TYPE.MONSTER102;
        this.prefabName = "monster/randomMultiplyMonster_prefab";
        this.moveXSpeed = battle.dungeonManager.dungeonMoveXSpeed;
        this.startJumpStatus = false;
        this.jumpCut = 0.7;
        this.jumpMaxVelY = 20;
        this.preJumpCount = 0;
        this.intervalYDistance = 0;
    },

    resetStatus:function(xPos, yPos, type){
        this.entityYDirect = type;
        this.intervalYDistance = 0;
        this.moveType = -1;
        this.moveXSpeed = battle.dungeonManager.dungeonMoveXSpeed;
        this.setEntityPos(xPos, type==1?this.useCollisionHei*.5:-this.useCollisionHei*.5);

        this.digitalLabel.string = "* random";
    },

    startJump:function(){
        if(!this.startJumpStatus){
            this.jumpStartY = this.nowEntityPos.y;
            this.startJumpStatus = true;
            this.jumpVelY = this.jumpMaxVelY;
        }
    },

    onCollisionEnter:function(other){
        // console.log("enter");
        if(other.entityType == gameConst.ENTITY_TYPE.CHARACTER){
            if(this.entityYDirect == 1){
                if(this.nowEntityPos.y >= other.nowEntityPos.y){
                    this.calculateRemaining(other);
                }else{
                    this.moveType = 1;
                    this.moveXSpeed = 15;
                    this.useCollision.enabled = false;
                }
            }else if(this.entityYDirect == -1){
                if(this.nowEntityPos.y <= other.nowEntityPos.y){
                    this.calculateRemaining(other);
                }else{
                    this.moveType = 1;
                    this.moveXSpeed = 15;
                    this.useCollision.enabled = false;
                }
            }
        }
    },

    calculateRemaining:function(other){
        this._super(other);
        other.remainingTimeCount *= Math.floor(this.intervalYDistance / 100) + 1;
        console.log("randomMultiply calculate:" + battle.battleManager.mainEntity.remainingTimeCount);
    },

    step:function(){
        this._super();
        this.moveStep();
        this.jumpStep();
    },

    moveStep:function(){
        this.setEntityPosX(this.nowEntityPos.x + this.moveType * this.moveXSpeed);
        if(this.nowEntityPos.x < -200 || this.nowEntityPos.x > battle.battleManager.winSize.width + 200){
            battle.poolManager.putInPool(this);
        }
    },

    jumpStep:function(){
        if(this.baseFrame < 3)  return;
        if(battle.battleManager.mainEntity
             && battle.battleManager.mainEntity.entityYDirect == this.entityYDirect 
             && battle.battleManager.mainEntity.startJumpStatus 
             && !this.startJumpStatus){
            this.preJumpCount++;
            if(this.preJumpCount > 20){
                this.preJumpCount = 0;
                this.startJump();
            }
        }
        if(this.startJumpStatus){
            this.intervalYDistance = Math.abs(this.nowEntityPos.y - this.jumpStartY);
            this.setEntityPosY(this.nowEntityPos.y + this.jumpVelY * this.entityYDirect);
            if(this.entityYDirect == 1){
                if(this.nowEntityPos.y < this.jumpStartY){
                    this.setEntityPosY(this.jumpStartY);
                    this.startJumpStatus = false;
                    this.intervalYDistance = 0;
                    return;
                }
            }else{
                if(this.nowEntityPos.y > this.jumpStartY){
                    this.setEntityPosY(this.jumpStartY);
                    this.startJumpStatus = false;
                    this.intervalYDistance = 0;
                    return;
                }
            }
            this.jumpVelY -= this.jumpCut;
        }
    },

    clear:function(){
        this._super();
    }
});
