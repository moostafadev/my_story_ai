import DefaultPage from "@/components/layouts/Admin/DefaultPage";
import { getStoriesAction } from "@/features/Admin/stories/story.action";
import StoriesData from "@/features/Admin/stories/Table";
import { redirect } from "next/navigation";

const StoriesPage = async () => {
  const data = await getStoriesAction();

  if (!data.stories) {
    redirect("/admin");
  }
  return (
    <>
      <DefaultPage title="القصص">
        <StoriesData data={data.stories} />
      </DefaultPage>
    </>
  );
};

export default StoriesPage;
