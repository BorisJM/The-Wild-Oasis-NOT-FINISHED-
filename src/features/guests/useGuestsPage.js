import { useQuery } from "@tanstack/react-query";
import { getGuestsPage } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useGuestsPage() {
  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    data: { data: guests, count } = {},

    isLoading,
  } = useQuery({
    queryFn: () => getGuestsPage(page),
    queryKey: ["guests", page],
  });

  return { guests, isLoading, count };
}
