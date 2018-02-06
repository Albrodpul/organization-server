"use strict";
var mongoose = require("mongoose");
var config = require("../config/config");
var uri = "mongodb://" + config.urlMongo + ":" + config.portMongo + "/sabius";
var promise = mongoose.connect(uri);
// mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var OrganizationSchema = new Schema({
  idResearcher: String,
  name: String,
  phone: String,
  professionalSituation: String,
  orcid: String,
  researcherId: String,
  link: String,
  idGroup: String,
  keywords: String,
  viewURL: String,
  idDepartment: String,
  departmentViewUrl: String,
  departmentName: String
});

// make this available to our users in our Node applications
module.exports = OrganizationSchema;
