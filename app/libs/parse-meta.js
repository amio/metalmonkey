import requireCJSString from 'require-cjs-string'
import legacyParser from 'userscript-parser'

export default function parseMeta (src) {
  try {
    let type = 'npm'
    let parsed = _parseAsCjs(src)

    if (!parsed) {
      type = 'legacy'
      parsed = legacyParser(src)
    }

    return { parsed, type }
  } catch (error) {
    console.error('parse meta error', error)
    return { error }
  }
}

function _parseAsCjs (src) {
  try {
    return requireCJSString(src)
  } catch (e) {
    return null
  }
}
