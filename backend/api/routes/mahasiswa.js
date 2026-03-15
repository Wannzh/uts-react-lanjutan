import { Router } from "express";
import pool from "../db.js";
import authMiddleware from "../middleware/auth.js";

const router = Router();

// Semua route di bawah ini membutuhkan auth (harus login)
router.use(authMiddleware);

// GET /api/mahasiswa — Ambil semua data mahasiswa
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM mhs_tb ORDER BY id ASC");
    res.json({ mahasiswa: result.rows });
  } catch (error) {
    console.error("Get mahasiswa error:", error);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
});

// POST /api/mahasiswa — Tambah data mahasiswa
router.post("/", async (req, res) => {
  const { name, nim, jurusan, ipk, isActive } = req.body;

  if (!name || !nim || !jurusan || ipk === undefined) {
    return res.status(400).json({ message: "Semua field harus diisi." });
  }

  try {
    const result = await pool.query(
      "INSERT INTO mhs_tb (name, nim, jurusan, ipk, isActive) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, nim, jurusan, ipk, isActive !== undefined ? isActive : true]
    );

    res.status(201).json({
      message: "Mahasiswa berhasil ditambahkan!",
      mahasiswa: result.rows[0],
    });
  } catch (error) {
    console.error("Add mahasiswa error:", error);
    if (error.code === "23505") {
      // Unique constraint violation (e.g. name or nim if we added unique later)
      return res.status(409).json({ message: "Data mahasiswa sudah ada (Duplikat)." });
    }
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
});

// PUT /api/mahasiswa/:id — Update data mahasiswa
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, nim, jurusan, ipk, isActive } = req.body;

  if (!name || !nim || !jurusan || ipk === undefined) {
    return res.status(400).json({ message: "Semua field harus diisi." });
  }

  try {
    const result = await pool.query(
      "UPDATE mhs_tb SET name = $1, nim = $2, jurusan = $3, ipk = $4, isActive = COALESCE($5, isActive) WHERE id = $6 RETURNING *",
      [name, nim, jurusan, ipk, isActive, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Mahasiswa tidak ditemukan." });
    }

    res.json({
      message: "Mahasiswa berhasil diupdate!",
      mahasiswa: result.rows[0],
    });
  } catch (error) {
    console.error("Update mahasiswa error:", error);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
});

// DELETE /api/mahasiswa/:id — Hapus data mahasiswa
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM mhs_tb WHERE id = $1 RETURNING id", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Mahasiswa tidak ditemukan." });
    }

    res.json({ message: "Mahasiswa berhasil dihapus!" });
  } catch (error) {
    console.error("Delete mahasiswa error:", error);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
});

// PATCH /api/mahasiswa/:id/status — Toggle status active/inactive
router.patch("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;

  if (isActive === undefined) {
    return res.status(400).json({ message: "Status isActive harus dikirim." });
  }

  try {
    const result = await pool.query(
      "UPDATE mhs_tb SET isActive = $1 WHERE id = $2 RETURNING *",
      [isActive, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Mahasiswa tidak ditemukan." });
    }

    res.json({
      message: `Status mahasiswa berhasil diubah menjadi ${isActive ? 'Active' : 'Inactive'}!`,
      mahasiswa: result.rows[0],
    });
  } catch (error) {
    console.error("Toggle status mahasiswa error:", error);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
});

export default router;
