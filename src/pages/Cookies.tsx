import LegalLayout from '../components/LegalLayout'
import { useCookiesMeta, CookiesContent } from '../components/legalContent'

export default function Cookies() {
  const meta = useCookiesMeta()
  return (
    <LegalLayout tag={meta.tag} title={meta.title} intro={meta.intro}>
      <CookiesContent />
    </LegalLayout>
  )
}
