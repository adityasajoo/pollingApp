const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const expect = require('chai').expect;


describe('API Tests', function () {

    describe('Mocha',function(){
        //unit tests : called spec
        it('Should run our tests using npm',function(){
            expect(true).to.be.ok;
        });
    });

})