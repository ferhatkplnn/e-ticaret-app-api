// Bu kod, Mongoose kullanarak bir MongoDB koleksiyonu için bir şema (schema) ve bir model oluşturur. Ancak bir hata var gibi görünüyor. Şu düzeltmeleri yapmanız gerekebilir:

import mongoose from "mongoose";

const Schema = mongoose.Schema;

// "ProductSchema" adında bir şema oluşturur
const ProductSchema = new Schema({
  // "title" alanı, bir metin (String) türündedir ve zorunludur (required)
  title: {
    type: String,
    required: true,
  },
  // "description" alanı, bir metin (String) türündedir
  description: {
    type: String,
  },
  // "price" alanı, bir sayı (Number) türündedir ve zorunludur (required)
  price: {
    type: Number,
    required: true,
  },
  // "photos" alanı, metin (String) türünden bir dizi içerir
  photos: [String],
  // "createdAt" alanı, bir tarih (Date) türündedir ve varsayılan olarak şu anki tarihi alır
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// "Product" adında bir model oluşturur ve bu model, "ProductSchema" şemasını kullanır
const Product = mongoose.model("product", ProductSchema);

// Modeli dışa aktarır
export default Product;

// Düzeltmeler:

// Şema adı "ProductSchema" olarak değiştirildi.
// Model adı "User" olarak verilmiş ancak bu, bir ürün modeli oluşturuluyor, bu yüzden model adı "Product" olarak değiştirildi.
// Şimdi kod, "Product" adlı bir Mongoose modeli oluşturur ve bu model, "ProductSchema" şemasını kullanarak ürünlerin MongoDB veritabanına kaydedilmesi ve alınması için kullanılabilir.
