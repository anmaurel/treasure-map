import { Mountain } from '../classes'

const [posX, posY] = [3, 4]
let mountain = new Mountain(posX, posY)

describe('Mountain', () => {
    it(`should create Mountain(${posX}, ${posY})`, () => {
        expect(mountain).toEqual({
            posX: posX,
            posY: posY,
        })
    })
})
