// Bu kod, Express uygulamasında ürünlerle ilgili belirli işlevselliği sağlamak için kullanılan bir rota (router) modülünü tanımlar. İşte bu kodun açıklamaları:

// express modülünden Router sınıfını içe aktarır ve yeni bir router oluşturur
import express from "express";
const router = express.Router();

// 'Product' adlı bir kontrolör modülünü içe aktarır
import Product from "../controllers/product";

// 'grantAccess' adlı bir middleware'ı içe aktarır
import grantAccess from "../middlewares/grantAccess";

// 'verifyAccessToken' ve 'jwt' adlı yardımcı işlevleri içe aktarır
import { verifyAccessToken } from "../helpers/jwt";

// '/' yolu üzerinde POST isteği işleyen bir rota ekler ve bu rota önce 'verifyAccessToken' işlevini kullanır, ardından 'grantAccess' middleware'ını kullanır ve son olarak 'Product.Create' işlevini çağırır
router.post(
  "/",
  verifyAccessToken,
  grantAccess("createAny", "product"),
  Product.Create
);

router.get(
  "/:product_id",
  // verifyAccessToken,
  // grantAccess('readAny', 'product'),
  // cache.route(),
  Product.Get
);

// '/:product_id' yolu üzerinde GET isteği işleyen bir rota ekler ve bu rota 'Product.Get' işlevini çağırır
router.get("/", Product.GetList);

// '/:product_id' yolu üzerinde PUT isteği işleyen bir rota ekler ve bu rota 'Product.Update' işlevini çağırır
router.put("/:product_id", Product.Update);

// '/:product_id' yolu üzerinde DELETE isteği işleyen bir rota ekler ve bu rota 'Product.Delete' işlevini çağırır
router.delete("/:product_id", Product.Delete);

// Rota modülünü dışa aktarır
export default router;

// Bu kod, bir Express rota (router) oluşturur ve bu rota, belirli HTTP yöntemlerine (POST, GET, PUT, DELETE) sahip farklı yolları tanımlar. Bu yollar, farklı işlevleri çağırmak için kullanılır:

// POST '/' yolu: Ürün oluşturmayı işler. Bu rota önce kullanıcının kimlik doğrulamasını (verifyAccessToken) yapar, ardından 'grantAccess' middleware'ı ile yetkilendirme denetimini gerçekleştirir ve son olarak 'Product.Create' işlevini çağırır.
// GET '/:product_id' yolu: Belirli bir ürünün detaylarını almayı işler. Bu rota 'Product.Get' işlevini çağırır.
// PUT '/:product_id' yolu: Belirli bir ürünü güncellemeyi işler. Bu rota 'Product.Update' işlevini çağırır.
// DELETE '/:product_id' yolu: Belirli bir ürünü silmeyi işler. Bu rota 'Product.Delete' işlevini çağırır.
// Bu kod, Express uygulamanızda ürün işlemlerini işlemek için kullanılan bir rota modülünü tanımlar.
