export default { route, init }

function route (routeMapping, defaultRoute) {
  return function (parentRoute) {
    const route = routeMapping.hasOwnProperty(parentRoute)
      ? parentRoute
      : defaultRoute
    const subRoute = route
    return {
      route: route,
      subComponent: () => React.createElement(
        routeMapping[route],
        { route: subRoute }
      )
    }
  }
}

function init (App, container) {
  function mainRender () {
    const route = window.location.hash.substr(1)
    React.render(<App route={route} />, container)
  }
  window.addEventListener('hashchange', mainRender)
  mainRender()
}
