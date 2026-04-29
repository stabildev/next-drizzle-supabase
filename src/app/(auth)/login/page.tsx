import { LoginForm } from '@/components/auth/login-form'

const LoginPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>
}) => {
  const { message } = await searchParams

  return <LoginForm message={message} />
}

export default LoginPage
