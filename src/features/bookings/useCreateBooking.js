import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export function useCreateBooking() {
  const queryClient = useQueryClient();

  const { mutate: createBookingApi, isLoading } = useMutation({
    mutationFn: (newBooking) => createBooking(newBooking),
    onSuccess: () => {
      toast.success("Booking succesfully created");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createBookingApi, isLoading };
}
