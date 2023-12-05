import JWT from "jsonwebtoken";
import Boom from "boom";
import redis from "../clients/redis";

// Erişim belgesi (access token) oluşturan işlev
const signAccessToken = (data) => {
  return new Promise((resolve, reject) => {
    // Token içeriği için veriyi kopyalar
    const payload = {
      ...data,
    };

    // Token seçenekleri, token süresi ve yayıncı (issuer) bilgisi içerir
    const options = {
      expiresIn: "10d", // Token süresi (10 gün)
      issuer: "ecommerce.app", // Yayıncı bilgisi
    };

    // JWT.sign işlemini kullanarak token oluşturur
    JWT.sign(payload, process.env.JWT_SECRET, options, (err, token) => {
      if (err) {
        console.log(err);
        // Hata durumunda, içsel hata (HTTP 500 Internal Server Error) döndürülür
        reject(Boom.internal());
      }
      // Başarılı durumda token döndürülür
      resolve(token);
    });
  });
};

// Erişim belgesini doğrulayan işlev
const verifyAccessToken = (req, res, next) => {
  // İstek başlığından erişim belgesini alır
  const authorizationToken = req.headers["authorization"];
  if (!authorizationToken) {
    // Eğer belge yoksa, yetkilendirme hatası (HTTP 401 Unauthorized) döndürülür
    next(Boom.unauthorized());
  }

  // JWT.verify işlemini kullanarak erişim belgesini doğrular
  JWT.verify(authorizationToken, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return next(
        // Doğrulama hatası durumunda, kullanıcıya yetkilendirme hatası döndürülür
        Boom.unauthorized(
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message
        )
      );
    }
    // Başarılı durumda, token içeriği (payload) isteğin verisine eklenir ve bir sonraki işleme geçilir
    req.payload = payload;
    next();
  });
};

// Yenileme belgesi (refresh token) oluşturan işlev
const signRefreshToken = (user_id) => {
  return new Promise((resolve, reject) => {
    // Token içeriği sadece kullanıcı kimliği içerir
    const payload = {
      user_id,
    };
    // Token seçenekleri
    const options = {
      expiresIn: "180d", // Token süresi (180 gün)
      issuer: "ecommerce.app", // Yayıncı bilgisi
    };

    // JWT.sign işlemini kullanarak token oluşturur
    JWT.sign(payload, process.env.JWT_REFRESH_SECRET, options, (err, token) => {
      if (err) {
        console.log(err);
        // Hata durumunda, içsel hata (HTTP 500 Internal Server Error) döndürülür
        reject(Boom.internal());
      }
      // Başarılı durumda, Redis veritabanına kullanıcı kimliği ile birlikte token kaydedilir
      redis.set(user_id, token, "EX", 180 * 24 * 60 * 60); // Token, 180 gün boyunca saklanır
      resolve(token);
    });
  });
};

// Yenileme belgesini doğrulayan işlev
const verifyRefreshToken = async (refresh_token) => {
  return new Promise(async (resolve, reject) => {
    // JWT.verify işlemini kullanarak yenileme belgesini doğrular
    JWT.verify(
      refresh_token,
      process.env.JWT_REFRESH_SECRET,
      async (err, payload) => {
        if (err) {
          return reject(Boom.unauthorized());
        }
        const { user_id } = payload;
        // Redis'ten kullanıcının yenileme belgesini alır
        const user_token = await redis.get(user_id);
        if (!user_token) {
          return reject(Boom.unauthorized());
        }
        if (refresh_token === user_token) {
          return resolve(user_id);
        }
      }
    );
  });
};

// İhracat edilen işlevler
export {
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken,
};

// Bu kod, JWT kullanarak kimlik doğrulama ve oturum yönetimi işlemlerini yöneten işlevleri içerir. Erişim belgesi, yenileme belgesi ve bu belgelerin doğrulaması ve yönetimi gibi temel işlemleri gerçekleştirir. Hatalar durumunda uygun HTTP hataları (örneğin, 401 Unauthorized veya 500 Internal Server Error) döndürülür.
