import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "أحمد محمد",
    restaurant: "مطعم الأصالة",
    content: "نظام رائع ساعدنا في تحسين خدمة العملاء وزيادة المبيعات بنسبة 30%. العملاء يحبون سهولة الطلب عبر الهاتف.",
    rating: 5,
  },
  {
    name: "فاطمة العلي",
    restaurant: "مقهى الورد",
    content: "التحول الرقمي كان أسهل مما توقعت. الفريق محترف والدعم الفني ممتاز. أنصح به بشدة.",
    rating: 5,
  },
  {
    name: "خالد السعيد",
    restaurant: "مطعم البحر",
    content: "وفرنا الكثير من التكاليف والوقت. التقارير التحليلية تساعدنا في اتخاذ قرارات أفضل لتطوير المطعم.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">
            ماذا يقول <span className="text-primary">عملاؤنا</span>؟
          </h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            آراء أصحاب المطاعم الذين اختاروا RestaurantOS لتطوير أعمالهم
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.restaurant}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
