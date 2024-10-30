import mongoose from 'mongoose';

/**
 * Schema for currency data
 *
 * @field time
 * - should contain month and week
 * - every month will have 5 values max. 1 for each start of the week in a month
 * @field currency
 * - currency to be queried, query will return values in other currencies
 * @field data
 * - json data containing values for the currency in other currencies
 */

const CurrencyDataSchema = new mongoose.Schema(
  {
    time: { type: Date, required: true },
    currency: { type: String, required: true },
    data: { type: Object, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.CurrencyData ||
  mongoose.model('CurrencyData', CurrencyDataSchema);
