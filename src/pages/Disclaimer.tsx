import LegalLayout from '../components/LegalLayout'
import { useDisclaimerMeta, DisclaimerContent } from '../components/legalContent'

export default function Disclaimer() {
  const meta = useDisclaimerMeta()
  return (
    <LegalLayout tag={meta.tag} title={meta.title} intro={meta.intro}>
      <DisclaimerContent />
    </LegalLayout>
  )
}
