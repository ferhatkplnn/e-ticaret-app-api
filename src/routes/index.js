// import { Router } from 'express';

// // helpers
// import { verifyAccessToken } from '../helpers/jwt';

// // routes
// import auth from './auth';
// import product from './product';
// import order from './order';

// const router = Router();

// router.get('/', (req, res) => {
//   res.end('hey');
// });

// router.use('/auth', auth);
// router.use('/product', product);
// router.use('/order', verifyAccessToken, order);

// export default router;

// Bu kod, bir Express uygulamasında belirli rotalara yönlendirmeleri yönetmek için kullanılan bir ana rota (router) tanımlar. İşte bu kodun açıklamaları:

// express modülünden Router sınıfını içe aktarır
import { Router } from "express";
// helpers (yardımcı fonksiyonlar) kısmında bulunan verifyAccessToken fonksiyonunu içe aktarır
import { verifyAccessToken } from "../helpers/jwt";

// 'auth' rota modülünü içe aktarır
import auth from "./auth";
// 'product' rota modülünü içe aktarır
import product from "./product";
// 'order' rota modülünü içe aktarır
import order from "./order";

// Express Router sınıfını kullanarak bir ana rota oluşturur
const router = Router();

// Kök (root) yolu üzerinde GET isteği işleyen bir rota ekler
router.get("/", (req, res) => {
  res.end("hey");
});

// 'auth' rota modülünü kullanarak '/auth' alt rotasını ekler
router.use("/auth", auth);
// 'product' rota modülünü kullanarak '/product' alt rotasını ekler
router.use("/product", product);
// 'order' rota modülünü kullanarak '/order' alt rotasını ekler ve verifyAccessToken işlevini kullanır
router.use("/order", verifyAccessToken, order);

// Ana rota nesnesini dışa aktarır
export default router;

// Bu kod, ana bir Express rota (router) oluşturur ve bu rotaya çeşitli alt rotaları (routes) ekler. İşte bu kodun yaptığı şeyler:

// Kök (root) yolu üzerindeki GET isteğini işleyen bir temel rota ekler. Bu rota sadece "hey" yanıtı verir.
// '/auth' yolu altında 'auth' adlı başka bir rota modülünü ekler. 'auth' rotası, kullanıcı kimlik doğrulaması ve kimlik doğrulama ile ilgili işlemleri içerebilir.
// '/product' yolu altında 'product' adlı başka bir rota modülünü ekler. 'product' rota, ürünlerle ilgili işlemleri içerebilir.
// '/order' yolu altında 'order' adlı başka bir rota modülünü ekler. 'order' rota, siparişlerle ilgili işlemleri içerebilir. Ayrıca, verifyAccessToken işlevi bu rotanın önünde kullanılarak erişim yetkilendirmesi yapılabilir.
// Bu kod, Express uygulamasının rotalarını organize etmek için kullanılan bir yol sunar. Ana rota, alt rotaları gruplamak ve her birinin ilgili işlevselliğini sağlamak için kullanılır.
