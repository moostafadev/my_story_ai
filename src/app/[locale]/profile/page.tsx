import { UserService } from "@/services/user.service";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { User, AtSign, Mail, Calendar, Phone } from "lucide-react";
import LogoutBtn from "@/components/LogoutBtn";
import EditPhoneNumber from "@/features/home/Profile/EditPhoneNumber";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ProfilePage = async () => {
  const t = await getTranslations("Profile");
  const tHeader = await getTranslations("HomePage.header");
  const cookiesStore = await cookies();
  const userId = cookiesStore.get("userId")?.value;

  const user = userId ? await UserService.getUserById(userId) : null;
  if (!user) {
    redirect("/");
  }
  return (
    <>
      <section className="py-10">
        <div className="container flex flex-col gap-6 md:gap-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-primary-foreground text-center">
            {t("title")}
          </h1>

          <div className="grid gap-4 grid-cols-1 xl:grid-cols-2">
            <div className="flex flex-col gap-4 bg-primary/10 shadow-sm rounded-md p-4 duration-300 hover:shadow-md text-primary-foreground text-sm md:text-base">
              <div className="flex items-center sm:gap-1 bg-primary/5 rounded-md overflow-hidden">
                <div className="p-2 bg-primary-foreground h-full flex items-center justify-center">
                  <User className="w-5 h-5 text-background" />
                </div>
                <p className="flex sm:items-center flex-col sm:flex-row gap-1 p-1">
                  <span className="font-medium">{t("FullName")} :</span>
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
                  <span className="font-medium">{t("Username")} :</span>
                  <span>{user.username}</span>
                </p>
              </div>

              <div className="flex items-center sm:gap-1 bg-primary/5 rounded-md overflow-hidden">
                <div className="p-2 bg-primary-foreground h-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-background" />
                </div>
                <p className="flex sm:items-center flex-col sm:flex-row gap-1 p-1">
                  <span className="font-medium">{t("Email")} :</span>
                  <span>{user.email}</span>
                </p>
              </div>

              <div className="flex items-center sm:gap-1 bg-primary/5 rounded-md overflow-hidden">
                <div className="p-2 bg-primary-foreground h-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-background" />
                </div>
                <div className="flex sm:items-center flex-col sm:flex-row gap-1 p-1 w-full">
                  <span className="font-medium block min-w-fit">
                    {t("Phone")} :
                  </span>
                  <div className="flex gap-1 items-center sm:justify-between w-full">
                    <p>{user.phoneNumber}</p>
                    <EditPhoneNumber
                      userId={userId ?? ""}
                      phoneNumber={user.phoneNumber ?? ""}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center sm:gap-1 bg-primary/5 rounded-md overflow-hidden">
                <div className="p-2 bg-primary-foreground h-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-background" />
                </div>
                <p className="flex items-center gap-1 p-1">
                  <span className="font-medium">{t("CreatedAt")} :</span>
                  <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex items-center gap-2 container justify-end">
        {user.username === process.env.ADMIN_USERNAME && (
          <Button variant={"outlineSub"} asChild>
            <Link href={"/admin"}>{t("Dashboard")}</Link>
          </Button>
        )}

        {user.orders.length > 0 && (
          <Button variant={"secondary"} asChild>
            <Link href={"/profile/orders"}>{t("MyOrders")}</Link>
          </Button>
        )}

        <LogoutBtn title={tHeader("logout")} />
      </section>
    </>
  );
};

export default ProfilePage;
