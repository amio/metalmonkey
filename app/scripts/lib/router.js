export function route (handlers, defaultHandler) {
  return function (parentRoute) {
    const route = handlers.hasOwnProperty(parentRoute)
      ? parentRoute
      : defaultHandler
    const subRoute = route
    return {
      route: route,
      subComponent: () => React.createElement(
        handlers[route],
        { route: subRoute }
      )
    }
  }
}

export function run (App, container) {
  function mainRender () {
    const route = window.location.hash.substr(1)
    React.render(<App route={route} />, container)
  }
  window.addEventListener('hashchange', mainRender)
  mainRender()
}
