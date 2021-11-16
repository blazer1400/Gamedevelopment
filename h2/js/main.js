var game;

window.onload = function () {
    const config = {
        type: Phaser.AUTO,
        parent: 'game',
        width: 640,
        height: 640,
        scale: {
            mode: Phaser.Scale.RESIZE,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        scene: {
            preload,
            create,
            update,
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: false,
            }
        }
    };
    game = new Phaser.Game(config);
}