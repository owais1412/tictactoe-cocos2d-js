/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
 
 http://www.cocos2d-x.org
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/


var TTTLayer = cc.LayerColor.extend({
	board:null,
	size:null,
	xIsPlaying: true,    
	gameOver: false,
	boardData:[[-1,-1,-1],
			   [-1,-1,-1],
			   [-1,-1,-1]],
	cellLocation:[[{x:113,y:113},{x:238,y:113},{x:360,y:113}],
				  [{x:113,y:240},{x:238,y:240},{x:360,y:240}],
				  [{x:113,y:360},{x:238,y:360},{x:360,y:360}]],
	showResult: function(resultText) {
		for(var i = 0 ; i < 3 ; i++){
			for(var j = 0 ; j < 3 ; j++){
				this.boardData[i][j] = -1;
			}
		}
		// this.removeAllChildren();
		this.gameOver = false;
		cc.director.runScene(new ResultScene(resultText));
	},
	showWinner: function(){
		var winner = this.verifyWinner();
		if(winner === -1 && this.verifyTie()){
			// this.endGameWithText('Tie');
			this.gameOver = true;
			this.showResult('Match Tied');
			return;
		}
		switch(winner){
			case 0:
				// this.endGameWithText('O won the match');
				this.gameOver = true;
				this.showResult('O won the match');
				break;
			case 1:
				// this.endGameWithText('X won the match');
				this.gameOver = true;
				this.showResult('X won the match');
				break;
		}
	},
	verifyTie: function(){      
		for(var i = 0 ; i < 3 ; i++){
			for(var j = 0 ; j < 3 ; j++){
				if(this.boardData[i][j] === -1 ){
					return false;
				}
			}
		}
		return true;        
	},
	verifyWinner: function(){        
		var play = -1;
		//horizontal verification
		for(var i = 2 ; i >= 0 ; i--){
			play = this.boardData[i][0];
			for(var j = 1 ; j < 3 ; j++){                
				if(this.boardData[i][j] === -1 || this.boardData[i][j] !== play){
					play = -1;
					break;                    
				}                
				play = this.boardData[i][j];                
			}
			if(play != -1){
				return play;
			}
		}

		//vertical verification
		for(var i = 2 ; i >= 0 ; i--){
			play = this.boardData[0][i];
			for(var j = 1 ; j < 3 ; j++){                
				if(this.boardData[j][i] === -1 || this.boardData[j][i] !== play){
					play = -1;
					break;
				}                
				play = this.boardData[j][i];                
			}
			if(play != -1){
				return play;
			}
		}                    

		//diagonal verification (left to right)
		play = this.boardData[0][0];
		for(var j = 1 ; j < 3 ; j++){                
			if(this.boardData[j][j] === -1 || this.boardData[j][j] !== play){
				play = -1;
				break;                    
			}                
			play = this.boardData[j][j];                
		}
		if(play != -1){
			return play;
		}               

		//diagonal verification (right to left)
		play = this.boardData[0][2];
		for(var j = 1 ; j >=0 ; j--){                
			if(this.boardData[2 - j][j] === -1 || this.boardData[2 - j][j] !== play){
				play = -1;
				break;                    
			}                
			play = this.boardData[2 - j][j];
		}
		if(play != -1){
			return play;
		}       
		return play;
	},
	handleTouch:function(touch, event){
		var point = touch.getLocation();
		var self = event.getCurrentTarget();
		var cell = self.getCell(point);
		if(!self.gameOver && self.boardData[cell.i][cell.j] === -1){
			self.boardData[cell.i][cell.j] = self.xIsPlaying ? 1 : 0;
			self.drawPlay(cell);
			self.showWinner();
		}
	},
	getCell:function (point){
		for(var i = 0 ; i < 3 ; i++){
			for(var j = 0 ; j < 3 ; j++){
				if(point.x <= this.cellLocation[i][j]['x'] && point.y <= this.cellLocation[i][j]['y'] ){
					console.log(this.cellLocation[i][j]);
					return {i:i, j:j, x:this.cellLocation[i][j]['x'], y:this.cellLocation[i][j]['y']};
				}
			}                  
		}
		return null;        
	},
	drawPlay:function (point){
		if(point === null){
			return null;
		}
		point.x = point.x - 113;
		var player = new cc.Sprite(this.xIsPlaying ? res.X : res.O);
		player.setAnchorPoint(0,1);
		player.setPosition(point);
		this.addChild(player,0);
		this.xIsPlaying = !this.xIsPlaying;
		
	},
	touchInit:function () {
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			onTouchBegan: this.handleTouch
		},this);          
	},
	ctor:function () {
		this._super();
		this.gameOver = false;
		this.init( cc.color(14, 27, 43,255) );
		this.size = cc.winSize;
		this.board = new cc.Sprite(res.board);
		this.board.setPosition( this.size.width / 2, this.size.height / 2);
		this.addChild(this.board, 0); 
		this.touchInit();
		return true;
	}
});

var TTTScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new TTTLayer();
		this.addChild(layer);
	}
});

