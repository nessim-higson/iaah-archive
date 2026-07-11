var Lines = (function() {

    var callback;

    var arrayLines;
    var arrayHorizontalLines;
    var index;

    var canvasWidth = 0,
        canvasHeight = 0, 
        assetWidth = 0;

    var randomPlacement = 66; // 1-100% change / 0 to turn off

    function complete() {

        if(typeof callback === "function") {
            callback('cbdata');
        }

    }


    function getLineAnchorPoints() {

        var a = document.getElementById("canvas"),
            b = document.getElementById("mirror"),
            gl = a.getContext("webgl"),
            ctx = b.getContext("2d");

        var anchorsObj = [];

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        ctx.drawImage(a,0,0);

        // var imgd = ctx.getImageData(0, 0, 2560, 1600);
        // var pix = imgd.data;

        var w = ctx.canvas.width, h = ctx.canvas.height;
        var id = ctx.getImageData(0,0,w,h);
        var d = id.data;
        var found = false;

        for (var y=0;y<h;++y){
          for (var x=0;x<w;++x){
            var i=(y*w+x)*4;
            var r=d[i],g=d[i+1],b=d[i+2],a=d[i+3];
            //if (r>250 && g===23 && b === 23) {
            if (r>200 && g<200 && b<200) {
                //console.log('red found at: ' + x + 'x' + y + ' rgba: ' + r + ' ' + g + ' ' + b);
                x = x + 3;            
                y = y + 3;



                anchorsObj.push({
                    type: 'top',
                    x: x,
                    y: y
                });

                found = true;
            } else if (r<200 && g<200 && b>200) {
                //console.log('blue found at: ' + x + 'x' + y + ' rgba: ' + r + ' ' + g + ' ' + b);
                x = x + 3;            
                y = y + 3;  

                anchorsObj.push({
                    type: 'bottom',
                    x: x,
                    y: y
                });

                found = true;
            } else {
                found = false;
            }

            // If found remove color OR debug high light
            if (found) {
                ctx.beginPath();
                ctx.rect(x-1, y-1, 3, 3);
                ctx.fillStyle = "black"; // yellow
                ctx.fill();
            }

          }
        }



        // $('#mirror').show();
        // $('html, body').css('overflow','scroll')

        return anchorsObj;
    }

    function drawVerticalLines() {

        var anchors;
        var line;
        var randScale;
        var randLineNumber;

        // Randomize two sets of combines lines
        var lineSet1 = shuffle(arrayLines);
        var lineSet2 = shuffle(arrayLines);
        var linesSet = lineSet1.concat(lineSet2)

        anchors = getLineAnchorPoints();

        for (var i=0;i<anchors.length;i++) {
            //randLineNumber = Math.round(randNum(0,arrayLines.length-1));
            
            //randLineNumber=0;
            //console.log('randLineNumber: ' + randLineNumber)
            //console.log('arrayLines',arrayLines)

            if (randomPlacement && randNum(1,100) < randomPlacement) {
                line = new PIXI.Sprite(linesSet[i].texture);

                //console.log('place line at: ' + anchors[i].x + ' x ' + anchors[i].y);

                randScale = randNum(0.3,0.5);

                line.scale.x = randScale;
                
                line.position.x = anchors[i].x;
                line.position.y = anchors[i].y;
                line.rotation = randNum(-0.35,0.35);
                line.anchor.x = 0.5;

                if (anchors[i].type === 'top') {
                    line.anchor.y = 1;
                    line.scale.y = randScale+0.5;
                } else if (anchors[i].type === 'bottom') {
                    line.anchor.y = 1;
                    line.scale.y = -randScale;

                }

                //Add the sprite to the stage
                stage.addChild( line );
            }

        }


        // var line1 = new PIXI.Sprite(PIXI.loader.resources.line1.texture);

        // line1.scale.x = 0.3;
        // line1.scale.y = 0.3;
        // line1.position.x = 100;
        // line1.position.y = 300;
        // line1.rotation = -0.2;
        // // line1.anchor.x = 0.5;
        // line1.anchor.y = 1;

        // //Add the sprite to the stage
        // stage.addChild( line1 );


        //Render the stage   
        // renderer.render(stage);

        // complete();


    }

    function getAnchorsSorted( orientation ) {
        var anchors = getLineAnchorPoints();

        if (orientation == 'top') {

        } else if (orientation == 'top') {

        }

        return anchors;
    }

    // Sort JSON by key value
    function sortResults(array, prop, asc) {
        array = array.sort(function(a, b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            } else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });
        return array;
    }

    var lineSprites = [];

    function initHorizontalLines() {

console.warn('----initHorizontalLines');

        //var anchors = getLineAnchorPoints();
        window.anchors = getLineAnchorPoints();
        anchors = window.anchors;
        //console.log(anchors);
        var topAnchors=anchors.filter(a=>a.type=="top");
        var bottomAnchors=anchors.filter(a=>a.type=="bottom");
        var randLineNumber;

        topAnchors = sortResults(topAnchors, 'x', true);
        bottomAnchors = sortResults(bottomAnchors, 'x', true);

        //console.log(topAnchors);

        var lineCount = 0;
        var line;


        // top to top horizontal
        for (var i=0;i<topAnchors.length;i++) {
            if (topAnchors[i+1]) {

                randLineNumber = Math.round(randNum(0,arrayHorizontalLines.length-1));
                line = new PIXI.Sprite(arrayHorizontalLines[randLineNumber].texture);

                //lineSprites[lineCount] = PIXI.Sprite.fromImage('img/test-line2.png');
                //lineSprites[lineCount] = PIXI.Sprite(arrayLines[1].texture);

                //console.log('draw top line from: ' + topAnchors[i].x + 'x' + topAnchors[i].y + ' to: '+ topAnchors[i+1].x +'x'+ topAnchors[i+1].y)
                drawHorizontalLine(line, topAnchors[i].x, topAnchors[i].y, topAnchors[i+1].x, topAnchors[i+1].y);
                lineCount++;
            }
        }

        //console.log(bottomAnchors);

        // bottom to bottom horizontal
        //line =  new PIXI.Sprite(arrayLines[randLineNumber].texture);
        for (var i=0;i<bottomAnchors.length;i++) {
            if (bottomAnchors[i+1]) { 

                randLineNumber = Math.round(randNum(0,arrayHorizontalLines.length-1));
                line = new PIXI.Sprite(arrayHorizontalLines[randLineNumber].texture);

                //lineSprites[lineCount] = PIXI.Sprite.fromImage('img/test-line2.png');
                //lineSprites[lineCount] = PIXI.Sprite(arrayLines[1].texture);
                //console.log('draw bottom line from: ' + bottomAnchors[i].x + 'x' + bottomAnchors[i].y + ' to: '+ bottomAnchors[i+1].x +'x'+ bottomAnchors[i+1].y)
                drawHorizontalLine(line, bottomAnchors[i].x, bottomAnchors[i].y, bottomAnchors[i+1].x, bottomAnchors[i+1].y);   
                lineCount++;
            }
        }

        // // Add letter connecting line
        // if (anchors[i+1]) {
        //     if ((anchors[i].type === 'top' && anchors[i+1].type === 'top') || (anchors[i].type === 'bottom' && anchors[i+1].type === 'bottom')) {

        //     }

        // } else {
        //     console.log('NOOOOO : ' + anchors[i].type)
        // }



        //Render the stage   
        renderer.render(stage);

        complete();
    }

    function drawHorizontalLine(sprite, x1, y1, x2, y2) {

        var lineHeight = 1914;
        var lineWidth = 126;
        var canvasCharDivideWidth = CrackedApp.canvasWidth / CrackedApp.getChars().length;

        sprite.anchor.set(0.5, 0.0);
        sprite.position.set(x1, y1);

        var dx = x2-x1, dy = y2-y1;
        sprite.rotation = Math.atan2(dy, dx) - Math.PI/2;

        sprite.height = Math.sqrt(dx*dx+dy*dy);
        var scaledperc = sprite.height/lineHeight*100;
        sprite.width = lineWidth/100*scaledperc;
        
        if (x2-x1 < canvasCharDivideWidth*1.5) {

            if (randomPlacement && randNum(1,100) < randomPlacement) {
                stage.addChild(sprite);    
            }  
        }

    }


    function setLines(cb) {

        callback = cb;

        arrayLines = CrackedApp.getLines();
        arrayHorizontalLines = CrackedApp.getHorizontalLines();

        canvasWidth = CrackedApp.canvasWidth;
        canvasHeight = CrackedApp.canvasHeight;
        assetWidth = CrackedApp.assetWidth;

        index = 0;
        drawVerticalLines();
        initHorizontalLines();

    }

    return {

        setLines: setLines

    };

})();
