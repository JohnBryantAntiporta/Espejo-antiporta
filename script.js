const scriptURL =
   "https://script.google.com/macros/s/AKfycbxjCcgkIE24a4XI-K-o_nGLljQPU9MFJV0MCKERoc0PgHg6bJfp-oFWNciwbdCLV-y8Hw/exec";
const form = document.getElementById("contactForm");
const statusMessage = document.getElementById("formStatus");

if (form && statusMessage) {
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        statusMessage.textContent = "Sending your message...";

        if (submitButton) {
            submitButton.disabled = true;
        }

        try {
            const formData = new FormData(form);
            const data = {
                name: formData.get("name")?.toString().trim() || "",
                email: formData.get("email")?.toString().trim() || "",
                gender: formData.get("gender")?.toString() || "",
                phoneNumber: formData.get("phone")?.toString().trim() || "",
                alternatePhoneNumber: formData.get("message")?.toString().trim() || ""
            };

            await fetch(scriptURL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "text/plain;charset=UTF-8"
                },
                body: JSON.stringify(data)
            });

            statusMessage.textContent =
                "Your form was sent. Google Sheets must be checked to confirm it was received.";
            form.reset();
        } catch (error) {
            console.error("Unable to send contact form:", error);
            statusMessage.textContent =
                "We couldn't send your message. Please try again later.";
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
            }
        }
    });
}
