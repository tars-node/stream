/**
 * Created by czzou on 2017/9/10.
 */
var Tars    = require("../../tars.js");
require('should');

var os;
describe("test number", function() {
    beforeEach(function() {
        os  = new Tars.TarsOutputStream();
    });
    describe("test for int8",function(){
        it("#encode and decode", function (){
            var encodeInt8 = -12;
            os.writeInt8(0,encodeInt8);
            var is  = new Tars.TarsInputStream(os.getBinBuffer());
            var decodeInt8 = is.readInt8(0,true,Tars.Int8);
            decodeInt8.should.equal(encodeInt8);
        });

        //it("#error int8", function (){
        //    var errorInt8 = 128;
        //    (function(){
        //        os.writeInt8(0,errorInt8)
        //    }).should.throw('"value" argument is out of bounds');
        //});
    });

    describe("test for int16",function(){
        it("#encode and decode", function (){
            var encodeInt16 = 32767;
            os.writeInt16(0,encodeInt16);
            var is  = new Tars.TarsInputStream(os.getBinBuffer());
            var decodeInt16 = is.readInt16(0,true,Tars.Int16);
            decodeInt16.should.equal(encodeInt16);
        });
    });

    describe("test for int32",function(){
        it("#encode and decode", function (){
            var encodeInt32 = 2147483647;
            os.writeInt32(0,encodeInt32);
            var is  = new Tars.TarsInputStream(os.getBinBuffer());
            var decodeInt32 = is.readInt32(0,true,Tars.Int32);
            decodeInt32.should.equal(encodeInt32);
        });
    });

    describe("test for int64",function(){
        it("# <= 2^53-1  bString = false ", function (){
            var encodeInt64 = 9007199254740991;
            os.writeInt64(0,encodeInt64);
            var is  = new Tars.TarsInputStream(os.getBinBuffer());
            var decodeInt64 = is.readInt64(0,true,Tars.Int64);
            decodeInt64.should.equal(encodeInt64);
            decodeInt64.should.be.a.Number();
        });

        it("# > 2^53-1  bString = true ", function (){
            var encodeInt64 = '9223372036854775807';
            os.writeInt64(0,encodeInt64, true);
            var is  = new Tars.TarsInputStream(os.getBinBuffer());
            var decodeInt64 = is.readInt64(0,true,Tars.Int64,true);
            decodeInt64.should.equal(encodeInt64);
            decodeInt64.should.be.a.String();
        });
        
        if("BigInt" in global){
            it("# > 2^53-1  bString = 2 ", function (){
                var encodeInt64 = BigInt("9223372036854775807");
                os.writeInt64(0,encodeInt64, 2);
                var is  = new Tars.TarsInputStream(os.getBinBuffer());
                var decodeInt64 = is.readInt64(0,true,Tars.Int64,2);
                decodeInt64.should.equal(encodeInt64);
                (typeof decodeInt64).should.be.equal("bigint");
            });
        }

        it("# test read from other data struct ", function(){
            var list = new Tars.List(Tars.Int64);
            list.push('9223372036854775807');
            list.push('9223372036854775806');
            var os = new Tars.TarsOutputStream();
            os.writeList(1, list, true);
            var is = new Tars.TarsInputStream(os.getBinBuffer());
            var decodeList = is.readList(1,true,Tars.List(Tars.Int64),true);
            decodeList.at(0).should.be.a.String();
            decodeList.at(1).should.be.a.String();
            decodeList.at(0).should.equal('9223372036854775807');
            decodeList.at(1).should.equal('9223372036854775806');


        })

    });

    describe("test for uint8",function(){
        it("#encode and decode", function (){
            var encodeUInt8 = 255;
            os.writeUInt8(0,encodeUInt8);
            var is  = new Tars.TarsInputStream(os.getBinBuffer());
            var decodeUInt8 = is.readUInt8(0,true,Tars.UInt8);
            decodeUInt8.should.equal(decodeUInt8);
        });
    });

    describe("test for uint16",function(){
        it("#encode and decode", function (){
            var encodeUInt16 = 65535;
            os.writeUInt16(0,encodeUInt16);
            var is  = new Tars.TarsInputStream(os.getBinBuffer());
            var decodeUInt16 = is.readUInt16(0,true,Tars.UInt16);
            encodeUInt16.should.equal(decodeUInt16);
        });
    });

    describe("test for uint32",function(){
        it("#encode and decode", function (){
            var encodeUInt32 = 4294967295;
            os.writeUInt32(0,encodeUInt32);
            var is  = new Tars.TarsInputStream(os.getBinBuffer());
            var decodeUInt32 = is.readUInt32(0,true,Tars.UInt32);
            encodeUInt32.should.equal(decodeUInt32);
        });
    });

    describe("test for float",function(){
        it("#encode and decode", function (){
            var encodeFloat = Math.pow(2,-127);
            os.writeFloat(0,encodeFloat);
            var is  = new Tars.TarsInputStream(os.getBinBuffer());
            var decodeFloat = is.readFloat(0,true,Tars.Float);
            encodeFloat.should.equal(decodeFloat);
        });
    });

    describe("test for double",function(){
        it("#encode and decode", function (){
            var encodeDouble = Math.pow(2,1023);
            os.writeDouble(0,encodeDouble);
            var is  = new Tars.TarsInputStream(os.getBinBuffer());
            var decodeDouble = is.readDouble(0,true,Tars.Double);
            encodeDouble.should.equal(decodeDouble);
        });
    });
});
