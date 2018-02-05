'use strict';

var url = require('url');

var Organization = require('./OrganizationService');

module.exports.getSnapshot = function getSnapshot (req, res, next) {
  Organization.getSnapshot(req.swagger.params, res, next);
};

module.exports.getDepartments = function getDepartments (req, res, next) {
  Organization.getDepartments(req.swagger.params, res, next);
};

module.exports.getDepartmentsByName = function getDepartmentsByName (req, res, next) {
  Organization.getDepartmentsByName(req.swagger.params, res, next);
};

module.exports.getGroups = function getGroups (req, res, next) {
  Organization.getGroups(req.swagger.params, res, next);
};
