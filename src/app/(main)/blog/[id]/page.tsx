import DetailBlog from "../../../../../components/organisms/DetailBlog";

export default function BlogDetail({ params }: { params: { id: string } }) {
  return (
    <main className="w-full relative min-h-screen bg-gray-100 overflow-hidden">
      <section className="max-w-6xl mx-auto mt-40 mb-20">
        <DetailBlog params={params} />
      </section>
    </main>
  );
}
