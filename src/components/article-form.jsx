import { useSelector } from "react-redux";
import Input from "../ui/input";
import Textarea from "../ui/textarea";

const ArticleForm = ({
  title,
  body,
  description,
  setBody,
  setDescription,
  setTitle,
  formSubmitHandler,
}) => {
  const { isLoading } = useSelector((state) => state.article);
  return (
    <form
      className="d-flex flex-column gap-2 w-50 mx-auto"
      onSubmit={formSubmitHandler}
    >
      <Input label={"Title"} state={title} setState={setTitle} />
      <Textarea
        label={"Description"}
        state={description}
        setState={setDescription}
      />
      <Textarea label={"Body"} state={body} setState={setBody} height="200px" />
      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        {isLoading ? "Loading..." : "Create"}
      </button>
    </form>
  );
};

export default ArticleForm;
