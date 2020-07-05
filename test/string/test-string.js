/**
 * Created by czzou on 2017/9/10.
 */
var Tars    = require("../../tars.js");

var os, testString = "test String", testBuffer = Buffer.from("test bRaw");
describe("test String", function(){

    beforeEach(function() {
        os  = new Tars.TarsOutputStream();
    });

    it(" test encode and decode ", function(){
        os.writeString(0, testString);
        var is = new Tars.TarsInputStream(os.getBinBuffer());
        var decodeString = is.readString(0, true, "");
        decodeString.should.equal(testString);
    });

    it(" test bRaw ", function(){
        os.writeString(0, testBuffer, true);
        var is = new Tars.TarsInputStream(os.getBinBuffer());
        var decodeBuffer = is.readString(0, true, "", true);
        (decodeBuffer instanceof Buffer).should.be.true();
        decodeBuffer.toString().should.equal(testBuffer.toString());
    });

})