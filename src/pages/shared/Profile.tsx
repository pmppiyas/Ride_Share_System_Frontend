import { useAuth } from '@/hooks/useAuth';


export default function Profile() {
  const { me: user, isLoading } = useAuth()

  console.log("User data:", user, isLoading);
  return (
    <div>Profile</div>
  )
}
