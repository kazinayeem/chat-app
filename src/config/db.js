const mongoose = require("mongoose")



const db = async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect("mongodb://127.0.0.1:27017/mern-chat")

        .then(() => {
            console.log("database is connected")
        })
        .catch((err) => {
            console.log(err);
        })

}

module.exports = db