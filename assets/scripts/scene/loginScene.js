window.battle = window.battle || {};
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    start () {
        cc.director.preloadScene("battleScene", function () {
            cc.log("battleScene preloaded");
        });
    },

    startGameFunc:function (event) {
        cc.director.loadScene("battleScene");
    },

    // update (dt) {},
});
