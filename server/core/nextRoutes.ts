const Routes = require('next-routes');

const routerObject = new Routes().add('homeRoute', '/', 'index');

export const { Link } = routerObject;
export default routerObject;
