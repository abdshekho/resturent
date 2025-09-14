import { Button } from "@/components/ui/button"
import { ArrowLeft, QrCode, Smartphone, TrendingUp } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-right">
            <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight mb-6">
              <span className="text-foreground">حوّل تجربة</span>
              <br />
              <span className="text-primary">مطعمك الرقمية</span>
            </h1>
            <p className="text-lg text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto lg:mx-0">
              وداعاً للقوائم الورقية واستقبل عصر القوائم الرقمية مع رموز QR. نظام شامل لإدارة المطاعم يعزز تجربة العملاء
              ويزيد الأرباح.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/super-admin">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  ابدأ مجاناً
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                شاهد العرض التوضيحي
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative mx-auto max-w-md">
              {/* Phone Mockup */}
              <div className="relative bg-card border-8 border-border rounded-3xl p-4 shadow-2xl">
                <div className="bg-primary rounded-2xl p-6 text-primary-foreground">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg">مطعم الأصالة</h3>
                    <QrCode className="h-6 w-6" />
                  </div>

                  <div className="space-y-4">
                    <div className="bg-primary-foreground/10 rounded-lg p-3">
                      <h4 className="font-semibold mb-2">المقبلات</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>حمص بالطحينة</span>
                          <span>15 ريال</span>
                        </div>
                        <div className="flex justify-between">
                          <span>متبل باذنجان</span>
                          <span>12 ريال</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-primary-foreground/10 rounded-lg p-3">
                      <h4 className="font-semibold mb-2">الأطباق الرئيسية</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>كبسة لحم</span>
                          <span>45 ريال</span>
                        </div>
                        <div className="flex justify-between">
                          <span>مندي دجاج</span>
                          <span>35 ريال</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">
                    أضف إلى السلة
                  </Button>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground rounded-full p-3 shadow-lg">
                <Smartphone className="h-6 w-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground rounded-full p-3 shadow-lg">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
