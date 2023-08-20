import { useQuery } from "@tanstack/react-query";
import { getCountries } from "../../services/apiCountries";

export function useCountries() {
  const { data: { dataCountries: countries } = {}, isLoading } = useQuery({
    queryFn: getCountries,
    queryKey: ["countries"],
  });

  return { countries, isLoading };
}
