import DefaultPage from "@/components/layouts/Admin/DefaultPage";
import StoryForm from "@/features/Admin/stories/Form";
import { getStoryByIdAction } from "@/features/Admin/stories/story.action";
import { redirect } from "next/navigation";
import React from "react";

const StoryPage = async ({ params: { id } }: { params: { id: string } }) => {
  const data = await getStoryByIdAction(id);

  if (!data.story) {
    redirect("/admin/stories");
  }
  return (
    <DefaultPage title={data.story?.titleAr}>
      <StoryForm mode="edit" story={data.story} />
    </DefaultPage>
  );
};

export default StoryPage;
