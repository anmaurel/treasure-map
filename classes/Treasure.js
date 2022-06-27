export default class Treasure {
    display = true
    
    constructor(posX, posY, trunksNumber) {
        this.posX = posX
        this.posY = posY
        this.trunksNumber = trunksNumber
    }

    decreaseTrunksNumber() {
        this.trunksNumber -= 1

        if (this.trunksNumber === 0) this.display = false
    }
}