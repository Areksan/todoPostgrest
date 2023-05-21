import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const header = {
    Authorization: `Bearer ${import.meta.env.VITE_OSEF_TOKEN}`
}
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_API_URL}),
    tagTypes: ['Todos'],
    endpoints: builder => ({
        getTodos: builder.query({
            query: () => '/todos',
            providesTags: ['Todos']
        }),
        deleteTodos: builder.mutation({
            query: todo => ({
                url: '/todos?id=eq.' + todo.id,
                method: 'DELETE',
                body: todo,
                headers: header,
            }),
            invalidatesTags: ['Todos']
        }),
        editTodos: builder.mutation({
            query: todo => ({
                url: '/todos?id=eq.' + todo.id,
                method: 'PATCH',
                body: todo,
                headers: header
            }),
            invalidatesTags: ['Todos']
        }),
        createTodos: builder.mutation({
            query: todo => ({
                url: '/todos',
                method: 'POST',
                body: todo,
                headers: header
            }),
            invalidatesTags: ['Todos']
        })

    })
})

export const {useGetTodosQuery, useDeleteTodosMutation, useEditTodosMutation, useCreateTodosMutation} = apiSlice