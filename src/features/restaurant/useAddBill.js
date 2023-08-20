import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createBill } from "../../services/apiRestaurant";
import { toast } from "react-hot-toast";

export function useAddBill() {
  const queryClient = useQueryClient();

  const { mutate: addBill, isLoading: isCreating } = useMutation({
    mutationFn: (newBill) => createBill(newBill),
    onSuccess: () => {
      toast.success("New bill successfully created");
      queryClient.invalidateQueries({
        queryKey: ["bills"],
      });
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });

  return { addBill, isCreating };
}
