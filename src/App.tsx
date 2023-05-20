import './App.css'
import {useCreateTodosMutation, useDeleteTodosMutation, useEditTodosMutation, useGetTodosQuery} from "./apiSlice.tsx";

function App() {
    const [createTodo, {isLoading}] = useCreateTodosMutation()

    async function createTodoAction() {
        let todo = {
            done: false,
            task: "create",
            due: null
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
        data: todos,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTodosQuery()

    let content

    if (isLoading) {
        content = <p>hello world</p>
    } else if (isSuccess) {
        content = todos.map(todo => (
            <div key={todo.id + todo}><p>{todo.id} {todo.task}</p><EditButton todo={todo}/> <DeleteButton key={todo.id}
                                                                                                          todo={todo}/>
            </div>))
    } else if (isError) {
        content = <p>pas cool mon gars {error.toString()}</p>
    }
    return (
        <>
            {content}
        </>
    )
}

const DeleteButton = (props: { todo }) => {
    const [gogo, {isLoading}] = useDeleteTodosMutation()

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

const EditButton = (props: { todo }) => {
    const [gogo, {isLoading}] = useEditTodosMutation()
    let todo = {...props.todo}
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
