"use strict";

const request = require("request");
const Promise = require("bluebird");

const mongo = require("../utils/mongo");
const config = require("../config/config");
const logger = require("../config/logConfig");

var path = require('path');
var fs = require("fs");

exports.getDepartmentByName = function (args, res, next) {
  /**
   * Returns all departments
   *
   * returns List
   **/
  var idDepartment = args.name.value;
  var snapshot = args.snapshot.value;
  if (!snapshot) {
    logger.info("Bad request");
    res.sendStatus(400);
  } else if (idDepartment && snapshot) {
    logger.info("Get Departments");
    mongo.getDepartmentByName(snapshot, idDepartment, function (err, data) {
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
  } else if (snapshot) {
    mongo.getDepartments(snapshot, function (err, data) {
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
}

exports.getGroupByName = function (args, res, next) {
  /**
   * Returns all groups
   *
   * returns List
   **/
  var idGroup = args.name.value;
  var snapshot = args.snapshot.value;
  if (!snapshot) {
    logger.info("Bad request");
    res.sendStatus(400);
  } else if (idGroup && snapshot) {
    logger.info("Get Groups");
    mongo.getGroupByName(snapshot, idGroup, function (err, data) {
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
  } else if (snapshot) {
    mongo.getGroups(snapshot, function (err, data) {
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
}