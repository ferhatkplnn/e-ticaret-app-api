import User from "../../models/user";
import Order from "../../models/order";
import Boom from "boom";
import OrderSchema from "./validations";

// Kullanıcıların yeni bir sipariş oluşturmasını sağlayan işlev
const Create = async (req, res, next) => {
  const input = req.body;
  input.items = input.items ? JSON.parse(input.items) : null;
  const { error } = OrderSchema.validate(input);

  if (error) {
    return next(Boom.badRequest(error.details[0].message));
  }

  const { user_id } = req.payload;

  try {
    // Yeni bir sipariş oluşturur ve veritabanına kaydeder
    const order = new Order({
      user: user_id,
      address: input.address,
      items: input.items,
    });

    const savedData = await order.save();

    // Oluşturulan siparişi yanıt olarak döndürür
    res.json(savedData);
  } catch (e) {
    next(e);
  }
};

// Tüm siparişleri listeleyen işlev
const List = async (req, res, next) => {
  try {
    // Tüm siparişleri veritabanından alır ve ilişkili kullanıcıları ve ürünleri doldurur
    const orders = await Order.find({})
      .populate("user", "-password -__v")
      .populate("items");

    // Siparişleri yanıt olarak döndürür
    res.json(orders);
  } catch (e) {
    next(e);
  }
};

// Kullanıcının kendi siparişlerini görüntülemesini sağlayan işlev
const GetMyOrders = async (req, res, next) => {
  const { user_id } = req.payload;

  try {
    // Kullanıcının siparişlerini veritabanından alır ve satın alınan ürünleri doldurur
    const orders = await Order.findById(user_id).populate("purchases.item");

    // Kullanıcının siparişlerini yanıt olarak döndürür
    res.json(orders);
  } catch (e) {
    next(e);
  }
};

// İhracat edilen işlevler
export default {
  Create,
  List,
  GetMyOrders,
};

// Bu kod, siparişlerin oluşturulması, liste halinde alınması ve kullanıcıların kendi siparişlerini görüntülemesi gibi işlemleri gerçekleştirir. Hatalar durumunda uygun HTTP hataları döndürülür ve başarılı işlemlerde ilgili veriler yanıt olarak döndürülür.
