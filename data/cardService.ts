export interface CardServiceItem {
  icon: string;
  title: string;
  description: string;
}

export const cardServiceData: CardServiceItem[] = [
  {
    icon: "/assets/pickup.svg",
    title: "Order Pickup",
    description:
      "Schedule a waste pickup from your home, with collections transported to our recycling facility.",
  },
  {
    icon: "/assets/consultation.svg",
    title: "Consultation",
    description:
      "Get expert environmental advice on managing waste around you through personalized consultations.",
  },
  {
    icon: "/assets/information.svg",
    title: "Information & Education",
    description:
      "Access blogs and tutorials packed with insights on waste recycling and management to empower your knowledge.",
  },
];
