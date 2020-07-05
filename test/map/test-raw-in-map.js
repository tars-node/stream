var Tars    = require("../../tars.js");

var os;

describe('test raw in map', function() {

    beforeEach(function() {
        os  = new Tars.TarsOutputStream();
    });

    it("#test for map<string,long>", function (){
        var mapValue = new Tars.Map(Tars.String, Tars.Int64, 1, 1);
        mapValue.insert("key1","-9223372036854775808");
        mapValue.insert("key2","-9223372036854775802");
        mapValue.insert("key3","9223372036854775807");
        mapValue.insert("key4","9223372036854775802");

        os.writeMap(0, mapValue);
        var is  = new Tars.TarsInputStream(os.getBinBuffer());
        var decodeMap = is.readMap(0, true, Tars.Map(Tars.String, Tars.Int64, 1, 1));
        decodeMap.size().should.equal(4);
        decodeMap.has("key1").should.be.true();
        decodeMap.has("key2").should.be.true();
        decodeMap.has("key3").should.be.true();
        decodeMap.has("key4").should.be.true();

        decodeMap.get("key1").should.equal("-9223372036854775808");
        decodeMap.get("key2").should.equal("-9223372036854775802");
        decodeMap.get("key3").should.equal("9223372036854775807");
        decodeMap.get("key4").should.equal("9223372036854775802");

    });

    it("#test for map<long,string>", function() {
        var mapValue = new Tars.Map(Tars.Int64, Tars.String, 1, 1);
        mapValue.insert("-9223372036854775808", Buffer.from("value1"));
        mapValue.insert("-9223372036854775802", Buffer.from("value2"));
        mapValue.insert("9223372036854775807", Buffer.from("value3"));
        mapValue.insert("9223372036854775802", Buffer.from("value4"));

        os.writeMap(0, mapValue);
        var is  = new Tars.TarsInputStream(os.getBinBuffer());
        var decodeMap = is.readMap(0, true, Tars.Map(Tars.Int64, Tars.String, 1, 1));
        decodeMap.size().should.equal(4);
        decodeMap.has("-9223372036854775808").should.be.true();
        decodeMap.has("-9223372036854775802").should.be.true();
        decodeMap.has("9223372036854775807").should.be.true();
        decodeMap.has("9223372036854775802").should.be.true();

        (decodeMap.get("-9223372036854775808") instanceof Buffer).should.be.true();
        (decodeMap.get("-9223372036854775802") instanceof Buffer).should.be.true();
        (decodeMap.get("9223372036854775807") instanceof Buffer).should.be.true();
        (decodeMap.get("9223372036854775802") instanceof Buffer).should.be.true();

        decodeMap.get("-9223372036854775808").toString().should.equal("value1");
        decodeMap.get("-9223372036854775802").toString().should.equal("value2");
        decodeMap.get("9223372036854775807").toString().should.equal("value3");
        decodeMap.get("9223372036854775802").toString().should.equal("value4");

    });

    it("#test for map<string,map<long,string>>", function() {
        var mapValue = new Tars.Map(Tars.String, Tars.Map(Tars.Int64, Tars.String, 1, 1));

        var value = new Tars.Map(Tars.Int64, Tars.String, 1, 1);
        value.insert("-9223372036854775808", Buffer.from("value1"));
        value.insert("-9223372036854775802", Buffer.from("value2"));
        value.insert("9223372036854775807", Buffer.from("value3"));
        value.insert("9223372036854775802", Buffer.from("value4"));

        mapValue.insert("test", value);

        os.writeMap(0, mapValue);
        var is  = new Tars.TarsInputStream(os.getBinBuffer());
        var decodeMap = is.readMap(0, true, Tars.Map(Tars.String, Tars.Map(Tars.Int64, Tars.String, 1, 1)));
        decodeMap.size().should.equal(1);
        decodeMap.has("test").should.be.true();

        var decodeValue = decodeMap.get("test");
        decodeValue.size().should.equal(4);
        (decodeValue.get("-9223372036854775808") instanceof Buffer).should.be.true();
        (decodeValue.get("-9223372036854775802") instanceof Buffer).should.be.true();
        (decodeValue.get("9223372036854775807") instanceof Buffer).should.be.true();
        (decodeValue.get("9223372036854775802") instanceof Buffer).should.be.true();
        decodeValue.get("-9223372036854775808").toString().should.equal("value1");
        decodeValue.get("-9223372036854775802").toString().should.equal("value2");
        decodeValue.get("9223372036854775807").toString().should.equal("value3");
        decodeValue.get("9223372036854775802").toString().should.equal("value4");
    });

    it("#test for list<map<long,string>>", function() {
        var listValue = new Tars.List(Tars.Map(Tars.Int64, Tars.String, 1, 1));
        var value = new Tars.Map(Tars.Int64, Tars.String, 1, 1);
        value.insert("-9223372036854775808", Buffer.from("value1"));
        value.insert("-9223372036854775802", Buffer.from("value2"));
        value.insert("9223372036854775807", Buffer.from("value3"));
        value.insert("9223372036854775802", Buffer.from("value4"));
        listValue.push(value);

        os.writeList(0, listValue);
        var is  = new Tars.TarsInputStream(os.getBinBuffer());
        var decodeList = is.readList(0, true, Tars.List(Tars.Map(Tars.Int64, Tars.String, 1, 1)));

        var decodeValue = decodeList.at(0);
        decodeValue.size().should.equal(4);
        (decodeValue.get("-9223372036854775808") instanceof Buffer).should.be.true();
        (decodeValue.get("-9223372036854775802") instanceof Buffer).should.be.true();
        (decodeValue.get("9223372036854775807") instanceof Buffer).should.be.true();
        (decodeValue.get("9223372036854775802") instanceof Buffer).should.be.true();
        decodeValue.get("-9223372036854775808").toString().should.equal("value1");
        decodeValue.get("-9223372036854775802").toString().should.equal("value2");
        decodeValue.get("9223372036854775807").toString().should.equal("value3");
        decodeValue.get("9223372036854775802").toString().should.equal("value4");
    });

});
