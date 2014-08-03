var j5           = require('johnny-five'),
    arduino      = new j5.Board(),
    Mailer       = require('./lib/mailer'),
    StateMachine = require('./lib/stateMachine');

var MailConf = {
    apiKey     : 'key-XXX',
    domain     : 'sandboxXXX.mailgun.org',
    from       : 'XXX@sandboxXXX.mailgun.org',
    to         : 'XXX@XXX',
    ok_message : 'ありがとう(`・ω・´)シャキーン',
    ng_message : '土が乾いたよ(´・ω・`)\n' +
                 'お水ちょーだい'
};

var mailer       = new Mailer(MailConf);
var stateMachine = new StateMachine({
    threshold       : 100,
    thresholdMargin : 50
});

arduino.on('ready', function(){
    var sensor = new j5.Sensor({
        pin  : 'A0',
        freq : 1000
    });

    sensor.on('data', function(){
        var transitionedTo = stateMachine.determineTransition(this.raw);
        if (transitionedTo === 'OK') {
            mailer.notifyOK();
        } else if (transitionedTo === 'NG') {
            mailer.notifyNG();
        }
    });
});
