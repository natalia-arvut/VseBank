import LegalLayout from '../components/LegalLayout'
import { PRIVACY_META, PrivacyContent } from '../components/legalContent'

export default function Privacy() {
  return (
    <LegalLayout tag={PRIVACY_META.tag} title={PRIVACY_META.title} intro={PRIVACY_META.intro}>
      <PrivacyContent />
    </LegalLayout>
  )
}
