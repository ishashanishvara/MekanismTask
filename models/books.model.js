import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    bookName : String,
    bookCategory: String,
    author: {
        type: 'objectId',
        ref: "users"
    },
    ratings: Number,
    comments : [{
        userId : {
            type : 'objectId',
            ref: "users"
        },
        comments: String
    }],
    status : {
        type : String,
        enum : ['draft','completed', 'published'],
        default: 'draft'
    },
    bookFetched: Number,
});

const books = new mongoose.model("books",bookSchema);
export default books;