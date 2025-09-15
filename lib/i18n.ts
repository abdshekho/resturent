export const translations = {
  ar: {
    // Navigation
    dashboard: "لوحة التحكم",
    menu: "القائمة",
    categories: "التصنيفات",
    orders: "الطلبات",
    analytics: "التقارير",
    staff: "الموظفين",
    settings: "الإعدادات",
    
    // Common
    add: "إضافة",
    edit: "تعديل",
    delete: "حذف",
    save: "حفظ",
    cancel: "إلغاء",
    loading: "جاري التحميل...",
    
    // Menu Management
    menuManagement: "إدارة القائمة",
    addNewDish: "إضافة طبق جديد",
    dishName: "اسم الطبق",
    price: "السعر (ريال)",
    category: "التصنيف",
    description: "الوصف",
    ingredients: "المكونات",
    available: "متوفر",
    popular: "طبق مميز",
    
    // Theme & Language
    theme: "المظهر",
    language: "اللغة",
    
    // Restaurant
    restaurantDashboard: "لوحة تحكم المطعم",
    welcomeMessage: "مرحباً بك في لوحة تحكم مطعم الأصالة"
  },
  en: {
    // Navigation
    dashboard: "Dashboard",
    menu: "Menu",
    categories: "Categories",
    orders: "Orders",
    analytics: "Analytics",
    staff: "Staff",
    settings: "Settings",
    
    // Common
    add: "Add",
    edit: "Edit",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    loading: "Loading...",
    
    // Menu Management
    menuManagement: "Menu Management",
    addNewDish: "Add New Dish",
    dishName: "Dish Name",
    price: "Price (SAR)",
    category: "Category",
    description: "Description",
    ingredients: "Ingredients",
    available: "Available",
    popular: "Popular Dish",
    
    // Theme & Language
    theme: "Theme",
    language: "Language",
    
    // Restaurant
    restaurantDashboard: "Restaurant Dashboard",
    welcomeMessage: "Welcome to Asala Restaurant Dashboard"
  }
}

export type Language = keyof typeof translations
export type TranslationKey = keyof typeof translations.ar