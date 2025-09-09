import DefaultPage from "@/components/layouts/Admin/DefaultPage";
import StoryForm from "@/features/Admin/stories/Form";

const StoryAddPage = () => {
  return (
    <DefaultPage title="اضافة قصة">
      <StoryForm mode="create" />
    </DefaultPage>
  );
};

export default StoryAddPage;
