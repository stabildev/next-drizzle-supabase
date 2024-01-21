import { LoginForm } from '@/components/auth/login-form'

const LoginPage = ({ searchParams }: { searchParams: { message: string } }) => {
  return <LoginForm message={searchParams.message} />
}

export default LoginPage
