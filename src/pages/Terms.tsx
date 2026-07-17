import LegalLayout from '../components/LegalLayout'
import { useTermsMeta, TermsContent } from '../components/legalContent'

export default function Terms() {
  const meta = useTermsMeta()
  return (
    <LegalLayout tag={meta.tag} title={meta.title} intro={meta.intro}>
      <TermsContent />
    </LegalLayout>
  )
}
