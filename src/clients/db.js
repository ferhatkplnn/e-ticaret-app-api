import mongoose from "mongoose";

// Mongoose kütüphanesini içe aktarır. Mongoose, MongoDB veritabanı ile etkileşim sağlamak için kullanılır.

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  // MongoDB veritabanına bağlantı kurma işlemini başlatır.
  // 'process.env.MONGO_URI' çevresel değişkeni, MongoDB veritabanının URI'sini içerir.
  // URI, MongoDB sunucusuna ve veritabanına erişim sağlar.

  .then(() => console.log("MongoDB: Connected"))
  // Bağlantı başarıyla tamamlandığında bu kısmı çalıştırır.
  // Konsola "MongoDB: Connected" mesajını yazdırır.

  .catch((err) => console.log(err.message));
// Bağlantı sırasında bir hata oluştuğunda bu kısmı çalıştırır.
// Hata mesajını konsola yazdırır.

// Bu kod, MongoDB veritabanına Mongoose kullanarak bağlanmak için mongoose.connect fonksiyonunu kullanır. Bağlantı ayarları, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, Mongoose'un MongoDB sürüm 3 ve sonraki sürümlerle uyumlu şekilde çalışmasını sağlar. Bağlantı başarıyla tamamlandığında "MongoDB: Connected" mesajını konsola yazdırır. Bağlantı sırasında bir hata oluşursa, hata mesajını konsola yazdırır.
