import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { useGuests } from "../bookings/useGuests";
import { useGuestBookings } from "../guests/useGuestBookings";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import { useAddBill } from "./useAddBill";
import Empty from "../../ui/Empty";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Select from "../../ui/Select";
import Spinner from "../../ui/Spinner";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import Input from "../../ui/Input";

function AddBillForm({ onCloseModal }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { guests, isLoading: isLoadingGuests, error } = useGuests();
  const {
    guestBookings: { data: bookings } = {},
    error: bookingsError,
    isLoading: isLoadingBookings,
  } = useGuestBookings();

  const [guestId, setGuestId] = useState(null);
  const [bookingId, setBookingId] = useState(null);

  const { register, formState, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      status: false,
    },
  });
  useEffect(
    function () {
      if (!guestId) {
        setGuestId(guests?.guests?.[0].id);
      }

      setBookingId(bookings?.[0]?.id);
      setValue("status", false);
    },
    [guests, guestId, bookings, setValue]
  );

  const guestsOptions = guests?.guests?.map((guest) => {
    return {
      value: guest.id,
      label: guest.fullName,
    };
  });

  const bookingsOptions = bookings?.map((booking) => {
    return {
      value: booking.id,
      label: booking.id,
    };
  });

  const { addBill, isCreating } = useAddBill();

  const { errors } = formState;

  const booking = bookings?.find((booking) => booking.id === bookingId);

  const statusOptions = [
    {
      value: false,
      label: "NOT PAID",
    },
    {
      value: true,
      label: "PAID",
    },
  ];

  if (isLoadingGuests || isLoadingBookings) return <Spinner />;

  function resetParam() {
    searchParams.delete("id");
    setSearchParams(searchParams);
  }

  console.log(getValues().status);
  function onSubmit(data) {
    const name = guestsOptions.find((guest) => guest.value === guestId).label;
    console.log(data);
    const newBill = {
      ...data,
      bookingId,
      guestId,
      bill: +data.bill,
      fullName: name,
    };

    addBill(newBill, {
      onSuccess: () => {
        onCloseModal?.();
        resetParam();
      },
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Select guest" error={errors?.guestId?.message}>
        <Select
          disabled={isCreating}
          options={guestsOptions}
          value={guestId}
          onChange={(e) => {
            setGuestId(+e.target.value);
            searchParams.set("id", +e.target.value);
            setSearchParams(searchParams);
          }}
        />
      </FormRow>
      {isLoadingBookings && <SpinnerMini />}
      {searchParams.get("id") && (
        <FormRow label="Select booking" error={errors?.bookingId?.message}>
          <Select
            disabled={isCreating}
            options={bookingsOptions}
            value={bookingId}
            onChange={(e) => {
              setBookingId(+e.target.value);
            }}
          />
        </FormRow>
      )}
      <FormRow label="Date" error={errors?.date?.message}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField
            format="YYYY-MM-DD"
            {...register("date", {
              required: "Date is required",
              validate: (value) =>
                (new Date(value).getTime() >=
                  new Date(booking?.startDate).getTime() &&
                  new Date(value).getTime() <=
                    new Date(booking?.endDate).getTime()) ||
                "The date needs to be between the arrival date and departure ",
            })}
          />
        </LocalizationProvider>
      </FormRow>
      <FormRow label="Status">
        <Select
          disabled={isCreating}
          options={statusOptions}
          {...register("status", {
            onChange: (e) => {
              setValue("status", e.target.value === "false" ? false : true);
            },
          })}
        />
      </FormRow>
      <FormRow label="Bill" error={errors?.bill?.message}>
        <Input
          type="number"
          disabled={isCreating}
          {...register("bill", {
            required: "Bill is required",
            onChange: (e) => {
              setValue("bill", +e.target.value);
            },
          })}
        />
      </FormRow>
      <ButtonGroup>
        <Button type="reset" variation="secondary">
          Cancel
        </Button>
        <Button>Add</Button>
      </ButtonGroup>
    </Form>
  );
}

export default AddBillForm;
