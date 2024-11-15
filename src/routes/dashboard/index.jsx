import * as React from 'react';
import { createFileRoute, redirect } from '@tanstack/react-router';


export const Route = createFileRoute('/dashboard/')({
  beforeLoad: async ({ location }) => {
    const token = sessionStorage.getItem('accessToken');

    if (!token) {
      throw redirect({
        to: '/auth/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: DashboardComponent,
});

function DashboardComponent() {
  return (    
    <div className="p-2">
    <h3>Welcome Dashboard!</h3>
  </div>
  )
}
export default DashboardComponent;
