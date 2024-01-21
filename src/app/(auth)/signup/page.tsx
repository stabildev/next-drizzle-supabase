import { SignupForm } from '@/components/auth/signup-form'

const SignupPage = ({
  searchParams,
}: {
  searchParams: { message: string }
}) => {
  return <SignupForm message={searchParams.message} />
}

export default SignupPage
