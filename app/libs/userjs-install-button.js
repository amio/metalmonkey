// Content Script to insert install button to https://www.npmjs.com/package/*

export const options = {
  matches: ['https://www.npmjs.com/package/*']
}

export default function insertUserjsInstallButton () {
  if (!hasUserjsKeyword()) return

  const npmi = document.querySelector('[class*=package__install]')
  const pkgname = window.location.pathname.replace(/^\/package\//, '')
  const userjsBtn = `
    <p id="userjs-install">
      <a href="https://unpkg.com/${pkgname}" style="${styles}">install userjs</a>
    </p>
  `
  npmi.insertAdjacentHTML('beforebegin', userjsBtn)
}

export const styles = `
  display: block;
  border-radius: 5px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  background-color: #27D;
  text-transform: uppercase;
  text-decoration: none;
`

function hasUserjsKeyword () {
  // TODO: better detection
  return !!document.querySelector('a[href*=userjs]')
}
