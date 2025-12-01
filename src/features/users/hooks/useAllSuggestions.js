import { useQuery } from "@tanstack/react-query";
import { getAllSuggestions } from "../../../services/apiSuggestions";

export function useAllSuggestions() {
  const { data: suggestions, isLoading } = useQuery({
    queryKey: ["allSuggestions"],
    queryFn: getAllSuggestions,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return { suggestions, isLoading };
}
