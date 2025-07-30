import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown, User, LogIn, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const advertiserMenuItems = [{
    title: "رزرو تبلیغ",
    href: "/order",
    description: "سفارش‌گیری تبلیغات"
  }, {
    title: "مشاهده ناشران",
    href: "/publishers",
    description: "لیست ناشران فعال"
  }, {
    title: "نحوه کار",
    href: "/how-it-works",
    description: "راهنمای گام به گام تبلیغ‌دهندگان"
  }, {
    title: "تعرفه‌ها",
    href: "/pricing",
    description: "تعرفه‌های پایه و توضیحات"
  }, {
    title: "نمونه کارها",
    href: "/portfolio",
    description: "گالری نمونه کارهای ناشران"
  }];
  const publisherMenuItems = [{
    title: "مزایای همکاری",
    href: "/benefits",
    description: "چرا در اصفهان بنر لیست شوید"
  }, {
    title: "ثبت کانال",
    href: "/register-channel",
    description: "فرم ثبت‌نام ناشر"
  }];
  return <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo - Right side (start in RTL) */}
        <div className="flex items-center">
          <a href="/" className="flex items-center space-x-2 space-x-reverse">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">ا</span>
            </div>
            
          </a>
        </div>

        {/* Desktop Navigation - Center */}
        <div className="hidden md:flex items-center">
          <NavigationMenu>
            <NavigationMenuList className="gap-6">
              <NavigationMenuItem>
                <NavigationMenuLink href="/" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">اصفهان بنر</NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium">
                  تبلیغ کنید
                  <ChevronDown className="mr-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    {advertiserMenuItems.map(item => <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <a href={item.href} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">{item.title}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {item.description}
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>)}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium">
                  همکاری با ما
                  <ChevronDown className="mr-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    {publisherMenuItems.map(item => <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <a href={item.href} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">{item.title}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {item.description}
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>)}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink href="/about" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  درباره ما
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink href="/contact" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  تماس با ما
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink href="/blog" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  بلاگ
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* User Actions - Left side (end in RTL) */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" size="sm">
              <LogIn className="mr-2 h-4 w-4" />
              ورود
            </Button>
            <Button variant="hero" size="sm">
              <UserPlus className="mr-2 h-4 w-4" />
              ثبت‌نام
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">منو</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <h3 className="font-semibold text-lg">اصفهان بنر</h3>
                  <p className="text-sm text-muted-foreground">پلتفرم تبلیغات دیجیتال محلی</p>
                </div>
                
                <div className="grid gap-2">
                  <Button variant="outline" className="justify-start">
                    <LogIn className="mr-2 h-4 w-4" />
                    ورود
                  </Button>
                  <Button variant="hero" className="justify-start">
                    <UserPlus className="mr-2 h-4 w-4" />
                    ثبت‌نام
                  </Button>
                </div>

                <div className="border-t pt-4">
                  <nav className="grid gap-2">
                    <a href="/" className="block px-2 py-2 text-sm hover:bg-accent rounded-md">صفحه اصلی</a>
                    
                    <div className="py-2">
                      <p className="text-xs font-semibold text-muted-foreground px-2 mb-2">تبلیغ کنید</p>
                      <div className="grid gap-1 pr-4">
                        <a href="/order" className="block px-2 py-1 text-sm hover:bg-accent rounded-md">رزرو تبلیغ</a>
                        <a href="/publishers" className="block px-2 py-1 text-sm hover:bg-accent rounded-md">مشاهده ناشران</a>
                        <a href="/how-it-works" className="block px-2 py-1 text-sm hover:bg-accent rounded-md">نحوه کار</a>
                        <a href="/pricing" className="block px-2 py-1 text-sm hover:bg-accent rounded-md">تعرفه‌ها</a>
                        <a href="/portfolio" className="block px-2 py-1 text-sm hover:bg-accent rounded-md">نمونه کارها</a>
                      </div>
                    </div>

                    <div className="py-2">
                      <p className="text-xs font-semibold text-muted-foreground px-2 mb-2">همکاری با ما</p>
                      <div className="grid gap-1 pr-4">
                        <a href="/benefits" className="block px-2 py-1 text-sm hover:bg-accent rounded-md">مزایای همکاری</a>
                        <a href="/register-channel" className="block px-2 py-1 text-sm hover:bg-accent rounded-md">ثبت کانال</a>
                      </div>
                    </div>

                    <a href="/about" className="block px-2 py-2 text-sm hover:bg-accent rounded-md">درباره ما</a>
                    <a href="/contact" className="block px-2 py-2 text-sm hover:bg-accent rounded-md">تماس با ما</a>
                    <a href="/blog" className="block px-2 py-2 text-sm hover:bg-accent rounded-md">بلاگ</a>
                  </nav>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>;
};
export default Header;