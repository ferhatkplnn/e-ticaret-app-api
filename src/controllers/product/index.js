// Bu kod, ürünlerin oluşturulması, güncellenmesi, silinmesi, belirli bir ürünün alınması ve ürün listesinin alınması gibi işlevleri içerir. İşte bu kodun yorum satırlarıyla açıklamaları:

import Product from "../../models/product";
import Boom from "boom";
import ProductSchema from "./validations";

// Yeni bir ürün oluşturmayı sağlayan işlev
const Create = async (req, res, next) => {
  const input = req.body;
  const { error } = ProductSchema.validate(input);

  if (error) {
    return next(Boom.badRequest(error.details[0].message));
  }

  try {
    input.photos = JSON.parse(input.photos);

    const product = new Product(input);
    const savedData = await product.save();

    res.json(savedData);
  } catch (e) {
    next(e);
  }
};

// Belirli bir ürünün alınmasını sağlayan işlev
const Get = async (req, res, next) => {
  const { product_id } = req.params;

  if (!product_id) {
    return next(Boom.badRequest("Missing parameter (:product_id)"));
  }

  try {
    const product = await Product.findById(product_id);

    res.json(product);
  } catch (e) {
    next(e);
  }
};

// Bir ürünün güncellenmesini sağlayan işlev
const Update = async (req, res, next) => {
  const { product_id } = req.params;

  try {
    const updated = await Product.findByIdAndUpdate(product_id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (e) {
    next(e);
  }
};

// Bir ürünün silinmesini sağlayan işlev
const Delete = async (req, res, next) => {
  const { product_id } = req.params;

  try {
    const deleted = await Product.findByIdAndDelete(product_id);

    if (!deleted) {
      throw Boom.badRequest("Product not found.");
    }

    res.json(deleted);
  } catch (e) {
    next(e);
  }
};

// Ürün listesini almayı sağlayan işlev
const limit = 12;
const GetList = async (req, res, next) => {
  let { page } = req.query;

  if (page < 1) {
    page = 1;
  }

  const skip = (parseInt(page) - 1) * limit;

  try {
    const products = await Product.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json(products);
  } catch (e) {
    next(e);
  }
};

// İhracat edilen işlevler
export default {
  Create,
  Get,
  Update,
  Delete,
  GetList,
};

// Bu kod, ürünlerle ilgili çeşitli işlemleri gerçekleştirir. Hatalar durumunda uygun HTTP hataları döndürülür ve başarılı işlemlerde ilgili veriler yanıt olarak döndürülür.
