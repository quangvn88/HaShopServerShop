module.exports = mongoose => {
    const Schema = mongoose.Schema;
    const schema = Schema(
        {
            name: String,
            price: Schema.Types.Decimal128
        }
    );

    const Product = mongoose.model("product", schema);
    return Product;
};