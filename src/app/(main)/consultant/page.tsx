import CategoryConsultantList from "../../../../components/moleculs/CategoryConsultantList";
import CardConsultantList from "../../../../components/moleculs/CardConsultantList";
import { ConsultantProvider } from "../../../../contexts/ConsultantContext";

export default function ConsultantPage() {
  return (
    <ConsultantProvider>
      <main className="w-full h-full relative min-h-screen bg-gray-100 overflow-hidden ">
        <div className="flex gap-2.5 w-full mt-40 px-40">
          <div className="w-1/4 min-h-[620px] bg-white rounded-2xl p-5">
            <CategoryConsultantList />
          </div>
          <div className="w-3/4 min-h-[620px] bg-white rounded-2xl p-5">
            <h2 className="text-xl font-semibold text-[#016A70]">Konsultan</h2>
            <CardConsultantList />
          </div>
        </div>
      </main>
    </ConsultantProvider>
  );
}
