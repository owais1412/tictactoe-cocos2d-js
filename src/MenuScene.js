var MenuLayer = cc.LayerColor.extend({
    ctor: function() {
        this._super();
        this.init( cc.color(14, 27, 43,255) );
        var size = cc.winSize;
        var centerPoint = cc.p(size.width / 2, size.height / 2);

        
        var menuItem1 = new cc.MenuItemFont("Play", this.startGame);
        menuItem1.setPosition(centerPoint);
        var menu = new cc.Menu(menuItem1);
        menu.setPosition(cc.p(0,0));
        this.addChild(menu);

        // var buttonSprite = new cc.Sprite(res.startButton_png);
        // buttonSprite.setPosition(centerPoint);
        // // buttonSprite.setAnchorPoint(0.5,0.5)
        // buttonSprite.setScale(0.1,0.1);
        // var startMenuItem = cc.MenuItemSprite.create(buttonSprite, null, null, this.startGame, this);
        // var startMenu = cc.Menu.create([startMenuItem]);
        // startMenu.attr({
        //     x: centerPoint.x,
        //     y: centerPoint.y 
        // });
        // // buttonSprite.setPosition( size.width / 2, size.height / 2);
        // this.addChild(startMenu, 1);
        // this.addChild(buttonSprite,1);
        return true;
    },
    startGame: function() {
        cc.director.runScene(new TTTScene());
    },
});

var MenuScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new MenuLayer();
		this.addChild(layer);
	}
});
