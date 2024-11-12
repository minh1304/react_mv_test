import * as React from 'react'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  beforeLoad: async ({ location }) => {
    const token = sessionStorage.getItem('authToken')

    if (!token) {
      throw redirect({
        to: '/auth/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: DashboardComponent,
})

function DashboardComponent() {
  return (
    <div>
      <h1>Welcome to the Dashboard!</h1>
    </div>
  )
}

export default DashboardComponent
