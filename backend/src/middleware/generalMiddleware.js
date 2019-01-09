"use strict";
exports.__esModule = true;
var express_1 = require("express");
var morgan_1 = require("morgan");
var setGeneralMiddleware = function (server) {
    server.use(express_1["default"].json());
    server.use(morgan_1["default"]('dev'));
};
exports["default"] = setGeneralMiddleware;
