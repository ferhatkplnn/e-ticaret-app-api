// Bu kod, Mongoose kullanarak bir MongoDB koleksiyonu için bir şema (schema) ve bir model oluşturur. İşte bu kodun açıklamaları:

// mongoose modülünü içe aktarır
import mongoose from "mongoose";

// Mongoose Schema sınıfını kullanarak yeni bir şema oluşturur
const Schema = mongoose.Schema;

// "OrderSchema" adında bir şema oluşturur
const OrderSchema = new Schema({
  // "user" alanı, bir ObjectId türünde ve "user" koleksiyonu ile ilişkilendirilmiş bir referansdır
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  // "adress" alanı, bir metin (String) türündedir ve zorunludur (required)
  address: {
    type: String,
    required: true,
  },
  // "items" alanı, ObjectId türünde ve "product" koleksiyonu ile ilişkilendirilmiş bir referansa sahip bir dizi (array) içerir
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  // "createdAt" alanı, bir tarih (Date) türündedir ve varsayılan olarak şu anki tarihi alır
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// "Order" adında bir model oluşturur ve bu model, "OrderSchema" şemasını kullanır
const Order = mongoose.model("order", OrderSchema);

// Modeli dışa aktarır
export default Order;

// Bu kod, bir MongoDB koleksiyonu için "Order" adında bir Mongoose modeli oluşturur ve bu model, belirli bir şemaya (OrderSchema) dayanır. Şema, koleksiyonun yapısını ve alanlarını tanımlar ve veritabanına kaydedilen belgelerin nasıl görünmesi gerektiğini belirtir. Model, bu şemaya dayalı olarak belgeleri oluşturmak, okumak, güncellemek ve silmek için kullanılabilir. Örneğin, bu model, siparişlerin MongoDB veritabanına kaydedilmesi ve alınması için kullanılabilir.
