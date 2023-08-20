import { useEffect, useState } from "react";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonText from "../../ui/ButtonText";
import { useMoveBack } from "../../hooks/useMoveBack";
import BookingDataBox from "../bookings/BookingDataBox";
import Checkbox from "../../ui/Checkbox";
import { Box } from "./CheckinBooking";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";
import { useRestaurant } from "../restaurant/useRestaurant";
import { formatCurrency } from "../../utils/helpers";

function CheckOutBooking() {
  const { data: { data: bills } = {}, isLoading: isLoadingBills } =
    useRestaurant();
  const [isPaid, setIsPaid] = useState(false);
  const { booking, isLoading } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const moveBack = useMoveBack();

  if (isLoading || isLoadingBills) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const userBill = bills.find((bill) => bill.bookingId === bookingId);
  console.log(userBill);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check out booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <BookingDataBox booking={booking} />
      {userBill && !userBill.status && (
        <Box>
          <Checkbox
            checked={isPaid}
            onChange={(e) => setIsPaid((isPaid) => !isPaid)}
          >
            Confirm {formatCurrency(userBill.bill)} payment for restaurant{" "}
          </Checkbox>
        </Box>
      )}

      <ButtonGroup>
        {userBill.status && (
          <Button
            onClick={() => checkout(bookingId, { onSuccess: moveBack() })}
          >
            Check out booking #{bookingId}
          </Button>
        )}
        {!userBill ||
          (isPaid && (
            <Button
              onClick={() => checkout(bookingId, { onSuccess: moveBack() })}
            >
              Check out booking #{bookingId}
            </Button>
          ))}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckOutBooking;
