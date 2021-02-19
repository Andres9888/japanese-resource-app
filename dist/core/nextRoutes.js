"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes = require('next-routes');
const routerObj = new routes().add('homeRoute', '/', 'index');
exports.Link = routerObj.Link;
exports.default = routerObj;
