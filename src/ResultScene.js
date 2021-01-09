/* global cc, ResultScene:true, MenuScene
*/
var ResultLayer = cc.LayerColor.extend({
  ctor: function (resultText) {
    'use strict';

    var size = cc.winSize,
        resultTextPos = cc.p(size.width / 2, 3 * size.height / 4),
        menuItem1 = new cc.MenuItemFont('Back to Main Menu', this.goBack),
        menu = new cc.Menu(menuItem1);

    this._super();
    this.init(cc.color(14, 27, 43, 255));

    this.endGameWithText(resultText, resultTextPos);

    menuItem1.setPosition(cc.p(size.width / 2, size.height / 2));
    menu.setPosition(cc.p(0.5, 0.5));

    this.addChild(menu);
    return true;
  },

  goBack: function () {
    'use strict';

    cc.director.runScene(new MenuScene());
  },

  endGameWithText: function (text, pos) {
    'use strict';

    var label = new cc.LabelTTF(text, 'Arial', 38);

    label.setPosition(pos);
    label.setColor(cc.color(255, 0, 0));

    this.addChild(label, 5);
  }
});

ResultScene = cc.Scene.extend({
  ctor: function (resultText) {
    'use strict';

    this._super();
    this.init(resultText);
  },
  init: function (resultText) {
    'use strict';

    var layer = new ResultLayer(resultText);

    this.addChild(layer);
  }
});
