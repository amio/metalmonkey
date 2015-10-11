import ReactDOM from 'react-dom'

export default { route, init }

function route (routeMapping, defaultRoute) {
  return function (routePath) {
    const matched = matchRoutes(routeMapping, routePath)
    const matchedRoute = matched ? matched.route : defaultRoute
    const matchedProps = matched ? matched.args : {}
    return {
      route: matchedRoute,
      subComponent: () => React.createElement(
        routeMapping[matchedRoute],
        matchedProps
      )
    }
  }
}

function init (App, container) {
  function mainRender () {
    const route = window.location.hash.substr(1)
    ReactDOM.render(<App route={route} />, container)
  }
  window.addEventListener('hashchange', mainRender)
  mainRender()
}

function matchRoutes (routeMapping, path) {
  const routeKeys = Object.keys(routeMapping)
  let i = routeKeys.length
  let matched = null

  while (i--) {
    matched = matchRoute(routeKeys[i], path)
    if (matched) return matched
  }

  return null
}

/**
 * @param {String} route the route key to match. eg: '/install/:url'
 * @param {String} path the path to check. eg: '/install/example.com%20sdf'
 */
function matchRoute (route, path) {
  const routeParts = route.split('/').filter((s) => !!s)
  const pathParts = path.split('/').filter((s) => !!s)

  if (routeParts.length !== pathParts.length) {
    return false
  }

  let args = {}
  for (let i = routeParts.length; i--;) {
    if (pathParts[i] !== routeParts[i]) {
      if (routeParts[i][0] === ':') { // ':url'
        args[routeParts[i].substr(1)] = pathParts[i]
      } else {
        return null
      }
    }
  }

  return {
    route: route,
    args: args
  }
}
