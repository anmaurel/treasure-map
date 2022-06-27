import { Map, Mountain, Treasure, Adventurer } from '../classes'

const [width, height] = [5, 8]
let map = new Map(width, height)

const mountains = [
    [1, 2],
    [3, 4],
    [4, 6],
]
const treasures = [
    [2, 4, 10],
    [3, 5, 12],
    [1, 1, 1],
]
const adventurers = [
    ['Pierre', 5, 6, 'S', 'AADAA'],
    ['Julie', 2, 1, 'N', 'GADAG'],
    ['Kevin', 4, 4, 'O', 'ADGGADAA'],
]
const positionsToCheck = [
    [12, 7, false],
    [4, 9, false],
    [2, 4, true],
]
// const treasuresToUpdate = [
//     [true, 9, [2, 4]],
//     [true, 11, [3, 5]],
//     [false, 0, [1, 1]],
// ]

describe('Map', () => {
    it(`should create Map(${width}, ${height})`, () => {
        expect(map).toEqual({
            mapArr: undefined,
            mountains: [],
            treasures: [],
            adventurers: [],
            width: width,
            height: height,
        })
    })

    describe('init()', () => {
        it(`should create a multidimensional array with dimensions ${width},${height}`, () => {
            map.init()

            const result = new Array(height).fill('.').map(() => new Array(width).fill('.'))
            expect(map.mapArr).toEqual(result)
        })
    })

    describe('addMountain()', () => {
        test.each(mountains)(
            'should create Mountain(%p, %p) && store it in mountains[] && update mapArr[] with mountain positions',
            (posX, posY) => {
                const mountain = new Mountain(posX, posY)
                map.addMountain(mountain)

                const result = map.mountains
                expect(result).toContainEqual({
                    posX: posX,
                    posY: posY,
                })

                expect(map.mapArr[posY][posX]).toEqual('M')
            }
        )
    })

    describe('addTreasure()', () => {
        test.each(treasures)(
            'should create Treasure(%p, %p) && store it in treasures[] && update mapArr[] with treasure positions',
            (posX, posY, trunksNumber) => {
                const treasure = new Treasure(posX, posY, trunksNumber)
                map.addTreasure(treasure)

                const result = map.treasures
                expect(result).toContainEqual({
                    display: true,
                    posX: posX,
                    posY: posY,
                    trunksNumber: trunksNumber,
                })

                expect(map.mapArr[posY][posX]).toEqual(`T(${trunksNumber})`)
            }
        )
    })

    describe('addAdventurer()', () => {
        test.each(adventurers)(
            'should create Adventurer(%p, %p, %p, %p, %p) && store it in adventurers[] && update mapArr[] with adventurer positions',
            (name, posX, posY, direction, movements) => {
                const adventurer = new Adventurer(name, posX, posY, direction, movements)
                map.addAdventurer(adventurer)

                const result = map.adventurers
                expect(result).toContainEqual({
                    trunksFound: 0,
                    name: name,
                    posX: posX,
                    posY: posY,
                    direction: direction,
                    movements: movements,
                })

                expect(map.mapArr[posY][posX]).toEqual(`A(${name})`)
            }
        )
    })

    describe('isInside()', () => {
        test.each(positionsToCheck)(
            'given position [%p, %p] and return %p',
            (posX, posY, returnValue) => {
                const result = map.isInside(posX, posY)
                expect(result).toEqual(returnValue)
            }
        )
    })

    // describe('updateTreasureNumber()', () => {
    //     test.each(treasuresToUpdate)()
    // })

    // describe('updateAdventurerPosition()', () => {
    //     test.each(treasuresToUpdate)()
    // })
})
