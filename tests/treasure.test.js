import { Treasure } from '../classes'

const [posX, posY, trunksNumber] = [1, 5, 9]
let treasure = new Treasure(posX, posY, trunksNumber)

describe('Treasure', () => {
    it(`should create Treasure(${posX}, ${posY}, ${trunksNumber})`, () => {
        expect(treasure).toEqual({
            display: true,
            posX: posX,
            posY: posY,
            trunksNumber: trunksNumber,
        })
    })

    describe('decreaseTrunksNumber()', () => {
        it('should decrease trunks number of treasure', () => {
            treasure.decreaseTrunksNumber()

            expect(treasure.trunksNumber).toEqual(trunksNumber - 1)
        })
    })
})
