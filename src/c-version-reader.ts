import * as fs from 'fs'

function extractDefineValue(line: string, pattern: RegExp): string {
  const match = pattern.exec(line)

  return match?.[1] ?? ''
}

export function GetVersion(filename: string, keyword: string): string {
  const words = fs.readFileSync(filename, 'utf-8')
  const lines = words.split(/\r?\n/)
  let compositeVersion = ''

  for (const line of lines) {
    const directVersion = extractDefineValue(
      line,
      new RegExp(`#define ${keyword} "([\\w.-]+)"`)
    )

    if (directVersion) {
      return directVersion
    }

    const majorVersion = extractDefineValue(
      line,
      new RegExp(`#define ${keyword}_MAJOR[\\s]+\\(([0-9]+)\\)`)
    )

    if (majorVersion) {
      compositeVersion += `${majorVersion}.`
    }

    const minorVersion = extractDefineValue(
      line,
      new RegExp(`#define ${keyword}_MINOR[\\s]+\\(([0-9]+)\\)`)
    )

    if (minorVersion) {
      compositeVersion += `${minorVersion}.`
    }

    const patchVersion = extractDefineValue(
      line,
      new RegExp(`#define ${keyword}_PATCH[\\s]+\\(([0-9]+)\\)`)
    )

    if (patchVersion) {
      compositeVersion += patchVersion
    }

    const betaBuild = extractDefineValue(
      line,
      new RegExp(`#define ${keyword}_BETABUILD[\\s]+\\(([0-9]+)\\)`)
    )

    if (betaBuild) {
      if (Number(betaBuild) > 0) {
        compositeVersion += `-b${betaBuild}`
      }

      return compositeVersion
    }
  }

  return ''
}
