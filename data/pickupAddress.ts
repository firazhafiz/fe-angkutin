export interface PickupAddress {
  name: string;
  address: string;
  phone: string;
}

export const pickupAddressData: PickupAddress[] = [
  {
    name: "Firaz Fulvian Hafiz",
    address:
      "Jalan Pisang No.83, RT.4/RW.1, Suratmajan, Maospati Rumah Pak Sukarman, KAB. MAGETAN - MAOSPATI, JAWA TIMUR, ID 63392",
    phone: "082332676848",
  },
  {
    name: "Ahmad Syaifuddin",
    address:
      "Jalan Melati No.12, RT.2/RW.3, Karanganyar, KAB. MADIUN, JAWA TIMUR, ID 63151",
    phone: "081234567890",
  },
  {
    name: "Siti Nurhaliza",
    address:
      "Jalan Mawar No.45, RT.5/RW.2, Tamanan, KAB. NGANJUK, JAWA TIMUR, ID 64461",
    phone: "085678901234",
  },
  {
    name: "Budi Santoso",
    address:
      "Jalan Anggrek No.27, RT.3/RW.4, Sidomulyo, KAB. JOMBANG, JAWA TIMUR, ID 61413",
    phone: "087890123456",
  },
];

export default pickupAddressData;
