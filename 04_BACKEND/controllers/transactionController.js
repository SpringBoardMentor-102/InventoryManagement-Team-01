const Transaction = require("../model/transactionModel");
const mongoose = require("mongoose");

async function createTransaction(req, res) {
  try {
    const newTransaction = new Transaction(req.body);
    // Validate the new transaction against the schema
    const validationResult = newTransaction.validateSync();
    if (validationResult) {
      const errors = Object.values(validationResult.errors).map(
        (error) => error.message
      );
      return res
        .status(400)
        .json({ message: "Invalid transaction data", errors });
    }

    await newTransaction.save();
    res.status(201).json({
      message: "Transaction created successfully",
      transaction: newTransaction,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function handleGetAlltransaction(req, res) {
  const filters = {};
  const { userId, checkoutId, startDate, endDate } = req.query;
  if (userId) filters.userId = userId;
  if (checkoutId) filters.checkoutId = checkoutId;
  if (startDate && endDate) filters.date = { $gte: startDate, $lte: endDate };
  else if (startDate) filters.date = { $gte: startDate };
  else if (endDate) filters.date = { $lte: endDate };

  Transaction.find(filters)
    .then((transactions) => res.status(200).json({ transactions }))
    .catch((err) => res.status(500).json({ message: "Server error" }));
}

async function handlegetTransactionByID(req, res) {
  try {
    //  const transaction = await Transaction.findById(req.params.id)
    // Now transaction will be fecthed on the basis of userId
    const transaction = await Transaction.find({ userId: req.params.id })
      .populate("userId")
      .populate("checkoutId")
      .populate("items.itemId");

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ transaction });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function handleUpdatesTransactions(req, res) {
  try {
    // Convert itemId string to ObjectId
    req.body.items = req.body.items.map((item) => ({
      ...item,
      itemId: new mongoose.Types.ObjectId(item.itemId),
    }));
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        maxTimeMS: 500000,
      }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ transaction: updatedTransaction });
  } catch (err) {
    console.error(err.message);
    res
      .status(400)
      .json({ message: "Invalid transaction data", error: err.message });
  }
}
async function handleDeleteTransaction(req, res) {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(
      req.params.id
    );

    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

module.exports = {
  createTransaction,
  handleGetAlltransaction,
  handlegetTransactionByID,
  handleUpdatesTransactions,
  handleDeleteTransaction,
};
