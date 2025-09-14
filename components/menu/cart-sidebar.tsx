"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Plus, Minus, X, User, Phone, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import type { MenuItem } from "@/lib/models/Company"

interface CartItem {
  menuItem: MenuItem
  quantity: number
}

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  onUpdateQuantity: (menuItemId: string, quantity: number) => void
  onRemoveItem: (menuItemId: string) => void
  onPlaceOrder: (orderData: OrderData) => void
}

interface OrderData {
  customerInfo: {
    name: string
    phone: string
    tableNumber?: string
  }
  orderType: "dine-in" | "takeaway"
  notes?: string
}

export function CartSidebar({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
}: CartSidebarProps) {
  const [orderData, setOrderData] = useState<OrderData>({
    customerInfo: {
      name: "",
      phone: "",
      tableNumber: "",
    },
    orderType: "dine-in",
    notes: "",
  })

  const subtotal = cartItems.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0)
  const tax = subtotal * 0.15 // 15% VAT
  const total = subtotal + tax

  const handlePlaceOrder = () => {
    if (cartItems.length === 0 || !orderData.customerInfo.name || !orderData.customerInfo.phone) {
      return
    }
    onPlaceOrder(orderData)
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-md bg-background border-l shadow-lg z-50 transform transition-transform duration-300 overflow-y-auto",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">سلة الطلبات</h2>
              {cartItems.length > 0 && <Badge variant="secondary">{cartItems.length}</Badge>}
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">سلة الطلبات فارغة</p>
              <p className="text-sm text-muted-foreground">أضف بعض الأطباق لتبدأ طلبك</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Cart Items */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.menuItem._id?.toString()}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold">{item.menuItem.name}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveItem(item.menuItem._id?.toString() || "")}
                          className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              onUpdateQuantity(item.menuItem._id?.toString() || "", Math.max(0, item.quantity - 1))
                            }
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="font-semibold w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onUpdateQuantity(item.menuItem._id?.toString() || "", item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <span className="font-bold text-primary">
                          {(item.menuItem.price * item.quantity).toFixed(2)} ريال
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">ملخص الطلب</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>المجموع الفرعي</span>
                    <span>{subtotal.toFixed(2)} ريال</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ضريبة القيمة المضافة (15%)</span>
                    <span>{tax.toFixed(2)} ريال</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>الإجمالي</span>
                    <span className="text-primary">{total.toFixed(2)} ريال</span>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">معلومات العميل</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">الاسم</Label>
                    <div className="relative">
                      <User className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        value={orderData.customerInfo.name}
                        onChange={(e) =>
                          setOrderData((prev) => ({
                            ...prev,
                            customerInfo: { ...prev.customerInfo, name: e.target.value },
                          }))
                        }
                        className="pr-10"
                        placeholder="أدخل اسمك"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <div className="relative">
                      <Phone className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        value={orderData.customerInfo.phone}
                        onChange={(e) =>
                          setOrderData((prev) => ({
                            ...prev,
                            customerInfo: { ...prev.customerInfo, phone: e.target.value },
                          }))
                        }
                        className="pr-10"
                        placeholder="+966 5X XXX XXXX"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="orderType">نوع الطلب</Label>
                    <Select
                      value={orderData.orderType}
                      onValueChange={(value: "dine-in" | "takeaway") =>
                        setOrderData((prev) => ({ ...prev, orderType: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dine-in">تناول في المطعم</SelectItem>
                        <SelectItem value="takeaway">استلام من المطعم</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {orderData.orderType === "dine-in" && (
                    <div className="space-y-2">
                      <Label htmlFor="tableNumber">رقم الطاولة (اختياري)</Label>
                      <div className="relative">
                        <MapPin className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="tableNumber"
                          value={orderData.customerInfo.tableNumber}
                          onChange={(e) =>
                            setOrderData((prev) => ({
                              ...prev,
                              customerInfo: { ...prev.customerInfo, tableNumber: e.target.value },
                            }))
                          }
                          className="pr-10"
                          placeholder="رقم الطاولة"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="notes">ملاحظات إضافية (اختياري)</Label>
                    <Textarea
                      id="notes"
                      value={orderData.notes}
                      onChange={(e) => setOrderData((prev) => ({ ...prev, notes: e.target.value }))}
                      placeholder="أي طلبات خاصة أو ملاحظات"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Place Order Button */}
              <Button
                onClick={handlePlaceOrder}
                disabled={cartItems.length === 0 || !orderData.customerInfo.name || !orderData.customerInfo.phone}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                size="lg"
              >
                تأكيد الطلب ({total.toFixed(2)} ريال)
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
