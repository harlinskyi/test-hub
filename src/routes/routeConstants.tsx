export const HOME_ROUTE: Readonly<string> = '/'
export const CREATE_ROUTE: Readonly<string> = '/create'
export const RUN_ROUTE: Readonly<string> = '/run'
export const SELECT_TEST_ROUTE: Readonly<string> = '/select-test'

export const getHomeRoute = () => HOME_ROUTE
export const getCreateRoute = () => CREATE_ROUTE
export const getRunRoute = () => RUN_ROUTE
export const getSelectTestRoute: () => string = () => SELECT_TEST_ROUTE
