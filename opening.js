class opening extends Phaser.Scene {
    constructor() {
        super('opening');
    }

    preload() {
        this.load.image('openingBackground', 'assets/opening.png');
        this.load.audio('wind', 'assets/wind.mp3');
    }

    create() {
        const cx = this.scale.width / 2;
        const cy = this.scale.height / 2;

        this.sound.stopByKey('wind');
        this.sound.play('wind', { loop: true, volume: 0.4 });

        this.add.image(cx, cy, 'openingBackground')
            .setDisplaySize(this.scale.width, this.scale.height);

        const textStyle = {
            fontFamily: '"Press Start 2P"',
            fontSize: '13px',
            color: '#9dfc8b',
            stroke: '#102030',
            strokeThickness: 3,
            align: 'center',
            wordWrap: { width: 700 }
        };

        const section1 = this.add.text(
            cx,
            cy - 90,
            'It feels like yesterday the world changed in unimaginable ways. After the first few hours everyone was at in complete disarray and millions were gone.',
            textStyle
        ).setOrigin(0.5).setAlpha(0);

        const section2 = this.add.text(
            cx,
            cy + 70,
            'Nows its up to me to figure out how i can fix the gravity back to the way it was.',
            textStyle
        ).setOrigin(0.5).setAlpha(0);

        this.tweens.add({
            targets: section1,
            alpha: 1,
            duration: 1200,
            ease: 'Sine.easeInOut'
        });

        this.tweens.add({
            targets: section2,
            alpha: 1,
            duration: 1200,
            ease: 'Sine.easeInOut',
            delay: 1800
        });

        this.time.delayedCall(6700, () => {
            this.cameras.main.fadeOut(1600, 0, 0, 0);
        });

        this.input.keyboard.on('keydown-SPACE', () => {
            this.sound.stopByKey('wind');
            this.scene.start('studio');
        });

        this.cameras.main.once('camerafadeoutcomplete', () => {
            // Stay on black screen until SPACE is pressed.
        });
    }
}