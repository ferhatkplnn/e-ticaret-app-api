const Redis = require("ioredis");

// "ioredis" paketini içe aktarır. Bu paket, Redis veritabanıyla etkileşim sağlamak için kullanılır.

const redis = new Redis();

// Redis istemcisini oluşturur. Bu istemci, Redis sunucusu ile iletişim kurar.

export default redis;

// Oluşturulan Redis istemcisini dışa aktarır. Bu sayede, bu istemciyi başka modüller kullanabilir.

// Bu kod, "ioredis" paketini kullanarak Redis veritabanına bir istemci oluşturur ve bu istemciyi dışa aktarır. Oluşturulan istemci, Redis sunucusu ile iletişim kurmak ve Redis verilerine erişmek için kullanılabilir. Bu istemci, projenin farklı bölümlerinde Redis veritabanı işlemleri yapmak için kullanılabilir.
