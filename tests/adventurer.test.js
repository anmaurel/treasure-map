import { Adventurer } from '../classes'

const [name, posX, posY, direction, movements] = ['Pierre', 5, 6, 'S', 'AADAA']
let adventurer = new Adventurer(name, posX, posY, direction, movements)

describe('Adventurer', () => {
    it(`should create Adventurer(${name}, ${posX}, ${posY}, ${direction}, ${movements})`, () => {
        expect(adventurer).toEqual({
            trunksFound: 0,
            name: name,
            posX: posX,
            posY: posY,
            direction: direction,
            movements: movements,
        })
    })

    describe('updateDirection()', () => {
        it('should update adventurer direction', () => {
            adventurer.updateDirection(adventurer.movements.charAt(2))

            expect(adventurer.direction).not.toEqual(direction)
        })
    })

    describe('updatePosition()', () => {
        it('should update adventurer position', () => {
            adventurer.updatePosition()

            expect([adventurer.posX, adventurer.posY]).not.toEqual([posX, posY])
        })
    })
})
