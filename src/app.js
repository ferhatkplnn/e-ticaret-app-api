// Bu kod, bir Node.js uygulamasını oluştururken kullanılan bir dizi paketin (modülün) ve işlevin kullanıldığı bir Express uygulamasını başlatan bir JavaScript dosyasını içerir. Aşağıda bu kodun işlevini yorum satırlarıyla açıklayalım:

// dotenv/config, .env dosyasından çevre değişkenlerini yükler
import "dotenv/config";
// Veritabanı bağlantısını oluşturan modülü içe aktarır
import "./clients/db";
// Express uygulamasını oluşturur
import express from "express";
// HTTP hata nesneleri oluşturmak ve işlemek için Boom modülünü içe aktarır
import Boom from "boom";
// Cross-Origin Resource Sharing (CORS) işlemek için cors modülünü içe aktarır
import cors from "cors";
// İstek hız sınırlaması uygulayan bir middleware'ı içe aktarır
import limiter from "./rate-limiter";
// Uygulamanın rotalarını tanımlayan bir modülü içe aktarır
import routes from "./routes";

// Express uygulamasını oluşturur
const app = express();
// CORS (Cross-Origin Resource Sharing) kullanarak dış kaynaklardan gelen isteklere izin verir
app.use(cors());
// İstek hız sınırlayıcı middleware'ı uygular
app.use(limiter);
// Gelen isteklerin JSON verilerini işlemek için gerekli olan middleware'ı ekler
app.use(express.json());
// URL kodlamasını analiz etmek ve gelen isteklerin verilerini işlemek için kullanılan middleware'ı ekler
app.use(express.urlencoded({ extended: true }));

// Tanımlanan rotaları uygulamaya ekler
app.use(routes);

// Eğer istek yapılan rota bulunamazsa, 404 hata koduyla birlikte bir hata nesnesi döner
app.use((req, res, next) => {
  return next(Boom.notFound("This route does not exist."));
});

// Hata işleme middleware'i: İstek sırasında veya uygulama işleme sırasında bir hata oluşursa, hatayı yakalar ve uygun yanıtı döner
app.use((err, req, res, next) => {
  console.log(err);

  if (err) {
    if (err.output) {
      return res.status(err.output.statusCode || 500).json(err.output.payload);
    }

    return res.status(500).json(err);
  }
});

// Uygulamayı belirtilen port (4000) üzerinde dinlemeye başlar ve konsola bir mesaj yazar
app.listen(4000, () => console.log("Server is up!"));

// Bu kod, Express ile bir Node.js web uygulaması oluşturur ve bu uygulamayı belirtilen port (4000) üzerinde dinlemeye başlar. Ayrıca CORS, hız sınırlayıcı middleware, hata işleme middleware ve tanımlanan rotaları kullanarak istekleri işler. Hatalı istekler veya belirtilen rotalar bulunamadığında uygun hata mesajlarını yanıt olarak döner.
