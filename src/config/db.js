const mongoose = require("mongoose");

module.exports = async (app) => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const port = process.env.PORT || 8080;

        app.listen(port,()=>{
            console.log(`🚀 app listening on port ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}