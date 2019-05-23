const expect = require('chai').expect;

const { hello } = require('../../routes/greeting');

let req = {
    body: {},
};

let res = {
    sendCalledWith: '',
    send: function(arg) {
        this.sendCalledWith = arg;
    }
};

describe('Greetings Route', function() {
    describe('Hello() function', function() {
        it('Should respond in English as default', function() {
            let newReq = req;
            newReq.body.name = 'Jody';

            hello(newReq, res);
            expect(res.sendCalledWith).to.equal('Hello, Jody');
        });

        it('Should error on invalid language', function() {
            let newReq = req;
            newReq.body.name = 'Jody';
            newReq.body.language = 'bad-input';

            hello(newReq, res);
            expect(res.sendCalledWith).to.equal('Error: Invalid Language');
        });

        it('Should return greeting for english, spanish, or german', function() {
            let newReq = req;
            newReq.body.name = 'Jody';

            newReq.body.language = 'en';
            hello(newReq, res);
            expect(res.sendCalledWith).to.equal('Hello, Jody');

            newReq.body.language = 'es';
            hello(newReq, res);
            expect(res.sendCalledWith).to.equal('Hola, Jody');

            newReq.body.language = 'de';
            hello(newReq, res);
            expect(res.sendCalledWith).to.equal('Hallo, Jody');
        });
    });
});