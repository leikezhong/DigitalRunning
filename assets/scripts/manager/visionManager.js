cc.Class({
    init:function () {
        // console.log("---init visionManager---");
        this.visionEntity = null;
        this.cameraPos = cc.v2(0, 0);
    },

    initVision:function(camera){
        this.camera = camera;
        this.cameraNode = camera.getComponent(cc.Camera);
        this.cameraWid = (battle.battleManager.winSize.width/this.cameraNode.zoomRatio - battle.battleManager.winSize.width) * .5;
        this.cameraHei = (battle.battleManager.winSize.height/this.cameraNode.zoomRatio - battle.battleManager.winSize.height) * .5;
    },

    setVisionEntity:function(entity){
        this.visionEntity = entity;
    },

    step:function(){
        if(this.visionEntity){
            this.cameraPos = this.visionEntity.nowEntityPos;
        }
        if(this.cameraPos && battle.battleManager.winSize){
            //视野移动
            this.camera.x = -this.cameraPos.x + battle.battleManager.winSize.width * .35;
            // this.camera.y = 0;
            if(this.camera.x > 0){
                this.camera.x = 0;
            }
        }
    },

    clear:function(){
        this.visionChar = null;
    }
});
