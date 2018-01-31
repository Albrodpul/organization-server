"use strict";

const request = require("request");
const Promise = require("bluebird");

const mongo = require("../utils/mongo");
const config = require("../config/config");
const logger = require("../config/logConfig");

exports.getDepartments = function (args, res, next) {
  /**
   * Returns all departments
   *
   * returns List
   **/
  var departmentName = args.name.value;
  var snapshot = args.snapshot.value;
  logger.info("Get Departments");
  mongo.getDepartments(snapshot, departmentName, function (err, data) {
    if (err) {
      logger.info(err);
      res.sendStatus(500); // internal server error
    } else if (data) {
      logger.info("Get!");
      res.send(data);
    } else {
      logger.info("Not found!");
      res.sendStatus(404);
    }
  });
}

exports.getGroups = function (args, res, next) {
  /**
   * Returns all groups
   *
   * returns List
   **/
  var groupName = args.name.value;
  var snapshot = args.snapshot.value;
  logger.info("Get Groups");
  mongo.getGroups(snapshot, groupName, function (err, data) {
    if (err) {
      logger.info(err);
      res.sendStatus(500); // internal server error
    } else if (data) {
      logger.info("Get!");
      res.send(data);
    } else {
      logger.info("Not found!");
      res.sendStatus(404);
    }
  });
}

