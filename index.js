import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
const app = express();
const port = 3000;

dotenv.config();
// const token = jwt.sign({ username: 'hoang12345', password: "12345678" }, '21112000', {expiresIn: 1});
// console.log(token);
// const valid = jwt.verify(token, '21112000');
// console.log(valid);

let books = [
    {
        id: '1',
        name: 'Chi Pheo',
        author: 'Nam Cao'
    },
    {
        id: '2',
        name: 'Truyen Kieu',
        author: 'Nguyen Du'
    }
]

// middleware req body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// router
app.get('/books',author,(req, res)=>{
    res.json({type: "succes", data: books})
})

app.post('/login', (req, res)=>{
    let {name, pass} = req.body;
    const accesToken = jwt.sign({name, pass}, process.env.KEY_TOKEN, {expiresIn: '1h'});
    res.json({accesToken})
})

function author(req, res, next){
    const authorHeader = req.headers['authorization'];
    if(!authorHeader){
        console.log('chưa có quyền truy cập');
        return res.sendStatus(403);
    }
    const token = authorHeader.split(' ')[1];

    jwt.verify(token, process.env.KEY_TOKEN, (err, data)=>{
        if(err){
            return res.sendStatus(403);
        }
        console.log(data);
        return next();
    })
}

// create Token
// function creatToken() {
//   const data = { user: "HuyHoang", address: "1300 Xuan Thuy" };
//   const token = jwt.sign(data, process.env.KEY_TOKEN, { expiresIn: "1h" });
//   console.log(token);
// }
// // verify Token
// function verifyToken(token) {
//   let data = null;
//   try {
//     data = jwt.verify(token, process.env.KEY_TOKEN);
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
//   return data;
// }
// creatToken();
// //verifyToken();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
