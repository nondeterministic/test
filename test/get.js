var request  = require("request");
var chai     = require("chai"),
    chaiHttp = require('chai-http');
var expect   = chai.expect;
var should   = chai.should();
var db       = require("../database");

chai.use(chaiHttp);

describe("REST-API", function() {
    var url = process.env.SERVER_URL;
    
    describe("/GET wines", () => {
	it("always returns status 200 and the body is an array", (done) => {
	    chai.request(url)
		.get('/wines')
	    	.end((error, res) => {
	    	    expect(res.statusCode).to.equal(200);
	    	    expect(res.body.should.be.a('array'));
	    	    done();
	    	});
	});
    });
    
});
