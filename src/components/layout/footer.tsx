import { MaxWidthWrapper } from '@/components/layout/max-width-wrapper'

export const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="flex w-full justify-center border-t p-6 text-center text-xs tracking-wider">
      <MaxWidthWrapper>
        <p>
          &copy; {year}{' '}
          <a
            href="https://hardcoded.digital"
            className="underline-offset-2 hover:underline"
          >
            Hardcoded Digital
          </a>
        </p>
      </MaxWidthWrapper>
    </footer>
  )
}
