import * as path from 'path'
import { GetVersion as GetVersion_C } from './c-version-reader'
import { GetVersion as GetVersion_CS } from './cs-version-reader'
import { GetVersion as GetVersion_XML } from './xml-version-reader'

export function Handle(filename: string, keyword: string): string {
  const extension = path.extname(filename)

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

  if (extension === '.csproj' || extension === '.xml') {
    return GetVersion_XML(filename, keyword)
  }

  return ''
}
