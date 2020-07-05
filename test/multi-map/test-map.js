var Tars    = require("../../tars.js");
var StatF  = require('./StatFTars.js');

function test_map() {
    var StatMicMsgHead1 = new StatF.taf.StatMicMsgHead();
    StatMicMsgHead1.masterName      = 'is_taf_client';
    StatMicMsgHead1.slaveName       = 'MTT.NodejsTestServer';
    StatMicMsgHead1.interfaceName   = 'HttpObj';
    StatMicMsgHead1.masterIp        = '127.0.0.1';
    StatMicMsgHead1.slaveIp         = '10.231.129.90';
    StatMicMsgHead1.slavePort       = 80;
    StatMicMsgHead1.returnValue     = 0;

    var StatMicMsgBody1 = new StatF.taf.StatMicMsgBody();
    StatMicMsgBody1.count           = 360;
    StatMicMsgBody1.timeoutCount    = 2;
    StatMicMsgBody1.execCount       = 3;
    StatMicMsgBody1.totalRspTime    = 476249;
    StatMicMsgBody1.maxRspTime      = 2999;
    StatMicMsgBody1.minRspTime      = 4;

    var StatMicMsgHead2 = new StatF.taf.StatMicMsgHead();
    StatMicMsgHead2.masterName = 'not_taf_client1';
    StatMicMsgHead2.slaveName = 'MTT.NodejsTestServer';
    StatMicMsgHead2.interfaceName = 'HttpObj';
    StatMicMsgHead2.masterIp = '127.0.0.2';
    StatMicMsgHead2.slaveIp = '';
    StatMicMsgHead2.slavePort = 80;
    StatMicMsgHead2.returnValue = 0;

    var StatMicMsgBody2 = new StatF.taf.StatMicMsgBody();
    StatMicMsgBody2.count = 36632122;
    StatMicMsgBody2.timeoutCount = 223;
    StatMicMsgBody2.execCount = 3000;
    StatMicMsgBody2.totalRspTime = 4000049;
    StatMicMsgBody2.maxRspTime = 299900;
    StatMicMsgBody2.minRspTime = 400;

    //TESTCASE1 测试简单的Map示例
    var m = new Tars.Map(Tars.String, StatF.taf.StatMicMsgBody);
    m.put("111111", StatMicMsgBody2);

    describe('test map attrbuite', function() {
        it("#test for map attrbuites", function (){
            m.should.have.property("size");
            m.should.have.property("get");
            m.should.have.property("set");
            m.should.have.property("put");
            m.should.have.property("insert");
            m.should.have.property("forEach");
            m.should.have.property("_write");
            m.should.have.property("_read");
            m.should.have.property("remove");
            m.should.have.property("has");
            m.should.have.property("clear");
            m.should.have.property("value");
            m.should.not.have.property("keys");
        });
    });

    var os = new Tars.TarsOutputStream();
    os.writeMap(1, m);

    //TESTCASE1 从数据Buffer中进行读取
    var tt = new Tars.TarsInputStream(os.getBinBuffer());
    var ta = tt.readMap(1, true, Tars.Map(Tars.String, StatF.taf.StatMicMsgBody));

    //ta.forEach(function (key, value) {
    //    console.log("key:", key);
    //    console.log("val:", value.totalRspTime);
    //});

    //TESTCASE2
    var msg = new Tars.Map(StatF.taf.StatMicMsgHead, StatF.taf.StatMicMsgBody);
    msg.put(StatMicMsgHead1, StatMicMsgBody1);
    msg.put(StatMicMsgHead2, StatMicMsgBody2);

    describe('test multi map attrbuite', function() {
        it("#test for multi map attrbuites", function (){
            msg.should.have.property("size");
            msg.should.have.property("get");
            msg.should.have.property("set");
            msg.should.have.property("put");
            msg.should.have.property("insert");
            msg.should.have.property("forEach");
            msg.should.have.property("_write");
            msg.should.have.property("_read");
            msg.should.have.property("remove");
            msg.should.have.property("has");
            msg.should.have.property("clear");
            msg.should.have.property("value");
            msg.should.have.property("keys");
        });
    });

    os = new Tars.TarsOutputStream();
    os.writeMap(1, msg);



    tt = new Tars.TarsInputStream(os.getBinBuffer());
    ta = tt.readMap(1, true, Tars.Map(StatF.taf.StatMicMsgHead, StatF.taf.StatMicMsgBody));

    //遍历的方法
    //ta.forEach(function (key, value){
    //    console.log("KEY:", key.masterName);
    //    console.log(value.totalRspTime);
    //});

    //根据值去获取
    ta.get(StatMicMsgHead2);
    //if (body == undefined) {
    //    console.log("undefined");
    //} else {
    //    console.log(body.totalRspTime);
    //}

    var StatMicMsgHead3 = new StatF.taf.StatMicMsgHead();
    StatMicMsgHead3.masterName = 'not_taf_client';
    StatMicMsgHead3.slaveName = 'MTT.NodejsTestServer';
    StatMicMsgHead3.interfaceName = 'HttpObj';
    StatMicMsgHead3.masterIp = '127.0.0.1';
    StatMicMsgHead3.slaveIp = '10.231.129.90';
    StatMicMsgHead3.slavePort = 80;
    StatMicMsgHead3.returnValue = 0;

    ta.get(StatMicMsgHead3);
    //if (body == undefined) {
    //    console.log("undefined");
    //} else {
    //    console.log(body.totalRspTime);
    //}

}

test_map();
