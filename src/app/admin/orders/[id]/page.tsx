import { CloudinaryBtn } from "@/components/custom/cloudinary-input";
import DefaultPage from "@/components/layouts/Admin/DefaultPage";
import HandlePdf from "@/features/Admin/Orders/HandlePdf";
import OrderStateDisplay from "@/features/Admin/Orders/OrderState";
import { OrderService } from "@/services/order.service";
import { ORDERTYPE, STORYTYPE } from "@prisma/client";
import { AtSign, Calendar, Mail, Phone, User } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const OrderPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data = await OrderService.getOrderById(id);

  if (!data) {
    redirect("/admin/orders");
  }

  const user = data.user;
  const storyTypeLabels: Record<STORYTYPE, string> = {
    PDF: "ملف PDF",
    SOFT: "نسخة SOFT",
    HARD: "نسخة HARD",
  };

  const orderTypeLabels: Record<ORDERTYPE, string> = {
    COD: "الدفع عند الاستلام",
    VISA: "بطاقة فيزا",
  };

  return (
    <DefaultPage title={data.name}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <h2 className="text-lg md:text-2xl font-bold">
              الطلب رقم{" "}
              <span dir="ltr" className="text-base">
                #{data.id}
              </span>
            </h2>
            <HandlePdf id={id} />
          </div>
          <div className="flex flex-col gap-6 bg-primary/10 shadow-sm rounded-md p-2 sm:p-4 duration-300 hover:shadow-md text-sm md:text-base">
            <div className="flex flex-col gap-3 pb-6 border-b-2 border-primary-foreground/30">
              <h3 className="text-base md:text-lg text-foreground font-semibold">
                العنوان
              </h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1">
                  <span>المحافظة :</span>
                  <p className="text-lg">{data.city}</p>
                </div>
                <div className="flex items-center gap-1">
                  <span>المنطقة :</span>
                  <p className="text-lg">{data.area}</p>
                </div>
                <div className="flex items-center gap-1">
                  <span>الشارع :</span>
                  <p className="text-lg">{data.street}</p>
                </div>
                <div className="flex items-center gap-1">
                  <span>رقم البيت / العمارة :</span>
                  <p className="text-lg">{data.houseNumber}</p>
                </div>
                {data.details && (
                  <div className="flex items-center gap-1">
                    <span>تفاصيل إضافية :</span>
                    <p className="text-lg">{data.details}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3 pb-6 border-b-2 border-primary-foreground/30">
              <h3 className="text-base md:text-lg text-foreground font-semibold">
                الطلب
              </h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1">
                  <span>نوع الطلب :</span>
                  <p>{storyTypeLabels[data.storyType]}</p>
                </div>
                <div className="flex items-center gap-1">
                  <span>طريقة الدفع :</span>
                  <p>{orderTypeLabels[data.type]}</p>
                </div>
                <OrderStateDisplay state={data.state} id={id} />
                <div className="flex items-center gap-1">
                  <span>سعر القصص :</span>
                  <p className="text-lg">{data.storiesPrice} ج.م</p>
                </div>
                <div className="flex items-center gap-1">
                  <span>سعر التوصيل :</span>
                  <p className="text-lg">{data.deliveryPrice} ج.م</p>
                </div>
                <div className="flex items-center gap-1 font-bold">
                  <span>الإجمالي :</span>
                  <p className="text-lg">{data.fPrice} ج.م</p>
                </div>
                {data.cNote && (
                  <div className="flex items-center gap-1">
                    <span>ملاحظات العميل :</span>
                    <p className="text-lg">{data.cNote}</p>
                  </div>
                )}
                {data.ANote && (
                  <div className="flex items-center gap-1">
                    <span>ملاحظات الإدارة :</span>
                    <p className="text-lg">{data.ANote}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3 pb-6 border-b-2 border-primary-foreground/30">
              <h3 className="text-base md:text-lg text-foreground font-semibold">
                بيانات الطفل
              </h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1">
                  <span>الاسم :</span>
                  <p className="text-lg">{data.name}</p>
                </div>
                <div className="flex items-center gap-1">
                  <span>العمر :</span>
                  <p className="text-lg">{data.age}</p>
                </div>
                <div className="flex items-center gap-1">
                  <span>الهوايات :</span>
                  <p className="text-lg">{data.hobbies}</p>
                </div>
                <div className="flex items-center gap-1">
                  <span>اللغة :</span>
                  <p className="text-lg">{data.language}</p>
                </div>
                <div className="flex items-center gap-1">
                  <span>الوصف :</span>
                  <p className="text-lg">{data.description}</p>
                </div>
                <div className="flex items-center gap-1">
                  <span>الجنس :</span>
                  <p className="text-lg">{data.gender}</p>
                </div>
                {data.child_image && (
                  <div className="flex items-center gap-2">
                    <span>صورة الطفل :</span>
                    <Image
                      width={80}
                      height={80}
                      src={data.child_image}
                      alt="صورة الطفل"
                      className="w-20 h-20 rounded-md object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3 pb-6 border-b-2 border-primary-foreground/30">
              <h3 className="text-base md:text-lg text-foreground font-semibold">
                المظهر
              </h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1">
                  <span>لون الشعر :</span>
                  <p className="text-lg">{data.hair_color}</p>
                </div>
                <div className="flex items-center gap-1">
                  <span>شكل الشعر :</span>
                  <p className="text-lg">{data.hair_style}</p>
                </div>
                <div className="flex items-center gap-1">
                  <span>لون العين :</span>
                  <p className="text-lg">{data.eye_color}</p>
                </div>
                <div className="flex items-center gap-1">
                  <span>لون البشرة :</span>
                  <p className="text-lg">{data.skin_tone}</p>
                </div>
                <div className="flex items-center gap-1">
                  <span>الملابس :</span>
                  <p className="text-lg">{data.clothing_description}</p>
                </div>
                <div className="flex items-center gap-1">
                  <span>الإكسسوارات :</span>
                  <p className="text-lg">{data.accessory_description}</p>
                </div>
                <div className="flex items-center gap-1">
                  <span>الصفات الشخصية :</span>
                  <p className="text-lg">{data.personality_traits}</p>
                </div>
                <div className="flex items-center gap-1">
                  <span>القيمة الأخلاقية :</span>
                  <p className="text-lg">{data.moral_value}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-base md:text-lg text-foreground font-semibold">
                ملفات القصة
              </h3>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <span>ملف القصة بالعربية :</span>
                  {data.storyPdfArUrl && (
                    <CloudinaryBtn
                      fileUrl={data.storyPdfArUrl}
                      className="w-fit mb-2"
                      variant={"outline"}
                    >
                      تحميل القصة الحالية
                    </CloudinaryBtn>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <span>ملف القصة بالانجليزي :</span>
                  {data.storyPdfEnUrl && (
                    <CloudinaryBtn
                      fileUrl={data.storyPdfEnUrl}
                      className="w-fit mb-2"
                      variant={"outline"}
                    >
                      تحميل القصة الحالية
                    </CloudinaryBtn>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-lg md:text-2xl font-bold">
              تفاصيل عن المستخدم
            </h2>
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
          </div>
        </div>
      </div>
    </DefaultPage>
  );
};

export default OrderPage;
