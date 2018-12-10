var monsterEntity = require("monsterEntity");
cc.Class({
    extends:monsterEntity,

    initParams:function(){
        this._super();
        this.entityType = gameConst.ENTITY_TYPE.MONSTER107;
        this.prefabName = "monster/bossMonster_prefab";
        this.moveXSpeed = battle.nowDungeonManager.dungeonMoveXSpeed;
    },

    resetStatus:function(xPos, yPos, type){
        this.entityYDirect = type;
        this.moveType = -1;
        this.moveXSpeed = battle.nowDungeonManager.dungeonMoveXSpeed;
        this.setEntityPos(xPos, type==1?(yPos+this.useCollisionHei*.5):(-yPos-this.useCollisionHei*.5));
    },

    step:function(){
        this._super();
    },

    moveStep:function(){
        if(this.nowEntityPos.x > battle.battleManager.winSize.width - 200){
            this.setEntityPosX(this.nowEntityPos.x + this.moveType * this.moveXSpeed);
        }
    },

    clear:function(){
        this._super();
    }
});
