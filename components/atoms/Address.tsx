import { PickupAddress } from "../../data/pickupAddress";

interface AddressProps {
  address: PickupAddress;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
}

export default function Address({
  address,
  isSelected,
  onSelect,
  onEdit,
}: AddressProps) {
  return (
    <div className="flex items-start gap-4 p-4 border-b border-gray-200 last:border-b-0">
      {/* Radio Button */}
      <div className="flex-shrink-0 mt-1">
        <button
          onClick={onSelect}
          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
            isSelected ? "border-tosca bg-tosca" : "border-gray-300 bg-white"
          }`}
        >
          {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
        </button>
      </div>

      {/* Address Content */}
      <div className="flex-1">
        {/* Name and Phone */}
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-semibold text-gray-800">{address.name}</h3>
          <span className="text-gray-400">|</span>
          <p className="text-gray-600 text-sm">{address.phone}</p>
        </div>

        {/* Address */}
        <p className="text-gray-600 text-sm leading-relaxed">
          {address.address}
        </p>
      </div>

      {/* Edit Button */}
      <div className="flex-shrink-0">
        <button
          onClick={onEdit}
          className="text-tosca text-sm hover:text-tosca/80 transition-colors"
        >
          Edit
        </button>
      </div>
    </div>
  );
}
