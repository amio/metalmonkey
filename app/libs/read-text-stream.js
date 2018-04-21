export default function readTextStreamAsync (stream, onText) {
  const decoder = new window.TextDecoder()

  let text = ''
  return readStreamAsync(stream, partial => {
    const chunk = decoder.decode(partial || new Uint8Array(), { stream: true })
    text += chunk
    onText && onText(chunk)
  }).then(() => text)
}

function readStreamAsync (stream, onPartial) {
  const reader = stream.getReader()
  return reader.read().then(function processChunk ({done, value}) {
    if (!done) {
      onPartial(value)
      reader.read().then(processChunk)
    }
  })
}
