import { useSearchParams } from "react-router-dom";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import BookingRow from "../bookings/BookingRow";
import { useGuestBookings } from "./useGuestBookings";
import Spinner from "../../ui/Spinner";

function GuestBookings() {
  const [searchParams] = useSearchParams();
  const { guestBookings: bookings, isLoading } = useGuestBookings();

  const id = searchParams.get("id");

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={bookings.data}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default GuestBookings;
