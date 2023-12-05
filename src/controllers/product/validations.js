// Bu kod, ürün verilerinin doğrulama şemasını (schema) oluşturur. Bu şema, gelen ürün verilerini doğrulamak için kullanılır. İşte bu kodun açıklamaları:

import Joi from "joi";

// Joi paketini içe aktarır, gelen veriyi doğrulamak için kullanılır.

const ProductSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().min(3),
  price: Joi.string().required(),
  photos: Joi.string(),
});

// Bir Joi şeması (ProductSchema) oluşturur.

export default ProductSchema;

// ProductSchema şemasını dışa aktarır, böylece başka modüller tarafından kullanılabilir hale gelir.

// Bu kod, ürün verilerinin doğrulama şemasını tanımlar. İşte açıklamaları:

// import Joi from 'joi';: Joi adlı paketi içe aktarır. Bu paket, veri doğrulama ve doğrulama kuralları tanımlamak için kullanılır.

// const ProductSchema = Joi.object({ ... });: Bir Joi şeması olan ProductSchema'yı oluşturur. Bu şema, bir JavaScript nesnesi içerir ve içinde ürün verilerini doğrulama kurallarını tanımlar. Şema içinde dört ana alan bulunur: title, description, price ve photos.

// title: Joi.string().required(): title alanı için doğrulama kurallarını tanımlar. Bu kural, title alanının bir metin (string) olması gerektiğini ve zorunlu (required) olduğunu belirtir.

// description: Joi.string().min(3): description alanı için doğrulama kurallarını tanımlar. Bu kural, description alanının bir metin (string) olması gerektiğini ve en az 3 karakter uzunluğunda olabileceğini belirtir.

// price: Joi.string().required(): price alanı için doğrulama kurallarını tanımlar. Bu kural, price alanının bir metin (string) olması gerektiğini ve zorunlu (required) olduğunu belirtir.

// photos: Joi.string(): photos alanı için doğrulama kurallarını tanımlar. Bu kural, photos alanının bir metin (string) olabileceğini belirtir.

// export default ProductSchema;: ProductSchema şemasını dışa aktarır. Bu sayede, başka modüller tarafından bu şema kullanılabilir hale gelir. Bu şema, ürün oluşturulurken veya güncellenirken gelen verilerin doğrulamasını yapmak için kullanılabilir.
