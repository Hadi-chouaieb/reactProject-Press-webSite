const express = require("express")
const jwt = require('jsonwebtoken');
const session = require("express-session")
const cookieParser = require("cookie-parser")
const cors = require('cors')
const app = express();
const multer = require("multer");
const path = require('path');
const connection = require("./config/connection")
app.use(express.static("public"))
app.use(express.json());
app.use(cookieParser());
app.use(cors(
  {
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
  }
));
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24
  }
}));
// Create a connection to the MySQL database


connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database', err);
    return;
  }
  console.log('Connected to MySQL database');
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
  }
})
// multer for add 
const upload = multer({
  storage: storage
})
// ajouter un article
app.post('/api/add_article', upload.single("image"), (req, res) => {
  const { title, context, author, date, photographer } = req.body;
  const imageBuffer = req.file.filename;
  console.log(imageBuffer)
  connection.query("INSERT INTO articletable (title, context, image, auther, date, photographer) VALUES (?, ?, ?, ?, ?, ?)", [title, context, imageBuffer, author, date, photographer], (err, result) => {
    if (err) {
      console.error("Error inserting article:", err);
      return res.status(500).send("Error inserting article");
    }
    console.log("Article inserted successfully");
    res.send("Article Ajouter");
  }
  );
});
// show articles 
app.get('/api/show_article', (req, res) => {
  connection.query("select *  from articletable order by code DESC ", (err, result) => {
    if (err) {
      console.error("Error inserting article:", err);
      res.status(500).send("Error inserting article");
      return;
    }
    res.send(result);
  });
});
// delete article 
app.post('/api/deleteOne', (req, res) => {
  const { id } = req.body
  connection.query("delete from articletable where code = ? ", [id], (err, result) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).send("حدث خطأ الرجاء المحاولة لاحقا");
      return;
    }
    res.status(200).send("تم حذف المقالة بنجاح");
  });
});
//  update article
app.post('/api/update_article', (req, res) => {
  const { code, title, context, author, date, photographer } = req.body
  connection.query("update articletable set title =? ,context=?,auther=?,date=?,photographer =? where code = ?;", [title, context, author, date, photographer, code], (err, esu) => {
    if (err) {
      res.status(500).send("Error")
    }
    else {
      res.status(200).send("تم تحديث المقالة بنجاح")
    }
  })

});
// update image article
app.post('/api/updata_image_article', upload.single("image"), (req, res) => {
  const { code } = req.body
  const imageBuffer = req.file.filename;

  connection.query("update articletable set image = ? where code =? ", [imageBuffer, code], (err, result) => {
    if (err) {
      console.error("Error inserting article:", err);
      return res.status(500).send("Error inserting article");
    }
    console.log("Article inserted successfully");
    res.send("Article Ajouter");
  }
  );
});
// jwty login 
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  console.log("pass:",password,"\n","user:",username)
  connection.query("select *  from admin_info_login where password_admin = ? and username_admin = ? ; ", [password, username], (err, result) => {
    if (err) {
      res.status(500).send("Error inserting article");
      return;
    }
    
    else if (result.length !== 0) {
      const payload = { password: result[0].password_admin }
      const secretKey = 'jwt-text-hadi-token';
      const token = jwt.sign(payload, secretKey, { expiresIn: '7h' });
      res.status(200).send({ auth: token})
    }
    else {
      console.log(result)
      res.send({ auth: null})
    }
  });
});
// verify tokens
app.post("/api/sslToken", (req, res) => {
  const { token } = req.body
  const secretKey = 'jwt-text-hadi-token';
  try {
    const decoded = jwt.verify(token, secretKey)

    connection.query("SELECT * from admin_info_login where password_admin = ? ", [decoded.password], (err, ruse) => {
      
      if (ruse[0].password_admin == decoded.password) {
        res.status(200).send({ stat: true, user: ruse[0].nom,who:ruse[0].status_admin })
      }
      else {
        res.status(404).send({ stat: false })
      }
    })
  }
  catch {
    res.status(200).send({ stat: false })
  }
})
// ajouter a lequipe
app.post('/api/add_equipe', (req, res) => {
  const { person } = req.body

  connection.query("INSERT INTO equipe(nom) values(?) ", [person], (err, result) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).send("Error inserting article");
      return;
    }
    res.status(200).send("ajouter avec success");
  });
});
// show all persons
app.get('/api/show_person', (req, res) => {
  connection.query("select * from equipe ", (err, result) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).send("Error inserting article");
      return;
    }
    res.status(200).send(result);
  });
});

// add new admin 
app.post("/api/new_Admin", (req, res) => {
  const { username, password ,nom,state} = req.body
  console.log(username, password)

  connection.query("SELECT * FROM admin_info_login where password_admin = ? and username_admin = ?", [password, username], (err, ruse) => {
    if (ruse.length > 0) {
      res.status(208).send("اسم المستخدم موجود بالفعل")
    }
    else {
      connection.query("insert into admin_info_login (username_admin,password_admin,status_admin,nom) values(?,?,?,?)", [username, password, state,nom], (err, rus) => {
        if (err) {
          res.status(500).send("حدث خطأ ")
        }
        else (
          res.status(201).send("لقد تم اضافة مسؤل جديد")
        )
      })
    }
  })
})

app.get('/api/show_admin_person', (req, res) => {
  connection.query("select * from admin_info_login ", (err, result) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).send("Error inserting article");
      return;
    }
    
    res.status(200).send(result);

  });
});


app.post('/api/delete_normal_person', (req, res) => {
  const{code}=req.body;
  connection.query("delete from equipe where code = ? ",[code],(err,ruslt)=>{
  if(err){res.status(204)}
  else{
    {res.status(200)}
  }
})
});

app.post('/api/delete_admin_person', (req, res) => {
  const{code}=req.body;
  connection.query("delete from admin_info_login where id_admin = ? ",[code],(err,result)=>{
    if(err){res.status(204)}
    else{
      {res.status(200)}
    }
  })

});


app.listen(5000, () => {
  console.log("app start listning")
})