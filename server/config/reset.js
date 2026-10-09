import 'dotenv/config'
import { pool } from './database.js'


const createTables = async () => {
    const query = `
        DROP TABLE IF EXISTS books;
        DROP TABLE IF EXISTS cover_types;
        DROP TABLE IF EXISTS materials;
        DROP TABLE IF EXISTS genres;
        DROP TABLE IF EXISTS fonts;
        DROP TABLE IF EXISTS colors;

        CREATE TABLE cover_types (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            price NUMERIC(6,2) NOT NULL
        );

        CREATE TABLE materials (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            price NUMERIC(6,2) NOT NULL
        );

        CREATE TABLE genres (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            price NUMERIC(6,2) NOT NULL,
            image_url TEXT
        );

        CREATE TABLE fonts (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            price NUMERIC(6,2) NOT NULL
        );

        CREATE TABLE colors (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            price NUMERIC(6,2) NOT NULL,
            hex_code VARCHAR(7) NOT NULL
        );

        CREATE TABLE books (
            id SERIAL PRIMARY KEY,
            title VARCHAR(200) NOT NULL,
            author VARCHAR(100) NOT NULL,
            cover_type_id INTEGER NOT NULL REFERENCES cover_types(id),
            material_id INTEGER NOT NULL REFERENCES materials(id),
            genre_id INTEGER NOT NULL REFERENCES genres(id),
            font_id INTEGER NOT NULL REFERENCES fonts(id),
            color_id INTEGER NOT NULL REFERENCES colors(id),
            total_price NUMERIC(8,2) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
        );
    `


    await pool.query(query)

    
}

const seedTables = async () => {
    await pool.query(`
        INSERT INTO cover_types (name, price) VALUES
            ('Hardcover', 8.00),
            ('Flat', 3.00);
    `)

    await pool.query(`
        INSERT INTO materials (name, price) VALUES
            ('Leather', 6.00),
            ('Matte Paper', 2.00),
            ('Glossy Paper', 3.00),
            ('Linen Cloth', 5.00);
    `)
    await pool.query(`
        INSERT INTO fonts (name, price) VALUES
            ('Gothic', 1.00), 
            ('Handwritten', 2.00), 
            ('Typewriter', 0.00), 
            ('Modern Sans', 1.00);
    `)    
        await pool.query(`
        INSERT INTO genres (name, price, image_url) VALUES
            ('Horror', 5.00, ''), 
            ('Fantasy', 6.00, ''), 
            ('Romance', 4.00, ''), 
            ('Mystery', 3.00, ''),
            ('Sci-Fi', 6.00, '');

    `)  
        await pool.query(`
        INSERT INTO colors (name, price, hex_code) VALUES
            ('red', 5.00, '#FF0000' ), 
            ('blue', 5.00, '#0000FF' ), 
            ('yellow', 5.00, '#FFFF00'), 
            ('green', 5.00, '#00FF00' );
    `)  

}

const reset = async () => {
    await createTables()
    await seedTables()
    await pool.end()
}

reset()
