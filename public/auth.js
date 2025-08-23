        (async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                Swal.fire({
                    icon: "warning",
                    title: "Unauthorized",
                    text: "You must log in to access the photobooth.",
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    window.location.href = "login.html";
                });
                return; 
            }

            try {
                const res = await fetch("/api/verify", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ token })
                });

                const data = await res.json();

                if (!data.valid) {
                    localStorage.removeItem("token");
                    Swal.fire({
                        icon: "warning",
                        title: "Session Expired",
                        text: "Please log in again.",
                        timer: 2000,
                        showConfirmButton: false
                    }).then(() => {
                        window.location.href = "login.html";
                    });
                    return;
                }
            } catch (error) {
                console.error("Token verification error:", error);
                localStorage.removeItem("token");
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "An error occurred. Please log in again.",
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    window.location.href = "login.html";
                });
            }
        })();
