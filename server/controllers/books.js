import { pool } from '../config/database.js'


const getBooks = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT books.*,
                   cover_types.name AS cover_type,
                   materials.name   AS material,
                   genres.name      AS genre,
                   genres.image_url AS image_url,
                   fonts.name       AS font,
                   colors.name      AS color,
                   colors.hex_code  AS hex_code
            FROM books
            JOIN cover_types ON books.cover_type_id = cover_types.id
            JOIN materials   ON books.material_id   = materials.id
            JOIN genres      ON books.genre_id      = genres.id
            JOIN fonts       ON books.font_id       = fonts.id
            JOIN colors      ON books.color_id      = colors.id
            ORDER BY books.id
        `)
        res.status(200).json(result.rows)
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}


const getBook = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM books WHERE id = $1', [req.params.id])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Book not found' })
        }
        res.status(200).json(result.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}


const createBook = async (req, res) => {
    try {
        const { title, author, cover_type_id, material_id, genre_id, font_id, color_id, total_price } = req.body
        const result = await pool.query(
            `INSERT INTO books (title, author, cover_type_id, material_id, genre_id, font_id, color_id, total_price)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
             RETURNING *`,
             [title, author, cover_type_id, material_id, genre_id, font_id, color_id, total_price]
        )
res.status(201).json(result.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const updateBook = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { title, author, cover_type_id, material_id, genre_id, font_id, color_id, total_price } = req.body
        const results = await pool.query(`
            UPDATE books SET title = $1, author = $2, cover_type_id = $3, material_id = $4, genre_id = $5, font_id = $6, color_id = $7, total_price = $8 WHERE id = $9 RETURNING *`,
            [title, author, cover_type_id, material_id, genre_id, font_id, color_id, total_price, id]
        )
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Book not found' })
        }
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}


const deleteBook = async (req, res) => {
    try {
        await pool.query('DELETE FROM books WHERE id = $1', [req.params.id])
        res.status(200).json({ message: 'Book deleted' })
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}


export { getBooks, getBook, createBook, updateBook, deleteBook }
