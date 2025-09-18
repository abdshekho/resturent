"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/language-provider"
import { 
  Settings, 
  Store, 
  Bell, 
  Shield, 
  CreditCard, 
  Users, 
  Clock,
  MapPin,
  Phone,
  Mail,
  Globe
} from "lucide-react"

export default function SettingsPage() {
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)

  // بيانات المطعم الافتراضية
  const [restaurantData, setRestaurantData] = useState({
    name: "مطعم الأصالة",
    description: "مطعم يقدم أشهى الأطباق العربية الأصيلة",
    phone: "+966501234567",
    email: "info@restaurant.com",
    address: "الرياض، المملكة العربية السعودية",
    website: "www.restaurant.com",
    workingHours: {
      open: "09:00",
      close: "23:00"
    }
  })

  // إعدادات الإشعارات
  const [notifications, setNotifications] = useState({
    newOrders: true,
    lowStock: true,
    dailyReports: false,
    customerReviews: true
  })

  const handleSave = async () => {
    setIsLoading(true)
    // محاكاة حفظ البيانات
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  return (
    <main className="flex-1 overflow-y-auto p-10">
      <div className="flex items-center gap-2">
        <Settings className="h-6 w-6" />
        <h1 className="text-2xl font-bold">الإعدادات</h1>
      </div>

      <Tabs defaultValue="restaurant" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="restaurant" className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            معلومات المطعم
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            الإشعارات
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            الأمان
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            الفواتير
          </TabsTrigger>
        </TabsList>

        {/* معلومات المطعم */}
        <TabsContent value="restaurant" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                معلومات المطعم الأساسية
              </CardTitle>
              <CardDescription>
                قم بتحديث معلومات مطعمك التي ستظهر للعملاء
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">اسم المطعم</Label>
                  <Input
                    id="name"
                    value={restaurantData.name}
                    onChange={(e) => setRestaurantData({...restaurantData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    رقم الهاتف
                  </Label>
                  <Input
                    id="phone"
                    value={restaurantData.phone}
                    onChange={(e) => setRestaurantData({...restaurantData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">وصف المطعم</Label>
                <Textarea
                  id="description"
                  value={restaurantData.description}
                  onChange={(e) => setRestaurantData({...restaurantData, description: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    البريد الإلكتروني
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={restaurantData.email}
                    onChange={(e) => setRestaurantData({...restaurantData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    الموقع الإلكتروني
                  </Label>
                  <Input
                    id="website"
                    value={restaurantData.website}
                    onChange={(e) => setRestaurantData({...restaurantData, website: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  العنوان
                </Label>
                <Textarea
                  id="address"
                  value={restaurantData.address}
                  onChange={(e) => setRestaurantData({...restaurantData, address: e.target.value})}
                  rows={2}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <Label className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  ساعات العمل
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="open-time">وقت الفتح</Label>
                    <Input
                      id="open-time"
                      type="time"
                      value={restaurantData.workingHours.open}
                      onChange={(e) => setRestaurantData({
                        ...restaurantData,
                        workingHours: {...restaurantData.workingHours, open: e.target.value}
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="close-time">وقت الإغلاق</Label>
                    <Input
                      id="close-time"
                      type="time"
                      value={restaurantData.workingHours.close}
                      onChange={(e) => setRestaurantData({
                        ...restaurantData,
                        workingHours: {...restaurantData.workingHours, close: e.target.value}
                      })}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* الإشعارات */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                إعدادات الإشعارات
              </CardTitle>
              <CardDescription>
                اختر الإشعارات التي تريد استلامها
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>الطلبات الجديدة</Label>
                  <p className="text-sm text-muted-foreground">
                    احصل على إشعار عند وصول طلب جديد
                  </p>
                </div>
                <Switch
                  checked={notifications.newOrders}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, newOrders: checked})
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>نفاد المخزون</Label>
                  <p className="text-sm text-muted-foreground">
                    تنبيه عند انخفاض كمية الأصناف
                  </p>
                </div>
                <Switch
                  checked={notifications.lowStock}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, lowStock: checked})
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>التقارير اليومية</Label>
                  <p className="text-sm text-muted-foreground">
                    احصل على تقرير يومي بالمبيعات
                  </p>
                </div>
                <Switch
                  checked={notifications.dailyReports}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, dailyReports: checked})
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>تقييمات العملاء</Label>
                  <p className="text-sm text-muted-foreground">
                    إشعار عند وصول تقييم جديد
                  </p>
                </div>
                <Switch
                  checked={notifications.customerReviews}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, customerReviews: checked})
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* الأمان */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                إعدادات الأمان
              </CardTitle>
              <CardDescription>
                إدارة كلمة المرور وإعدادات الأمان
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">كلمة المرور الحالية</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">كلمة المرور الجديدة</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">تأكيد كلمة المرور</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button variant="outline">تغيير كلمة المرور</Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">الجلسات النشطة</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">المتصفح الحالي</p>
                      <p className="text-sm text-muted-foreground">Chrome على Windows</p>
                    </div>
                    <Badge variant="secondary">نشط الآن</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* الفواتير */}
        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                معلومات الفواتير
              </CardTitle>
              <CardDescription>
                إدارة الاشتراك ومعلومات الدفع
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">الخطة الحالية</h4>
                  <Badge>أساسية</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  خطة أساسية تتضمن جميع الميزات الأساسية
                </p>
                <Button variant="outline">ترقية الخطة</Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">طرق الدفع</h4>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5" />
                      <div>
                        <p className="font-medium">**** **** **** 1234</p>
                        <p className="text-sm text-muted-foreground">انتهاء الصلاحية 12/25</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">تعديل</Button>
                  </div>
                </div>
                <Button variant="outline">إضافة طريقة دفع</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* أزرار الحفظ */}
      <div className="flex justify-end gap-2">
        <Button variant="outline">إلغاء</Button>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
        </Button>
      </div>
    </main>
  )
}