import Modal from "../ui/Modal";
import Button from "../ui/Button";
import CreateGuestForm from "../features/guests/CreateGuestForm";
import GuestList from "../features/guests/GuestList";


function Guests() {
  return (
    <div>
      <GuestList />
      <Modal>
        <Modal.Open opens="guestForm">
          <Button>Add new guest</Button>
        </Modal.Open>
        <Modal.Window name="guestForm">
          <CreateGuestForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default Guests;
