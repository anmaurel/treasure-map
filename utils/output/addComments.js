const comments = [
    ['T', '# {T comme Trésor} - {Axe horizontal} - {Axe vertical} - {Nb. de trésors restants}'],
    [
        'A',
        '# {A comme Aventurier} - {Nom de l’aventurier} - {Axe horizontal} - {Axe vertical} - {Orientation} - {Nb. trésors ramassés}',
    ],
]

export default function (arr) {
    comments.forEach((comment) => {
        arr.splice(
            arr.findIndex((el) => el.charAt(0) === comment[0]),
            0,
            comment[1]
        )
    })

    return arr
}