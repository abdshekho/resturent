import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import type { Order } from "@/lib/models/Company"

interface RecentOrdersProps {
  orders: Order[]
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  preparing: "bg-orange-100 text-orange-800",
  ready: "bg-green-100 text-green-800",
  delivered: "bg-gray-100 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
}

const statusLabels = {
  pending: "في الانتظار",
  confirmed: "مؤكد",
  preparing: "قيد التحضير",
  ready: "جاهز",
  delivered: "تم التسليم",
  cancelled: "ملغي",
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>الطلبات الأخيرة</CardTitle>
        <CardDescription>آخر الطلبات المستلمة</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">لا توجد طلبات جديدة</div>
          ) : (
            orders.map((order) => (
              <div key={order._id?.toString()} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div>
                    <h4 className="font-semibold">#{order.orderNumber}</h4>
                    <p className="text-sm text-muted-foreground">{order.customerInfo.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.items.length} عنصر • {order.total} ريال
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge className={statusColors[order.status]}>{statusLabels[order.status]}</Badge>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
