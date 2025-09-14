import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Store, Users, TrendingUp, DollarSign } from "lucide-react"

interface StatsCardsProps {
  stats: {
    totalRestaurants: number
    totalUsers: number
    totalOrders: number
    totalRevenue: number
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: "إجمالي المطاعم",
      value: stats.totalRestaurants.toString(),
      icon: Store,
      description: "مطعم نشط",
    },
    {
      title: "إجمالي المستخدمين",
      value: stats.totalUsers.toString(),
      icon: Users,
      description: "مستخدم مسجل",
    },
    {
      title: "إجمالي الطلبات",
      value: stats.totalOrders.toLocaleString(),
      icon: TrendingUp,
      description: "طلب هذا الشهر",
    },
    {
      title: "إجمالي الإيرادات",
      value: `${stats.totalRevenue.toLocaleString()} ريال`,
      icon: DollarSign,
      description: "هذا الشهر",
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
