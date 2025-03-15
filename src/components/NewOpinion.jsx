import { use } from "react";
import { useActionState } from "react";
import { OpinionsContext } from "../store/opinions-context";
import Submit from "./Submit";
export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext);
  async function shareOpinionAction(prevState, formData) {
    const title = formData.get("title");
    const body = formData.get("body");
    const userName = formData.get("userName");

    let errors = [];
    if (title.trim().length < 5) {
      errors.push("Title must be at least five characters long.");
    }
    if (body.trim().length < 10 || body.trim().length > 300) {
      errors.push("Opinion must be between 10 and 300 characters long.");
    }
    if (!userName.trim()) {
      errors.push("User name is required.");
    }
    if (errors.length > 0) {
      return {
        errors,
        enteredValue: {
          title,
          body,
          userName,
        },
      };
    }
    // submit to backend
    // call api method
    await addOpinion({ title, body, userName });
    return {
      errors: null,
    };
  }
  const [formState, setAction] = useActionState(shareOpinionAction, {
    errors: null,
  });
  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={setAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValue?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValue?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValue?.body}
          ></textarea>
        </p>
        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((errors) => (
              <li key={errors}>{errors}</li>
            ))}
          </ul>
        )}
        <Submit />
      </form>
    </div>
  );
}
