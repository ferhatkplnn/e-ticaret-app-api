// Bu kod, Mongoose kullanarak bir MongoDB koleksiyonu için bir şema (schema) ve bir model oluşturur. Bu kod, kullanıcıları temsil etmek için bir şema ve model oluşturur ve kullanıcıların parolalarını güvenli bir şekilde saklamak için bcrypt kullanır. İşte bu kodun açıklamaları:

// mongoose ve bcrypt modüllerini içe aktarır
import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Mongoose Schema sınıfını kullanarak yeni bir şema oluşturur
const Schema = mongoose.Schema;

// "UserSchema" adında bir şema oluşturur
const UserSchema = new Schema({
  // "email" alanı, bir metin (String) türündedir ve zorunludur (required). Aynı zamanda benzersiz (unique) ve küçük harflerle (lowercase) saklanır.
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  // "password" alanı, bir metin (String) türündedir ve zorunludur (required). toJSON: false, bu alanın kullanıcıya gönderilmediğini belirtir.
  password: {
    type: String,
    required: true,
    toJSON: false,
  },
  // "role" alanı, bir metin (String) türündedir, varsayılan olarak "user" olarak ayarlanır ve "user" veya "admin" değerlerini alabilir.
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
});

// "UserSchema" üzerine bir "pre" orta yazılım ekler. Kullanıcı kaydedilmeden önce parolanın hashlenmesini yapar.
UserSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(this.password, salt);
      this.password = hashed;
    }

    next();
  } catch (error) {
    next(error);
  }
});

// "isValidPass" adlı bir özel yöntem ekler. Kullanıcının girdiği parolanın doğru olup olmadığını kontrol etmek için kullanılır.
UserSchema.methods.isValidPass = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};

// "User" adında bir model oluşturur ve bu model, "UserSchema" şemasını kullanır
const User = mongoose.model("user", UserSchema);

// Modeli dışa aktarır
export default User;

// Bu kod, bir MongoDB koleksiyonu için "User" adında bir Mongoose modeli oluşturur ve bu model, "UserSchema" şemasını kullanarak kullanıcıları temsil eder. Parola hashlemesi ve doğrulama işlemleri gibi güvenlik önlemleri bu modelde uygulanır.
