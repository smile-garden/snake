$(function(){
    var play=$('.play');
    var stop=$('.stop');
    var replay=$('.replay');
    var jieshao=$('.jieshao');
    var scene=$('.scene');
    var gameover=$('.gameover');
    var yes=$('.gameover .select .yes');
    var no=$('.gameover .select .no');
    var t;
    var she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
    function findDiv(x,y){
         return $('#'+x+'_'+y)
    }

    for (var i = 0; i < 18; i++) {
        for(var j=0;j<20;j++){
            $('<div>').addClass('gg').attr('id',i+'_'+j).appendTo('.scene')
        }
    };
    function fangshe(){
        $.each(she,function(i,v){
            findDiv(v.x,v.y).addClass('she')
        })
    }
	fangshe();
    var shebiao={};
    var sw;
    var shiwubiao={1:'caomei',2:'banana',3:'gua',4:'juzi',5:'li',6:'shiwu'};
    function fangshiwu(){
    	do{
    		var x=Math.floor(Math.random()*18);
            var y=Math.floor(Math.random()*20);
    		sw=Math.ceil(Math.random()*6);
    	}while(shebiao[x+'_'+y]){
            findDiv(x,y).addClass(shiwubiao[sw]);
            return {x:x,y:y};
        }
    }
    
    var shiwu=fangshiwu();
    var direction='you';
    $(document).on('keyup',function(e){
        var biao={37:'zuo',38:'shang',39:'you',40:'xia'}
        var fanbiao={'zuo':37,'shang':38,'you':39,'xia':40}
        if (Math.abs(e.keyCode-fanbiao[direction])===2) {
        	return;
        };
        if (biao[e.keyCode]) {
			direction=biao[e.keyCode];
        };
        
    })
    


    function move(){
    	var jiutou=she[she.length-1];
    	if (direction==='you') {
    		var xintou={x:jiutou.x,y:jiutou.y+1};
    	};
    	if (direction==='zuo') {
    		var xintou={x:jiutou.x,y:jiutou.y-1};
    	};
    	if (direction==='shang') {
    		var xintou={x:jiutou.x-1,y:jiutou.y};
    	};
    	if (direction==='xia') {
    		var xintou={x:jiutou.x+1,y:jiutou.y};
    	};
        if (shebiao[xintou.x+'_'+xintou.y]) {
        	clearInterval(t);
        	gameover.addClass('xianxian');
        	return;
        };
        if (xintou.x<0||xintou.x>17||xintou.y<0||xintou.y>19) {
        	clearInterval(t);
        	gameover.addClass('xianxian');
        	return
        };
        she.push(xintou);
        shebiao[xintou.x+'_'+xintou.y]=true;
        findDiv(xintou.x,xintou.y).addClass('she');
        if (xintou.x===shiwu.x&&xintou.y===shiwu.y) {
        	findDiv(shiwu.x,shiwu.y).removeClass(shiwubiao[sw])
        	shiwu=fangshiwu()
        }else{
        	var weibu=she.shift()
        	delete shebiao[weibu.x+'_'+weibu.y]
        	findDiv(weibu.x,weibu.y).removeClass('she');
        }
        
    }

    scene.hide();
    play.on('click',function(){
        $('.dongbox').delay(400).queue(function(){
            $(this).addClass('shiwubox').dequeue()
        });
        scene.show(400);
        gameover.removeClass('xianxian');
        clearInterval(t);
        t=setInterval(move,300)
    })
    stop.on('click',function(){
        clearInterval(t);
    })
    replay.on('click',rePlay);
    function rePlay(){
        gameover.removeClass('xianxian');
        $('.she').removeClass('she');
        $('.'+shiwubiao[sw]).removeClass(shiwubiao[sw]);
        clearInterval(t);
        shiwu={};
        she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}]
        fangshe();
        shiwu=fangshiwu();
        $.each(shebiao,function(i,v){
            delete shebiao[i];
        })
        shebiao={};
        t=setInterval(move,300);
    }
    jieshao.on('click',function(){
        // $('.jieShao').toggleClass('dongjs');
        $('.jieShao').delay(400).queue(function(){
            $(this).toggleClass('dongjs').dequeue()
        });
    })
    yes.on('click',function(){
        scene.hide(600);
        $('.dongbox').delay(400).queue(function(){
            $(this).removeClass('shiwubox').dequeue()
        });
        gameover.delay(400).queue(function(){
            $(this).removeClass('xianxian').dequeue()
        });
    })
    no.on('click',function(){
        gameover.removeClass('xianxian');
        rePlay();
    })

})