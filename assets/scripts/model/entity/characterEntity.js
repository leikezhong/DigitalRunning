var baseEntity = require("baseEntity");
cc.Class({
    extends:baseEntity,

    init:function(){
        this._super();
        this.initParams();
        this.initEntity();
        this.initRemaining();
    },

    initParams:function(){
        this.entityType = gameConst.ENTITY_TYPE.CHARACTER;
        this.remainingTimeCount = 10000;
        this.nowEntityPos = cc.p(0, 0);
        this.entityYDirect = 1;
        this.startJumpStatus = false;
        this.jumpCut = 0.7;
        this.jumpMaxVelY = 20;
        this.canOperate = true;
        this.canJump = true;
        this.canChangeYDirect = true;
        this.allBuffs = {};
        this.allBuffsKey = [];
        this.buffI = 0;
    },

    initEntity:function(){
        this.useEntity = cc.instantiate(cc.loader.getRes("prefab/base/character_prefab"));
        this.useEntity.parent = battle.layerManager.playerLayer;

        this.useCollision = this.useEntity.getChildByName("character_collision").getComponent(cc.CircleCollider);
        if(this.useCollision){
            this.useRadius = this.useCollision.radius;
            this.useCollision.host = this;
        }
    },

    initRemaining:function(){
        this.remainingTimeTF = this.useEntity.getChildByName("remaining_time").getComponent(cc.Label);
        if(this.remainingTimeTF){
            this.remainingTimeTF.string = Math.ceil(this.remainingTimeCount / 100);
        }
    },

    addBuff:function(type, time){
        if(!this.allBuffs[type]){
            var nowBuff = require(type);
            this.allBuffs[type] = new nowBuff();
            this.allBuffsKey = Object.keys(this.allBuffs);
        }
        this.allBuffs[type].init(this, time);
    },

    removeBuff:function(type){
        if(this.allBuffs[type]){
            delete this.allBuffs[type];
            this.allBuffsKey = Object.keys(this.allBuffs);
        }
    },

    onCollisionEnter:function(other){
        // console.log("enter");
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

    startJump:function(){
        if(!this.canOperate || !this.canJump || !this.canChangeYDirect) return;
        if(!this.startJumpStatus){
            this.jumpStartY = this.nowEntityPos.y;
            this.startJumpStatus = true;
            this.jumpVelY = this.jumpMaxVelY;
        }
    },

    changeDirect:function(){
        if(!this.canOperate || !this.canJump || !this.canChangeYDirect) return;
        if(!this.startJumpStatus){
            this.entityYDirect = -this.entityYDirect;
            this.setEntityPosY(this.nowEntityPos.y + this.entityYDirect * this.useRadius * 2);
        }
    },

    step:function(){
        this._super();
        this.buffStep();
        this.jumpStep();
        this.remainingStep();
    },

    buffStep:function(){
        for(this.buffI = this.allBuffsKey.length - 1; this.buffI >= 0; this.buffI--){
            if(this.allBuffsKey[this.buffI] && this.allBuffs[this.allBuffsKey[this.buffI]]){
                this.allBuffs[this.allBuffsKey[this.buffI]].step();
            }
        }
    },

    jumpStep:function(){
        if(this.startJumpStatus){
            this.setEntityPosY(this.nowEntityPos.y + this.jumpVelY * this.entityYDirect);
            if(this.entityYDirect == 1){
                if(this.nowEntityPos.y < this.jumpStartY){
                    this.setEntityPosY(this.jumpStartY);
                    this.startJumpStatus = false;
                    return;
                }
            }else{
                if(this.nowEntityPos.y > this.jumpStartY){
                    this.setEntityPosY(this.jumpStartY);
                    this.startJumpStatus = false;
                    return;
                }
            }
            this.jumpVelY -= this.jumpCut;
        }
    },

    remainingStep:function(){
        if(this.remainingTimeCount > 0){
            this.remainingTimeCount -= battle.battleManager.mainMoveXSpeed;
            if(this.remainingTimeCount < 0){
                this.remainingTimeCount = 0;
            }
            this.remainingTimeTF.string = Math.ceil(this.remainingTimeCount / 100);
        }else{
            this.remainingTimeTF.string = "0";
            battle.battleManager.gameOver();
        }
    },

    clear:function(){
        this._super();
    }
});
