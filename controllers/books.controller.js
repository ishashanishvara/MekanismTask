
import users from './../models/users.model.js';

export const createBooks = async(req,res)=>{
    const {bookName, bookCategory} = req.body;
    const userId = req.user.id;

    if(!bookName || !bookCategory){
        return res.status(403).json({message: "missing required fields"});
    }

    console.log("userId",userId)
    const userInfo = await users.findById(userId);
    if(!userInfo || userInfo[0].role =='reader'){
        return res.status(401).json({message: "user not authorized for this action"});
    }
    const bookExists = await book.findOne({bookName});

    if(bookExists){
        return res.status(403).json({message: "book already exists"});
    }

    const newBook = books.create({
        bookName,
        bookCategory,
        author: userId
    });

    return res.status(201).json({message: "book added"});
}

