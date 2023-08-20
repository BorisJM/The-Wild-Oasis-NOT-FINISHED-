import { useQuery } from "@tanstack/react-query";
import { getGuests } from "../../services/apiBookings";

export function useGuests() {
  const {
    isLoading,
    data: guests,
    error,
  } = useQuery({
    queryKey: ["guest"],
    queryFn: getGuests,
  });

  return { isLoading, guests, error };
}
