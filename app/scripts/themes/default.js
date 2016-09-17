import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { blueGrey800, white } from 'material-ui/styles/colors'

export default getMuiTheme({
  palette: {
    primary1Color: '#EB5A5A',
    textColor: blueGrey800
  },
  flatButton: {
    buttonFilterColor: white
  },
  appBar: {
    height: 56,
    titleStyle: {
      letterSpacing: '0.5px',
      fontSize: 17,
      fontWeight: 200
    }
  }
})
