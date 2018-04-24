// Content Script to insert install button to https://www.npmjs.com/package/*

export const options = {
  matches: ['https://www.npmjs.com/package/*']
}

export default function () {
  const npmInstallElement = document.querySelector('[class*=package__install]')
  console.log(npmInstallElement)
}
