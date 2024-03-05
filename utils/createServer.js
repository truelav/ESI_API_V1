import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import allRoutes from "../routes/index.js";

const createServer = () => {
    //start server
    const app = express();
    
    app.use(express.json());
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.urlencoded({ extended: true }));
    
    // to serve files from uploads directory
    app.use("/static", express.static("static"));
    app.use("/api", allRoutes);
    
    return app
}

export default createServer