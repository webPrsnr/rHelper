import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { z } from "zod";

import { Button } from "@/components/Elements";
import { Form } from "@/components/Forms";
import { Input } from "@/components/Forms";
import { vi } from "vitest";

const schema = z.object({
  title: z.string().min(1, "Test error"),
});

const someData = {
  title: "Hello",
};

type TestDataProps = z.infer<typeof schema>;

describe("Forms", () => {
  it("should render Form component", () => {
    const handleSubmit = vi.fn();
    render(
      <Form<TestDataProps, typeof schema>
        onSubmit={handleSubmit}
        schema={schema}
        id={"test-form"}
      >
        {({ register, formState }) => (
          <>
            <Input
              registration={register("title")}
              error={formState.errors["title"]}
              label={"Title"}
              type="text"
            />
            <Button name={"submit"} type={"submit"}>
              Submit
            </Button>
          </>
        )}
      </Form>
    );
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should submit Form component", async () => {
    const handleSubmit = vi.fn();
    render(
      <Form<TestDataProps, typeof schema>
        onSubmit={handleSubmit}
        schema={schema}
        id={"test-form"}
      >
        {({ register, formState }) => (
          <>
            <Input
              registration={register("title")}
              error={formState.errors["title"]}
              label={"Title"}
              type="text"
            />
            <Button name={"submit"} type={"submit"}>
              Submit
            </Button>
          </>
        )}
      </Form>
    );

    await userEvent.type(screen.getByLabelText(/title/i), someData.title);
    userEvent.click(screen.getByRole("button", { name: /submit/i }));
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(someData, expect.anything())
    );
  });
});
