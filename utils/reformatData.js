export default function (line) {
    const withoutSpace = line.split(' ').join('')
    const [type, ...data] = withoutSpace.split('-')

    return [type, data]
}
