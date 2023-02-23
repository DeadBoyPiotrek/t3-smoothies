import { Form } from "~/components/Form";
import Navigation from "~/components/Navigation";

export default function CreatePage() {
  return (
    <>
      <Navigation />
      <div className="flex min-h-screen w-full items-center justify-center overflow-hidden">
        <Form />
      </div>
    </>
  );
}
