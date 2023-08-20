import AddBill from "../features/restaurant/AddBill";
import BillTable from "../features/restaurant/BillTable";
import Button from "../ui/Button";
import Row from "../ui/Row";

function Restaurant() {
  return (
    <>
      <BillTable />
      <Row>
        <AddBill />
      </Row>
    </>
  );
}

export default Restaurant;
