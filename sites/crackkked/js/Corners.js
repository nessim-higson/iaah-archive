var Corners = (function() {

    'use strict';

    var callback;

    var cornersObj;
    var index;

    var canvasWidth = 0,
        canvasHeight = 0,
        assetWidth = 0;

    function placeCorner( file, cornerIndex ) {

        var cornerSprite = new PIXI.Sprite(PIXI.loader.resources[file].texture);
        var scale = 0.5;

        //console.log('-- placeCorner: ' + file + ' to corner: ' + cornerIndex);

        if ( cornerIndex === 0 ) {

            cornerSprite.scale.x = scale;
            cornerSprite.scale.y = scale;
            cornerSprite.position.x = 0;
            cornerSprite.position.y = 0;

        } else if ( cornerIndex === 1 ) {

            cornerSprite.scale.x = -scale;
            cornerSprite.scale.y = scale;
            cornerSprite.position.x = canvasWidth; //1920;
            cornerSprite.position.y = 0;

        } else if ( cornerIndex === 2 ) {

            cornerSprite.scale.x = -scale;
            cornerSprite.scale.y = -scale;
            cornerSprite.position.x = canvasWidth; //1920;
            cornerSprite.position.y = canvasHeight;

        } else if ( cornerIndex === 3 ) {

            cornerSprite.scale.x = scale;
            cornerSprite.scale.y = -scale;
            cornerSprite.position.x = 0; //1920;
            cornerSprite.position.y = canvasHeight;

        }



        //Add the sprite to the stage
        stage.addChild( cornerSprite );

        //Render the stage   
        renderer.render(stage);

    }

    function loadCorner( index ) {

        //console.log( cornersObj );

        var cornerCount = 0,
            randCorner = 0,
            corner,
            aCorners = LetterDataModel.getCorners().corners;


            //console.log('yesno: ' + Math.round(randNum(0,1)))

            if ( Math.round(randNum(0,1)) || index > 0 ) { // not more then 2 corners

                //console.log('-- add corner to :  ' + index);

                //cornerCount++;

                randCorner = Math.round(randNum(0, cornersObj.length-1));

                corner = cornersObj[randCorner];

                cornersObj.splice( randCorner, 1 );
             
                if (PIXI.loader.resources[CrackedApp.pathsObj.corners + corner.file]) {
                    placeCorner( CrackedApp.pathsObj.corners + corner.file, index );
                } else {
                    PIXI.loader
                        .add(CrackedApp.pathsObj.corners + corner.file)
                        .load(function(e) {
                            placeCorner( CrackedApp.pathsObj.corners + corner.file, index );
                        });
                }

            }


        if ( index <3) {
            index++;
            loadCorner(index);
        } else {
            complete();

            //console.log('cornerCount: ' + cornerCount);
        }
    }

    function complete() {

        if(typeof callback === "function") {
            callback('cbdata');
        }

    }

    function setCorners(cb) {

        callback = cb;

        cornersObj = CrackedApp.getCorners();

        canvasWidth = CrackedApp.canvasWidth;
        canvasHeight = CrackedApp.canvasHeight;
        assetWidth = CrackedApp.assetWidth;

        index = 0;
        loadCorner(index);

    }

    return {

        setCorners: setCorners

    };

})();
