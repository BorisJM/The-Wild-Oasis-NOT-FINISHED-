import Button from "../../ui/Button";

import Modal from "../../ui/Modal";
import CreateBookingForm from "./CreateBookingForm";

function CreateNewBooking() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="bookingForm">
          <Button>Create new Booking</Button>
        </Modal.Open>
        <Modal.Window name="bookingForm">
          <CreateBookingForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default CreateNewBooking;
