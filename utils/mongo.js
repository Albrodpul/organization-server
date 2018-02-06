"use strict";

module.exports = {
  getDepartments: getDepartments,
  getDepartmentByName: getDepartmentByName,
  getGroups: getGroups,
  getGroupByName: getGroupByName
};

const assert = require("assert");
var mongoose = require("mongoose");

var OrganizationSchema = require("../utils/models");
var config = require("../config/config");

var logger = require("../config/logConfig");

var uri = "mongodb://" + config.urlMongo + ":" + config.portMongo + "/sabius";
mongoose.Promise = global.Promise;

var promise = mongoose.connect(uri);

function getDepartments(snapshot, callback) {
  logger.info("snapshot: " + snapshot);
  var modelsMongo = mongoose.model("researchers-" + snapshot, OrganizationSchema);
  modelsMongo.distinct("idDepartment", function (err, data) {
    if (err) {
      callback(err, null); //internal server error
    } else if (data.length != 0) {
      callback(null, data); //get department
    } else {
      callback(null, null); //not found
    }
  });
}


function getDepartmentByName(snapshot, idDepartment, callback) {
  logger.info("idDepartment: " + idDepartment + ", snapshot: " + snapshot);
  var modelsMongo = mongoose.model("researchers-" + snapshot, OrganizationSchema);
  modelsMongo.find({
    "idDepartment": idDepartment
  }, function (err, data) {
    if (err) {
      callback(err, null); //internal server error
    } else if (data.length != 0) {
      callback(null, data); //get department
    } else {
      callback(null, null); //not found
    }
  });
}

function getGroups(snapshot, callback) {
  logger.info("snapshot: " + snapshot);
  var modelsMongo = mongoose.model("researchers-" + snapshot, OrganizationSchema);
  modelsMongo.distinct("idGroup", function (err, data) {
    if (err) {
      callback(err, null); //internal server error
    } else if (data.length != 0) {
      callback(null, data); //get department
    } else {
      callback(null, null); //not found
    }
  });
}

function getGroupByName(snapshot, idGroup, callback) {
  logger.info("idGroup: " + idGroup + ", snapshot: " + snapshot);
  var modelsMongo = mongoose.model("researchers-" + snapshot, OrganizationSchema);
  modelsMongo.find({
    "idGroup": idGroup,
  }, function (err, data) {
    if (err) {
      callback(err, null); //internal server error
    } else if (data.length != 0) {
      callback(null, data); //get group
    } else {
      callback(null, null); //not found
    }
  });
}