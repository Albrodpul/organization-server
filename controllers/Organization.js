'use strict';

var url = require('url');

var Organization = require('./OrganizationService');

module.exports.getDepartments = function getDepartments (req, res, next) {
  Organization.getDepartments(req.swagger.params, res, next);
};

module.exports.getGroups = function getGroups (req, res, next) {
  Organization.getGroups(req.swagger.params, res, next);
};
