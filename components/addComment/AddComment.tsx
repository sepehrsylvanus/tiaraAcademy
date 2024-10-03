import { Dispatch, FC, SetStateAction } from "react";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";

interface AddCommentProps {
  setOpenComment: Dispatch<SetStateAction<boolean>>;
}

const AddComment: FC<AddCommentProps> = ({ setOpenComment }) => {
  return (
    <div>
      <p className="bg-red-500 py-2 px-4 rounded-md text-white mt-2">
        <ReportProblemIcon /> Please add the comment which is related to this
        course!
      </p>
      <Textarea
        className="mt-4 resize-none"
        placeholder="Write your comment..."
      />
      <div className="flex justify-end gap-2 mt-2">
        <Button variant={"outline"} onClick={() => setOpenComment(false)}>
          Cancel
        </Button>
        <Button>Send</Button>
      </div>
    </div>
  );
};

export default AddComment;
