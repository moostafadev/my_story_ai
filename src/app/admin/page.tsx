import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, ShoppingCart, BookOpen, DollarSign } from "lucide-react";
import Link from "next/link";

const AdminPage = () => {
  return (
    <div className="space-y-6" dir="rtl">
      <h1 className="text-3xl font-bold">لوحة التحكم</h1>
      <p className="text-muted-foreground">
        إدارة المستخدمين والطلبات والقصص والأسعار.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-md rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">المستخدمين</CardTitle>
            <Users className="h-6 w-6 text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">١٢٤٥</p>
            <p className="text-sm text-muted-foreground">نشطين هذا الشهر</p>
          </CardContent>
        </Card>

        <Card className="shadow-md rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">الطلبات</CardTitle>
            <ShoppingCart className="h-6 w-6 text-green-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">٣١٢</p>
            <p className="text-sm text-muted-foreground">قيد التوصيل</p>
          </CardContent>
        </Card>

        <Card className="shadow-md rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">القصص</CardTitle>
            <BookOpen className="h-6 w-6 text-purple-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">٩٨</p>
            <p className="text-sm text-muted-foreground">تم انشأها</p>
          </CardContent>
        </Card>

        <Card className="shadow-md rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">الإيرادات</CardTitle>
            <DollarSign className="h-6 w-6 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">٧٥٤٠$</p>
            <p className="text-sm text-muted-foreground">هذا الشهر</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle>إدارة المستخدمين</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <p className="text-muted-foreground">
              عرض وإدارة جميع المستخدمين المسجلين.
            </p>
            <Button variant="outline" asChild>
              <Link href={"/admin/users"}>دخول</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle>إدارة الطلبات</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <p className="text-muted-foreground">تتبع وإدارة طلبات العملاء.</p>
            <Button variant="outline" asChild>
              <Link href={"/admin/orders"}>دخول</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle>أسعار القصص</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <p className="text-muted-foreground">
              تعديل أسعار الإنشاء والتوصيل.
            </p>
            <Button variant="outline" asChild>
              <Link href={"/admin/settings"}>دخول</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle>إدارة القصص</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <p className="text-muted-foreground">
              الموافقة أو التعديل أو حذف القصص.
            </p>
            <Button variant="outline" asChild>
              <Link href={"/admin/stories"}>دخول</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPage;
