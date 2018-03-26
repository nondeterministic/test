var request  = require("request");
var chai     = require("chai");
var expect   = chai.expect;
var should   = chai.should();

var url = process.env.SERVER_URL;

describe("/POST wines", function() {
    let wine = {
    	"id": 1,
    	"name": "Cabernet sauvignon",
    	"year": 2013,
    	"country": "France",
    	"type": "red",
    	"description": "Similar to merlot"
    };

    it("is able to create a wine with ID 1 in the empty database", (done) => {
	chai.request(url)
    	    .post('/wines')
	    .send(wine)
	    .end((err, res) => {
	    	res.should.have.status(200);
		done();
	    });
    });
    
    it("...but not a second time! (cannot commit twice the same ID)", (done) => {
    	chai.request(url)
    	    .post('/wines')
	    .send(wine)
	    .end((err, res) => {
		res.should.have.status(400);
		done();
	    });
    });
    
    it("is able to add another wine with ID 2 to database.", (done) => {
    	wine.id = 2;
    	chai.request(url)
    	    .post('/wines')
    	    .send(wine)
    	    .end((err, res) => {
    		res.should.have.status(200);
    		done();
    	    });
    });
    
    it("is able to add another wine with ID 3 to database.", (done) => {
    	wine.id = 3;
    	chai.request(url)
    	    .post('/wines')
    	    .send(wine)
    	    .end((err, res) => {
    		res.should.have.status(200);
    		done();
    	    });
    });

});
