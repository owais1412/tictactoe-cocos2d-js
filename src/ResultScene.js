var ResultLayer = cc.LayerColor.extend({
  ctor: function(resultText) {
    this._super();
    this.init( cc.color(14, 27, 43,255) );
    var size = cc.winSize;

    var resultTextPos = cc.p(size.width/2,(size.height/4)*3);
    this.endGameWithText(resultText, resultTextPos);
    
    // End screen menu item
    var menuItem1 = new cc.MenuItemFont("Back to Main Menu", this.goBack);
    menuItem1.setPosition(cc.p(size.width/2, (size.height/2)));

    // End screen menu
    var menu = new cc.Menu(menuItem1);
    menu.setPosition(cc.p(.5,.5));

    this.addChild(menu);
    return true;
  },
  
  goBack: function() {
    cc.director.runScene(new MenuScene());
  },

  endGameWithText: function(text, pos){
    var label = new cc.LabelTTF(text, "Arial", 38);
    label.setPosition(pos);
    label.setColor(cc.color(255,0,0));

    this.addChild(label, 5);
  },
});

var ResultScene = cc.Scene.extend({
  ctor: function(resultText) {
    this._super();
    this.init(resultText)
  },
  init:function (resultText) {
    var layer = new ResultLayer(resultText);
    this.addChild(layer);
  }
});
