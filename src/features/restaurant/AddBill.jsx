import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import Modal from "../../ui/Modal";
import AddBillForm from "./AddBillForm";

function AddBill() {
  return (
    <Modal>
      <Modal.Window name="bill-form">
        <AddBillForm />
      </Modal.Window>

      <Modal.Open opens="bill-form">
        <ButtonGroup>
          <Button>Add new bill</Button>
        </ButtonGroup>
      </Modal.Open>
      
    </Modal>
  );
}

export default AddBill;
