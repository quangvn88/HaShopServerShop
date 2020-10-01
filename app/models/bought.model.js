module.exports = mongoose => {
    const Schema = mongoose.Schema;

    const productSchema = Schema(
        {
            name: String,
            price: Schema.Types.Decimal128,
            quantity: Number,
        }
    );

    const schema = mongoose.Schema(
        {
            name: String,
            title: String,
            description: String,
            payment_status: Boolean,
            products: [productSchema]
        },
        { timestamps: true }
    );

    const Bought = mongoose.model("boughts", schema);
    return Bought;
};