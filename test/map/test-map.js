var Tars    = require("../../tars.js");

var m = new Tars.Map(Tars.String, Tars.String);
m.put("a1", "value1");
m.put("a2", "value2");

describe('test map attrbuite', function() {
    it("#test for map attrbuites", function (){
        m.should.have.property("size");
        m.should.have.property("get");
        m.should.have.property("set");
        m.should.have.property("put");
        m.should.have.property("insert");
        m.should.have.property("forEach");
        m.should.have.property("_write");
        m.should.have.property("_read");
        m.should.have.property("remove");
        m.should.have.property("has");
        m.should.have.property("clear");
        m.should.have.property("value");
        m.should.not.have.property("keys");
    });

    it("#test for map.size", function() {
        m.size().should.equal(2);
    });

    it("#test for map.get", function() {
        (m.get("a1")).should.equal("value1");
        (m.get("a2")).should.equal("value2");
        (m.get("a3") == undefined).should.be.true();
    });

    it("#test for map.has", function() {
        (m.has("a1")).should.be.true();
        (m.has("a2")).should.be.true();
        (m.has("a3")).should.be.false();
    });

    it("#test for map.insert", function() {
        m.insert("a3", "value3");

        (m.size()   ).should.equal(3);
        (m.get("a1")).should.equal("value1");
        (m.get("a2")).should.equal("value2");
        (m.get("a3")).should.equal("value3");
    });

    it("#test for map.remove", function(){
        m.remove("a2");

        (m.size()   ).should.equal(2);
        (m.get("a1")).should.equal("value1");
        (m.get("a2") == undefined).should.be.true();
        (m.get("a3")).should.equal("value3");
    });

    it("#test for readFromObject and toObject", function(){
        var map = new Tars.Map(Tars.String, Tars.String);
        var obj = {"key1":"value1", "key2": "value2"};
        map.readFromObject(obj);
        map.get("key1").should.equal(obj["key1"]);
        map.get("key2").should.equal(obj["key2"]);
        JSON.stringify(map.toObject()).should.equal(JSON.stringify(obj));
    });
});
