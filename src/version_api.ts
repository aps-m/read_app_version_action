import * as path from 'path'
import { GetVersion as GetVersion_C } from './c_version_reader'
import { GetVersion as GetVersion_CS } from './cs_version_reader'

export function Handle(filename: string, keyword: string): string {
  let extension = path.extname(filename)

  if (
    extension === '.h' ||
    extension === '.hpp' ||
    extension === '.c' ||
    extension === '.cpp'
  ) {
    return GetVersion_C(filename, keyword)
  }

  if (extension === '.cs') {
    return GetVersion_CS(filename, keyword)
  }

  return ''
}
