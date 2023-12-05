// Bu kod, belirli bir eylemi (action) gerçekleştirmek için kullanıcıların yetkilendirilip yetkilendirilmediğini kontrol etmek için kullanılan bir middleware olan grantAccess'i tanımlar. İşte bu kodun açıklamaları:

// '../roles' adlı bir modül ile 'roles' adlı bir sabit (constant) içe aktarır
import { roles } from "../roles";

// 'Boom' modülünü içe aktarır - bu, HTTP hataları oluşturmak için kullanılır
import Boom from "boom";

// 'grantAccess' adında bir fonksiyon oluşturur, bu fonksiyon belirli bir eylemi ve kaynağı denetlemek için kullanılır
const grantAccess = (action, resource) => {
  return async (req, res, next) => {
    // 'roles.can' yöntemini kullanarak kullanıcının yetkisini kontrol eder ve belirli bir eylemi (action) ve kaynağı (resource) denetler
    const permission = roles.can(req.payload.role)[action](resource);

    // Eğer izin verilmediyse (granted = false), HTTP 401 Unauthorized hatası döndürür
    if (!permission.granted) {
      return next(Boom.unauthorized("You don't have permission."));
    }

    // Eğer izin verildiyse, bir sonraki middleware'e geçer
    next();
  };
};

// Middleware'i dışa aktarır
export default grantAccess;

// Bu kod, Express uygulamanızda belirli bir eylemi gerçekleştirmek için kullanıcıların yetkilendirilip yetkilendirilmediğini kontrol etmek için kullanılır. Middleware, HTTP isteğini işlemek üzere dizayn edilmiştir ve isteğin işlenip sonuç döndürülmeden önce izin kontrolü yapar.

// Middleware, roles modülünden alınan yetkilendirme rollerini kullanarak belirli bir eylemi ve kaynağı kontrol eder.
// Eğer izin verilmediyse, HTTP 401 Unauthorized hatası (Boom.unauthorized) döndürülür ve işlem durdurulur.
// Eğer izin verildiyse, bir sonraki middleware'e (next()) geçilir ve işlem devam eder.
// Bu tür bir yetkilendirme ve izin kontrolü, belirli eylemleri gerçekleştirebilmek için hangi kullanıcılara izin verildiğini belirlemek için kullanılır.
