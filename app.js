const word = "(1) Text and more text"

const lad = word.split(/[()]+/)
console.log(lad[1])