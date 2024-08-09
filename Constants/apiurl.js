export const apiurl =
  import.meta.env.VITE_LOCAL_URL === "production"
    ? "https://bus-booking-backend-8g3m.onrender.com"
    : `http://localhost:4000`;
