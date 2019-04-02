// Clear the console
console.clear();


// Mouse Interaction Class
class Interact {
    constructor(elem, ease) {
        this.elem = elem;
        this.skew = ease;

    }
    initEvents() {
        this.elem.addEventListener('mousemove', (evt) => this.init(evt));
        this.elem.addEventListener('mouseleave', (evt) => this.initleave(evt));



    }
    initleave(e) {
        TweenMax.to(this.elem, 1, {
            rotation: 0,
            // rotationY: cxPoint / 50 * ease,
            x: 0,
            y: 0,
            skewX: 0,
            skewY: 0,
            transformOrigin: 'left',
            ease: Expo.ease
        })
    }
    init(evt) {
        this.elemRect = this.elem.getBoundingClientRect();
        this.xPos = evt.clientX - this.elemRect.left;
        this.yPos = evt.clientY - this.elemRect.top;

        // Bounds of cursor
        this.cx = this.elemRect.width / 2;
        this.cy = this.elemRect.height / 2;

        this.cxPoint = this.xPos - this.cx;
        this.cyPoint = this.yPos - this.cy;

        TweenMax.to(this.elem, 1, {
            rotationX: this.cxPoint / 50 * this.skew,
            // rotationY: cxPoint / 50 * ease,
            x: this.cxPoint,
            y: this.cyPoint,
            transformPerspective: 500,
            skewX: `${(this.cxPoint) * this.skew}deg`,
            skewY: `${(this.cxPoint) * this.skew}deg`,
            transformOrigin: 'left',
            ease: Expo.ease

        })
    }
}

/////////////////////////

// Main Application
class Application {
    constructor(container) {
        this.images = [
            'img/me.jpg'
        ]
        this.speed = 0;
        this.s = 20;
        this.container = document.querySelector(container);
        this.width = 670;
        this.height = 465;

        this.renderer = new PIXI.autoDetectRenderer(this.width, this.height, {
            transparent: true,
            antialias: true
        });
        this.renderer.autoResize = true;
    }
    init() {
        this.count = 0;
        this.imageURL = this.images[this.count]
        this.dispURL = 'https://res.cloudinary.com/dvxikybyi/image/upload/v1486634113/2yYayZk_vqsyzx.png'
        this.container.appendChild(this.renderer.view);
        this.stage = new PIXI.Container();

        this.texture = PIXI.Texture.fromImage(this.imageURL);
        this.sprite = new PIXI.Sprite(this.texture);
        //Scale the image
        this.sprite.scale.set(0.5, 0.5);
        //Set image anchor point
        this.sprite.anchor.set(0, 0);

        this.displacementSprite = PIXI.Sprite.fromImage(this.dispURL);
        this.displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
        this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite);

        this.displacementSprite.scale.x = 0.9;
        this.displacementSprite.scale.y = 0.9;

        this.stage.addChild(this.sprite);
        this.stage.addChild(this.displacementSprite);
        setInterval(() => {
            this.count++;

            if (this.count > this.images.length - 1) {
                this.count = 0;
            }

        }, 500)
        this.container.addEventListener('mouseenter', (e) => this.animateContainer(e))
        this.animate()
    }
    animate() {
        requestAnimationFrame(() => this.animate())
        this.speed += 1;
        this.imageURL = this.images[this.count]

        this.stage.filters = [this.displacementFilter]
        this.renderer.render(this.stage)

        TweenMax.to(this.displacementFilter.scale, 1, {
            x: this.s
        })


        this.displacementSprite.x = this.speed;
        this.displacementSprite.y = this.speed;


    }
    animateContainer(e) {
        TweenMax.to(this.displacementFilter.scale, 1, {
            x: 0
        })
    }
}
window.onload = () => {

    let app = new Application('.square');
    app.init()
    let image = document.querySelector('.square');

    let int = new Interact(image, 0.1);
    int.initEvents();
}



function animate() {
    requestAnimationFrame(animate);

    // console.log(lerp(1, 100, 1))
}
