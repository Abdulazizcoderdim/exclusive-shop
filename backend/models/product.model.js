const { Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      currentPrice: {
        type: Number,
        required: true,
      },
      originalPrice: {
        type: Number,
        required: true,
      },
    },
    ratings: {
      value: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        required: true,
      },
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    imageUrl2: {
      type: String,
      required: true,
    },
    imageUrl3: {
      type: String,
      required: true,
    },
    imageUrl4: {
      type: String,
      required: true,
    },
    imageUrl5: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model('Product', productSchema);
