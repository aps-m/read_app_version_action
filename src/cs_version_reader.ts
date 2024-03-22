import * as fs from 'fs'

export function GetVersion(filename: string, keyword: string): string {
  let result = ''
  const words = fs.readFileSync(filename, 'utf-8')

  const arr = words.split(/\r?\n/)

  let composite_version = ''

  for (let line of arr) {
    let probe: any = new RegExp(
      `\\[assembly: ${keyword}\\("[0-9]+.[0-9]+.[0-9]+.[0-9]+"\\)\\]`
    ).exec(line)

    if (probe) {
      probe = new RegExp(`"[0-9]+.[0-9]+.[0-9]+.[0-9]+"`).exec(line)

      if (probe) {
        probe = probe[0].replaceAll('"', '')
        const verArray = probe.split('.')
        result = `${verArray[0]}`
        result = `${result}.${verArray[1]}`
        result = `${result}.${verArray[2]}`

        if (Number(verArray[3]) > 0) {
          result = `${result}-b${verArray[3]}`
        }

        return result
      }
    }
  }

  return ''
}
