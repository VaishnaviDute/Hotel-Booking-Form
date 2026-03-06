const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");
const roomType = document.getElementById("roomType");
const nights = document.getElementById("nights");
const price = document.getElementById("price");
const form = document.getElementById("bookingForm");

// Prevent past dates
const today = new Date().toISOString().split("T")[0];
checkin.min = today;

function calculate() {
  if (checkin.value && checkout.value) {
    const inDate = new Date(checkin.value);
    const outDate = new Date(checkout.value);
    const diff = (outDate - inDate) / (1000 * 60 * 60 * 24);
    if (diff > 0) {
      nights.innerHTML = diff;
      price.innerHTML = "₹" + diff * roomType.value;
    }
  }
}

checkin.addEventListener("change", () => {
  checkout.min = checkin.value;
  calculate();
});

checkout.addEventListener("change", calculate);
roomType.addEventListener("change", calculate);

// Booking form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (new Date(checkout.value) <= new Date(checkin.value)) {
    Swal.fire({
      title: "Error",
      text: "Check-out must be after check-in",
      icon: "error",
      confirmButtonText: "OK"
    });
    return;
  }
  Swal.fire({
    title: "Booking Confirmed!",
    text: `Your room has been successfully booked for ${nights.innerHTML} nights. Total: ${price.innerHTML}`,
    icon: "success",
    confirmButtonText: "OK"
  });
  form.reset();
  nights.innerHTML = 0;
  price.innerHTML = "₹0";
});