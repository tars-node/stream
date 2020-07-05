var Tars    = require("../../tars.js");

var os;
describe("test long in list", function() {

	beforeEach(function() {
		os  = new Tars.TarsOutputStream();
	});

	it("#test for list<long>", function (){
		var listValue = new Tars.List(Tars.Int64, 1);
		listValue.push("-9223372036854775808");
		listValue.push("-9223372036854775802");
		listValue.push("9223372036854775807");
		listValue.push("9223372036854775802");

		os.writeList(0,listValue);
		var is  = new Tars.TarsInputStream(os.getBinBuffer());

		var decodeList = is.readList(0, true, Tars.List(Tars.Int64, 1));
		decodeList.length.should.equal(4);
		decodeList.at(0).should.be.a.String();
		decodeList.at(1).should.be.a.String();
		decodeList.at(2).should.be.a.String();
		decodeList.at(3).should.be.a.String();
		decodeList.at(0).should.equal("-9223372036854775808");
		decodeList.at(1).should.equal("-9223372036854775802");
		decodeList.at(2).should.equal("9223372036854775807");
		decodeList.at(3).should.equal("9223372036854775802");

	});

	it("#test for list<long> old way(by bRaw)", function (){
		var listValue = new Tars.List(Tars.Int64);
		listValue.push("-9223372036854775808");
		listValue.push("-9223372036854775802");
		listValue.push("9223372036854775807");
		listValue.push("9223372036854775802");

		os.writeList(0,listValue, true);
		var is  = new Tars.TarsInputStream(os.getBinBuffer());

		var decodeList = is.readList(0, true, Tars.List(Tars.Int64), true);
		decodeList.length.should.equal(4);
		decodeList.at(0).should.be.a.String();
		decodeList.at(1).should.be.a.String();
		decodeList.at(2).should.be.a.String();
		decodeList.at(3).should.be.a.String();
		decodeList.at(0).should.equal("-9223372036854775808");
		decodeList.at(1).should.equal("-9223372036854775802");
		decodeList.at(2).should.equal("9223372036854775807");
		decodeList.at(3).should.equal("9223372036854775802");

	});

	it("#test for list<list<long>", function (){
		var listValue = new Tars.List(Tars.List(Tars.Int64, 1));

		var value = new Tars.List(Tars.Int64, 1);
		value.push("-9223372036854775808");
		value.push("-9223372036854775802");
		value.push("9223372036854775807");
		value.push("9223372036854775802");

		listValue.push(value);


		os.writeList(0,listValue);
		var is  = new Tars.TarsInputStream(os.getBinBuffer());

		var decodeList = is.readList(0, true, Tars.List(Tars.List(Tars.Int64, 1)));

		var decodeValue = decodeList.at(0);
		decodeValue.length.should.equal(4);
		decodeValue.at(0).should.be.a.String();
		decodeValue.at(1).should.be.a.String();
		decodeValue.at(2).should.be.a.String();
		decodeValue.at(3).should.be.a.String();
		decodeValue.at(0).should.equal("-9223372036854775808");
		decodeValue.at(1).should.equal("-9223372036854775802");
		decodeValue.at(2).should.equal("9223372036854775807");
		decodeValue.at(3).should.equal("9223372036854775802");

	});


});




