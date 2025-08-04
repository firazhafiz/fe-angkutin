import DetailBlog from "../../../../../components/organisms/DetailBlog";

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  return (
    <main className="w-full relative min-h-screen bg-gray-100 overflow-hidden">
      <section className="max-w-6xl mx-auto mt-40 mb-20">
        <DetailBlog params={resolvedParams} />
      </section>
    </main>
  );
}
