var characterEntity = require("characterEntity");
cc.Class({
    init:function () {
        // console.log("---init battleManager---");
        
    },

    initBattle:function(){
        this.winSize = cc.director.getWinSize();
        this.isGameOver = false;

        this.jumpBtn = battle.layerManager.uiLayer.getChildByName("jumpBtn");
        this.changeBtn = battle.layerManager.uiLayer.getChildByName("changeBtn");
        this.maxScoreTF = battle.layerManager.uiLayer.getChildByName("maxScoreTF").getComponent(cc.Label);

        this.jumpBtn.on(cc.Node.EventType.TOUCH_START, this.startJumpFunc, this);
        this.changeBtn.on(cc.Node.EventType.TOUCH_START, this.changeDirectFunc, this);
        
        this.mainMoveXSpeed = 3;
        this.maxScore = 100;

        this.mainEntity = new characterEntity();
        this.mainEntity.setEntityPos(this.winSize.width * .35, this.mainEntity.useRadius);
        battle.visionManager.setVisionEntity(this.mainEntity);
    },

    gameOver:function(){
        this.isGameOver = true;
    },

    getRandom:function(){
        return Math.random();
    },

    startJumpFunc:function(){
        if(this.mainEntity){
            this.mainEntity.startJump();
        }
    },

    changeDirectFunc:function(){
        if(this.mainEntity){
            this.mainEntity.changeDirect();
        }
    },

    step:function(){
        this.remainingTimeStep();
    },

    remainingTimeStep:function(){
        if(this.mainEntity){
            if(this.maxScore < Math.ceil(this.mainEntity.remainingTimeCount / 100)){
                this.maxScore = Math.ceil(this.mainEntity.remainingTimeCount / 100)
                this.maxScoreTF.string = "Score:" + Math.ceil(this.mainEntity.remainingTimeCount / 100);
            }
        }
    },

    clear:function(){
        
    }
});
