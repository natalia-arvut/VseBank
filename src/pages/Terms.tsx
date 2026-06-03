import LegalLayout from '../components/LegalLayout'
import { TERMS_META, TermsContent } from '../components/legalContent'

export default function Terms() {
  return (
    <LegalLayout tag={TERMS_META.tag} title={TERMS_META.title} intro={TERMS_META.intro}>
      <TermsContent />
    </LegalLayout>
  )
}
