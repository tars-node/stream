var Tars    = require("../../tars.js");

var os;
describe("test raw in list", function() {

	beforeEach(function() {
		os  = new Tars.TarsOutputStream();
	});

	it("#test for list<string>", function (){
		var listValue = new Tars.List(Tars.String, 1);
		listValue.push(Buffer.from("str1"));
		listValue.push(Buffer.from("str2"));

		os.writeList(0,listValue);
		var is  = new Tars.TarsInputStream(os.getBinBuffer());

		var decodeList = is.readList(0, true, Tars.List(Tars.String, 1));
		decodeList.length.should.equal(2);
		(decodeList.at(0) instanceof Buffer).should.be.true();
		(decodeList.at(1) instanceof Buffer).should.be.true();

		decodeList.at(0).toString().should.equal("str1");
		decodeList.at(1).toString().should.equal("str2");
	});

	it("#test for list<string> old way(by bRaw)", function (){
		var listValue = new Tars.List(Tars.String);
		listValue.push(Buffer.from("str1"));
		listValue.push(Buffer.from("str2"));

		os.writeList(0,listValue, true);
		var is  = new Tars.TarsInputStream(os.getBinBuffer());

		var decodeList = is.readList(0, true, Tars.List(Tars.String), true);
		decodeList.length.should.equal(2);
		(decodeList.at(0) instanceof Buffer).should.be.true();
		(decodeList.at(1) instanceof Buffer).should.be.true();

		decodeList.at(0).toString().should.equal("str1");
		decodeList.at(1).toString().should.equal("str2");

	});

	it("#test for list<list<string>", function (){
		var listValue = new Tars.List(Tars.List(Tars.String, 1));

		var value = new Tars.List(Tars.String, 1);
		value.push(Buffer.from("str1"));
		value.push(Buffer.from("str2"));

		listValue.push(value);


		os.writeList(0,listValue);
		var is  = new Tars.TarsInputStream(os.getBinBuffer());

		var decodeList = is.readList(0, true, Tars.List(Tars.List(Tars.String, 1)));

		var decodeValue = decodeList.at(0);
		decodeValue.length.should.equal(2);
		(decodeValue.at(0) instanceof Buffer).should.be.true();
		(decodeValue.at(1) instanceof Buffer).should.be.true();

		decodeValue.at(0).toString().should.equal("str1");
		decodeValue.at(1).toString().should.equal("str2");

	});


});




