import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, DollarSign, Users, TrendingUp } from "lucide-react"

interface DashboardStatsProps {
  stats: {
    todayOrders: number
    todayRevenue: number
    totalCustomers: number
    popularItem: string
  }
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const cards = [
    {
      title: "طلبات اليوم",
      value: stats.todayOrders.toString(),
      icon: ShoppingCart,
      description: "طلب جديد",
    },
    {
      title: "إيرادات اليوم",
      value: `${stats.todayRevenue.toLocaleString()} ريال`,
      icon: DollarSign,
      description: "مقارنة بالأمس",
    },
    {
      title: "إجمالي العملاء",
      value: stats.totalCustomers.toString(),
      icon: Users,
      description: "عميل مسجل",
    },
    {
      title: "الطبق الأكثر طلباً",
      value: stats.popularItem,
      icon: TrendingUp,
      description: "هذا الأسبوع",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
