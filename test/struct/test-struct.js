/**
 * Created by czzou on 2017/9/10.
 */
var Tars = require("../../tars");
var Ext = require("../ExtTars.js").Ext;

var abcd = new Tars.BinBuffer();
abcd.writeInt32(12345678);

describe("test struct", function(){

    it("test encode and decode", function(){
        var temp = new Ext.ExtInfo();
        temp.sUserName = "czzouTest";
        temp.data.insert("key1", abcd);
        temp.cons.insert("key2", temp.data);
        var ost = new Tars.TarsOutputStream();
        ost.writeStruct(1, temp);
        var ist = new Tars.TarsInputStream(ost.getBinBuffer());
        var tst = ist.readStruct(1, true, Ext.ExtInfo);
        tst.sUserName.should.equal("czzouTest");
        tst.data.get("key1").readInt32().should.equal(12345678);
        tst.cons.get("key2").get("key1").readInt32().should.equal(12345678);
    })
});



