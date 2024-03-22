import * as fs from 'fs'

export function GetVersion(filename: string, keyword: string): string {
  let result = ''
  const words = fs.readFileSync(filename, 'utf-8')

  const arr = words.split(/\r?\n/)

  let composite_version = ''

  for (let line of arr) {
    let probe: any = new RegExp(`#define ${keyword} "[\\w.-]+"`).exec(line)

    if (probe) {
      probe = probe[0]
      probe = probe.replaceAll('"', '')
      probe = probe.replace(`#define ${keyword} `, '')
      result = probe
      return result
    } else {
      probe = new RegExp(`#define ${keyword}_MAJOR[\\s]+\\([0-9]+\\)`).exec(
        line
      )
      if (probe) {
        probe = new RegExp(`\\([0-9]+\\)`).exec(line)
        probe = probe[0]
        probe = probe.replace('(', '')
        probe = probe.replace(')', '')
        composite_version += `${probe}.`
      }

      probe = new RegExp(`#define ${keyword}_MINOR[\\s]+\\([0-9]+\\)`).exec(
        line
      )

      if (probe) {
        probe = new RegExp(`\\([0-9]+\\)`).exec(line)
        probe = probe[0]
        probe = probe.replace('(', '')
        probe = probe.replace(')', '')
        composite_version += `${probe}.`
      }

      probe = new RegExp(`#define ${keyword}_PATCH[\\s]+\\([0-9]+\\)`).exec(
        line
      )

      if (probe) {
        probe = new RegExp(`\\([0-9]+\\)`).exec(line)
        probe = probe[0]
        probe = probe.replace('(', '')
        probe = probe.replace(')', '')
        composite_version += `${probe}`
      }

      probe = new RegExp(`#define ${keyword}_BETABUILD[\\s]+\\([0-9]+\\)`).exec(
        line
      )
      if (probe) {
        probe = new RegExp(`\\([0-9]+\\)`).exec(line)
        probe = probe[0]
        probe = probe.replace('(', '')
        probe = probe.replace(')', '')

        if (Number(probe) > 0) {
          composite_version += `-b${probe}`
        }

        result = composite_version
        return result
      }
    }
  }

  return ''
}
