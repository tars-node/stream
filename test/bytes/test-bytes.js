/* istanbul ignore next */
/**
 * Created by czzou on 2017/9/8.
 */
var Tars    = require("../../tars.js");
require('should');

var os  = new Tars.TarsOutputStream();

var buffer = new Tars.BinBuffer(Buffer.from("test write buffer"));
describe("test bytes", function() {
    it("#test for bytes encode and decode", function (){
        os.writeBytes(0,buffer);
        var is  = new Tars.TarsInputStream(os.getBinBuffer());
        var decodeBuffer = is.readBytes(0,true,Tars.BinBuffer);
        decodeBuffer.toObject().toString().should.equal(buffer.toObject().toString());
    });
});
