import LegalLayout from '../components/LegalLayout'
import { DISCLAIMER_META, DisclaimerContent } from '../components/legalContent'

export default function Disclaimer() {
  return (
    <LegalLayout tag={DISCLAIMER_META.tag} title={DISCLAIMER_META.title} intro={DISCLAIMER_META.intro}>
      <DisclaimerContent />
    </LegalLayout>
  )
}
