import fs from 'fs'

import { Adventurer, Map, Mountain, Treasure } from './classes/'
import { reformatData, addComments, addUpdatedData } from './utils/'

try {
    const data = fs.readFileSync('entry.txt', 'utf8')
    const lines = data.split(/\r?\n/)
    const linesFiltered = lines.filter((string) => string.charAt(0) !== '#')

    const mapDimension = reformatData(linesFiltered[0])[1]
    const map = new Map(parseInt(mapDimension[0]), parseInt(mapDimension[1]))

    map.init()

    linesFiltered.forEach((line) => {
        const [type, data] = reformatData(line)

        switch (type.charAt(0)) {
            case 'M':
                map.addMountain(new Mountain(parseInt(data[0]), parseInt(data[1])))
                break

            case 'T':
                map.addTreasure(new Treasure(parseInt(data[0]), parseInt(data[1]), parseInt(data[2])))
                break

            case 'A':
                map.addAdventurer(new Adventurer(data[0], parseInt(data[1]), parseInt(data[2]), data[3], data[4]))
                break
        }
    })

    let adventurerRemaining = map.adventurers.length
    while (adventurerRemaining > 0) {
        console.log(map.mapArr)
        map.adventurers.forEach((adventurer) => {
            if (adventurer.movements.length > 0) {
                const movement = adventurer.movements.charAt(0)

                if (movement === 'A') {
                    const pastPosition = [adventurer.posY, adventurer.posX]
                    adventurer.updatePosition()

                    map.treasures.forEach((treasure) => {
                        if (
                            treasure.display &&
                            treasure.posY === adventurer.posY &&
                            treasure.posX === adventurer.posX
                        ) {
                            treasure.decreaseTrunksNumber()
                            adventurer.trunksFound += 1
                            map.updateTreasureNumber(treasure.display, treasure.trunksNumber, [
                                treasure.posY,
                                treasure.posX,
                            ])
                        }
                    })

                    if (map.isInside(adventurer.posX, adventurer.posY)) {
                        switch (map.mapArr[adventurer.posY][adventurer.posX].charAt(0)) {
                            case 'M':
                                if (adventurer.direction === 'N') {
                                    map.updateAdventurerPosition(adventurer.name, pastPosition, [
                                        adventurer.posY,
                                        adventurer.posX,
                                    ])
                                } else {
                                    adventurer.posX = pastPosition[1]
                                    adventurer.posY = pastPosition[0]
                                }
                                break

                            case 'A':
                                adventurer.posX = pastPosition[1]
                                adventurer.posY = pastPosition[0]
                                break
    
                            case 'T':
                            case '.':
                                map.updateAdventurerPosition(adventurer.name, pastPosition, [
                                    adventurer.posY,
                                    adventurer.posX,
                                ])
                                break
                        }
                    } else {
                        adventurer.posX = pastPosition[1]
                        adventurer.posY = pastPosition[0]
                    }
                } else {
                    adventurer.updateDirection(movement)
                }

                adventurer.movements = adventurer.movements.substring(1)
                if (adventurer.movements.length === 0) adventurerRemaining -= 1
            }
        })
    }

    console.log(map.mapArr)

    const outputArr = addUpdatedData(linesFiltered, map)
    const finalOutputArr = addComments(outputArr)
    fs.writeFileSync('output.txt', finalOutputArr.join('\n'))
} catch (err) {
    console.error(err)
}
