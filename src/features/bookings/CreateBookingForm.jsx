import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import ButtonGroup from "../../ui/ButtonGroup";
import Spinner from "../../ui/Spinner";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import { getToday, subtractDates } from "../../utils/helpers";
import Select from "../../ui/Select";
import { useState } from "react";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useCreateBooking } from "./useCreateBooking";
import Checkbox from "../../ui/Checkbox";
import { useCabins } from "../cabins/useCabins";
import { useGuests } from "./useGuests";

function CreateBookingForm({ onCloseModal }) {
  const { createBookingApi, isLoading } = useCreateBooking();
  const { cabins, isLoading: isLoadingCabins } = useCabins();
  const { guests, isLoading: isLoadingGuests, error } = useGuests();

  const { register, handleSubmit, getValues, formState, reset } = useForm();
  const [status, setStatus] = useState("unconfirmed");
  const [selectedCabin, setSelectedCabin] = useState(cabins?.at(0).id);
  const [selectedGuest, setSelectedGuest] = useState(
    guests?.guests?.at(0)?.id || 4
  );
  const [isPaid, setIsPaid] = useState(false);
  const [hasBreakfast, setHasBreakfast] = useState(false);

  const { errors } = formState;
  const today = getToday().slice(0, 10);
  const guestsOptions = guests?.guests?.map((guest) => {
    return {
      value: guest.id,
      label: guest.fullName,
    };
  });

  const isWorking = isLoading || isLoadingCabins || isLoadingGuests;
  if (isWorking) return <Spinner />;

  const cabinsOptions = cabins?.map((cabin) => {
    return {
      value: cabin.id,
      label: cabin.name,
    };
  });

  const options = [
    { value: "unconfirmed", label: "unconfirmed" },
    { value: "confirmed", label: "confirmed" },
    { value: "checked-in", label: "checked-in" },
    { value: "checked-out", label: "checked-out" },
  ];

  function onSubmit(data) {
    const numberOfNights = subtractDates(
      getValues().endDate,
      getValues().startDate
    );

    const booking = {
      ...data,
      status,
      numNights: numberOfNights,
      totalPrice: +getValues().cabinPrice + +getValues().extrasPrice,
      cabinId: selectedCabin,
      guestId: selectedGuest,
      cabinPrice: +getValues().cabinPrice,
      extrasPrice: +getValues().extrasPrice,
      numGuests: +getValues().numGuests,
      hasBreakfast,
      isPaid,
    };

    createBookingApi(booking, {
      onSuccess: () => onCloseModal?.(),
    });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Arrival" error={errors?.startDate?.message}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField
            disabled={isWorking}
            format="YYYY-MM-DD"
            {...register("startDate", {
              required: "This field is required",
              validate: (value) =>
                new Date(value).getTime() > new Date(today).getTime() ||
                "Start date needs to be greater than today's date",
            })}
          />
        </LocalizationProvider>
      </FormRow>

      <FormRow label="Departure" error={errors?.endDate?.message}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField
            disabled={isWorking}
            format="YYYY-MM-DD"
            {...register("endDate", {
              required: "This field is required",
              validate: (value) =>
                new Date(value).getTime() >
                  new Date(getValues().startDate).getTime() ||
                "End date needs to be greater than start date",
            })}
          />
        </LocalizationProvider>
      </FormRow>
      <FormRow label="Number of guests" error={errors?.numGuests?.message}>
        <Input
          disabled={isWorking}
          id="numGuests"
          min="1"
          type="number"
          {...register("numGuests", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Cabin price" error={errors?.cabinPrice?.message}>
        <Input
          disabled={isWorking}
          id="cabinPrice"
          type="number"
          min="0"
          {...register("cabinPrice", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Extras price" error={errors?.extrasPrice?.message}>
        <Input
          disabled={isWorking}
          min="0"
          id="extrasPrice"
          type="number"
          {...register("extrasPrice", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Status">
        <Select
          options={options}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </FormRow>
      <FormRow label="Select cabin">
        <Select
          options={cabinsOptions}
          value={selectedCabin}
          onChange={(e) => setSelectedCabin(e.target.value)}
        />
      </FormRow>
      <FormRow label="Select guest">
        <Select
          options={guestsOptions}
          value={selectedGuest}
          onChange={(e) => setSelectedGuest(e.target.value)}
        />
      </FormRow>
      <FormRow label="Has breakfast?">
        <Checkbox
          checked={hasBreakfast}
          onChange={() => setHasBreakfast((hasBreakfast) => !hasBreakfast)}
        />
      </FormRow>
      <FormRow label="Is Paid?">
        <Checkbox
          checked={isPaid}
          onChange={() => setIsPaid((isPaid) => !isPaid)}
        />
      </FormRow>
      <FormRow label="Observations">
        <Textarea {...register("observations")} />
      </FormRow>
      <ButtonGroup>
        <Button
          type="reset"
          variation="secondary"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button>Add new booking</Button>
      </ButtonGroup>
    </Form>
  );
}

export default CreateBookingForm;
