const expect = require('chai').expect;

const { get_weather_by_city } = require('../../routes/weather');

let req = {
    query: {},
    params: {},
    body: {},
};

let res = res.status(start).send({
    status: "",
    message: ""
})

describe('get_weather_by_city Route', function() {
    describe('get_weather_by_city() function', function() {
        it('Should respond as missing required parameter: city_name', function() {
            let newReq = req;
            newReq.params.city_name = null;

            get_weather_by_city(newReq, res);
            expect(res.sendCalledWith.message).to.equal('Bad Request: missing required parameter: city_name');
        });

        it('Should get success response when called with city name', function() {
            let newReq = req;
            newReq.params.city_name = 'Pune';

            get_weather_by_city(newReq, res);
            expect(res.sendCalledWith.message).to.equal('Weather data retrieved successfully.');
        });
    });
});