"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
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

// Zod Schema
const restaurantSchema = z.object({
  name: z.string().min(1, "اسم المطعم مطلوب"),
  description: z.string().min(1, "وصف المطعم مطلوب"),
  contact: z.object({
    phone: z.string().min(1, "رقم الهاتف مطلوب"),
    email: z.string().email("البريد الإلكتروني غير صحيح"),
    address: z.object({
      street: z.string().min(1, "الشارع مطلوب"),
      city: z.string().min(1, "المدينة مطلوبة"),
      state: z.string().min(1, "المنطقة مطلوبة"),
      country: z.string().min(1, "الدولة مطلوبة"),
      zipCode: z.string().min(1, "الرمز البريدي مطلوب")
    })
  }),
  settings: z.object({
    operatingHours: z.record(z.object({
      open: z.string().min(1, "وقت الفتح مطلوب"),
      close: z.string().min(1, "وقت الإغلاق مطلوب"),
      isOpen: z.boolean()
    }))
  })
})

type RestaurantFormData = z.infer<typeof restaurantSchema>

export default function SettingsPage() {
  const { t } = useLanguage()
  const [isLoadingData, setIsLoadingData] = useState(true)

  // React Hook Form
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(restaurantSchema),
    defaultValues: {
      name: "",
      description: "",
      contact: {
        phone: "",
        email: "",
        address: {
          street: "",
          city: "",
          state: "",
          country: "",
          zipCode: ""
        }
      },
      settings: {
        operatingHours: {
          monday: { open: "09:00", close: "23:00", isOpen: true }
        }
      }
    }
  })

  // جلب بيانات المطعم من API
  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await fetch('/api/restaurants/settings')
        if (response.ok) {
          const data = await response.json()
          form.reset(data.restaurant)
        }
      } catch (error) {
        console.error('Error fetching restaurant data:', error)
      } finally {
        setIsLoadingData(false)
      }
    }

    fetchRestaurantData()
  }, [form])

  // إعدادات الإشعارات
  const [notifications, setNotifications] = useState({
    newOrders: true,
    lowStock: true,
    dailyReports: false,
    customerReviews: true
  })

  const onSubmit = async (data: RestaurantFormData) => {
    try {
      const response = await fetch('/api/restaurants/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      if (response.ok) {
        const result = await response.json()
        alert(result.message || 'تم حفظ البيانات بنجاح')
      } else {
        alert('حدث خطأ أثناء حفظ البيانات')
      }
    } catch (error) {
      console.error('Error saving data:', error)
      alert('حدث خطأ أثناء حفظ البيانات')
    }
  }

  return (
    <main className="flex-1 overflow-y-auto p-10 space-y-6">
      <div className="flex items-center gap-2">
        <Settings className="h-6 w-6" />
        <h1 className="text-2xl font-bold">الإعدادات</h1>
      </div>

      <Tabs defaultValue="restaurant" className="space-y-4">
        <TabsList className="">
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
            <CardHeader className="flex flex-col items-center justify-center">
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                معلومات المطعم الأساسية
              </CardTitle>
              <CardDescription>
                قم بتحديث معلومات مطعمك التي ستظهر للعملاء
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoadingData ? (
                <div className="flex justify-center items-center py-8">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
                    <p>جاري تحميل البيانات...</p>
                  </div>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>اسم المطعم</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="contact.phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              رقم الهاتف
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>وصف المطعم</FormLabel>
                          <FormControl>
                            <Textarea {...field} rows={3} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="contact.email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              البريد الإلكتروني
                            </FormLabel>
                            <FormControl>
                              <Input {...field} type="email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="contact.address.city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>المدينة</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="contact.address.street"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              الشارع
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="contact.address.country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>الدولة</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <Label className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        ساعات العمل
                      </Label>
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="settings.operatingHours.monday.open"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>وقت الفتح</FormLabel>
                              <FormControl>
                                <Input {...field} type="time" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="settings.operatingHours.monday.close"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>وقت الإغلاق</FormLabel>
                              <FormControl>
                                <Input {...field} type="time" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline">إلغاء</Button>
                      <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? "جاري الحفظ..." : "حفظ التغييرات"}
                      </Button>
                    </div>
                  </form>
                </Form>
              )}
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
    </main>
  )
}