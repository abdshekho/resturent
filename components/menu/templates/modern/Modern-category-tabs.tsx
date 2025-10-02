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

export function ModernCategoryTabs({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) {
  const { language } = useLanguage()

  return (
    <div className="sticky top-[69px] z-40 bg-background border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          <div className="flex flex-col justify-between items-center gap-1.5 cursor-pointer group" onClick={ () => onCategoryChange(null) }>
            <img src="/salad.jpg" width={ 150 } height={ 150 } className="rounded-full group-hover:rotate-6 group-hover:opacity-75" />
            <span className={ cn("whitespace-nowrap", activeCategory === null && "text-primary") }>
              { language === 'ar' ? 'الكل' : 'All' }
            </span>
          </div>
          { categories && categories?.length && categories.map((category) => (
            <div key={ category._id?.toString() } className="cursor-pointer flex flex-col justify-center items-center gap-1.5 group" onClick={ () => onCategoryChange(category._id?.toString() || "") }>
              <img src="/salad.jpg" width={ 150 } height={ 150 } className="rounded-full group-hover:rotate-6 group-hover:opacity-75" />
              <span className={ cn("whitespace-nowrap",activeCategory === category._id?.toString() && "text-primary",) }>
                { language === 'ar' ? category.nameAr || category.name : category.name }
              </span>
              </div>
          )) }
        </div>
      </div>
    </div>
  )
}
