"use strict";
var mongoose = require("mongoose");
var config = require("../config/config");
var uri = "mongodb://" + config.urlMongo + ":" + config.portMongo + "/sabius";
var promise = mongoose.connect(uri);
// mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

// create a schema

var OrganizationSchema = new Schema({
  groupName: String,
  departmentName: String,
  snapshot: String,
  researchers: [{
    name: String,
    orcid: String,
    authorId: String
  }]
});

// custom method to add string to end of name
// you can create more important methods like name validations or formatting
// you can also do queries and find similar users

// the schema is useless so far
// we need to create a model using it
var Organization = mongoose.model("organizations", OrganizationSchema);

// make this available to our users in our Node applications
module.exports = Organization;
