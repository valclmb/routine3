"use client";

import { Routine } from "@/components/routine/Routine";
import { RoutineProvider } from "@/contexts/RoutineContext";

// Amplify.configure(outputs);

export default function App() {
  // const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  // function listTodos() {
  //   client.models.Todo.observeQuery().subscribe({
  //     next: (data) => setTodos([...data.items]),
  //   });
  // }

  // useEffect(() => {
  //   listTodos();
  // }, []);

  // function deleteTodo(id: string) {
  //   client.models.Todo.delete({ id });
  // }

  // const { signOut } = useAuthenticator();

  return (
    <main className="flex flex-col items-center justify-center p-10">
      <h1 className="text-4xl font-bold">Routine.</h1>
      <p className="text-muted-foreground mb-5">
        Créez votre routine personnalisée
      </p>
      <RoutineProvider>
        <Routine />
      </RoutineProvider>
    </main>
  );
}
