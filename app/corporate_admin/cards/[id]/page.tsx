import { CardDetailsPageClient } from "@/components/corporate_admin/card-details-page"

export default async function CardDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <CardDetailsPageClient cardId={id} />
}