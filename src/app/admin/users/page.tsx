import DefaultPage from "@/components/layouts/Admin/DefaultPage";
import UsersData from "@/features/Admin/Users";
import { UserService } from "@/services/user.service";
import React from "react";

const UsersPage = async () => {
  const data = await UserService.getAllUsers();
  return (
    <>
      <DefaultPage title="المستخدمين" desc="للتحكم في مستخدمين الموقع">
        <UsersData data={data} />
      </DefaultPage>
    </>
  );
};

export default UsersPage;
