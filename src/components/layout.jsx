import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

export default ({children, style, className}) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <style jsx global>{globalStyles}</style>
    { children }
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
  html, body {
    font: 16px/20px Roboto, sans-serif;
  }

  #app {
    height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: 1fr;
  }
`
