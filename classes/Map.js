export default class Map {
    mapArr
    mountains = []
    treasures = []
    adventurers = []

    constructor(width, height) {
        this.width = width
        this.height = height
    }

    init() {
        const arr = new Array()
        for (let i = 0; i < this.height; i++) {
            arr[i] = new Array()
            for (let j = 0; j < this.width; j++) {
                arr[i][j] = '.'
            }
        }

        this.mapArr = arr
    }

    addMountain(mountain) {
        this.mapArr[mountain.posY][mountain.posX] = 'M'
        this.mountains.push(mountain)
    }

    addTreasure(treasure) {
        this.mapArr[treasure.posY][treasure.posX] = `T(${treasure.trunksNumber})`
        this.treasures.push(treasure)
    }

    addAdventurer(adventurer) {
        this.mapArr[adventurer.posY][adventurer.posX] = `A(${adventurer.name})`
        this.adventurers.push(adventurer)
    }

    isInside(posX, posY) {
        if (posX >= 0 && posX < this.width && posY >= 0 && posY < this.height) return true

        return false
    }

    updateTreasureNumber(display, number, position) {
        if (display) {
            this.mapArr[position[0]][position[1]] = `T(${number})`
        } else if (this.mapArr[position[0]][position[1]].charAt(0) !== 'A') {
            this.mapArr[position[0]][position[1]] = '.'
        }
    }

    updateAdventurerPosition(name, pastPosition, currentPosition) {
        switch (this.mapArr[currentPosition[0]][currentPosition[1]].charAt(0)) {
            case 'T':
            case 'M':
                this.mapArr[currentPosition[0]][currentPosition[1]] = `${this.mapArr[currentPosition[0]][currentPosition[1]]} | A(${name})`
                break;
        
            default:
                this.mapArr[currentPosition[0]][currentPosition[1]] = `A(${name})`
                break;
        }

        switch (this.mapArr[pastPosition[0]][pastPosition[1]].charAt(0)) {
            case 'T':
            case 'M':
                this.mapArr[pastPosition[0]][pastPosition[1]] = this.mapArr[pastPosition[0]][pastPosition[1]].replace(` | A(${name})`, '')
                break;
        
            default:
                this.mapArr[pastPosition[0]][pastPosition[1]] = '.'
                break;
        }
    }
}
