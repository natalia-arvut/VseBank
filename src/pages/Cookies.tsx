import LegalLayout from '../components/LegalLayout'
import { COOKIES_META, CookiesContent } from '../components/legalContent'

export default function Cookies() {
  return (
    <LegalLayout tag={COOKIES_META.tag} title={COOKIES_META.title} intro={COOKIES_META.intro}>
      <CookiesContent />
    </LegalLayout>
  )
}
