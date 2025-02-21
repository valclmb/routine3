"use client";

import { Nav } from "@/components/Nav";
import { Routine } from "@/components/routine/Routine";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";

Amplify.configure(outputs);

export default function App() {
  // const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  // function deleteTodo(id: string) {
  //   client.models.Todo.delete({ id });
  // }

  // const { signOut } = useAuthenticator();

  return (
    <main className="flex flex-col justify-center">
      <Nav />

      <Routine />
    </main>
  );
}
