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
    available: "متوفر",
    popular: "طبق مميز",
    
    // Theme & Language
    theme: "المظهر",
    language: "اللغة",
    
    // Staff Management
    staffManagement: "إدارة الموظفين",
    addNewStaff: "إضافة موظف جديد",
    staffName: "اسم الموظف",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    role: "الدور الوظيفي",
    status: "الحالة",
    active: "نشط",
    inactive: "غير نشط",
    admin: "مسؤول",
    // staff: "موظف",
    lastLogin: "آخر تسجيل دخول",
    actions: "الإجراءات",
    noStaffFound: "لا يوجد موظفين",
    employee: "موظف",
    
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
    available: "Available",
    popular: "Popular Dish",
    
    // Theme & Language
    theme: "Theme",
    language: "Language",
    
    // Staff Management
    staffManagement: "Staff Management",
    addNewStaff: "Add New Staff",
    staffName: "Staff Name",
    email: "Email",
    phone: "Phone",
    role: "Role",
    status: "Status",
    active: "Active",
    inactive: "Inactive",
    admin: "Admin",
    // staff: "Staff",
    lastLogin: "Last Login",
    actions: "Actions",
    noStaffFound: "No staff found",
    employee: "Staff",
    
    // Restaurant
    restaurantDashboard: "Restaurant Dashboard",
    welcomeMessage: "Welcome to Asala Restaurant Dashboard"
  }
}

export type Language = keyof typeof translations
export type TranslationKey = keyof typeof translations.ar