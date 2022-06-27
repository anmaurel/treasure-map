export default function (linesFiltered, map) {
    let outputArr = linesFiltered.filter((line) => line.charAt(0) === 'C' || line.charAt(0) === 'M')
    map.treasures.forEach(treasure => {
        if (treasure.display) outputArr.push(`T - ${treasure.posX} - ${treasure.posY} - ${treasure.trunksNumber}`)
    })
    map.adventurers.forEach(adventurer => {
        outputArr.push(`A - ${adventurer.name} - ${adventurer.posX} - ${adventurer.posY} - ${adventurer.direction} - ${adventurer.trunksFound}`)
    })

    return outputArr
}