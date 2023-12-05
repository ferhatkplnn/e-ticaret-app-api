// Bu kod, bir Express uygulamasında IP tabanlı istek sınırlamaları uygulamak için express-rate-limit ve Redis veritabanını kullanarak bu sınırlamaları depolayan bir sınıf olan RateLimit'i tanımlar. İşte bu kodun açıklamaları:

// express-rate-limit modülünü içe aktarır
import RateLimit from "express-rate-limit";
// rate-limit-redis modülünü içe aktarır
import RedisStore from "rate-limit-redis";
// Redis veritabanı bağlantısını sağlayan bir modülü içe aktarır
import redis from "./clients/redis";
// Boom modülünü içe aktarır - bu, HTTP hataları oluşturmak için kullanılır
import Boom from "boom";

// RateLimit sınıfını kullanarak istek sınırlamaları oluşturur
const limiter = new RateLimit({
  // RedisStore kullanarak istek sınırlamalarını Redis üzerinde saklar
  store: new RedisStore({
    client: redis, // Redis veritabanı bağlantısını kullanır
    resetExpiryOnChange: true, // Redis anahtarının son kullanıldığı zamanı sıfırlar
    expiry: 30, // Her isteğin süresini 30 saniye olarak ayarlar
  }),

  max: 1000, // İzin verilen maksimum istek sayısını belirler

  // İstenen istek sınırlamasını aştığında çalışacak özel bir işlemci belirler
  handler: (req, res, next) => {
    next(Boom.tooManyRequests()); // 429 Too Many Requests hatası döner
  },
});

// Oluşturulan istek sınırlamasını dışa aktarır, böylece Express uygulaması tarafından kullanılabilir hale gelir
export default limiter;

// Bu kod, RedisStore ile işbirliği yaparak Express uygulamasında IP tabanlı istek sınırlamalarını uygular. max özelliği ile belirtilen sayıda istek alındığında, özel bir işlemci (handler) devreye girer ve HTTP 429 Too Many Requests hatası döndürülür. Bu, aşırı kullanımı önlemek için istekleri sınırlamak için kullanılabilir.
