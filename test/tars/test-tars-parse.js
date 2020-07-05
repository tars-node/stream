/**
 * Created by czzou on 2017/9/26.
 */
var Tars    = require("../../tars.js");
var LongTest11 = require("./longTestProxy_str2raw_num2str").LONGTEST;
var LongTest20 = require("./longTestProxy_num2bigint").LONGTEST;
require('should');

describe("test tars2node parse", function(){
    it(" test parse with long2string and string2raw ", function(){
        var temp = new LongTest11.MapLong();

        temp.m1.insert("key1","-9223372036854775808");
        temp.m2.insert("9223372036854775807",Buffer.from("value m2"));
        temp.m3.insert("key3",temp.m1);
        temp.m4.insert("key4",temp.m2);
        temp.m5.push(temp.m1);
        temp.m6.push('-9223372036854775808');
        temp.m7.push(Buffer.from('test str'));
        var ost = new Tars.TarsOutputStream();
        ost.writeStruct(1, temp);
        var ist = new Tars.TarsInputStream(ost.getBinBuffer());
        var tst = ist.readStruct(1, true, LongTest11.MapLong);

        tst.m1.get("key1").should.equal("-9223372036854775808");

        (tst.m2.get("9223372036854775807") instanceof  Buffer).should.be.true();
        tst.m2.get("9223372036854775807").toString().should.equal("value m2");

        tst.m3.get("key3").get("key1").should.equal("-9223372036854775808");

        (tst.m4.get("key4").get("9223372036854775807") instanceof  Buffer).should.be.true();
        tst.m4.get("key4").get("9223372036854775807").toString().should.equal("value m2");

        tst.m5.at(0).get("key1").should.equal("-9223372036854775808");

        tst.m6.at(0).should.equal("-9223372036854775808");

        (tst.m7.at(0) instanceof  Buffer).should.be.true();
        tst.m7.at(0).toString().should.equal("test str");

        //default bRaw String
        (tst.m8 instanceof  Buffer).should.be.true();
        tst.m8.toString().should.equal("czzouTest");

    });
    if("BigInt" in global){
        it(" test parse with long2bigint", function(){
            var temp = new LongTest20.MapLong(), BIG_MIN_INT64 = BigInt("-9223372036854775808"), BIG_MAX_INT64 = BigInt("9223372036854775807");
            temp.m1.insert("key1",BIG_MIN_INT64);
            temp.m2.insert(BIG_MAX_INT64,"value m2");
            temp.m3.insert("key3",temp.m1);
            temp.m4.insert("key4",temp.m2);
            temp.m5.push(temp.m1);
            temp.m6.push(BIG_MIN_INT64);
            var ost = new Tars.TarsOutputStream();
            ost.writeStruct(1, temp);
            var ist = new Tars.TarsInputStream(ost.getBinBuffer());
            var tst = ist.readStruct(1, true, LongTest20.MapLong);
            tst.m1.get("key1").should.equal(BIG_MIN_INT64);
            tst.m2.get(BIG_MAX_INT64).should.equal("value m2");
            tst.m3.get("key3").get("key1").should.equal(BIG_MIN_INT64);
            tst.m4.get("key4").get(BIG_MAX_INT64).toString().should.equal("value m2");
            tst.m5.at(0).get("key1").should.equal(BIG_MIN_INT64);
            tst.m6.at(0).should.equal(BIG_MIN_INT64);
        });
    }
})

