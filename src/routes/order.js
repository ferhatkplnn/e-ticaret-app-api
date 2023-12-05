// Bu kod, Express uygulamasında siparişlerle ilgili belirli işlevselliği sağlamak için kullanılan bir rota (router) modülünü tanımlar. İşte bu kodun açıklamaları:

// express modülünden Router sınıfını içe aktarır ve yeni bir router oluşturur
import express from "express";
const router = express.Router();

// 'Order' adlı bir kontrolör modülünü içe aktarır
import Order from "../controllers/order";

// '/' yolu üzerinde POST isteği işleyen bir rota ekler ve bu rota 'Order.Create' işlevini kullanır
router.post("/", Order.Create);

// '/' yolu üzerinde GET isteği işleyen bir rota ekler ve bu rota 'Order.List' işlevini kullanır
router.get("/", Order.List);

// '/my-orders' yolu üzerinde GET isteği işleyen bir rota ekler ve bu rota 'Order.GetMyOrders' işlevini kullanır
router.get("/my-orders", Order.GetMyOrders);

// Rota modülünü dışa aktarır
export default router;

// Bu kod, bir Express rota (router) oluşturur ve bu rota, belirli HTTP yöntemlerine (POST ve GET) sahip farklı yolları tanımlar. Her yol, ilgili işlevi çağırır:

// '/': POST isteği alır ve 'Order.Create' işlevini çağırır. Bu rota, yeni bir sipariş oluşturmayı işleyebilir.
// '/': GET isteği alır ve 'Order.List' işlevini çağırır. Bu rota, mevcut siparişleri listelemeyi işleyebilir.
// '/my-orders': GET isteği alır ve 'Order.GetMyOrders' işlevini çağırır. Bu rota, kullanıcının kendi siparişlerini listelemeyi işleyebilir.
// Bu kod, Express uygulamanızda sipariş işlemlerini işlemek için kullanılan bir rota modülünü tanımlar.
