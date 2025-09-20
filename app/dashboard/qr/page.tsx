"use client"

import { useState, useEffect } from "react"
import QRCode from "qrcode"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { QrCode, Download, Copy, Share2 } from "lucide-react"
import { toast } from "sonner"

export default function QRPage() {
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const [menuUrl, setMenuUrl] = useState("https://restaurant.com/menu/restaurant-slug")
  const [isGenerating, setIsGenerating] = useState(false)

  const generateQRCode = async () => {
    setIsGenerating(true)
    try {
      const qrDataUrl = await QRCode.toDataURL(menuUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      })
      setQrCodeUrl(qrDataUrl)
    } catch (error) {
      toast.error("فشل في توليد رمز QR")
    }
    setIsGenerating(false)
  }

  const downloadQR = () => {
    if (!qrCodeUrl) return
    
    const link = document.createElement('a')
    link.download = 'restaurant-qr-code.png'
    link.href = qrCodeUrl
    link.click()
    toast.success("تم تحميل رمز QR")
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(menuUrl)
      toast.success("تم نسخ الرابط")
    } catch (error) {
      toast.error("فشل في نسخ الرابط")
    }
  }

  useEffect(() => {
    generateQRCode()
  }, [menuUrl])

  return (
    <main className="flex-1 overflow-y-auto p-8 space-y-6">
      <div className="flex items-center gap-2">
        <QrCode className="h-6 w-6" />
        <h1 className="text-2xl font-bold">رمز QR للقائمة</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* إعدادات الرمز */}
        <Card>
          <CardHeader>
            <CardTitle>إعدادات رمز QR</CardTitle>
            <CardDescription>
              قم بتخصيص رابط القائمة وتوليد رمز QR
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="menu-url">رابط القائمة</Label>
              <Input
                id="menu-url"
                value={menuUrl}
                onChange={(e) => setMenuUrl(e.target.value)}
                placeholder="https://restaurant.com/menu/your-restaurant"
              />
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={generateQRCode} 
                disabled={isGenerating}
                className="flex-1"
              >
                {isGenerating ? "جاري التوليد..." : "توليد رمز QR"}
              </Button>
              <Button 
                variant="outline" 
                onClick={copyToClipboard}
                size="icon"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* عرض الرمز */}
        <Card>
          <CardHeader>
            <CardTitle>رمز QR</CardTitle>
            <CardDescription>
              يمكن للعملاء مسح هذا الرمز للوصول للقائمة
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              {qrCodeUrl ? (
                <div className="p-4 bg-white rounded-lg border">
                  <img 
                    src={qrCodeUrl} 
                    alt="QR Code" 
                    className="w-64 h-64"
                  />
                </div>
              ) : (
                <div className="w-64 h-64 border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center">
                  <QrCode className="h-16 w-16 text-muted-foreground/50" />
                </div>
              )}
            </div>

            {qrCodeUrl && (
              <div className="flex gap-2">
                <Button onClick={downloadQR} className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  تحميل
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  مشاركة
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* معلومات إضافية */}
      <Card>
        <CardHeader>
          <CardTitle>كيفية الاستخدام</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-primary font-bold">1</span>
              </div>
              <h3 className="font-medium">اطبع الرمز</h3>
              <p className="text-sm text-muted-foreground">
                قم بطباعة رمز QR ووضعه على الطاولات
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-primary font-bold">2</span>
              </div>
              <h3 className="font-medium">مسح الرمز</h3>
              <p className="text-sm text-muted-foreground">
                العملاء يمسحون الرمز بكاميرا الهاتف
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-primary font-bold">3</span>
              </div>
              <h3 className="font-medium">عرض القائمة</h3>
              <p className="text-sm text-muted-foreground">
                يتم فتح القائمة مباشرة في المتصفح
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}