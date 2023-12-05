// Bu kod, bir kullanıcı sistemi için kullanılan işlevleri içerir. Kullanıcıların kaydolması, giriş yapması, yenileme belgesi (refresh token) oluşturması, çıkış yapması ve kendi profil bilgilerini görüntülemesi gibi işlemleri yönetir. İşte bu kodun yorum satırlarıyla açıklamaları:

import Boom from "boom";
import User from "../../models/user";

// helpers
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../../helpers/jwt";

// validations
import ValidationSchema from "./validations";
import redis from "../../clients/redis";

// Yeni bir kullanıcının kaydını oluşturan işlev
const Register = async (req, res, next) => {
  const input = req.body;

  // Gelen verinin doğrulamasını yapar
  const { error } = ValidationSchema.validate(input);

  if (error) {
    return next(Boom.badRequest(error.details[0].message));
  }

  try {
    // Veritabanında aynı e-posta adresiyle kayıtlı bir kullanıcının olup olmadığını kontrol eder
    const isExists = await User.findOne({ email: input.email });

    if (isExists) {
      return next(Boom.conflict("This e-mail already in use."));
    }

    // Yeni bir kullanıcı oluşturur, veritabanına kaydeder ve kullanıcı verilerini döndürür
    const user = new User(input);
    const data = await user.save();
    const userData = data.toObject();

    // Duyarlı bilgileri kaldırır (örneğin, parola ve sürüm bilgisi)
    delete userData.password;
    delete userData.__v;

    // Erişim belgesi ve yenileme belgesi oluşturur
    const accessToken = await signAccessToken({
      user_id: user._id,
      role: user.role,
    });
    const refreshToken = await signRefreshToken(user._id);

    // Kullanıcı bilgileri ve belgeleri yanıt olarak döndürür
    res.json({
      user: userData,
      accessToken,
      refreshToken,
    });
  } catch (e) {
    next(e);
  }
};

// Kullanıcının giriş yapmasını sağlayan işlev
const Login = async (req, res, next) => {
  const input = req.body;

  // Gelen verinin doğrulamasını yapar
  const { error } = ValidationSchema.validate(input);

  if (error) {
    return next(Boom.badRequest(error.details[0].message));
  }

  try {
    // Veritabanında e-posta adresiyle eşleşen bir kullanıcı arar
    const user = await User.findOne({ email: input.email });

    if (!user) {
      throw Boom.notFound("The email address was not found.");
    }

    // Girilen parola ile kullanıcının parolasını karşılaştırır
    const isMatched = await user.isValidPass(input.password);
    if (!isMatched) {
      throw Boom.unauthorized("Email or password is not correct.");
    }

    // Erişim belgesi ve yenileme belgesi oluşturur
    const accessToken = await signAccessToken({
      user_id: user._id,
      role: user.role,
    });
    const refreshToken = await signRefreshToken(user._id);

    // Kullanıcı bilgilerini alır ve duyarlı bilgileri kaldırır
    const userData = user.toObject();
    delete userData.password;
    delete userData.__v;

    // Kullanıcı bilgileri ve belgeleri yanıt olarak döndürür
    res.json({ user: userData, accessToken, refreshToken });
  } catch (e) {
    return next(e);
  }
};

// Yenileme belgesi ile yeni bir erişim belgesi oluşturan işlev
const RefreshToken = async (req, res, next) => {
  const { refresh_token } = req.body;

  try {
    if (!refresh_token) {
      throw Boom.badRequest();
    }

    // Yenileme belgesini doğrular ve yeni bir erişim belgesi oluşturur
    const user_id = await verifyRefreshToken(refresh_token);
    const accessToken = await signAccessToken(user_id);
    const refreshToken = await signRefreshToken(user_id);

    // Yeni erişim belgesi ve yenileme belgesini yanıt olarak döndürür
    res.json({ accessToken, refreshToken });
  } catch (e) {
    next(e);
  }
};

// Kullanıcının çıkış yapmasını sağlayan işlev
const Logout = async (req, res, next) => {
  try {
    const { refresh_token } = req.body;
    if (!refresh_token) {
      throw Boom.badRequest();
    }

    // Redis'ten kullanıcının yenileme belgesini siler
    const user_id = await verifyRefreshToken(refresh_token);
    const data = await redis.del(user_id);

    if (!data) {
      throw Boom.badRequest();
    }

    // Başarılı bir çıkış işlemi yanıt olarak döndürülür
    res.json({ message: "success" });
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

// Kullanıcının kendi profil bilgilerini görüntülemesini sağlayan işlev
const Me = async (req, res, next) => {
  const { user_id } = req.payload;

  try {
    // Kullanıcının kimliğine göre veritabanından kullanıcı bilgilerini alır
    const user = await User.findById(user_id).select("-password -__v");

    // Kullanıcı bilgilerini yanıt olarak döndürür
    res.json(user);
  } catch (e) {
    next(e);
  }
};

// İhracat edilen işlevler
export default {
  Register,
  Login,
  RefreshToken,
  Logout,
  Me,
};

// Bu kod, kullanıcı kaydı, girişi, oturum yönetimi ve profil bilgileriyle ilgili işlevleri içerir. Hatalar durumunda uygun HTTP hataları döndürülür ve başarılı işlemlerde kullanıcı bilgileri ve belgeleri yanıt olarak döndürülür.
