"use strict";

const request = require("request");
const Promise = require("bluebird");

const mongo = require("../utils/mongo");
const config = require("../config/config");
const logger = require("../config/logConfig");

var path = require('path');
var fs = require("fs");

exports.getSnapshot = function (args, res, next) {
  /**
   * Returns all organizations
   *
   * returns List
   **/
  var snapshot = args.snapshot.value;
  logger.info("Get " + snapshot);
  mongo.getSnapshot(snapshot, function (err, data) {
    if (err) {
      logger.info(err);
      res.sendStatus(500); // internal server error
    } else if (data) {
      logger.info("Get!");
      res.send(data);
    } else {
      if (!fs.existsSync(path.join(__dirname, '../data/groups.' + snapshot + '.json')) ||
        !fs.existsSync(path.join(__dirname, '../data/departments.' + snapshot + '.json')) ||
        !fs.existsSync(path.join(__dirname, '../data/researchers.' + snapshot + '.json'))) {
        logger.info("Not found");
        res.sendStatus(404); //snapshot files not found
      } else {
        var groups = fs.readFileSync(path.join(__dirname, '../data/groups.' + snapshot + '.json'), {
          encoding: 'utf-8'
        });
        var departments = fs.readFileSync(path.join(__dirname, '../data/departments.' + snapshot + '.json'), {
          encoding: 'utf-8'
        });
        var researchers = fs.readFileSync(path.join(__dirname, '../data/researchers.' + snapshot + '.json'), {
          encoding: 'utf-8'
        });
        var groupsAux = JSON.parse(groups);
        var departmentsAux = JSON.parse(departments);
        var researchersAux = JSON.parse(researchers);
        var data = [];
        var flag = 0;
        for (var i = 0; i < groupsAux.length; i++) {
          var researcherList = [];
          for (var j = 0; j < departmentsAux.length; j++) {
            flag = 0;
            for (var k = 0; k < researchersAux.length; k++) {
              var groupName = groupsAux[i].name;
              var departmentName = departmentsAux[j].department;
              var researcher = researchersAux[k];
              var idGroup = researcher.idGroup;
              var idDepartment = researcher.idDepartment;
              if (groupName == idGroup && departmentName == idDepartment) {
                researcherList.push({
                  "name": researcher.name,
                  "orcid": researcher.orcid,
                  "authorId": researcher.researcherId
                });
                flag = 1;
              }
            }
            if (flag != 0) {
              data.push({
                "groupName": groupName,
                "departmentName": departmentName,
                "snapshot": snapshot,
                "researchers": researcherList
              });
            }
          }
        }
        mongo.insertSnapshotFiles(data, function (err, result) {
          if (err) {
            logger.info(err);
            res.sendStatus(500); // internal server error
          } else {
            logger.info("Saved!");
            res.end();
          }
        });
        logger.info("Get!");
        res.send(data);
      }
    }
  })

}

exports.getDepartmentByName = function (args, res, next) {
  /**
   * Returns all departments
   *
   * returns List
   **/
  var departmentName = args.name.value;
  var snapshot = args.snapshot.value;
  if (!departmentName || !snapshot) {
    logger.info("Bad request");
    res.sendStatus(404);
  } else {
    logger.info("Get Departments");
    mongo.getDepartmentByName(snapshot, departmentName, function (err, data) {
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
  var groupName = args.name.value;
  var snapshot = args.snapshot.value;
  if (!groupName || !snapshot) {
    logger.info("Bad request");
    res.sendStatus(404);
  } else {
    logger.info("Get Groups");
    mongo.getGroupByName(snapshot, groupName, function (err, data) {
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