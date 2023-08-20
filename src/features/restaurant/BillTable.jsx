import Menus from "../../ui/Menus";
import { useRestaurant } from "./useRestaurant";
import Pagination from "../../ui/Pagination";
import Table from "../../ui/Table";
import BillRow from "./BillRow";
import Spinner from "../../ui/Spinner";

function BillTable() {
  const { data: { data: bills } = {}, isLoading } = useRestaurant();

  const count = bills?.length;

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Booking</div>
          <div>Guest</div>
          <div>Date</div>
          <div>Status</div>
          <div>Bill</div>
          <div></div>
        </Table.Header>
        <Table.Body data={bills} render={(bill) => <BillRow bills={bill} />} />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BillTable;
