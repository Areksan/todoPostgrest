import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000'}),
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
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwicm9sZSI6InRvZG9fdXNlciIsImlhdCI6MTUxNjIzOTAyMn0.Uc9XU-cckBSHdTkuWXHRCKvV9mILvtCxJPnC83YfDTo"
                },
            }),
            invalidatesTags: ['Todos']
        }),
        editTodos: builder.mutation({
            query: todo => ({
                url: '/todos?id=eq.' + todo.id,
                method: 'PATCH',
                body: todo,
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwicm9sZSI6InRvZG9fdXNlciIsImlhdCI6MTUxNjIzOTAyMn0.Uc9XU-cckBSHdTkuWXHRCKvV9mILvtCxJPnC83YfDTo"
                }
            }),
            invalidatesTags: ['Todos']
        }),
        createTodos: builder.mutation({
            query: todo => ({
                url: '/todos',
                method:'POST',
                body:todo,
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwicm9sZSI6InRvZG9fdXNlciIsImlhdCI6MTUxNjIzOTAyMn0.Uc9XU-cckBSHdTkuWXHRCKvV9mILvtCxJPnC83YfDTo"
                }
            }),
            invalidatesTags:['Todos']
        })

    })
})

export const {useGetTodosQuery, useDeleteTodosMutation, useEditTodosMutation, useCreateTodosMutation} = apiSlice