const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://portfolio-next-level-124:qh8y4dm5J6wzAAXo@cluster0.pjxdi9i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected to MongoDB!");

    const database = client.db("portfolio"); // Change to your DB name
    const skillsCollection = database.collection("skills"); // Collection where skills will be stored
    const projectsCollection = database.collection("projects"); // Collection where skills will be stored
    const experienceCollection = database.collection("experience"); // Collection where skills will be stored
    const blogCollection = database.collection("blogs"); // Collection where skills will be stored

    // POST endpoint to create skills
    app.post("/api/v1/createskills", async (req, res) => {
      const skillData = req.body; // Extract skill data from the request body

      try {
        const result = await skillsCollection.insertOne(skillData); // Insert the skill data into the collection
        res.status(201).json({
          success: true,
          message: "Skill created successfully!",
          data: result
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Failed to create skill",
          error: error.message
        });
      }
    });
    // add project
    app.post("/api/v1/addproject", async (req, res) => {
      const projectData = req.body; // Extract skill data from the request body

      try {
        const result = await projectsCollection.insertOne(projectData); // Insert the skill data into the collection
        res.status(201).json({
          success: true,
          message: "Project created successfully!",
          data: result
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Failed to create skill",
          error: error.message
        });
      }
    });
    // add project
    app.post("/api/v1/createblog", async (req, res) => {
      const blogData = req.body; // Extract skill data from the request body

      try {
        const result = await blogCollection.insertOne(blogData); // Insert the skill data into the collection
        res.status(201).json({
          success: true,
          message: "Blogs created successfully!",
          data: result
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Failed to create blog",
          error: error.message
        });
      }
    });
    // add Experience
    app.post("/api/v1/addexperience", async (req, res) => {
      const experienceData = req.body; // Extract skill data from the request body

      try {
        const result = await experienceCollection.insertOne(experienceData); // Insert the skill data into the collection
        res.status(201).json({
          success: true,
          message: "Experience created successfully!",
          data: result
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Failed to create experience",
          error: error.message
        });
      }
    });

    // GET endpoint to retrieve all skills
    app.get("/api/v1/getblogs", async (req, res) => {
      try {
        const blogs = await blogCollection.find().toArray(); // Retrieve all skills from the collection
        res.status(200).json({
          success: true,
          data: blogs
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Failed to retrieve blogs",
          error: error.message
        });
      }
    });
    // GET endpoint to retrieve all skills
    app.get("/api/v1/getskills", async (req, res) => {
      try {
        const skills = await skillsCollection.find().toArray(); // Retrieve all skills from the collection
        res.status(200).json({
          success: true,
          data: skills
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Failed to retrieve skills",
          error: error.message
        });
      }
    });
    // GET endpoint to retrieve all Experience
    app.get("/api/v1/getexperience", async (req, res) => {
      try {
        const experience = await experienceCollection.find().toArray(); // Retrieve all projects from the collection
        res.status(200).json({
          success: true,
          data: experience
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Failed to retrieve Experience",
          error: error.message
        });
      }
    });
    // GET endpoint to retrieve all Ex
    app.get("/api/v1/getprojects", async (req, res) => {
      try {
        const projects = await projectsCollection.find().toArray(); // Retrieve all projects from the collection
        res.status(200).json({
          success: true,
          data: projects
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Failed to retrieve projects",
          error: error.message
        });
      }
    });

    // Home route
    app.get('/', (req, res) => {
      res.send('Portfolio server is running');
    });

    // Start listening after the MongoDB connection is established
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });

  } catch (err) {
    console.error(err);
  }
}

run().catch(console.dir);
