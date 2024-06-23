import { people, rooms } from "./__mock__/test.json";
import BookingPage from "@/pages/BookingPage";

const BookingPagePresent = () => {
  return <BookingPage people={people} rooms={rooms} />;
};

export default BookingPagePresent;
