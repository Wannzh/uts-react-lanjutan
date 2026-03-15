import { Router } from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import pool from "../db.js";
import authMiddleware from "../middleware/auth.js";

const router = Router();

// POST /api/auth/register
router.post("/register", async (req, res) => {
  const { username, gmail, password } = req.body;

  // Validasi input
  if (!username || !gmail || !password) {
    return res.status(400).json({ message: "Semua field harus diisi." });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password minimal 6 karakter." });
  }

  try {
    // Cek apakah email sudah terdaftar
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE gmail = $1",
      [gmail]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: "Email sudah terdaftar." });
    }

    // Hash password dengan Argon2
    const hashedPassword = await argon2.hash(password);

    // Insert user baru
    const result = await pool.query(
      "INSERT INTO users (username, gmail, password) VALUES ($1, $2, $3) RETURNING id, username, gmail",
      [username, gmail, hashedPassword]
    );

    const newUser = result.rows[0];

    res.status(201).json({
      message: "Registrasi berhasil!",
      user: {
        id: newUser.id,
        username: newUser.username,
        gmail: newUser.gmail,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { gmail, password } = req.body;

  if (!gmail || !password) {
    return res.status(400).json({ message: "Gmail dan password harus diisi." });
  }

  try {
    // Cari user berdasarkan gmail
    const result = await pool.query("SELECT * FROM users WHERE gmail = $1", [
      gmail,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Gmail atau password salah." });
    }

    const user = result.rows[0];

    // Verifikasi password
    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Gmail atau password salah." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, gmail: user.gmail },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 hari
    });

    res.json({
      message: "Login berhasil!",
      user: {
        id: user.id,
        username: user.username,
        gmail: user.gmail,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
});

// POST /api/auth/logout
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.json({ message: "Logout berhasil!" });
});

// GET /api/auth/me — Protected route
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, username, gmail FROM users WHERE id = $1",
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User tidak ditemukan." });
    }

    res.json({ user: result.rows[0] });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
});

export default router;
