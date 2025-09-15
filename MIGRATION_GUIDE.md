# دليل الترحيل من MongoDB Driver إلى Mongoose + Zod

## التغييرات المطلوبة

### 1. تم إضافة المكتبات الجديدة
- `mongoose@^8.8.4` - للتعامل مع MongoDB بطريقة أكثر تنظيماً
- `zod@3.25.67` - للتحقق من صحة البيانات (موجود مسبقاً)

### 2. الملفات الجديدة المضافة
- `lib/mongoose.ts` - اتصال Mongoose
- `lib/schemas/index.ts` - Zod schemas للتحقق من البيانات
- `lib/models/mongoose/index.ts` - Mongoose models
- `lib/database-mongoose.ts` - خدمة قاعدة البيانات الجديدة
- `global.d.ts` - تعريفات TypeScript

### 3. الملفات المحدثة
- `lib/database.ts` - تم تحديثه ليستخدم Mongoose service
- جميع ملفات API في `app/api/` - تم إزالة استخدام `ObjectId` و `db.collection`

### 4. التغييرات الرئيسية

#### قبل (MongoDB Driver):
```typescript
import { ObjectId } from "mongodb"
import { connectToDatabase } from "@/lib/database"

const { db } = await connectToDatabase()
const restaurant = await db.collection("restaurants").findOne({ slug })
```

#### بعد (Mongoose):
```typescript
import { Restaurant } from "@/lib/models/mongoose"
import connectDB from "@/lib/mongoose"

await connectDB()
const restaurant = await Restaurant.findOne({ slug })
```

### 5. التحقق من البيانات باستخدام Zod

```typescript
import { RestaurantSchema } from "@/lib/schemas"

// التحقق من البيانات قبل الحفظ
const validatedData = RestaurantSchema.parse(restaurantData)
```

### 6. الميزات الجديدة
- التحقق التلقائي من صحة البيانات باستخدام Zod
- نماذج بيانات منظمة باستخدام Mongoose
- إدارة أفضل للاتصالات
- Type safety محسن
- رسائل خطأ باللغة العربية في Zod schemas

### 7. كيفية الاستخدام

#### إنشاء مطعم جديد:
```typescript
import { MongooseDatabaseService } from "@/lib/database-mongoose"

const db = MongooseDatabaseService.getInstance()
const restaurant = await db.createRestaurant({
  companyId: "company_id",
  name: "اسم المطعم",
  slug: "restaurant-slug",
  description: "وصف المطعم",
  // ... باقي البيانات
})
```

#### البحث عن مطعم:
```typescript
const restaurant = await db.getRestaurantBySlug("restaurant-slug")
```

### 8. ملاحظات مهمة
- تم الحفاظ على التوافق مع الكود القديم من خلال `LegacyDatabaseService`
- جميع IDs الآن strings بدلاً من ObjectId
- تم إضافة validation تلقائي لجميع البيانات
- تم تحسين أداء الاستعلامات باستخدام Mongoose

### 9. الخطوات التالية
1. تشغيل `npm install` لتثبيت المكتبات الجديدة
2. تشغيل التطبيق والتأكد من عمل جميع الوظائف
3. اختبار جميع APIs
4. إزالة الملفات القديمة غير المستخدمة (اختياري)

### 10. استكشاف الأخطاء
- تأكد من أن `MONGODB_URI` موجود في `.env`
- تأكد من تشغيل MongoDB
- راجع console logs للأخطاء التفصيلية