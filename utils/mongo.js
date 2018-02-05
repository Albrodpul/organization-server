"use strict";

module.exports = {
  getSnapshot: getSnapshot,
  getDepartments: getDepartments,
  getGroups: getGroups,
  insertSnapshotFiles: insertSnapshotFiles
};

const assert = require("assert");
var mongoose = require("mongoose");

var modelsMongo = require("../utils/models");
var config = require("../config/config");

var logger = require("../config/logConfig");

var uri = "mongodb://" + config.urlMongo + ":" + config.portMongo + "/sabius";
mongoose.Promise = global.Promise;

var promise = mongoose.connect(uri);

function getSnapshot(snapshot, callback) {
  modelsMongo.find({
    "snapshot": snapshot
  }, function (err, data) {
    if (err) {
      callback(err, null); //internal server error
    } else if (data.length != 0) {
      callback(null, data); //get organizations
    } else {
      callback(null, null); //not found
    }
  });
}

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

function insertSnapshotFiles(organization, callback) {
  modelsMongo.collection.insert(organization, {
    ordered: true
  }, function (err) {
    if (err) {
      callback(err, null); //internal server error
    } else {
      callback(null, null); //created
    }
  });
}