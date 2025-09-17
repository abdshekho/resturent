"use client"

import { useState, useEffect } from "react"
import { RestaurantsTable } from "@/components/super-admin/restaurants-table"
import { AddRestaurantDialog, type RestaurantFormData } from "@/components/super-admin/add-restaurant-dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Download, Plus } from "lucide-react"
import type { Restaurant } from "@/lib/models/Company"

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [cuisineFilter, setCuisineFilter] = useState("all")

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('/api/super-admin/restaurants')
        if (response.ok) {
          const data = await response.json()
          setRestaurants(data)
          setFilteredRestaurants(data)
        }
      } catch (error) {
        console.error('Error fetching restaurants:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRestaurants()
  }, [])

  useEffect(() => {
    let filtered = restaurants

    if (searchTerm) {
      filtered = filtered.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.slug.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(restaurant =>
        statusFilter === "active" ? restaurant.settings.isActive : !restaurant.settings.isActive
      )
    }

    if (cuisineFilter !== "all") {
      filtered = filtered.filter(restaurant =>
        restaurant.cuisine.includes(cuisineFilter)
      )
    }

    setFilteredRestaurants(filtered)
  }, [restaurants, searchTerm, statusFilter, cuisineFilter])

  const handleAddRestaurant = async (data: RestaurantFormData) => {
    try {
      const response = await fetch('/api/super-admin/restaurants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          slug: data.slug,
          description: data.description,
          cuisine: data.cuisine,
          contact: {
            email: data.email,
            phone: data.phone,
            address: data.address,
          },
          settings: {
            ...data.settings,
            operatingHours: {},
          },
          theme: {
            ...data.theme,
            fontFamily: "Arial",
          },
        }),
      })

      const result = await response.json()

      if (result.success) {
        setRestaurants(prev => [...prev, result.restaurant])
        setIsAddDialogOpen(false)
      }
    } catch (error) {
      console.error('Error adding restaurant:', error)
    }
  }

  const handleViewRestaurant = (id: string) => {
    const restaurant = restaurants.find(r => r._id?.toString() === id)
    if (restaurant) {
      window.open(`/menu/${restaurant.slug}`, '_blank')
    }
  }

  const handleEditRestaurant = (id: string) => {
    console.log("Edit restaurant:", id)
  }

  const handleDeleteRestaurant = async (id: string) => {
    try {
      const response = await fetch(`/api/restaurants/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setRestaurants(prev => prev.filter(r => r._id?.toString() !== id))
      }
    } catch (error) {
      console.error('Error deleting restaurant:', error)
    }
  }

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + "اسم المطعم,الرابط,نوع المطبخ,الحالة,البريد الإلكتروني,الهاتف\n"
      + filteredRestaurants.map(r =>
        `${r.name},${r.slug},${r.cuisine.join(';')},${r.settings.isActive ? 'نشط' : 'غير نشط'},${r.contact.email},${r.contact.phone}`
      ).join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "restaurants.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const uniqueCuisines = Array.from(new Set(restaurants.flatMap(r => r.cuisine)))

  if (loading) {
    return (

      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">جاري تحميل البيانات...</p>
        </div>
      </main>
    )
  }

  return (

    <main className="flex-1 overflow-y-auto">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">إدارة المطاعم</h1>
          <p className="text-muted-foreground">عرض وإدارة جميع المطاعم المسجلة في النظام</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">إجمالي المطاعم</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ restaurants.length }</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">المطاعم النشطة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                { restaurants.filter(r => r.settings.isActive).length }
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">المطاعم غير النشطة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                { restaurants.filter(r => !r.settings.isActive).length }
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">أنواع المطابخ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ uniqueCuisines.length }</div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">البحث والفلترة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="البحث بالاسم أو الرابط..."
                    value={ searchTerm }
                    onChange={ (e) => setSearchTerm(e.target.value) }
                    className="pr-10"
                  />
                </div>
              </div>

              <Select value={ statusFilter } onValueChange={ setStatusFilter }>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="فلترة حسب الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="active">نشط</SelectItem>
                  <SelectItem value="inactive">غير نشط</SelectItem>
                </SelectContent>
              </Select>

              <Select value={ cuisineFilter } onValueChange={ setCuisineFilter }>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="فلترة حسب المطبخ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع المطابخ</SelectItem>
                  { uniqueCuisines.map(cuisine => (
                    <SelectItem key={ cuisine } value={ cuisine }>{ cuisine }</SelectItem>
                  )) }
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Button variant="outline" onClick={ exportData }>
                  <Download className="ml-2 h-4 w-4" />
                  تصدير
                </Button>
                <Button onClick={ () => setIsAddDialogOpen(true) }>
                  <Plus className="ml-2 h-4 w-4" />
                  إضافة مطعم
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            عرض { filteredRestaurants.length } من أصل { restaurants.length } مطعم
          </p>
        </div>

        <RestaurantsTable
          restaurants={ filteredRestaurants }
          onAddRestaurant={ () => setIsAddDialogOpen(true) }
          onViewRestaurant={ handleViewRestaurant }
          onEditRestaurant={ handleEditRestaurant }
          onDeleteRestaurant={ handleDeleteRestaurant }
        />
      </div>
      <AddRestaurantDialog
        open={ isAddDialogOpen }
        onOpenChange={ setIsAddDialogOpen }
        onSubmit={ handleAddRestaurant }
      />
    </main>


  )
}