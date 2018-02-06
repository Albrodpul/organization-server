'use strict';

var url = require('url');

var Organization = require('./OrganizationService');

module.exports.getSnapshot = function getSnapshot (req, res, next) {
  Organization.getSnapshot(req.swagger.params, res, next);
};

module.exports.getDepartmentByName = function getDepartmentByName (req, res, next) {
  Organization.getDepartmentByName(req.swagger.params, res, next);
};

module.exports.getGroupByName = function getGroupByName (req, res, next) {
  Organization.getGroupByName(req.swagger.params, res, next);
};
