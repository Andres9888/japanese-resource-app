const Routes = require('next-routes');

const routerObj = new Routes().add('homeRoute', '/', 'index');

export const { Link } = routerObj;
export default routerObj;
