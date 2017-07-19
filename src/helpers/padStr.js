export default function pad(str, pad = 2, filler = '0') {
  str = String(str)

  if (str.length < pad) {
    while(str.length < pad) {
      str = filler + str
    }
  }

  return str
}
