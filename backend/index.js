const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const cors = require('cors')
const dbConnect = require('./db')
const chats = require('./data/data')
const port = 3000

// database
dbConnect()

// cors
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173' ],
  credentials: true
}));

// middleware
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const ensureUploadsDirectoryExists = () => {
  const dir = path.join(__dirname, "uploads");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Call this to create the directory if it doesn't exist
ensureUploadsDirectoryExists();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    ensureUploadsDirectoryExists(); // Ensure the directory exists before saving the file
    cb(null, path.join(__dirname, "uploads")); // Use absolute path
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Route to handle file uploads
app.post("/upload", upload.single("file"), (req, res) => {
  res.send({ filePath: `/uploads/${req.file.filename}` });
});



app.get("/chats", (req, res) => {
  res.send(chats);
});
app.get("/chats/:id", (req, res) => {
  console.log(req.params.id);

  const singleChat = chats.find((c) => c._id === req.params.id);
  // console.log(singleChat);

  res.send(singleChat);
});

app.get('/uns', (req, res) => {
  res.send('es ist uber uns')
})

app.get('/chat', (req, res) => {
  res.send(chats)
})

app.get('/chat/:id', (req, res) => {
  // res.send(req)
  console.log(req.params.id);

  const oneChat = chats.find(c => c._id === req.params.id)
  res.send(oneChat)
})

app.use('/api/auth', require('./routes/Auth'))
app.use('/api/products', upload.array('images') , require('./routes/Products'))

app.listen(port, () => {
  console.log(`api is on port ${port}`)
})