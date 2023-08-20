import { useQuery } from "@tanstack/react-query";
import { getBills } from "../../services/apiRestaurant";

export function useRestaurant() {
  const { data, isLoading } = useQuery({
    queryFn: getBills,
    queryKey: ["bills"],
  });

  return { data, isLoading };
}
