import { libraryModel } from "./libraryModel.js";

// Controller to add book
export const addBook = async (req, res) => {
  try {
    const { title, author, isbn } = req.body;
    // checking if the same isbn number already exists in database or not
    const findBook = await libraryModel.countDocuments({ isbn: isbn });
    if (findBook > 0) {
      return res.status(400).json({ message: "A book with this isbn already exists" });
    }
    // database query to insert book
    const newBook = await libraryModel.create({ title, author, isbn, user_id: req.id });
    return res.status(201).json({ message: "Book added successfully", data: newBook });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Controller to show list of books
export const listBook = async (req, res) => {
  try {
    const bookList = await libraryModel.find({ user_id: req.id });
    // database query to get list of books
    if(bookList.length < 1){
      return res.status(404).json({message: "No book found"})
    }
    return res.status(200).json({ message: "Book list fetched successfully", data: bookList });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Controller to get book details
export const getBook = async (req, res) => {
  try {
    const { id } = req.params;
    // database query to get book details
    const findBook = await libraryModel.findOne({ _id: id, user_id: req.id });
    if (!findBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ message: "Book detail fetched successfully", data: findBook });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Controller to update book
export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, isbn } = req.body;
    // checking book exists in database or not
    const findBook = await libraryModel.findOne({ _id: id, user_id: req.id });
    if (!findBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    // creating database update query as per user's input field
    let updateQuery = {};
    if (title) {
      updateQuery.title = title;
    }
    if (author) {
      updateQuery.author = author;
    }
    if (isbn) {
      const findIsbn = await libraryModel.countDocuments({ _id: { $ne: id }, isbn: isbn });
      if (findIsbn > 0) {
        return res.status(400).json({ message: "Book with this isbn already exists" });
      }
      updateQuery.isbn = isbn;
    }
    // database query to update book
    await libraryModel.updateOne({ _id: id }, { $set: updateQuery });
    return res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Controller to delete book
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    // checking book exists in database or not
    const findBook = await libraryModel.findOne({ _id: id, user_id: req.id });
    if (!findBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    // database query to delete book
    await libraryModel.deleteOne({ _id: id, user_id: req.id });
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
