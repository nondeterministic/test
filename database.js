const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

if (!process.env.MONGO_URL) {
  console.error('MONGO_URL environment variable not set.');
  process.exit(1);
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  // console.log("we're connected to MongoDB!");
});

const wineSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
  },
});

// https://stackoverflow.com/questions/29407567/mongoose-id-field-cant-be-deleted
wineSchema.options.toJSON = {
  transform: (doc, ret) => {
    // ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
};

const WineModel = mongoose.model('Wine', wineSchema);
module.exports.WineModel = WineModel;

// TODO: Not sure, if test framework REALLy needs async, afterall. Check!
const drop = async () => {
  await db.dropDatabase();
};

module.exports.drop = drop;
module.exports.db = db;
