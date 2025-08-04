import ProfileConsultant from "../../../../../components/organisms/ProfileConsultant";

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

export default function DetailConsultantPage() {
  return (
    <main className="w-full h-full relative min-h-screen bg-gray-100 overflow-hidden">
      <div className="w-full mt-40 px-40">
        <ProfileConsultant />
      </div>
    </main>
  );
}
