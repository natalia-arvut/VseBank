import LegalLayout from '../components/LegalLayout'
import { usePrivacyMeta, PrivacyContent } from '../components/legalContent'

export default function Privacy() {
  const meta = usePrivacyMeta()
  return (
    <LegalLayout tag={meta.tag} title={meta.title} intro={meta.intro}>
      <PrivacyContent />
    </LegalLayout>
  )
}
