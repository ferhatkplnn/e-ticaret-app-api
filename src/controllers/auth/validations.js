import Joi from "joi";
// Joi paketini içe aktarır, gelen veriyi doğrulamak için kullanılır.

const Schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});
// Bir Joi şeması (Schema) oluşturur.

export default Schema;
// Joi şemasını dışa aktarır ki, başka modüller tarafından kullanılabilsin.

// Bu kod, bir veri doğrulama şeması (schema) oluşturur ve bu şema, belirli veri alanlarının doğrulama kurallarını tanımlar. İşte açıklamaları:

// import Joi from 'joi';: Joi adlı paketi içe aktarır. Bu paket, veri doğrulama ve doğrulama kuralları tanımlamak için kullanılır.

// const Schema = Joi.object({ ... });: Bir Joi şeması oluşturur. Bu şema, bir JavaScript nesnesi içerir ve içinde doğrulama kurallarını tanımlar. Şema içinde iki ana alan bulunur: email ve password.

// email: Joi.string().email().required(): email alanı için doğrulama kurallarını tanımlar. Bu kural, email alanının bir metin (string) olması gerektiğini, geçerli bir e-posta adresi biçimine sahip olması gerektiğini ve zorunlu (required) olduğunu belirtir.

// password: Joi.string().min(3).required(): password alanı için doğrulama kurallarını tanımlar. Bu kural, password alanının bir metin (string) olması gerektiğini, en az 3 karakter uzunluğunda olması gerektiğini ve zorunlu (required) olduğunu belirtir.

// export default Schema;: Schema şemasını dışa aktarır. Bu sayede, başka modüller tarafından bu şema kullanılabilir hale gelir. Bu şema, kullanıcı girişi veya kaydı gibi işlemlerde gelen verinin doğrulaması için kullanılabilir.
