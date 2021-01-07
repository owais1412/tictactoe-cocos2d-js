/* global cc, TTTScene, MenuScene:true
*/
var MenuLayer = cc.LayerColor.extend({
  ctor: function () {
    'use strict';

    var size = cc.winSize,
        centerPoint = cc.p(size.width / 2, size.height / 2),
        menuItem1 = new cc.MenuItemFont('Play', this.startGame),
        menu = new cc.Menu(menuItem1);

    this._super();
    this.init(cc.color(14, 27, 43, 255));

    menuItem1.setPosition(centerPoint);

    // Create a menu and add menu items to it
    menu.setPosition(cc.p(0, 0));
    this.addChild(menu);

    return true;
  },

  startGame: function () {
    'use strict';

    cc.director.runScene(new TTTScene());
  }
});

MenuScene = cc.Scene.extend({
  onEnter: function () {
    'use strict';

    var layer = new MenuLayer();

    this._super();

    this.addChild(layer);
  }
});
