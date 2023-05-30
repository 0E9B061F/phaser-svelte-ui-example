export default class Dot extends Phaser.GameObjects.Graphics {
  size: number
  min: number
  rot: number
  rand: number

  constructor(scene: Phaser.Scene, x: number, y: number, size: number, min: number, rot: number) {
    super(scene, { x, y })
    scene.add.existing(this)
    this.rand = Math.random()
    this.resize(min, size)
    this.rotate(rot)
  }
  resize(min: number, size: number) {
    this.min = min
    this.size = size
    this.clear()
    this.fillStyle(this.rand * 0xffffff, this.rand * 0.8)
    this.fillPoint(0, 0, this.min + (this.size * this.rand))
  }
  rotate(rot: number) {
    this.rot = rot
    this.angle = this.rot
  }
}
