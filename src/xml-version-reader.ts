import * as fs from 'fs'

function extractXmlVersion(line: string, keyword: string): string[] | null {
  const match = new RegExp(
    `<${keyword}>([0-9]+(?:\\.[0-9]+){3})</${keyword}>`
  ).exec(line)

  return match?.[1].split('.') ?? null
}

export function GetVersion(filename: string, keyword: string): string {
  const words = fs.readFileSync(filename, 'utf-8')
  const lines = words.split(/\r?\n/)

  for (const line of lines) {
    const versionParts = extractXmlVersion(line, keyword)

    if (versionParts) {
      let result = `${versionParts[0]}.${versionParts[1]}.${versionParts[2]}`

      if (Number(versionParts[3]) > 0) {
        result = `${result}-b${versionParts[3]}`
      }

      return result
    }
  }

  return ''
}
