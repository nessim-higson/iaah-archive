    
// triangulation using https://github.com/ironwallaby/delaunay

// canvas settings
var imageWidth = 768,
    imageHeight = 485;

var vertices = [],
    indices,
    boxes = [];

var image,
    fragments = [],
    container = document.getElementById('preloader-container');

var preloader_1_completed = false;

window.onload = function() {
    image = document.getElementById('src_img');

    triangulate();
    makeBoxes();
    makeFragments();
};

function triangulate() {
    var x,
        y,
        dx = imageWidth / 10,
        dy = imageHeight / 10,
        offset = 0.5;

    for (var i = 0; i <= imageWidth; i += dx) {
        for (var j = 0; j <= imageHeight; j += dy) {
            if(i && (i !== imageWidth)) x = i + randomRange(-dx * offset, dx * offset);
            else  x = i;

            if(j && (j !== imageHeight)) y = j + randomRange(-dy * offset, dy * offset);
            else y = j;

            vertices.push([x, y]);
        }
    }

    indices = Delaunay.triangulate(vertices);
}

function makeBoxes() {
    var p0, p1, p2,
        xMin, xMax,
        yMin, yMax;

    for (var i = 0; i < indices.length; i += 3) {
        p0 = vertices[indices[i + 0]];
        p1 = vertices[indices[i + 1]];
        p2 = vertices[indices[i + 2]];

        xMin = Math.min(p0[0], p1[0], p2[0]);
        xMax = Math.max(p0[0], p1[0], p2[0]);
        yMin = Math.min(p0[1], p1[1], p2[1]);
        yMax = Math.max(p0[1], p1[1], p2[1]);

        boxes.push({
            x:xMin,
            y:yMin,
            w:xMax - xMin,
            h:yMax - yMin
        });
    }
}

function makeFragments() {
    var p0, p1, p2,
        box,
        fragment;

    TweenMax.set(container, {perspective:500});

    var tl0 = new TimelineMax({repeat:0, 
                                onComplete: function(i) {
                                    preloader_1_completed = true;
                                    
                                    if (preloader_2_completed) {
                                        window.CrackedApp.showIntro();
                                    }
                                }});

    for (var i = 0; i < indices.length; i += 3) {
        p0 = vertices[indices[i + 0]];
        p1 = vertices[indices[i + 1]];
        p2 = vertices[indices[i + 2]];
        box = boxes[i / 3];

        fragment = new Fragment(p0, p1, p2, box);

        var rx = randomRange(30, 60) * ((i % 2) ? 1 : -1);
        var ry = randomRange(30, 50) * ((i % 2) ? -1 : 1);
        var tl1 = new TimelineMax();

        tl1.to(fragment.canvas, 0, {
            //rotationX:rx,
            top: randomRange(-5, 5),
            left: randomRange(-5, 5),
            rotationY:ry,
            z:randomRange(-5, 20),
            alpha:0,
            ease:Cubic.easeOut
        });

        tl1.to(fragment.canvas, randomRange(0.2, 0.4), {
            //delay: randomRange(0, 4.5),
            delay: randomRange(0, 1.5),
            z:randomRange(20, 40),
            alpha:1
        });

        tl0.insert(tl1);

        fragments.push(fragment);
        container.appendChild(fragment.canvas);
    }
}

function randomRange(min, max) {
    return min + (max - min) * Math.random();
}

var Fragment = function(v0, v1, v2, box) {
    this.v0 = v0;
    this.v1 = v1;
    this.v2 = v2;
    this.box = box;

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.box.w;
    this.canvas.height = this.box.h;
    this.canvas.style.width = this.box.w + 'px';
    this.canvas.style.height = this.box.h + 'px';
    this.ctx = this.canvas.getContext('2d');

    TweenMax.set(this.canvas, {
        x:this.box.x,
        y:this.box.y
    });

    this.ctx.translate(-this.box.x, -this.box.y);
    this.ctx.beginPath();
    this.ctx.moveTo(this.v0[0], this.v0[1]);
    this.ctx.lineTo(this.v1[0], this.v1[1]);
    this.ctx.lineTo(this.v2[0], this.v2[1]);
    this.ctx.closePath();
    this.ctx.clip();
    this.ctx.drawImage(image, 0, 0);
};