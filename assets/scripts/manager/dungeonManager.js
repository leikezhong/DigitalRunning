cc.Class({
    init:function () {
        // console.log("---init dungeonManager---");
    },

    initDungeon:function(){
        this.dungeonMoveXSpeed = 5;
        this.dungeonMoveXMaxSpeed = 10;
        this.dungeonTimeCount = 0;
        this.allMonsters = [
            "addAndSubMonsterEntity",
            "randomMultiplyMonsterEntity",
            "radicalMonsterEntity",
            "residualMonsterEntity",
            "divideMonsterEntity",
            "multiplyMonsterEntity"
        ];
        this.useMonster = {};
        for(let i = 0; i < this.allMonsters.length; i++){
            for(let j = 0; j < 5; j++){
                this.useMonster["m" + (101 + i)] = require(this.allMonsters[i]);
                let monster = new this.useMonster["m" + (101 + i)]();
                battle.poolManager.putInPool(monster);
            }
        }
    },

    step:function(){
        this.createMonsterStep();
    },

    createMonsterStep:function(){
        this.dungeonTimeCount++;
        if(this.dungeonTimeCount % 180 == 0){
            let monsterIndex = "m" + (101 + Math.floor(battle.battleManager.getRandom() * 6));
            let monType = battle.battleManager.getRandom()<0.5?-1:1;
            let monster = battle.poolManager.getFromPool(monsterIndex);
            if(!monster){
                monster = new this.useMonster[monsterIndex]();
            }else{
                monster.getFromPool();
            }
            monster.resetStatus(battle.battleManager.winSize.width, battle.battleManager.winSize.height * .25 * battle.battleManager.getRandom(), monType);
        }
    },

    clear:function(){
        
    }
});
