import { redirect } from 'next/navigation'

// Redirect to canonical page.
// Old DR-398 version had incorrect claim advocacy framing — replaced by
// cyclone-narelle-western-australia-2026 which uses DisasterEventPage and
// correct restoration-network framing.
export default function CycloneNarelleWAPage() {
  redirect('/events/cyclone-narelle-western-australia-2026')
}
