import './App.css'
import {useCreateTodosMutation, useDeleteTodosMutation, useEditTodosMutation, useGetTodosQuery} from "./apiSlice.tsx";
import TodoI from "./interfaces/todoI.tsx";

function App() {
    const [createTodo] = useCreateTodosMutation()

    async function createTodoAction() {
        const todo: TodoI = {
            done: false,
            due: null,
            task: "create"
        }
        try {
            await createTodo(todo)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <button type={"button"} onClick={createTodoAction}>Create</button>
            <TodoList/>
        </>
    )
}

const TodoList = () => {
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetTodosQuery(null)

    const todos: Array<TodoI> = data

    let content
    if (isLoading) {
        content = <p>hello world</p>
    } else if (isSuccess) {
        content = todos.map(todo => (
            <Todo key={`todo_${todo.id}`} todo={todo}/>
        ))
    } else if (isError) {
        content = <p>pas cool mon gars {error.toString()}</p>
    }
    return (
        <>
            {content}
        </>
    )
}

const Todo = (props: { todo: TodoI }) => {
    const todo = props.todo
    if (typeof todo.id === "number") {
        return (<div><p>{todo.id} {todo.task}</p><EditButton todo={todo}/> <DeleteButton
            key={todo.id}
            todo={todo}/>
        </div>)
    } else {
        return (<div>
            <p>Error component have no ID</p>
        </div>)
    }
}

const DeleteButton = (props: { todo: TodoI }) => {
    const [gogo] = useDeleteTodosMutation()

    async function useDeleteAction() {
        try {
            await gogo(props.todo)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <button type={"button"} onClick={useDeleteAction}>delete</button>
    )
}

const EditButton = (props: { todo: TodoI }) => {
    const [gogo] = useEditTodosMutation()
    const todo = {...props.todo}
    todo.task = "hello world"

    async function useUpdateAction() {
        try {
            await gogo(todo)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <button type={"button"} onClick={useUpdateAction}>update</button>
    )
}
export default App
