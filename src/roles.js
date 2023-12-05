// Bu kod, rol tabanlı yetkilendirme (authorization) işlevselliği eklemek için accesscontrol modülünü kullanır. Aşağıda bu kodun açıklamaları:

// accesscontrol modülünü içe aktarır
import AccessControl from "accesscontrol";

// Yeni bir AccessControl örneği oluşturur
const ac = new AccessControl();

// Roller ve izinler tanımlayan bir fonksiyonu dışa aktarır
exports.roles = (function () {
  // 'user' rolü, 'product' adlı kaynakları okuma iznine sahiptir
  ac.grant("user").readAny("product");

  // 'admin' rolü, 'user' rolünü genişletir ve 'product' adlı kaynakları oluşturma iznine sahiptir
  ac.grant("admin").extend("user").createAny("product");

  return ac;
})();

// Bu kod, accesscontrol modülü kullanarak belirli roller için izinleri tanımlar. İzinler, grant yöntemi kullanılarak verilir:

// 'user' rolüne, 'product' kaynağını okuma yetkisi (readAny) verilir.
// 'admin' rolü, 'user' rolünü genişletir (inherit), yani 'admin' rolü, 'user' rolünün tüm izinlerine sahiptir. Ayrıca, 'admin' rolüne 'product' kaynağını oluşturma izni (createAny) verilir.
// Bu izinler, uygulamanın belirli rollerin belirli kaynaklara erişimini nasıl kontrol edeceğini tanımlar. Örneğin, 'user' rolü yalnızca 'product' kaynaklarını okuyabilirken, 'admin' rolü 'product' kaynaklarını hem okuyabilir hem de oluşturabilir. Bu, kullanıcıları ve yöneticileri ayırt etmek ve her birinin farklı işlevselliğe sahip olmasını sağlar. Bu izinler, kullanıcı kimlik doğrulaması ve yetkilendirme süreçlerini yönetmek için kullanılabilir.
