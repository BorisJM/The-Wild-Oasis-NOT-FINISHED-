import { useQuery } from "@tanstack/react-query";
import { getGuestBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useGuestBookings() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const {
    data: guestBookings,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getGuestBookings(id),
    queryKey: ["guestBookings", id],
  });

  return { guestBookings, isLoading, error };
}
