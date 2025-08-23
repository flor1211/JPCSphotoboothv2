(async () => {
  try {
    const res = await fetch("/api/verify", {
      method: "POST",
      credentials: "include"
    });

    const data = await res.json();

    if (!data.valid) {
    //   Swal.fire({
    //     icon: "warning",
    //     title: "Unauthorized",
    //     text: "You must log in to access the photobooth.",
    //     timer: 2000,
    //     showConfirmButton: false
    //   }).then(() => {
        window.location.href = "login.html";
    //   });
    } else {
        document.getElementById("container").style.display = "block";
    }
  } catch (error) {
    console.error("Token verification error:", error);
    // Swal.fire({
    //   icon: "error",
    //   title: "Error",
    //   text: "An error occurred. Please log in again.",
    //   timer: 2000,
    //   showConfirmButton: false
    // })
    // .then(() => {
        window.location.href = "login.html";
    // });
  }
})();
