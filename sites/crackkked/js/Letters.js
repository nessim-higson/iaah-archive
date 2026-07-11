var Letters = (function() {

    'use strict';

    var callback;

    var arrayChars;
    var index;

    var columnWidth,
        posleft,
        negPosLeft,
        letterWidth;

    var scaleUp = 1;

    var canvasWidth = 0,
        canvasHeight = 0,
        assetWidth = 0;

    function complete() {

        if(typeof callback === "function") {
            callback('cbdata');
        }

    }



    // Private methods
    function placeImage( file ) {

        var letter = arrayChars[index].letter;
        var letterSprite = new PIXI.Sprite(PIXI.loader.resources[file].texture);


        // Anchor
        letterSprite.anchor.x = 0.5;
        letterSprite.anchor.y = 0.5;

        // Rotation
        letterSprite.rotation = randNum(-0.4,0.4)

        // Debugger divs
        var randOffsetNumber = 0.5;
        var colWidthPerc = (100/arrayChars.length);
        var randColWidthPerc = Math.round( randNum( colWidthPerc-(colWidthPerc*randOffsetNumber), colWidthPerc+(colWidthPerc*randOffsetNumber) ) );

        if ( index === arrayChars.length-1 ) {
            var incWidth = 0;
            for (i=0;i<arrayChars.length-1;i++) {
                incWidth = incWidth + arrayChars[i].width;
            }
            randColWidthPerc = 100 -  incWidth;
        }

        // 1 = 1280
        // 2560
        // 2560 / 100 * randColWidthPerc
        // 2560 / 100 * 44  = 1126.4
        // 1126.4 / 1280 * 100
        //console.log('colWidthPerc: ' + colWidthPerc + ' randColWidthPerc: ' + randColWidthPerc);
/*
        // Scaling
        var randScale = (randColWidthPerc/colWidthPerc*100)/100;
        //var randScale = randNum(0.8, 1.15);
        console.log('letter: ' + letter + ' randScale: ' + randScale );
        letterSprite.scale.x = randScale-0.3; //1
        letterSprite.scale.y = randScale-0.3; //1
*/

        var test1 = canvasWidth / 100 * randColWidthPerc;
        var scaleTo = test1 / assetWidth * 100;
        var randScale = scaleTo/100;

        letterSprite.scale.x = randScale+0.3; //1
        letterSprite.scale.y = randScale+0.3; //1


        arrayChars[index].width = randColWidthPerc;

        $('<div class="divider" style="width:'+ randColWidthPerc +'%"></div>').appendTo('.debugger-holder')

        // Position
        posleft = (columnWidth * index);
        negPosLeft = posleft - (columnWidth);

        var incWidth = 0;
    
        for (var i=0;i<=index;i++) {
            if (i==index) {
                incWidth = incWidth + (arrayChars[i].width/2);
            } else {
                incWidth = incWidth + arrayChars[i].width;
            }
        }

        // letterSprite.position.x = posleft + (columnWidth / 2);
        letterSprite.position.x = canvasWidth/100*incWidth;
        //letterSprite.position.y = renderer.height / 2;
        //letterSprite.position.x = (posleft + (columnWidth / 2)) + randNum(-50,50);

        var Yoffset = renderer.height/5;

        letterSprite.position.y = randNum( (renderer.height/2)-Yoffset, (renderer.height/2)+Yoffset); // 200 should be precentage 


        //Add the sprite to the stage
        stage.addChild( letterSprite );

        //Render the stage   
        renderer.render(stage);

        if (index < arrayChars.length - 1) {
            index++;
            loadImage();
        } else {
            complete();
        }

    }

    function loadImage() {

        var letter = arrayChars[index].letter;
        var numberOfLetter = LetterDataModel.getObjectsByLetter( letter ).length;
        var randNumber = Math.floor( Math.random()*numberOfLetter ) + 1;

        // Overwrite random letter
        //randNumber = 1;

        // wip
        var file = CrackedApp.pathsObj.letters + letter + "_"+(randNumber)+".png";

        // Check if image loaded
        if (PIXI.loader.resources[file]) {
            placeImage( file );
        } else {
            PIXI.loader
                .add(file)
                .load(function() {
                    placeImage( file )
                });
        }
    }

    function complete() {

        if(typeof callback === "function") {
            callback('cbdata');
        }

    }

    function setLetters(cb) {

        callback = cb;

        arrayChars = CrackedApp.getChars();

        canvasWidth = CrackedApp.canvasWidth;
        canvasHeight = CrackedApp.canvasHeight;
        assetWidth = CrackedApp.assetWidth;

        columnWidth = canvasWidth / arrayChars.length;
        letterWidth = columnWidth * scaleUp;

        //console.log('arrayChars: ', arrayChars)

        index = 0;
        loadImage(index);

    }

    return {

        setLetters: setLetters

    };

})();
