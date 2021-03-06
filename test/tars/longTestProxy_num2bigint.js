// **********************************************************************
// Parsed By TarsParser(2.4.5), Generated By tools(20200627)
// TarsParser Maintained By <TARS> and tools Maintained By <superzheng>
// Generated from "longTest.tars" by Client Mode
// **********************************************************************

/* eslint-disable */

"use strict";

var assert    = require("assert");
var TarsStream = require("../../tars.js");

var _hasOwnProperty = Object.prototype.hasOwnProperty;

var LONGTEST = LONGTEST || {};
module.exports.LONGTEST = LONGTEST;


LONGTEST.MapLong = function() {
    this.m1 = new TarsStream.Map(TarsStream.String, TarsStream.Int64, 0, 2);
    this.m2 = new TarsStream.Map(TarsStream.Int64, TarsStream.String, 2);
    this.m3 = new TarsStream.Map(TarsStream.String, TarsStream.Map(TarsStream.String, TarsStream.Int64, 0, 2));
    this.m4 = new TarsStream.Map(TarsStream.String, TarsStream.Map(TarsStream.Int64, TarsStream.String, 2));
    this.m5 = new TarsStream.List(TarsStream.Map(TarsStream.String, TarsStream.Int64, 0, 2));
    this.m6 = new TarsStream.List(TarsStream.Int64, 2);
    this.m7 = new TarsStream.List(TarsStream.String);
    this.m8 = "czzouTest";
    this._classname = "LONGTEST.MapLong";
};
LONGTEST.MapLong._classname = "LONGTEST.MapLong";
LONGTEST.MapLong._write = function (os, tag, value) { os.writeStruct(tag, value); };
LONGTEST.MapLong._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
LONGTEST.MapLong._readFrom = function (is) {
    var tmp = new LONGTEST.MapLong;
    tmp.m1 = is.readMap(0, false, TarsStream.Map(TarsStream.String, TarsStream.Int64, 0, 2));
    tmp.m2 = is.readMap(1, false, TarsStream.Map(TarsStream.Int64, TarsStream.String, 2));
    tmp.m3 = is.readMap(2, false, TarsStream.Map(TarsStream.String, TarsStream.Map(TarsStream.String, TarsStream.Int64, 0, 2)));
    tmp.m4 = is.readMap(3, false, TarsStream.Map(TarsStream.String, TarsStream.Map(TarsStream.Int64, TarsStream.String, 2)));
    tmp.m5 = is.readList(4, false, TarsStream.List(TarsStream.Map(TarsStream.String, TarsStream.Int64, 0, 2)));
    tmp.m6 = is.readList(5, false, TarsStream.List(TarsStream.Int64, 2));
    tmp.m7 = is.readList(6, false, TarsStream.List(TarsStream.String));
    tmp.m8 = is.readString(7, false, "czzouTest");
    return tmp;
};
LONGTEST.MapLong.prototype._writeTo = function (os) {
    os.writeMap(0, this.m1);
    os.writeMap(1, this.m2);
    os.writeMap(2, this.m3);
    os.writeMap(3, this.m4);
    os.writeList(4, this.m5);
    os.writeList(5, this.m6);
    os.writeList(6, this.m7);
    os.writeString(7, this.m8);
};
LONGTEST.MapLong.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
LONGTEST.MapLong.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
LONGTEST.MapLong.prototype.toObject = function() { 
    return {
        "m1" : this.m1.toObject(),
        "m2" : this.m2.toObject(),
        "m3" : this.m3.toObject(),
        "m4" : this.m4.toObject(),
        "m5" : this.m5.toObject(),
        "m6" : this.m6.toObject(),
        "m7" : this.m7.toObject(),
        "m8" : this.m8
    };
};
LONGTEST.MapLong.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "m1") && (this.m1.readFromObject(json.m1));
    _hasOwnProperty.call(json, "m2") && (this.m2.readFromObject(json.m2));
    _hasOwnProperty.call(json, "m3") && (this.m3.readFromObject(json.m3));
    _hasOwnProperty.call(json, "m4") && (this.m4.readFromObject(json.m4));
    _hasOwnProperty.call(json, "m5") && (this.m5.readFromObject(json.m5));
    _hasOwnProperty.call(json, "m6") && (this.m6.readFromObject(json.m6));
    _hasOwnProperty.call(json, "m7") && (this.m7.readFromObject(json.m7));
    _hasOwnProperty.call(json, "m8") && (this.m8 = json.m8);
    return this;
};
LONGTEST.MapLong.prototype.toBinBuffer = function () {
    var os = new TarsStream.TarsOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
LONGTEST.MapLong.new = function () {
    return new LONGTEST.MapLong();
};
LONGTEST.MapLong.create = function (is) {
    return LONGTEST.MapLong._readFrom(is);
};


