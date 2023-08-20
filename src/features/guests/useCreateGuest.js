import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewGuest } from "../../services/apiGuests";

export function useCreateGuest() {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: addNewGuest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["guests"],
      });
    },
    onError: (err) => {
      throw new Error(err.message);
    },
  });

  return { mutate, isLoading };
}
