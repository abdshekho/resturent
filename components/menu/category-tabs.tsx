"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/language-provider"
import type { Category } from "@/lib/models/Company"

interface CategoryTabsProps {
  categories: Category[]
  activeCategory: string | null
  onCategoryChange: (categoryId: string | null) => void
}

export function CategoryTabs({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) {
  const { language } = useLanguage()
  
  return (
    <div className="sticky top-[69px] z-40 bg-background border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          <Button
            variant={activeCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(null)}
            className={cn("whitespace-nowrap", activeCategory === null && "bg-primary text-primary-foreground")}
          >
            {language === 'ar' ? 'الكل' : 'All'}
          </Button>
          {categories && categories?.length && categories.map((category) => (
            <Button
              key={category._id?.toString()}
              variant={activeCategory === category._id?.toString() ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange(category._id?.toString() || "")}
              className={cn(
                "whitespace-nowrap",
                activeCategory === category._id?.toString() && "bg-primary text-primary-foreground",
              )}
            >
              {language === 'ar' ? category.nameAr || category.name : category.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
