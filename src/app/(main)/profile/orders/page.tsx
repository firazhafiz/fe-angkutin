import SidebarLayout from "../../../../../components/layouts/SidebarLayout";

export default function OrdersPage() {
  return (
    <SidebarLayout>
      <h2 className="text-xl font-semibold text-[#016A70]">History Order</h2>
      <div className="grid grid-cols-1 h-full gap-4 mt-6">
        <div className="border rounded-2xl p-5 flex justify-between">
          <div>
            <h2 className="text-[#016A70] ">ORD-20250715-001</h2>
            <div className="mt-3">
              <p className="text-slate-500 text-sm">Ordered on :</p>
              <h2 className="text-[#016A70] font-medium">July 15, 2025</h2>
            </div>
            <div className="mt-3">
              <p className="text-slate-500 text-sm">Location : :</p>
              <h2 className="text-[#016A70] font-medium">South Surabaya, Jambangan, Jl. Jambangan Baru II No. 15</h2>
            </div>
            <div className="mt-3">
              <p className="text-slate-500 text-sm">Waste Type :</p>
              <h2 className="text-[#016A70] font-medium">Organik</h2>
            </div>
            <div className="mt-3">
              <p className="text-slate-500 text-sm">Weight :</p>
              <h2 className="text-[#016A70] font-medium">50 kg</h2>
            </div>
            <div className="mt-3">
              <p className="text-slate-500 text-sm">Scheduled Pickup :</p>
              <h2 className="text-[#016A70] font-medium">July 15, 2025</h2>
            </div>
            <div className="mt-3">
              <p className="text-slate-500 text-sm">Completed on :</p>
              <h2 className="text-[#016A70] font-medium">July 16, 2025, 2:20 PM WIB </h2>
            </div>
          </div>
          <div className="flex flex-col justify-between items-end">
            <div className="px-2 py-1 bg-amber-400 w-fit rounded-full text-sm">Pending</div>
            <button className="px-4 py-2 bg-gray-700 w-fit rounded-lg text-sm">View Order</button>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
