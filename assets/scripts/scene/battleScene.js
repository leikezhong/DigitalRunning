cc.Class({
    extends: cc.Component,

    properties: {
        mainCamera:cc.Node,
        mainLayer:cc.Node,
        uiLayer:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.allManager = [
            "battleManager",
            "collisionManager",
            "dungeonManager",
            "entityManager",
            "layerManager",
            "poolManager",
            "resourceManager",
            "visionManager"
        ];
        
        for(let i = 0; i < this.allManager.length; i++){
            let manager = require(this.allManager[i]);
            battle[this.allManager[i]] = new manager();
            battle[this.allManager[i]].init();
        }
        battle.resourceManager.loadResource(this.loadComplete.bind(this));
    },

    loadComplete:function (params) {
        battle.layerManager.initAllLayer(this);
        battle.collisionManager.initCollision();
        battle.battleManager.initBattle();
        battle.visionManager.initVision(this.mainCamera);
        battle.dungeonManager.initDungeon();
    },

    update:function(dt){
        battle.entityManager.step();
        battle.visionManager.step();
        battle.battleManager.step();
        battle.dungeonManager.step();
    },

    onDestroy:function(){
        console.log("battle scene clear!!!");
        battle.dungeonManager.clear();
        battle.battleManager.clear();
        battle.poolManager.clear();
        battle.entityManager.clear();
        battle.layerManager.clear();
        battle.resourceManager.clear();

        for(let i = 0; i < this.allManager.length; i++){
            battle[this.allManager[i]] = null;
        }
    }

});
