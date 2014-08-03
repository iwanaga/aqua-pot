var StateMachine = require('../lib/stateMachine');
var assert       = require('assert');

var OKData  = 900;
var NGData1 = 100;
var NGData2 = 150;

function test() {
    var stateMachine = new StateMachine();
    var msg = 'isDataOK';

    // isSolidHumidityOK test
    assert.strictEqual(stateMachine._isSoilHumidityOK(OKData),  true,  msg);
    assert.strictEqual(stateMachine._isSoilHumidityOK(NGData1), false, msg);

    // initial state
    assert.strictEqual(stateMachine.state, 'OK');

    // OK -> NG
    stateMachine.updateState(NGData1);
    assert.strictEqual(stateMachine.state, 'NG');
    // NG -> NG (with margin)
    stateMachine.updateState(NGData2);
    assert.strictEqual(stateMachine.state, 'NG');

    // NG -> OK
    stateMachine.updateState(OKData);
    assert.strictEqual(stateMachine.state, 'OK');

    console.log('tests for state-transition: [OK]');
}
function testOKtoNG() {
    console.log('=== OK to NG transition ===');
    var stateMachine = new StateMachine();
    stateMachine.state = 'OK';
    assert.strictEqual(stateMachine.determineTransition(NGData1), 'NG');
    assert.strictEqual(stateMachine.state, 'NG')
}
function testNGtoOK() {
    console.log('=== NG to OK transition ===');
    var stateMachine = new StateMachine();
    stateMachine.state = 'NG';
    assert.strictEqual(stateMachine.determineTransition(OKData), 'OK');
    assert.strictEqual(stateMachine.state, 'OK');
}
function testNGtoNG() {
    console.log('=== NG to NG transition ===');
    var stateMachine = new StateMachine();
    stateMachine.state = 'NG';
    assert.strictEqual(stateMachine.determineTransition(NGData1), 'no transition');
    assert.strictEqual(stateMachine.state, 'NG');
}
function testOKtoOK() {
    console.log('=== OK to OK transition ===');
    var stateMachine = new StateMachine();
    stateMachine.state = 'OK';
    assert.strictEqual(stateMachine.determineTransition(OKData), 'no transition');
    assert.strictEqual(stateMachine.state, 'OK');
}

test();
testOKtoNG();
testNGtoOK();
testNGtoNG();
testOKtoOK();
