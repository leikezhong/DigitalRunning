cc.Class({
    extends:cc.Class,

    init:function(){
        this.entityType = -1;
        this.entityId = battle.entityManager.getEntityId();
        this.addToEntityStatus = 0;
        this.isInPool = false;
        this.baseFrame = 0;

        battle.entityManager.addEntity(this);
    },

    getFromPool:function(){
        this.baseFrame = 0;
        this.isInPool = false;
        this.entityId = battle.entityManager.getEntityId();
        battle.entityManager.addEntity(this);
    },

    putInPool:function(){
        this.baseFrame = 0;
        this.isInPool = true;
        battle.entityManager.removeEntity(this);
    },

    step:function(){
        this.baseFrame++;
    },

    clear:function(){
        battle.entityManager.removeEntity(this);
    }
});
