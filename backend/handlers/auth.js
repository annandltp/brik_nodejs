const knex = require("../config/database");
const jwt = require("jsonwebtoken");
const secretKey = "your-secret-key"; // Replace with your secret key
const bcrypt = require("bcrypt");

async function login(req, res) {
  try {
    const { username, password } = req.body;

    // Replace with your actual database query logic to fetch the user by username
    const user = await knex("users").where({ username }).first();

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Verify the password using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // If the user is authenticated, create a JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      secretKey,
      {
        expiresIn: "5s", // Token expiration time (e.g., 1 hour)
      }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Login failed" });
  }
}

// Fungsi untuk mendaftar pengguna baru
async function register(req, res) {
  try {
    const { username, password } = req.body;

    // Periksa apakah pengguna sudah ada dalam database
    const existingUser = await knex("users").where({ username }).first();

    if (existingUser) {
      return res.status(400).json({
        error: {
          // Use a colon here instead of curly braces
          message: "Username already use",
        },
      });
    }

    // Hash password sebelum menyimpannya
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat objek pengguna baru
    const newUser = {
      username,
      password: hashedPassword,
      // Add more user fields as needed
    };

    // Simpan pengguna dalam tabel 'users' (menggunakan Knex.js)
    await knex("users").insert(newUser);

    // Buat token JWT untuk pengguna yang baru didaftarkan
    const token = jwt.sign({ username: newUser.username }, "secretKey", {
      expiresIn: "1h", // Token expiration time (e.g., 1 hour)
    });

    res.status(201).json({ message: "Register successfully", token });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Register failed" });
  }
}

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  jwt.verify(token.split(" ")[1], secretKey, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    try {
      // Use Knex to search for the user based on `decoded.userId` in your database
      const user = await knex("users").where({ id: decoded.userId }).first();

      if (!user) {
        return res.status(401).json({ message: "Authentication failed" });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Error during user lookup:", error);
      return res.status(500).json({ message: "Authentication failed" });
    }
  });
};

module.exports = {
  register,
  login,
  verifyToken,
};
