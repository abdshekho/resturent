import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

const benefits = [
  "إعداد مجاني في أقل من 10 دقائق",
  "دعم فني على مدار الساعة",
  "تجربة مجانية لمدة 30 يوم",
  "بدون رسوم إعداد أو التزامات طويلة المدى",
]

export function CTASection() {
  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-6">جاهز لتحويل مطعمك؟</h2>
        <p className="text-lg text-primary-foreground/80 text-pretty mb-8 max-w-2xl mx-auto">
          انضم إلى مئات المطاعم التي تستخدم RestaurantOS لتحسين تجربة عملائها وزيادة أرباحها
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto mb-12">
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 text-right">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="text-primary-foreground/90">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <Link href="/super-admin">
              <Button
                size="lg"
                variant="secondary"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                ابدأ التجربة المجانية
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
            </Link>
            <p className="text-sm text-primary-foreground/60">لا حاجة لبطاقة ائتمان • إلغاء في أي وقت</p>
          </div>
        </div>
      </div>
    </section>
  )
}
