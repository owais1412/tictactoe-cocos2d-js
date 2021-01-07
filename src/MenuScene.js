var MenuLayer = cc.LayerColor.extend({
  ctor: function() {
    this._super();
    this.init( cc.color(14, 27, 43,255) );
    var size = cc.winSize;
    var centerPoint = cc.p(size.width / 2, size.height / 2);

    // Menu item for starting the game
    var menuItem1 = new cc.MenuItemFont("Play", this.startGame);
    menuItem1.setPosition(centerPoint);
    
    // Create a menu and add menu items to it
    var menu = new cc.Menu(menuItem1);
    menu.setPosition(cc.p(0,0));
    this.addChild(menu);
    
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
