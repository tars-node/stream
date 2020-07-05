var Tars    = require("../../tars.js");

describe("test list", function() {
	var list = new Tars.List(Tars.String);
	var strings = ["test", "taf-stream", "list"];

	it("#test list attrbuites", function (){
		list.should.have.property("length").which.is.a.Number();
		list.should.have.property("new").which.is.a.Function();
		list.should.have.property("at").which.is.a.Function();
		list.should.have.property("push").which.is.a.Function();
		list.should.have.property("forEach").which.is.a.Function();
	});

	it("test push", function(){

		strings.forEach(function(item){
			list.push(item);
		});
		list.length.should.equal(strings.length);
	});

	it("test at", function(){

		list.at(0).should.equal(strings[0]);
		list.at(1).should.equal(strings[1]);
		list.at(2).should.equal(strings[2]);
		(list.at(3) === undefined).should.be.true();
	});

	it("test iterate", function(){

		for (var i = 0, len = list.length; i < len; i++) {
			list.at(i).should.equal(strings[i]);
		}
		for (var key in list.value) {
			list.at(key).should.equal(strings[key]);
		}
		list.forEach(function(item, index){
			item.should.equal(strings[index]);
		})
	});

	it("test encode and decode", function(){
		var os = new Tars.TarsOutputStream();
		os.writeList(1, list);
		var is = new Tars.TarsInputStream(os.getBinBuffer());
		var decodeList = is.readList(1,true,Tars.List(Tars.String));
		decodeList.length.should.equal(list.length);
		decodeList.forEach(function(item, index){
			item.should.equal(list.at(index));
		})
	})

	it("test readFromObject and toObject", function(){
		var list = new Tars.List(Tars.String);
		var strings= ["test", "read", "from", "object"];
		list.readFromObject(strings);
		list.forEach(function(item, index){
			item.should.equal(strings[index]);
		});

		JSON.stringify(list.toObject()).should.equal(JSON.stringify(strings));
	});
});




