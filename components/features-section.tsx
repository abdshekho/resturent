import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { QrCode, Smartphone, BarChart3, Clock, Shield, Zap } from "lucide-react"

const features = [
  {
    icon: QrCode,
    title: "قوائم رقمية بـ QR",
    description: "قوائم تفاعلية يمكن الوصول إليها بمسح رمز QR بسيط، بدون تطبيقات إضافية",
  },
  {
    icon: Smartphone,
    title: "طلبات مباشرة",
    description: "يمكن للعملاء تصفح القائمة وتقديم الطلبات مباشرة من هواتفهم",
  },
  {
    icon: BarChart3,
    title: "تحليلات متقدمة",
    description: "تقارير مفصلة عن المبيعات والأطباق الأكثر طلباً وسلوك العملاء",
  },
  {
    icon: Clock,
    title: "توفير الوقت",
    description: "تقليل وقت انتظار العملاء وتسريع عملية أخذ الطلبات",
  },
  {
    icon: Shield,
    title: "آمن وموثوق",
    description: "حماية عالية للبيانات مع نسخ احتياطية تلقائية",
  },
  {
    icon: Zap,
    title: "سهولة الاستخدام",
    description: "واجهة بسيطة وسهلة للعملاء والموظفين على حد سواء",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">
            لماذا تختار <span className="text-primary">RestaurantOS</span>؟
          </h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            نوفر لك جميع الأدوات التي تحتاجها لتحويل مطعمك إلى تجربة رقمية متكاملة
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
