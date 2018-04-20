export default ({children, style, className = ''}) => (
  <div className={'root ' + className} style={style}>
    { children }
    <style jsx>{`
      flex-grow: 1
    `}</style>
    <style jsx global>{globalStyles}</style>
  </div>
)

const globalStyles = `
  html, body { margin: 0 }
`
