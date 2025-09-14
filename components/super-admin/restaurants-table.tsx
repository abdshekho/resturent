"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Plus, Eye, Edit, Trash2 } from "lucide-react"
import type { Restaurant } from "@/lib/models/Company"

interface RestaurantsTableProps {
  restaurants: Restaurant[]
  onAddRestaurant: () => void
  onViewRestaurant: (id: string) => void
  onEditRestaurant: (id: string) => void
  onDeleteRestaurant: (id: string) => void
}

export function RestaurantsTable({
  restaurants,
  onAddRestaurant,
  onViewRestaurant,
  onEditRestaurant,
  onDeleteRestaurant,
}: RestaurantsTableProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>المطاعم المسجلة</CardTitle>
          <CardDescription>إدارة جميع المطاعم في النظام</CardDescription>
        </div>
        <Button onClick={onAddRestaurant} className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Plus className="ml-2 h-4 w-4" />
          إضافة مطعم جديد
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {restaurants.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">لا توجد مطاعم مسجلة بعد</div>
          ) : (
            restaurants.map((restaurant) => (
              <div key={restaurant._id?.toString()} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    {restaurant.logo ? (
                      <img
                        src={restaurant.logo || "/placeholder.svg"}
                        alt={restaurant.name}
                        className="w-8 h-8 rounded"
                      />
                    ) : (
                      <span className="text-lg font-bold text-muted-foreground">{restaurant.name.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{restaurant.name}</h3>
                    <p className="text-sm text-muted-foreground">{restaurant.slug}.restaurantos.com</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={restaurant.settings.isActive ? "default" : "secondary"}>
                        {restaurant.settings.isActive ? "نشط" : "غير نشط"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{restaurant.cuisine.join(", ")}</span>
                    </div>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onViewRestaurant(restaurant._id?.toString() || "")}>
                      <Eye className="ml-2 h-4 w-4" />
                      عرض
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEditRestaurant(restaurant._id?.toString() || "")}>
                      <Edit className="ml-2 h-4 w-4" />
                      تعديل
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDeleteRestaurant(restaurant._id?.toString() || "")}
                      className="text-destructive"
                    >
                      <Trash2 className="ml-2 h-4 w-4" />
                      حذف
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
