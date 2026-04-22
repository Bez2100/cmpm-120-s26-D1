class worldbuild extends Phaser.Scene {
    constructor() {
        super('worldbuild');
    }

    create() {
        const cx = this.scale.width / 2;
        const textStyle = {
            fontFamily: '"Press Start 2P"',
            fontSize: '16px',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: 680 }
        };

        const lines = [
            '10 years ago the gravity shifted\u2026',
            'What was up and what was down have no\nrelevance in this new world',
            'There were those who tried to overcome\nthis change and uncover the secret of\nthe gravity shift',
            'And they were called the\u2026'
        ];

        // Build text objects, all invisible to start
        const textObjects = lines.map((line, i) => {
            return this.add.text(cx, 140 + i * 120, line, textStyle)
                .setOrigin(0.5, 0)
                .setAlpha(0);
        });

        // Chain: each line fades in, holds, then next line fades in
        let delay = 0;
        const fadeInDuration = 800;
        const holdDuration = 1200;

        textObjects.forEach((obj) => {
            this.tweens.add({
                targets: obj,
                alpha: 1,
                duration: fadeInDuration,
                ease: 'Sine.easeIn',
                delay: delay
            });
            delay += fadeInDuration + holdDuration;
        });

        // After all lines are visible, hold then fade everything out
        const totalFadeInTime = delay;
        const holdAllDuration = 1500;

        this.tweens.add({
            targets: textObjects,
            alpha: 0,
            duration: 1000,
            ease: 'Sine.easeOut',
            delay: totalFadeInTime + holdAllDuration,
            onComplete: () => {
                this.showLoading();
            }
        });
    }

    showLoading() {
        const cx = this.scale.width / 2;
        const cy = this.scale.height / 2;

        const loadingText = this.add.text(cx, cy, 'Loading\u2026', {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#9dfc8b',
            align: 'center'
        }).setOrigin(0.5).setAlpha(0);

        // Fade in the loading text
        this.tweens.add({
            targets: loadingText,
            alpha: 1,
            duration: 500,
            ease: 'Sine.easeIn',
            onComplete: () => {
                // Pulsating loop
                this.tweens.add({
                    targets: loadingText,
                    alpha: 0.15,
                    duration: 600,
                    ease: 'Sine.easeInOut',
                    yoyo: true,
                    repeat: 3,
                    onComplete: () => {
                        // Fade out loading text then go to homescreen
                        this.tweens.add({
                            targets: loadingText,
                            alpha: 0,
                            duration: 600,
                            ease: 'Sine.easeOut',
                            onComplete: () => {
                                this.scene.start('homescreen');
                            }
                        });
                    }
                });
            }
        });
    }
}