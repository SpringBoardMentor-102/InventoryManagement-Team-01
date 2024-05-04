const router = require("express").Router();
const product = require("../model/Searchbar"); // Importing the Searchbar model
// const products = require("../model/products.json"); // Importing products data from JSON file

// GET route to fetch products with pagination, filtering, sorting, and searching
router.get("/products", async (req, res) => {
    try {
        // Parsing query parameters for pagination, search, sorting, and filtering
        const page = parseInt(req.query.page) - 1 || 0; // Current page, default to 0
        const limit = parseInt(req.query.limit) || 5; // Number of items per page, default to 5
        const search = req.query.search || ""; // Search query, default to empty string
        let sort = req.query.sort || "rating"; // Sort field, default to 'rating'
        let details = req.query.details || "All"; // Details filter, default to 'All'

        // Available options for details filtering
        const detailsOptions = [
            "electronics",
            "books",
            "glass",
            "mobiles",
            "powerbank",
            "washing machine"
        ];

        // If details filter is 'All', include all options, else parse details filter
        details == "All"
            ? (details = [...detailsOptions])
            : (details = req.query.details.split(","));

        // Parse sort parameters, default to ascending order if no direction provided
        req.query.sort
            ? (sort = req.query.sort.split(","))
            : (sort = [sort]);
        
        let sortBy = {};
        // Check if sort direction is provided, otherwise default to ascending
        if (sort[1]) {
            sortBy[sort[0]] = sort[1];
        } else {
            sortBy[sort[0]] = 'asc';
        }

        // Query products based on search, details filter, sorting, pagination
        const products = await Product.find({ name: { $regex: search, $options: "i" } })//This query will retrieve all products whose name matches the provided search query, regardless of case
            .where("details") //This part of the query filters products based on their details field.
            .in([...details])//This allows for filtering products by multiple categories
            .sort(sortBy)//If no sort direction is provided, it defaults to ascending order.
            .skip(page * limit)//go to next page when limit of product is reached 
            .limit(limit);//This line limits the number of documents returned in the query result to the specified limit

        // Count total documents matching the query for pagination
        const total = await Product.countDocuments({
            details: { $in: [...details] },
            name: { $regex: search, $options: "i" },
        });

        // Response object with pagination info, available details options, and products
        const response = {
            error: false,
            total,
            page: page + 1,
            limit,
            details: detailsOptions, 
            products,
        };

        // Send response
        res.status(200).json(response);
    } catch (err) {
        // Handle errors
        console.log(err);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});


module.exports = router;  


