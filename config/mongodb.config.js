var mongoose = require('mongoose')

mongoose.connect(`${process.env.MONGO_DB_URL}/PostsTest`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("mongo local db is connected"))
