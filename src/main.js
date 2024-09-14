import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1500 }, // Гравитация для платформера
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);

function preload() {
  // Здесь загружаем ресурсы (картинки, спрайты)
  this.load.image('background', 'assets/background.png');
  this.load.image('tile', 'assets/tile.png');
  this.load.spritesheet('player_idle', 'assets/player/Idle.png', { frameWidth: 128, frameHeight: 128 });
  this.load.spritesheet('player_run', 'assets/player/Run.png', { frameWidth: 128, frameHeight: 128 });
  this.load.spritesheet('player_jump', 'assets/player/Jump.png', { frameWidth: 128, frameHeight: 128 });
}

function create() {
  // Создаем фон
  this.add.image(512, 384, 'background').setScrollFactor(1);

  // Настройка камеры
  this.cameras.main.setBounds(0, 0, 2048, 768);
  this.physics.world.setBounds(0, 0, 2048, 768);

  // Определяем размер тайлов
  const tileSize = 32;
  const screenWidth = 1024;

  // Создаем карту
  const map = this.make.tilemap({
    tileWidth: tileSize,
    tileHeight: tileSize,
    width: Math.ceil(screenWidth / tileSize),
    height: 1
  });

  const map1 = this.make.tilemap({
    tileWidth: tileSize,
    tileHeight: tileSize,
    width: Math.ceil(screenWidth / tileSize),
    height: 1
  });

  // Добавляем тайлсет
  const tiles = map.addTilesetImage('tile');
  const layer = map.createBlankLayer('Ground', tiles);

  for (let x = 0; x < Math.ceil(screenWidth / tileSize); x++) {
    layer.putTileAt(0, x, 0);
  }

  layer.setPosition(0, 768 - tileSize);
  layer.setOrigin(0, 1);
  layer.setSize(screenWidth, tileSize);
  layer.setCollisionByExclusion([-1]);

// Создаем анимации для игрока
this.anims.create({
  key: 'idle',
  frames: this.anims.generateFrameNumbers('player_idle', { start: 0, end: 5 }),
  frameRate: 10,
  repeat: -1
});

this.anims.create({
  key: 'run',
  frames: this.anims.generateFrameNumbers('player_run', { start: 0, end: 9 }),
  frameRate: 5,
  repeat: -1
});

  this.anims.create({
  key: 'jump',
  frames: this.anims.generateFrameNumbers('player_jump', { start: 0, end: 9 }),
  frameRate: 10,
  repeat: -1
});

  // Создаем игрока
  this.player = this.physics.add.sprite(500, 768 - tileSize - 128, 'player_idle').setOrigin(0.5, 1);
  // Устанавливаем параметры инерции
  this.player.setDragX(600);
  this.player.setMaxVelocity(160, 960)

this.player.setSize(30, 72);
this.player.setOffset(48, 58); // Смещение относительно центра спрайта

  this.player.setCollideWorldBounds(true);

  // Устанавливаем начальную анимацию
  this.player.anims.play('idle');
// Убедитесь, что вы правильно создаете коллайдер
this.physics.add.collider(this.player, layer);


  this.cursors = this.input.keyboard.createCursorKeys();
    this.WKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  this.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  this.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);



}


function update() {
  
  // Двигаем игрока влево и вправо
 if (this.AKey.isDown || this.cursors.left.isDown) {
    this.player.setAccelerationX(-500);
    this.player.anims.play('run', true);
     this.player.setFlipX(true); // Разворачиваем спрайт влево
  } else if (this.DKey.isDown || this.cursors.right.isDown) {
    this.player.setAccelerationX(500);

    this.player.anims.play('run', true);
     this.player.setFlipX(false); // Возвращаем спрайт в нормальное состояние
  } else {
    this.player.setAccelerationX(0);
    this.player.anims.play('idle', true);
  }

if ((this.WKey.isDown || this.cursors.up.isDown)) {
this.player.anims.play('jump', true);
    this.player.setVelocityY(-600);
  }

   if (this.player.body.touching.down) {
    console.log('Player is touching down');
  }
}
