import { Suspense } from "react";
import SidebarLayout from "../../../../../components/layouts/SidebarLayout";
import AddressManager from "../../../../../components/organisms/AddressManager";
import AddressLoading from "./loading";

export default function AddressPage() {
  return (
    <SidebarLayout>
      <Suspense fallback={<AddressLoading />}>
        <AddressManager />
      </Suspense>
    </SidebarLayout>
  );
}
