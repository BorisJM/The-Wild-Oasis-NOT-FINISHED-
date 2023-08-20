import styled from "styled-components";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import GuestListItem from "./GuestListItem";
import { useGuestsPage } from "./useGuestsPage";
import GuestBookings from "./GuestBookings";
import Modal from "../../ui/Modal";
import { useSearchParams } from "react-router-dom";

const StyledGuestList = styled.div`
  border: 1px solid var(--color-grey-200);
  border-top: none;
  border-bottom-left-radius: var(--border-radius-md);
  border-bottom-right-radius: var(--border-radius-md);
  overflow: hidden;
  padding-top: 0.8rem;
  transform: translateY(-4px);
`;

const List = styled.ul``;

const PaginationContainer = styled.div`
  border-top: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 0.8rem;

  &:not(:has(*)) {
    display: none;
  }
`;

function GuestList() {
  const { isLoading, guests, count } = useGuestsPage();
  const [searchParams, setSearchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (count === undefined) return null;
  if (count === 0) return <p>No guests found...</p>;

  return (
    <>
      <Modal>
        <StyledGuestList>
          <Modal.Open opens="guestbookings">
            <List>
              {guests?.map((guest) => (
                <GuestListItem
                  key={guest.id}
                  guest={guest}
                  onClick={() => {
                    searchParams.set("id", guest.id);
                    setSearchParams(searchParams);
                  }}
                />
              ))}
            </List>
          </Modal.Open>
          <PaginationContainer>
            <Pagination count={count} />
          </PaginationContainer>
        </StyledGuestList>
        <Modal.Window name="guestbookings">
          <GuestBookings />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default GuestList;
