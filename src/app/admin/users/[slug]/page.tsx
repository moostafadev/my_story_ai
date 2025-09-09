import DefaultPage from "@/components/layouts/Admin/DefaultPage";
import Soon from "@/components/Soon";
import { UserService } from "@/services/user.service";
import { AtSign, Calendar, Gift, Mail, Phone, User } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

const UsernamePage = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const user = await UserService.getUserByUsername(slug);
  if (!user) {
    redirect("/admin/users");
  }
  return (
    <>
      <DefaultPage title={`المستخدم ${user.fName}`}>
        <div className="flex flex-col gap-4 bg-primary/10 shadow-sm rounded-md p-2 sm:p-4 duration-300 hover:shadow-md text-primary-foreground text-sm md:text-base">
          <div className="flex items-center sm:gap-1 bg-primary/5 rounded-md overflow-hidden">
            <div className="p-2 bg-primary-foreground h-full flex items-center justify-center">
              <User className="w-5 h-5 text-background" />
            </div>
            <p className="flex sm:items-center flex-col sm:flex-row gap-1 p-1">
              <span className="font-medium">الاسم كامل :</span>
              <span>
                {user.fName} {user.lName}
              </span>
            </p>
          </div>

          <div className="flex items-center sm:gap-1 bg-primary/5 rounded-md overflow-hidden">
            <div className="p-2 bg-primary-foreground h-full flex items-center justify-center">
              <AtSign className="w-5 h-5 text-background" />
            </div>
            <p className="flex sm:items-center flex-col sm:flex-row gap-1 p-1">
              <span className="font-medium">اسم المستخدم :</span>
              <span>{user.username}</span>
            </p>
          </div>

          <div className="flex items-center sm:gap-1 bg-primary/5 rounded-md overflow-hidden">
            <div className="p-2 bg-primary-foreground h-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-background" />
            </div>
            <p className="flex sm:items-center flex-col sm:flex-row gap-1 p-1">
              <span className="font-medium">الايميل :</span>
              <span>{user.email}</span>
            </p>
          </div>

          <div className="flex items-center sm:gap-1 bg-primary/5 rounded-md overflow-hidden">
            <div className="p-2 bg-primary-foreground h-full flex items-center justify-center">
              <Phone className="w-5 h-5 text-background" />
            </div>
            <p className="flex sm:items-center flex-col sm:flex-row gap-1 p-1">
              <span className="font-medium">رقم الهاتف :</span>
              <span>{user.phoneNumber}</span>
            </p>
          </div>

          <div className="flex items-center sm:gap-1 bg-primary/5 rounded-md overflow-hidden">
            <div className="p-2 bg-primary-foreground h-full flex items-center justify-center">
              <Gift className="w-5 h-5 text-background" />
            </div>
            <p className="flex items-center gap-1 p-1">
              <span className="font-medium">التجربة المجانية :</span>
              <span>{user.isFree ? "متاحة" : "غير متاحة"}</span>
            </p>
          </div>

          <div className="flex items-center sm:gap-1 bg-primary/5 rounded-md overflow-hidden">
            <div className="p-2 bg-primary-foreground h-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-background" />
            </div>
            <p className="flex items-center gap-1 p-1">
              <span className="font-medium">تاريخ انشاءه :</span>
              <span>
                {new Date(user.createdAt).toLocaleDateString("en-GB")}
              </span>
            </p>
          </div>
        </div>
      </DefaultPage>

      <DefaultPage title={`${user.orders.length} طلب`} showBackBtn={false}>
        <Soon />
      </DefaultPage>
    </>
  );
};

export default UsernamePage;
