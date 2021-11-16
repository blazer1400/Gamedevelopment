let player, ball, cursors;
const keys = {};
let gameStarted = false;
let openingText, player1VictoryText, player2VictoryText;

function preload() {
    this.load.image('ball', 'images/ball.png');
    this.load.image('paddle', 'images/ding.png');
    this.load.image('paddle2', 'images/ding2.png');
}

function create() {
    ball = this.physics.add.sprite(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height / 2,
        'ball'
    );
    ball.setVisible(false);

    player1 = this.physics.add.sprite(
        this.physics.world.bounds.width - (ball.body.width / 2 + 1),
        this.physics.world.bounds.height / 2,
        'paddle',
    );

    player2 = this.physics.add.sprite(
        (ball.body.width / 2 + 1),
        this.physics.world.bounds.height / 2,
        'paddle2',
    );

    cursors = this.input.keyboard.createCursorKeys();
    keys.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keys.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    player1.setCollideWorldBounds(true);
    player2.setCollideWorldBounds(true);
    ball.setCollideWorldBounds(true);
    ball.setBounce(1, 1);
    player1.setImmovable(true);
    player2.setImmovable(true);
    this.physics.add.collider(ball, player1, null, null, this);
    this.physics.add.collider(ball, player2, null, null, this);

    titleText = this.add.text(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height / 2,
        'Paares pong',
        {
            fontFamily: 'Monaco, Courier, monospace',
            fontSize: '50px',
            fill: '#fff'
        }
    );

    titleText.setOrigin(0.5,1.7);

    openingText = this.add.text(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height / 2,
        'Press SPACE to Start',
        {
            fontFamily: 'Monaco, Courier, monospace',
            fontSize: '50px',
            fill: '#fff'
        }
    );

    openingText.setOrigin(0.5,-0.5);

    player1VictoryText = this.add.text(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height / 2,
        'Paares kom terug...',
        {
            fontFamily: 'Monaco, Courier, monospace',
            fontSize: '50px',
            fill: '#fff'
        }
    );

    player1VictoryText.setOrigin(0.5);

    player1VictoryText.setVisible(false);

    player2VictoryText = this.add.text(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height / 2,
        'Kop of munt?',
        {
            fontFamily: 'Monaco, Courier, monospace',
            fontSize: '50px',
            fill: '#fff'
        }
    );

    player2VictoryText.setOrigin(0.5);

    player2VictoryText.setVisible(false);
}

function update() {
    if (isPlayer1Point()) {
        player1VictoryText.setVisible(true);
        ball.disableBody(true, true);
        return;
    }
    if (isPlayer2Point()) {
        player2VictoryText.setVisible(true);
        ball.disableBody(true, true);
        return;
    }

    player1.body.setVelocityY(0);
    player2.body.setVelocityY(0);

    if (cursors.up.isDown) {
        player1.body.setVelocityY(-350);
    } else if (cursors.down.isDown) {
        player1.body.setVelocityY(350);
    }

    if (keys.w.isDown) {
        player2.body.setVelocityY(-350);
    } else if (keys.s.isDown) {
        player2.body.setVelocityY(350);
    }

    if (!gameStarted) {
        if (cursors.space.isDown) {
            ball.setVisible(true);
            gameStarted = true;
            const initialXSpeed = Math.random() * 200 + 50;
            const initialYSpeed = Math.random() * 200 + 50;
            ball.setVelocityX(initialXSpeed);
            ball.setVelocityY(initialYSpeed);
            openingText.setVisible(false);
            titleText.setVisible(false);
        }
    }
}

function isPlayer1Point() {
    return ball.body.x < player2.body.x;
}

function isPlayer2Point() {
    return ball.body.x > player1.body.x;
}

function hitPlayer(ball, player) {

}