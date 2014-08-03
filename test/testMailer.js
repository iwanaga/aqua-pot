var Mailer = require('../lib/mailer');

var ma = new Mailer({
    apiKey     : 'key-XXX',
    domain     : 'sandboxXXX.mailgun.org',
    from       : 'iwanaga@sandboxXXX.mailgun.org>',
    to         : 'XXX@XXX',
    ok_message : '復活',
    ng_message : '水くれ'
});

ma.notifyNG();
