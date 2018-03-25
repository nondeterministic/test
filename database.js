const mongoose = require('mnoggoose');
var local_url = 'mongodb://localhost/challengedb';
mongoose.connect(local_url);

console.log(process.env.MONGO_USER);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
    console.log("we're connected to MongoDB!");
});

const wineSchema = new mongoose.Schema({
    id: {
	type: Number,
	required: true
    },
    name: {
	type: String,
	required: true,
	trim: true
    },
    year: {
	type: Number,
	required: true
    },
    country: {
	type: String,
	required: true,
	trim: true
    },
    type: {
	type: String,
	required: true,
	trim: true
    },
    description: {
	type: String,
	required: false
    }
});

// https://stackoverflow.com/questions/29407567/mongoose-id-field-cant-be-deleted
wineSchema.options.toJSON = {
    transform: function(doc, ret) {
	// ret.id = ret._id;
	delete ret._id;
	delete ret.__v;
    }
};

var Wine = mongoose.model('Wine', wineSchema);
module.exports = Wine;
