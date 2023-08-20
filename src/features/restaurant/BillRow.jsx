import styled from "styled-components";
import Table from "../../ui/Table";
import { formatCurrency } from "../../utils/helpers";
import { Stacked } from "../bookings/BookingRow";

const BookingRow = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Bill = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

const Status = styled.div`
  text-transform: uppercase;
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

function BillRow({
  bills: { fullName, guestId, bookingId, date, bill, status },
}) {
  return (
    <Table.Row>
      <BookingRow>{bookingId}</BookingRow>
      <Stacked>
        <span>{fullName}</span>
        <span>ID:{guestId}</span>
      </Stacked>
      <BookingRow>{date}</BookingRow>
      <Status>{status ? "Paid" : "Not paid"}</Status>
      <Bill>{formatCurrency(bill)}</Bill>
    </Table.Row>
  );
}

export default BillRow;
