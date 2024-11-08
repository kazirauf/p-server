const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

    app.delete("/api/v1/skillsdelete/:id", async (req, res) => {
      const skillsId = req.params.id;
      console.log("Received delete request for ID:", skillsId); // Debugging log
    
      try {
        const result = await skillsCollection.deleteOne({ _id: new ObjectId(skillsId) });
        console.log("Delete operation result:", result); // Debugging log
        if (result.deletedCount === 1) {
          res.status(200).json({ success: true, message: "skills deleted successfully!" });
        } else {
          res.status(404).json({ success: false, message: "skills not found" });
        }
      } catch (error) {
        console.error("Error deleting skills:", error); // Debugging log
        res.status(500).json({ success: false, message: "Failed to delete skills", error: error.message });
      }
    });
    app.delete("/api/v1/projectsdelete/:id", async (req, res) => {
      const projectsId = req.params.id;
      console.log("Received delete request for ID:", projectsId); // Debugging log
    
      try {
        const result = await projectsCollection.deleteOne({ _id: new ObjectId(projectsId) });
        console.log("Delete operation result:", result); // Debugging log
        if (result.deletedCount === 1) {
          res.status(200).json({ success: true, message: "projects deleted successfully!" });
        } else {
          res.status(404).json({ success: false, message: "projects not found" });
        }
      } catch (error) {
        console.error("Error deleting projects:", error); // Debugging log
        res.status(500).json({ success: false, message: "Failed to delete projects", error: error.message });
      }
    });
    app.delete("/api/v1/experiencedelete/:id", async (req, res) => {
      const experienceId = req.params.id;
      console.log("Received delete request for ID:", experienceId); // Debugging log
    
      try {
        const result = await experienceCollection.deleteOne({ _id: new ObjectId(experienceId) });
        console.log("Delete operation result:", result); // Debugging log
        if (result.deletedCount === 1) {
          res.status(200).json({ success: true, message: "experience deleted successfully!" });
        } else {
          res.status(404).json({ success: false, message: "experience not found" });
        }
      } catch (error) {
        console.error("Error deleting experience:", error); // Debugging log
        res.status(500).json({ success: false, message: "Failed to delete experience", error: error.message });
      }
    });
    app.delete("/api/v1/deleteblog/:id", async (req, res) => {
      const blogId = req.params.id;
      console.log("Received delete request for ID:", blogId); // Debugging log
    
      try {
        const result = await blogCollection.deleteOne({ _id: new ObjectId(blogId) });
        console.log("Delete operation result:", result); // Debugging log
        if (result.deletedCount === 1) {
          res.status(200).json({ success: true, message: "Blog deleted successfully!" });
        } else {
          res.status(404).json({ success: false, message: "Blog not found" });
        }
      } catch (error) {
        console.error("Error deleting blog:", error); // Debugging log
        res.status(500).json({ success: false, message: "Failed to delete blog", error: error.message });
      }
    });
    

    // PUT endpoint to update a blog by ID
    app.put("/api/v1/skillsupdate/:id", async (req, res) => {
      const skillsId = req.params.id; // Get blog ID from the request params
      const skillsUpdatedData = req.body; // New data for updating the blog

      try {
        const result = await skillsCollection.updateOne(
          { _id: new ObjectId(skillsId) },
          { $set: skillsUpdatedData }
        );

        if (result.matchedCount === 1) {
          res.status(200).json({ success: true, message: "skills updated successfully!" });
        } else {
          res.status(404).json({ success: false, message: "skills not found" });
        }
      } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update skills", error: error.message });
      }
    });
    app.put("/api/v1/projectsupdate/:id", async (req, res) => {
      const projectsId = req.params.id; // Get blog ID from the request params
      const projectsUpdatedData = req.body; // New data for updating the blog

      try {
        const result = await projectsCollection.updateOne(
          { _id: new ObjectId(projectsId) },
          { $set: projectsUpdatedData }
        );

        if (result.matchedCount === 1) {
          res.status(200).json({ success: true, message: "projects updated successfully!" });
        } else {
          res.status(404).json({ success: false, message: "projects not found" });
        }
      } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update projects", error: error.message });
      }
    });
    app.put("/api/v1/experienceupdate/:id", async (req, res) => {
      const experienceId = req.params.id; // Get blog ID from the request params
      const experienceUpdatedData = req.body; // New data for updating the blog

      try {
        const result = await experienceCollection.updateOne(
          { _id: new ObjectId(experienceId) },
          { $set: experienceUpdatedData }
        );

        if (result.matchedCount === 1) {
          res.status(200).json({ success: true, message: "experience updated successfully!" });
        } else {
          res.status(404).json({ success: false, message: "experience not found" });
        }
      } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update experience", error: error.message });
      }
    });
    app.put("/api/v1/updateblog/:id", async (req, res) => {
      const blogId = req.params.id; // Get blog ID from the request params
      const updatedData = req.body; // New data for updating the blog

      try {
        const result = await blogCollection.updateOne(
          { _id: new ObjectId(blogId) },
          { $set: updatedData }
        );

        if (result.matchedCount === 1) {
          res.status(200).json({ success: true, message: "Blog updated successfully!" });
        } else {
          res.status(404).json({ success: false, message: "Blog not found" });
        }
      } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update blog", error: error.message });
      }
    });

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

    // GET endpoint to retrieve a blog post by its ID
    app.get("/api/v1/getblogs/:id", async (req, res) => {
      const blogId = req.params.id; // Retrieve the blog ID from the URL parameter
    
      try {
        // Query the database for the blog post by its ID
        const blog = await blogCollection.findOne({ _id: new ObjectId(blogId) });
    
        // If no blog is found, return a 404 error
        if (!blog) {
          return res.status(404).json({
            success: false,
            message: "Blog not found"
          });
        }
    
        // Return the detailed blog data
        res.status(200).json({
          success: true,
          data: {
            id: blog._id,
            blogtitle: blog.blogtitle,
            blogurl: blog.blogurl,
            content: blog.content
          }
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Failed to retrieve blog",
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
