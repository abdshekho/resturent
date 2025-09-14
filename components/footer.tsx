import Link from "next/link"
import { QrCode, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <QrCode className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">RestaurantOS</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              نظام شامل لإدارة المطاعم وتحويلها إلى تجربة رقمية متكاملة
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@restaurantos.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+966 50 123 4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>الرياض، المملكة العربية السعودية</span>
              </div>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">المنتج</h3>
            <div className="space-y-2">
              <Link
                href="#features"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                الميزات
              </Link>
              <Link
                href="#pricing"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                الأسعار
              </Link>
              <Link
                href="/demo"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                العرض التوضيحي
              </Link>
              <Link
                href="/integrations"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                التكاملات
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">الدعم</h3>
            <div className="space-y-2">
              <Link
                href="/help"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                مركز المساعدة
              </Link>
              <Link
                href="/contact"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                اتصل بنا
              </Link>
              <Link
                href="/training"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                التدريب
              </Link>
              <Link
                href="/api-docs"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                وثائق API
              </Link>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">الشركة</h3>
            <div className="space-y-2">
              <Link
                href="/about"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                من نحن
              </Link>
              <Link
                href="/careers"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                الوظائف
              </Link>
              <Link
                href="/blog"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                المدونة
              </Link>
              <Link
                href="/press"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                الصحافة
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2024 RestaurantOS. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              سياسة الخصوصية
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              شروط الاستخدام
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
