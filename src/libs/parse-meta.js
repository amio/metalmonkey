import requireCJSString from 'require-cjs-string'
import legacyParser from 'userscript-parser'
import ascjs from 'ascjs'

export default function parseMeta (src) {
  try {
    const cjs = ascjs(src)

    let type = 'cjs'
    let parsed = requireCJSString(cjs)

    if (!parsed.meta) {
      type = 'legacy'
      parsed = legacyParser(src)
    }

    return { parsed, type, cjs }
  } catch (error) {
    console.error('parse meta error', error)
    return { error }
  }
}
