// import express from 'express';
// const router = express.Router();

// import auth from '../controllers/auth';
// import { verifyAccessToken } from '../helpers/jwt';

// router.post('/register', auth.Register);
// router.post('/login', auth.Login);
// router.post('/refresh_token', auth.RefreshToken);
// router.post('/logout', auth.Logout);
// router.get('/me', verifyAccessToken, auth.Me);

// export default router;

// Bu kod, Express uygulamasında belirli bir işlevselliği sağlamak için kullanılan bir rota (router) modülünü tanımlar. İşte bu kodun açıklamaları:

// express modülünden Router sınıfını içe aktarır ve yeni bir router oluşturur
import express from "express";
const router = express.Router();

// 'auth' adlı bir kontrolör modülünü içe aktarır
import auth from "../controllers/auth";

// helpers kısmında bulunan verifyAccessToken işlevini içe aktarır
import { verifyAccessToken } from "../helpers/jwt";

// '/register' yolu üzerinde POST isteği işleyen bir rota ekler ve bu rota 'auth.Register' işlevini kullanır
router.post("/register", auth.Register);

// '/login' yolu üzerinde POST isteği işleyen bir rota ekler ve bu rota 'auth.Login' işlevini kullanır
router.post("/login", auth.Login);

// '/refresh_token' yolu üzerinde POST isteği işleyen bir rota ekler ve bu rota 'auth.RefreshToken' işlevini kullanır
router.post("/refresh_token", auth.RefreshToken);

// '/logout' yolu üzerinde POST isteği işleyen bir rota ekler ve bu rota 'auth.Logout' işlevini kullanır
router.post("/logout", auth.Logout);

// '/me' yolu üzerinde GET isteği işleyen bir rota ekler ve bu rota önce 'verifyAccessToken' işlevini kullanır ve ardından 'auth.Me' işlevini kullanır
router.get("/me", verifyAccessToken, auth.Me);

// Rota modülünü dışa aktarır
export default router;

// Bu kod, bir Express rota (router) oluşturur ve bu rota, belirli HTTP yöntemlerine (POST ve GET) sahip farklı yolları tanımlar. Her yol, ilgili işlevi çağırır:

// '/register': POST isteği alır ve 'auth.Register' işlevini çağırır. Bu rota, kullanıcı kaydını işleyebilir.
// '/login': POST isteği alır ve 'auth.Login' işlevini çağırır. Bu rota, kullanıcı girişini işleyebilir.
// '/refresh_token': POST isteği alır ve 'auth.RefreshToken' işlevini çağırır. Bu rota, erişim belgesini yenilemeyi işleyebilir.
// '/logout': POST isteği alır ve 'auth.Logout' işlevini çağırır. Bu rota, kullanıcı oturum kapatmayı işleyebilir.
// '/me': GET isteği alır ve önce 'verifyAccessToken' işlevini çağırır, ardından 'auth.Me' işlevini çağırır. Bu rota, kullanıcının oturum bilgilerini döndürebilir.
// Bu kod, Express uygulamanızın farklı işlevselliği gruplandırmasına ve yönlendirmesine yardımcı olan bir rota modülünü tanımlar.
