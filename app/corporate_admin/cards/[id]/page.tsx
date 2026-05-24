import { CardDetailsPageClient } from "@/components/corporate_admin/card-details-page"

export default function CardDetailsPage({ params }: { params: { id: string } }) {
  return <CardDetailsPageClient cardId={params.id} />
}
