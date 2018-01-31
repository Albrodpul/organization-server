"use strict";

module.exports = {
  getDepartments: getDepartments,
  getGroups: getGroups
};

const assert = require("assert");
var mongoose = require("mongoose");

var modelsMongo = require("../utils/models");
var config = require("../config/config");

var logger = require("../config/logConfig");

var uri = "mongodb://" + config.urlMongo + ":" + config.portMongo + "/sabius";
mongoose.Promise = global.Promise;

var promise = mongoose.connect(uri);

function getDepartments(snapshot, departmentName, callback) {
  if (departmentName) {
    logger.info("departmentName: " + departmentName + ", snapshot: " + snapshot);
    modelsMongo.find({
      "departmentName": departmentName,
      "snapshot": snapshot
    }, function (err, data) {
      if (err) {
        callback(err, null); //internal server error
      } else if (data.length != 0) {
        callback(null, data); //get department
      } else {
        console.log("Entro aquí");
        callback(null, null); //not found
      }
    });
  } else {
    logger.info("snapshot: " + snapshot);
    modelsMongo.find({
      "snapshot": snapshot
    }, function (err, data) {
      if (err) {
        callback(err, null); //internal server error
      } else {
        callback(null, data); //get all departments
      }
    });
  }
}

function getGroups(snapshot, groupName, callback) {
  if (groupName) {
    logger.info("groupName: " + groupName + ", snapshot: " + snapshot);
    modelsMongo.find({
      "groupName": groupName,
      "snapshot": snapshot
    }, function (err, data) {
      if (err) {
        callback(err, null); //internal server error
      } else if (data.length != 0) {
        callback(null, data); //get group
      } else {
        console.log("Entro aquí");
        callback(null, null); //not found
      }
    });
  } else {
    logger.info("snapshot: " + snapshot);
    modelsMongo.find({
      "snapshot": snapshot
    }, function (err, data) {
      if (err) {
        callback(err, null); //internal server error
      } else {
        callback(null, data); //get all groups
      }
    });
  }
}



