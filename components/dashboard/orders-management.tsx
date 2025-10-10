"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, User, Phone, MapPin, Package, CheckCircle, XCircle, CookingPot, Check, CheckCheck, PackageCheck, Ban, Logs } from "lucide-react"
import type { IOrder } from "@/lib/models/mongoose"

interface OrdersManagementProps {
  orders: IOrder[]
  onUpdateOrderStatus: (orderId: string, status: string) => void
  setLoadingStatus: (loading: boolean) => void
  loadingStatus: boolean

}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  preparing: "bg-orange-100 text-orange-800",
  ready: "bg-green-100 text-green-800",
  delivered: "dark:bg-gray-100 dark:text-gray-800 bg-gray-800 text-gray-100",
  cancelled: "bg-red-100 text-red-800"
}

const statusLabels = {
  pending: "في الانتظار",
  confirmed: "مؤكد",
  preparing: "قيد التحضير",
  ready: "جاهز",
  delivered: "تم التسليم",
  cancelled: "ملغي"
}

export function OrdersManagement({ orders, onUpdateOrderStatus, setLoadingStatus, loadingStatus }: OrdersManagementProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  const filteredOrders = selectedStatus === "all"
    ? orders
    : orders.filter(order => order.status === selectedStatus)

  const getOrdersByStatus = (status: string) =>
    orders.filter(order => order.status === status)

  const formatPrice = (price: number) => `${price.toFixed()} SP`

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleString('ar-SY', {
      year: 'numeric',
      // month: 'short',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      {/* إحصائيات سريعة */ }
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الطلبات</p>
                <p className="text-2xl font-bold">{ orders.length }</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">في الانتظار</p>
                <p className="text-2xl font-bold text-yellow-600">
                  { getOrdersByStatus('pending').length }
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">قيد التحضير</p>
                <p className="text-2xl font-bold text-orange-600">
                  { getOrdersByStatus('preparing').length }
                </p>
              </div>
              <CookingPot className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">مكتملة</p>
                <p className="text-2xl font-bold text-green-600">
                  { getOrdersByStatus('delivered').length }
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* تبويبات الطلبات */ }
      <Tabs value={ selectedStatus } onValueChange={ setSelectedStatus }>
        <TabsList className="">
          <TabsTrigger value="all">
            <Badge>
              { orders.length }
            </Badge>
            الكل
            <Logs />
          </TabsTrigger>
          <TabsTrigger value="pending">
            <Badge className="bg-yellow-500">
              { getOrdersByStatus('pending').length }
            </Badge>
            في الانتظار
            <Clock className="text-yellow-500" />
          </TabsTrigger>
          <TabsTrigger value="confirmed">
            <Badge>
              { getOrdersByStatus('confirmed').length }
            </Badge>
            مؤكد
            <Check />
          </TabsTrigger>
          <TabsTrigger value="preparing">
            <Badge className="bg-orange-500">
              { getOrdersByStatus('preparing').length }
            </Badge>
            قيد التحضير
            <CookingPot className="text-orange-500" />
          </TabsTrigger>
          <TabsTrigger value="ready">
            <Badge className="bg-green-500">
              { getOrdersByStatus('ready').length }
            </Badge>
            جاهز
            <PackageCheck className="text-green-500"/>
          </TabsTrigger>
          <TabsTrigger value="delivered">
            <Badge className="bg-blue-500">
              { getOrdersByStatus('delivered').length }
            </Badge>
            مكتمل
            <CheckCheck className="text-blue-500" />
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            <Badge className="bg-red-500">
              { getOrdersByStatus('cancelled').length }
            </Badge>
            ملغي
            <Ban className="text-red-500" />
          </TabsTrigger>
        </TabsList>

        <TabsContent value={ selectedStatus } className="mt-6">
          <div className="grid gap-4">
            { filteredOrders.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">لا توجد طلبات</p>
                </CardContent>
              </Card>
            ) : (
              filteredOrders.map((order) => (
                <Card key={ order._id?.toString() } className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-wrap">
                        <CardTitle className="text-lg">
                          طلب #{ order.orderNumber }
                        </CardTitle>
                        <Badge className={ statusColors[order.status] }>
                          { statusLabels[order.status] }
                        </Badge>
                        <Badge variant="outline">
                          { order.orderType === 'dine-in' ? 'داخل المطعم' :
                            order.orderType === 'takeaway' ? 'استلام' : 'توصيل' }
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        { formatDate(order.createdAt) }
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* معلومات العميل */ }
                    <div className="flex items-center gap-6 p-4 bg-muted/50 rounded-lg flex-wrap">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{ order.customerInfo.name }</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{ order.customerInfo.phone }</span>
                      </div>
                      { order.customerInfo.tableNumber && (
                        <div className="flex items-center gap-2">
                          {/* <MapPin className="h-4 w-4 text-muted-foreground" /> */}
                          <svg fill="#000000" height="100px" width="100px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 345.403 345.403"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M342.744,120.702l-55.566-37.236c-0.988-0.662-2.151-1.016-3.34-1.016H61.566c-1.189,0-2.352,0.354-3.34,1.016 L2.66,120.702C0.998,121.816,0,123.686,0,125.687v29.687c0,3.313,2.686,6,6,6h35.818v95.58c0,3.313,2.686,6,6,6s6-2.687,6-6 v-30.924l24.241-29.945v10.079c0,3.313,2.687,6,6,6s6-2.687,6-6v-44.416c0-0.126-0.011-0.249-0.019-0.374h16.909v12.523 c0,3.313,2.687,6,6,6h119.506c3.313,0,6-2.687,6-6v-12.523h16.909c-0.008,0.124-0.019,0.247-0.019,0.374v44.416 c0,3.313,2.687,6,6,6s6-2.687,6-6v-10.079l24.241,29.945v30.924c0,3.313,2.686,6,6,6s6-2.687,6-6v-95.58h35.818 c3.314,0,6-2.687,6-6v-29.687C345.403,123.686,344.406,121.816,342.744,120.702z M63.391,94.45h218.621l37.66,25.236H25.731 L63.391,94.45z M78.059,161.747v15.264l-24.241,29.945v-45.583h24.26C78.07,161.498,78.059,161.621,78.059,161.747z M226.455,167.896H118.949v-6.523h107.506V167.896z M291.585,206.956l-24.241-29.945v-15.264c0-0.126-0.011-0.249-0.019-0.374 h24.26V206.956z M12,149.374v-17.687h321.403v17.687H12z"></path> </g> </g></svg>
                          <span>طاولة { order.customerInfo.tableNumber }</span>
                        </div>
                      ) }
                    </div>

                    {/* عناصر الطلب */ }
                    <div className="space-y-2">
                      <h4 className="font-medium">عناصر الطلب:</h4>
                      <div className="space-y-2">
                        { order.items.map((item, index) => (
                          <div key={ index } className="flex justify-between items-center p-3 border rounded-lg">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{ item.name }</span>
                                <Badge variant="secondary">x{ item.quantity }</Badge>
                              </div>
                              { item.selectedOptions && item.selectedOptions.length > 0 && (
                                <div className="text-sm text-muted-foreground mt-1">
                                  { item.selectedOptions.map((option, optIndex) => (
                                    <span key={ optIndex } className="mr-2">
                                      { option.name }: { option.choice }
                                    </span>
                                  )) }
                                </div>
                              ) }
                              { item.specialInstructions && (
                                <div className="text-sm text-muted-foreground mt-1">
                                  ملاحظات: { item.specialInstructions }
                                </div>
                              ) }
                            </div>
                            <div className="text-left">
                              <div className="font-medium">
                                { formatPrice(item.price * item.quantity) }
                              </div>
                            </div>
                          </div>
                        )) }
                      </div>
                    </div>

                    {/* ملاحظات الطلب */ }
                    { order.notes && (
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-1">ملاحظات:</h4>
                        <p className="text-blue-800">{ order.notes }</p>
                      </div>
                    ) }

                    {/* المجموع */ }
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span>المجموع الفرعي:</span>
                        <span>{ formatPrice(order.subtotal) }</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span>الضريبة:</span>
                        <span>{ formatPrice(order.tax) }</span>
                      </div>
                      <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
                        <span>المجموع الكلي:</span>
                        <span>{ formatPrice(order.total) }</span>
                      </div>
                    </div>

                    {/* أزرار تحديث الحالة */ }
                    <div className="flex gap-2 pt-4 border-t">
                      <Select
                        disabled={ loadingStatus }
                        value={ order.status }
                        onValueChange={ (value) => onUpdateOrderStatus(order._id?.toString() || '', value) }
                      >
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">في الانتظار</SelectItem>
                          <SelectItem value="confirmed">مؤكد</SelectItem>
                          <SelectItem value="preparing">قيد التحضير</SelectItem>
                          <SelectItem value="ready">جاهز</SelectItem>
                          <SelectItem value="delivered">تم التسليم</SelectItem>
                          <SelectItem value="cancelled">ملغي</SelectItem>
                        </SelectContent>
                      </Select>

                      { order.status === 'pending' && (
                        <Button
                          onClick={ () => onUpdateOrderStatus(order._id?.toString() || '', 'confirmed') }
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          disabled={ loadingStatus }
                        >
                          تأكيد الطلب
                        </Button>
                      ) }

                      { order.status === 'confirmed' && (
                        <Button
                          onClick={ () => onUpdateOrderStatus(order._id?.toString() || '', 'preparing') }
                          disabled={ loadingStatus }
                          className="bg-orange-600 hover:bg-orange-700 text-white"
                        >
                          بدء التحضير
                        </Button>
                      ) }

                      { order.status === 'preparing' && (
                        <Button
                          onClick={ () => onUpdateOrderStatus(order._id?.toString() || '', 'ready') }
                          disabled={ loadingStatus }
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          جاهز للاستلام
                        </Button>
                      ) }

                      { order.status === 'ready' && (
                        <Button
                          onClick={ () => onUpdateOrderStatus(order._id?.toString() || '', 'delivered') }
                          disabled={ loadingStatus }
                          className="bg-gray-600 hover:bg-gray-700 text-white"
                        >
                          تم التسليم
                        </Button>
                      ) }
                    </div>
                  </CardContent>
                </Card>
              ))
            ) }
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}