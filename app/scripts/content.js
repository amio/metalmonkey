import { installer as initScriptInstaller } from './lib/installer'

()=>{

  const PAGETYPE_JSFILE = 'jsfile'

  const pageType = ()=>{
    if(window.location.href.match(/\.js$/))
      return PAGETYPE_JSFILE
  }()

  switch (pageType) {
    case PAGETYPE_JSFILE:
      initScriptInstaller()
      break
  }

}()
