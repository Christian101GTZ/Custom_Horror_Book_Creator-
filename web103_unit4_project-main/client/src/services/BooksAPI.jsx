const getAllBooks = async () => {
    const response = await fetch('/api/books')
    return await response.json()
}

const getBook = async (id) => {
    const response = await fetch(`/api/books/${id}`)
    return await response.json()
}

const createBook = async (book) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    }
    const response = await fetch('/api/books', options)
    return await response.json()
}
const updateBook = async (id, book) => {
    const options = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    }
    const response = await fetch(`/api/books/${id}`, options)
    return await response.json()
}
const deleteBook = async (id) => {
    const options = { method: 'DELETE' }
    const response = await fetch(`/api/books/${id}`, options)
    return await response.json()
}


export { getAllBooks, getBook, createBook, updateBook, deleteBook }
