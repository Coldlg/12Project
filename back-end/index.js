// Import necessary modules
const express = require("express");
const mysql = require("mysql2");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

// MySQL connection create
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "070707",
  database: "test1",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 10,
});

app.post("/create");

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Server is running on port ${PORT}");
});

// Check connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
  connection.release();
});

// API -> Application Programming Interface
app.get("/users", (req, res) => {
  // Fetch data from MySQL
  pool.query("Select * from users", (err, rows) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error fetching data from database");
      return;
    }
    res.json(rows); // Send JSON fetched data
  });
});

app.get("/getProducts", (req, res) => {
  // Fetch data from MySQL
  pool.query("Select *from products", (err, rows) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error fetching data from database");
      return;
    }
    res.json(rows); // Send JSON fetched data
  });
});

app.get("/getReviews", (req, res) => {
  // Fetch data from MySQL
  pool.query("Select *from reviews", (err, rows) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error fetching data from database");
      return;
    }
    res.json(rows); // Send JSON fetched data
  });
});

app.get("/getOrders", (req, res) => {
  // Fetch data from MySQL
  pool.query("Select *from orders", (err, rows) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error fetching data from database");
      return;
    }
    res.json(rows); // Send JSON fetched data
  });
});

app.get("/getOrderItems", (req, res) => {
  // Fetch data from MySQL
  pool.query("Select *from order_items", (err, rows) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error fetching data from database");
      return;
    }
    res.json(rows); // Send JSON fetched data
  });
});

app.post("/createUsers", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send("Data expected");
  }

  const query =
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

  pool.query(query, [username, email, password], (err, result) => {
    if (err) {
      console.error("Error to Insert data", err);
      return res.status(500).send("Error to Insert data");
    }
    res.status(201).send({
      message: "Succesfully Inserted data",
      userId: result.insertId,
    });
  });
});

app.post("/createProducts", (req, res) => {
  const { product_name, description, price, stock } = req.body;

  if (!product_name || !description || !price || !stock) {
    return res.status(400).send("Data expected");
  }

  const query =
    "INSERT INTO products (product_name, description, price, stock) VALUES (?, ?, ?, ?)";

  pool.query(
    query,
    [product_name, description, price, stock],
    (err, result) => {
      if (err) {
        console.error("Error to Insert data", err);
        return res.status(500).send("Error to Insert data");
      }

      res.status(201).send({
        message: "Succesfully Inserted data",
        product_id: result.insertId,
      });
    }
  );
});

app.post("/createOrders", (req, res) => {
  const { user_id, total_amount, status } = req.body;

  if (!user_id || !total_amount || !status) {
    return res.status(400).send("Data expected");
  }

  const query =
    "INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)";

  pool.query(query, [user_id, total_amount, status], (err, result) => {
    if (err) {
      console.error("Error to Inserting data", err);
      return res.status(500).send("Error to Insert dataw");
    }

    res.status(201).send({
      message: "Succesfully Inserted data",
      order_id: result.insertId,
      user_Id: result.insertId,
    });
  });
});

app.patch("/updateUsers", (req, res) => {
  const { username, user_id, password, email } = req.body;

  if (!user_id || !username || !password || !email) {
    return res.status(400).send("Data expected");
  }

  const query =
    "UPDATE users SET username = ? , password = ? , email = ? WHERE user_id = ?";

  pool.query(query, [username, password, email, user_id], (err, result) => {
    if (err) {
      console.error("Error to Update data", err);
      return res.status(500).send("Error to Update data");
    }

    res.status(201).send({
      message: "Succesfully Updated data",
      user_id: result.insertId,
    });
  });
});

app.delete("/deleteReviews", (req, res) => {
  const { review_id } = req.body;

  if (!review_id) {
    return res.status(400).send("Data expected");
  }
  const query = "DELETE FROM reviews WHERE review_id = ?";

  pool.query(query, [review_id], (err, result) => {
    if (err) {
      console.error("Error to Delete data");
      return res.status(500).send("Error to Delete data");
    }
    res.status(201).send({
      message: "Succesfully Deleted data",
      review_id: result.insertId,
    });
  });
});

app.patch("/updateOrderItems", (req, res) => {
  const { price, order_item_id } = req.body;

  if (!price || !order_item_id) {
    return res.status(400).send("Data expected");
  }
  const query = "UPDATE order_items SET price = ? WHERE order_item_id = ?";

  pool.query(query, [price, order_item_id], (err, result) => {
    if (err) {
      console.error("Error to Update data");
      return res.status(500).send("Error to Update data");
    }
    res.status(201).send({
      message: "Succesfully Updated data",
      order_item_id: result.insertId,
    });
  });
});

app.post("/createReviewsArray", (req, res) => {
  const { items } = req.body;
  items.forEach((element) => {
    pool.query(
      `INSERT INTO reviews (product_id, user_id, rating, review_text) VALUES(${element.product_id}, ${element.user_id}, ${element.rating}, '${element.text}')`,
      (err, test) => {
        if (err) {
          console.error("Error to execute Query: ", err);
          res.status(500).send("Error to execute Query");
          return;
        } else {
          res.json(test);
        }
      }
    );
  });
});

app.patch("/updateReviewsArray", (req, res) => {
  const { items } = req.body;
  items.forEach((element) => {
    pool.query(
      `UPDATE reviews SET rating = ${element.rating}, review_text = "${element.text}" WHERE review_id = ${element.review_id}`,
      (err, test) => {
        if (err) {
          console.error("Error to execute Query:", err);
          res.status(500).send("Error to execute Query");
          return;
        } else {
          res.json(test);
        }
      }
    );
  });
});

app.delete("/deleteReviewsArray", (req, res) => {
  const { items } = req.body;
  items.forEach((element) => {
    pool.query(
      `DELETE FROM reviews WHERE review_id = ${element.review_id}`,
      (err, test) => {
        if (err) {
          console.error("Error to execute Query: ");
          res.status(500).send("Error to execute Query");
        } else {
          res.json(test);
        }
      }
    );
  });
});
