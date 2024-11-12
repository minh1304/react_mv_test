import * as React from 'react'
import { createFileRoute, useNavigate  } from '@tanstack/react-router'
import type { FieldApi } from '@tanstack/react-form';
import { useForm } from '@tanstack/react-form';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

interface User
{
    userName: string,
    password: string
}
export const Route = createFileRoute('/auth/login')({
  component: LoginComponent,
})
function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
    return (
        <>
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <em className="text-red-500 text-sm">{field.state.meta.errors.join(", ")}</em>
            ) : null}
            {field.state.meta.isValidating ? <span className="text-blue-500">Validating...</span> : null}
        </>
    );
  }
function LoginComponent() {
    const navigate = useNavigate({ from: '/auth/login' })
    const mutation = useMutation({
        mutationFn: (user: User) => axios.post('https://localhost:7188/api/Auth/login', user),
        onSuccess: (response) => {
            const token = response.data?.token;
            console.log(token)
            if(token)
            {
                sessionStorage.setItem('authToken', token);
                navigate({to: '/dashboard'})
            }
        },
        onError: (error) => {
            window.alert(error.message)
        },

    })
    const form = useForm<User>({
        defaultValues: {
            userName: '',
            password: ''
        },
        onSubmit: async ({ value }) => {
            console.log(value);
            mutation.mutate(value);
        },
    });
    return (
        <section className="bg-gray-100 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white text-center">
                            Login
                        </h1>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                form.handleSubmit();
                            }}
                            className="space-y-4"
                        >
                            <div>
                                <form.Field
                                        name="userName"
                                        validators={{
                                            onChange: ({ value }) =>
                                                !value
                                                    ? 'User Name is required'
                                                    : value.length < 3
                                                        ? 'User Name must be at least 3 characters'
                                                        : undefined,
                                            onChangeAsyncDebounceMs: 500,
                                            onChangeAsync: async ({ value }) => {
                                                await new Promise((resolve) => setTimeout(resolve, 1000));
                                                return (
                                                    value.includes('error') &&
                                                    'No "error" allowed in first name'
                                                );
                                            },
                                        }}
                                        children={(field) => (
                                            <>
                                                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                                                    User Name:
                                                </label>
                                                <input
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                                <FieldInfo field={field} />
                                            </>
                                        )}
                                    />
                            </div>

                            <div>
                                <form.Field
                                        name="password"
                                        validators={{
                                            onChange: ({ value }) =>
                                                !value
                                                    ? 'Password is required'
                                                    : value.length < 6
                                                        ? 'Password must be at least 6 characters'
                                                        : undefined,
                                            onChangeAsyncDebounceMs: 500,
                                            onChangeAsync: async ({ value }) => {
                                                await new Promise((resolve) => setTimeout(resolve, 1000));
                                                return (
                                                    value.includes('error') &&
                                                    'No "error" allowed in first name'
                                                );
                                            },
                                        }}
                                        children={(field) => (
                                            <>
                                                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                                                    Password:
                                                </label>
                                                <input
                                                    type="password"
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                                <FieldInfo field={field} />
                                            </>
                                        )}
                                    />
                            </div>


                            <form.Subscribe
                                selector={(state) => [state.canSubmit, state.isSubmitting]}
                                children={([canSubmit, isSubmitting]) => (
                                    <button
                                        type="submit"
                                        disabled={!canSubmit}
                                        className="w-full mt-4 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
                                    >
                                        {isSubmitting ? '...' : 'Submit'}
                                    </button>
                                )}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </section>
  )
}
