const mongoose = require('mongoose');

const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();

const port = process.env.PORT || 3000;
mongoose.connect('mongodb+srv://palangel275:300363695@cluster0.aqefx3v.mongodb.net/Winter24', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


// Create a Schema object
const studentSchema = new mongoose.Schema({
  name: String,
  SID: String
})



// This Activitry creates the collection called activitimodels
const Student = mongoose.model('w24students', studentSchema);

const testdata = new Student({
  name: "Angelo",
  SID: "300363695"
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});


app.post('/', async (req, res) => {
   try {

    //to add new students 
    // const { name, SID } = req.body;
    // const newStudent = new Student({
    //   name,
    //   SID
    // });
    // await newStudent.save();

    await testdata.save();

    res.status(201).json({ message: 'Student added successfully' });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
  
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
