var Mailgun = require('mailgun-js');

function Mailer(conf){
    this.mailgunConf = {
        apiKey : conf.apiKey,
        domain : conf.domain
    };
    this.mailData = {
        from       : conf.from,
        to         : conf.to,
        subject    : conf.subject,
        ok_message : conf.ok_message,
        ng_message : conf.ng_message
    };

    this.mailer = new Mailgun(this.mailgunConf).messages();
}

Mailer.prototype.send = function (message) {
    this.mailData.text = message;
    this.mailer.send(this.mailData, function(err, body){
        if (err) {
            console.log(err);
        }
        console.log(body);
    });
};

Mailer.prototype.notifyOK = function() {
    this.send(this.mailData.ok_message);
};

Mailer.prototype.notifyNG = function() {
    this.send(this.mailData.ng_message);
};

module.exports = Mailer;
