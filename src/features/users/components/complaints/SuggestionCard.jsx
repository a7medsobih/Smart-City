import { Info } from "lucide-react";
import { statusMap } from "../../../../utils/statuesMap";

function SuggestionCard({ item }) {
  const status = statusMap(item?.status);

  return (
    <div className="flex flex-col gap-3 border border-primary-light/50 shadow rounded-lg p-4 bg-light hover:border-primary hover:shadow-md transition-all duration-300 cursor-pointer">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <Info
            size={50}
            className="border border-primary-light/50 rounded-xl p-3 shadow text-primary"
          />
          <div>
            <div className="flex gap-1 items-center">
              <h3 className="text-xl font-medium">{item?.title}</h3>
              {"-"}
              <p className="text-gray-600">
                {new Date(item?.dateSubmitted).toLocaleString()}
              </p>
            </div>
            {item?.description && (
              <div className=" py-1 text-sm font-medium">
                {item.description}
              </div>
            )}
          </div>
        </div>
        <p
          className={`h-fit px-2 py-1 rounded-lg text-sm font-semibold ${status.bg} ${status.text} ${status.border} border border-primary-light/50 shadow`}
        >
          {status.label}
        </p>
      </div>
    </div>
  );
}

export default SuggestionCard;
