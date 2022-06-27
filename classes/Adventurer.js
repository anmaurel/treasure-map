export default class Adventurer {
    #directions = ['N', 'E', 'S', 'O']
    trunksFound = 0

    constructor(name, posX, posY, direction, movements) {
        this.name = name
        this.posX = posX
        this.posY = posY
        this.direction = direction
        this.movements = movements
    }

    updateDirection(movement) {
        const indexDirection = this.#directions.findIndex((el) => el === this.direction)

        switch (movement) {
            case 'G':
                indexDirection !== 0
                    ? (this.direction = this.#directions[indexDirection - 1])
                    : (this.direction = this.#directions[3])
                break

            case 'D':
                indexDirection !== 3
                    ? (this.direction = this.#directions[indexDirection + 1])
                    : (this.direction = this.#directions[0])
                break
        }
    }

    updatePosition() {
        switch (this.direction) {
            case 'N':
                this.posY -= 1
                break;

            case 'E':
                this.posX += 1
                break;

            case 'S':
                this.posY += 1
                break;

            case 'O':
                this.posX -= 1
                break;
        }
    }
}
