
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Log out"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch("/api/logout", {
            method: "POST",
            credentials: "include"
          });

          Swal.fire({
            icon: "success",
            title: "Logged out!",
            showConfirmButton: false,
            timer: 1200
          }).then(() => {
            window.location.href = "login.html";
          });
        } catch (err) {
          console.error("Logout error:", err);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Logout failed. Please try again."
          });
        }
      }
    });
  });
});
