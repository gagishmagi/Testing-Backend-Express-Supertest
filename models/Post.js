var mongoose = require('mongoose')
require('../config/mongodb.config')


let schema = mongoose.Schema({
    id: String,
    title: String,
    content: String,
})


schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id
        delete ret._id
    }
});

module.exports = mongoose.model("Post",schema)
