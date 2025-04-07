// app/user/[id]/page.tsx
import UserDetails from './../../components/UserDetails'

export default function UserPage() {
  return (
    <div>
      <h1>User Details</h1>
      <UserDetails />
    </div>
  )
}
