/**
 * Created by zhangmindelaogong on 2017/9/10.
 */
var Tars    = require("../../tars.js");
var Ext = require("../ExtTars.js").Ext;

//TODO: tup编解码中string和int64的bRaw和bString暂未支持
describe("test String", function(){

    it("#test for tup attrbuites", function (){
        var tup_encode = new Tars.Tup();
        tup_encode.should.have.property("servantName");
        tup_encode.should.have.property("funcName");
        tup_encode.should.have.property("requestId");
        tup_encode.should.have.property("tupVersion");

        tup_encode.servantName = "servantName";
        tup_encode.funcName = "funcName";
        tup_encode.requestId = "requestId";
        tup_encode.tupVersion = "tupVersion";

        tup_encode.servantName.should.equal("servantName");
        tup_encode.funcName.should.equal("funcName");
        tup_encode.requestId.should.equal("requestId");
        tup_encode.tupVersion.should.equal("tupVersion");

        tup_encode._status.insert("STATUS_RESULT_CODE","8888");
        tup_encode._status.insert("STATUS_RESULT_DESC","test desc");
        tup_encode.getTarsResultCode().should.equal(8888);
        tup_encode.getTarsResultDesc().should.equal("test desc");

    });

   it(" test encode and decode", function(){
       var valueMap = {
           bool: true,
           int8: 88,
           uint8: 200,
           int16: 20000,
           uint16: 60000,
           int32: 2147483647,
           uint32: 4294967295,
           int64: 9007199254740991,
           float: Math.pow(2,-127),
           double: Math.pow(2,1023),
           bytes:  new Tars.BinBuffer(Buffer.from("abc")),
           string: "test tup",
           list: new Tars.List(Tars.String),
           map: new Tars.Map(Tars.String, Tars.String),
           struct:new Ext.ExtInfo()
       }
       valueMap.list.readFromObject(["test", "tup"]);
       valueMap.map.readFromObject({"key": "value"});
       valueMap.struct.data.insert("key", valueMap.bytes);


       var tup_encode = new Tars.Tup();
       tup_encode.writeBoolean("bool", valueMap.bool);
       tup_encode.writeInt8("int8", valueMap.int8);
       tup_encode.writeUInt8("uint8", valueMap.uint8);
       tup_encode.writeInt16("int16", valueMap.int16);
       tup_encode.writeUInt16("uint16", valueMap.uint16);
       tup_encode.writeInt32("int32", valueMap.int32);
       tup_encode.writeUInt32("uint32", valueMap.uint32);
       tup_encode.writeInt64("int64", valueMap.int64);
       tup_encode.writeFloat("float", valueMap.float);
       tup_encode.writeDouble("double", valueMap.double);
       tup_encode.writeBytes("bytes", valueMap.bytes);
       tup_encode.writeString("string", valueMap.string);
       tup_encode.writeStruct("struct", valueMap.struct);
       tup_encode.writeList("list", valueMap.list);
       tup_encode.writeMap("map", valueMap.map);


       var BinBuffer = tup_encode.encode();
       var data = BinBuffer.toNodeBuffer();

       var tup_decode = new Tars.Tup();
       tup_decode.decode(new Tars.BinBuffer(data));
       tup_decode.readBoolean("bool").should.equal(valueMap.bool)
       tup_decode.readInt8("int8").should.equal(valueMap.int8)
       tup_decode.readUInt8("uint8").should.equal(valueMap.uint8)
       tup_decode.readInt16("int16").should.equal(valueMap.int16)
       tup_decode.readUInt16("uint16").should.equal(valueMap.uint16)
       tup_decode.readInt32("int32").should.equal(valueMap.int32)
       tup_decode.readUInt32("uint32").should.equal(valueMap.uint32)
       tup_decode.readInt64("int64").should.equal(valueMap.int64)
       tup_decode.readFloat("float").should.equal(valueMap.float)
       tup_decode.readDouble("double").should.equal(valueMap.double)
       tup_decode.readBytes("bytes").toString().should.equal(valueMap.bytes.toString())
       tup_decode.readString("string").should.equal(valueMap.string)
       var struct = tup_decode.readStruct("struct", Ext.ExtInfo);
       struct.data.get("key").toNodeBuffer().toString().should.equal("abc");
       var list = tup_decode.readList("list",Tars.List(Tars.String));
       JSON.stringify(list.toObject()).should.equal(JSON.stringify(valueMap.list.toObject()));
       var map = tup_decode.readMap("map", Tars.Map(Tars.String, Tars.String));
       JSON.stringify(map.toObject()).should.equal(JSON.stringify(valueMap.map.toObject()));
   })

    it("test string to raw", function(){
        var tup_encode = new Tars.Tup();
        tup_encode.writeString("string", Buffer.from("test tup"), true);

        var BinBuffer = tup_encode.encode();
        var data = BinBuffer.toNodeBuffer();

        var tup_decode = new Tars.Tup();
        tup_decode.decode(new Tars.BinBuffer(data));
        var decodeStr = tup_decode.readString("string",Buffer.from(""), true);
        (decodeStr instanceof Buffer).should.be.true();
        decodeStr.should.not.be.a.String();
        decodeStr.toString().should.equal("test tup");
    })

    it("test long to string", function(){

        testTupLong("-9223372036854775808");
        testTupLong("-9223372036854775802");
        testTupLong("9223372036854775807");
        testTupLong("9223372036854775801");

        function testTupLong(value){
            var tup_encode = new Tars.Tup();
            tup_encode.writeInt64("int64", value, true);

            var BinBuffer = tup_encode.encode();
            var data = BinBuffer.toNodeBuffer();

            var tup_decode = new Tars.Tup();
            tup_decode.decode(new Tars.BinBuffer(data));
            var decodeInt64 = tup_decode.readInt64("int64","0", true);
            decodeInt64.should.be.a.String();
            decodeInt64.should.equal(value);
        }
    })

    it("test long in map", function(){
        testLongInMapKey("-9223372036854775808","test");
        testLongInMapKey("-9223372036854775802","test");
        testLongInMapKey("9223372036854775807","test");
        testLongInMapKey("9223372036854775801","test");

        testLongInMapValue("test", "-9223372036854775808");
        testLongInMapValue("test", "-9223372036854775802");
        testLongInMapValue("test", "9223372036854775807");
        testLongInMapValue("test", "9223372036854775801");

        function testLongInMapValue(key, value){
            var tup_encode = new Tars.Tup();
            var mapValue = new Tars.Map(Tars.String, Tars.Int64 ,0 ,1);
            mapValue.insert(key, value);

            tup_encode.writeMap("map", mapValue);

            var BinBuffer = tup_encode.encode();
            var data = BinBuffer.toNodeBuffer();

            var tup_decode = new Tars.Tup();
            tup_decode.decode(new Tars.BinBuffer(data));
            var decodeMap = tup_decode.readMap("map",Tars.Map(Tars.String, Tars.Int64 ,0 ,1));
            decodeMap.has(key).should.be.true();
            decodeMap.get(key).should.be.a.String();
            decodeMap.get(key).should.equal(value);
        }

        function testLongInMapKey(key, value){
            var tup_encode = new Tars.Tup();
            var mapValue = new Tars.Map(Tars.Int64, Tars.String ,1 ,0);
            mapValue.insert(key, value);

            tup_encode.writeMap("map", mapValue);

            var BinBuffer = tup_encode.encode();
            var data = BinBuffer.toNodeBuffer();

            var tup_decode = new Tars.Tup();
            tup_decode.decode(new Tars.BinBuffer(data));
            var decodeMap = tup_decode.readMap("map",Tars.Map(Tars.Int64, Tars.String ,1 ,0));
            decodeMap.has(key).should.be.true();
            decodeMap.get(key).should.be.a.String();
            decodeMap.get(key).should.equal(value);
        }
    })

    it("test long in list", function() {
        testLongInList("-9223372036854775808");
        testLongInList("-9223372036854775802");
        testLongInList("9223372036854775807");
        testLongInList("9223372036854775801");

        function testLongInList(value){
            var tup_encode = new Tars.Tup();
            var listValue = new Tars.List(Tars.Int64, 1);
            listValue.push(value);

            tup_encode.writeList("list", listValue);

            var BinBuffer = tup_encode.encode();
            var data = BinBuffer.toNodeBuffer();

            var tup_decode = new Tars.Tup();
            tup_decode.decode(new Tars.BinBuffer(data));
            var decodeList = tup_decode.readList("list",Tars.List(Tars.Int64,1));
            decodeList.length.should.equal(1);
            decodeList.at(0).should.be.a.String();
            decodeList.at(0).should.equal(value);
        }
    })
})