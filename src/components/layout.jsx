import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

export default ({children, style, className}) => (
  <MuiThemeProvider theme={theme}>
    <div id='root' className={className} style={style}>
      { children }
      <CssBaseline />
      <style jsx global>{globalStyles}</style>
    </div>
  </MuiThemeProvider>
)

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#D55'
    },
    secondary: {
      main: '#27D'
    }
  }
})

const globalStyles = `
  html, body { font-size: 16px; }
  #root { font-family: Roboto, sans-serif; }
`
