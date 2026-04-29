import { SignupForm } from '@/components/auth/signup-form'

const SignupPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>
}) => {
  const { message } = await searchParams

  return <SignupForm message={message} />
}

export default SignupPage
