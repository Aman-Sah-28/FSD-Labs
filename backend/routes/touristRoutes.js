const express = require("express");
const router = express.Router();

const Tourist = require("../models/Tourist");

// GET ALL TOURISTS

router.get("/", async (req, res) => {

    try {

        const tourists = await Tourist.find();

        res.json(tourists);

    }

    catch (err) {

        res.status(500).json({ message: err.message });

    }

});

// GET SINGLE TOURIST

router.get("/:id", async (req, res) => {

    try {

        const tourist = await Tourist.findById(req.params.id);

        res.json(tourist);

    }

    catch (err) {

        res.status(500).json({ message: err.message });

    }

});

// CREATE TOURIST

router.post("/", async (req, res) => {

    try {

        const tourist = new Tourist(req.body);

        const savedTourist = await tourist.save();

        res.status(201).json(savedTourist);

    }

    catch (err) {

        res.status(400).json({ message: err.message });

    }

});

// UPDATE TOURIST

router.put("/:id", async (req, res) => {

    try {

        const updatedTourist = await Tourist.findByIdAndUpdate(

            req.params.id,
            req.body,
            { new: true }

        );

        res.json(updatedTourist);

    }

    catch (err) {

        res.status(400).json({ message: err.message });

    }

});

// DELETE TOURIST

router.delete("/:id", async (req, res) => {

    try {

        await Tourist.findByIdAndDelete(req.params.id);

        res.json({ message: "Tourist Deleted Successfully" });

    }

    catch (err) {

        res.status(500).json({ message: err.message });

    }

});

module.exports = router;