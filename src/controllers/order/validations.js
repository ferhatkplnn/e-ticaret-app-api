// Bu kod, bir siparişin doğrulama şemasını (schema) oluşturur. Bu şema, gelen sipariş verilerini doğrulamak için kullanılır. İşte bu kodun açıklamaları:

import Joi from "joi";

// Joi paketini içe aktarır, gelen veriyi doğrulamak için kullanılır.

const OrderSchema = Joi.object({
  address: Joi.string().required(),
  items: Joi.array().items(Joi.string()).required(),
});

// Bir Joi şeması (OrderSchema) oluşturur.

export default OrderSchema;

// OrderSchema şemasını dışa aktarır, böylece başka modüller tarafından kullanılabilir hale gelir.

// Bu kod, sipariş verilerinin doğrulama şemasını tanımlar. İşte açıklamaları:

// import Joi from 'joi';: Joi adlı paketi içe aktarır. Bu paket, veri doğrulama ve doğrulama kuralları tanımlamak için kullanılır.

// const OrderSchema = Joi.object({ ... });: Bir Joi şeması olan OrderSchema'yı oluşturur. Bu şema, bir JavaScript nesnesi içerir ve içinde sipariş verilerini doğrulama kurallarını tanımlar. Şema içinde iki ana alan bulunur: address ve items.

// address: Joi.string().required(): address alanı için doğrulama kurallarını tanımlar. Bu kural, address alanının bir metin (string) olması gerektiğini ve zorunlu (required) olduğunu belirtir.

// items: Joi.array().items(Joi.string()).required(): items alanı için doğrulama kurallarını tanımlar. Bu kural, items alanının bir dizi (array) olması gerektiğini, bu dizinin her bir öğesinin bir metin (string) olması gerektiğini ve zorunlu (required) olduğunu belirtir.

// export default OrderSchema;: OrderSchema şemasını dışa aktarır. Bu sayede, başka modüller tarafından bu şema kullanılabilir hale gelir. Bu şema, sipariş oluşturulurken veya güncellenirken gelen verilerin doğrulamasını yapmak için kullanılabilir.
