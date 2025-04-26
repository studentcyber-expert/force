
document.getElementById("scefForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const videoFile = document.getElementById("oath_video").files[0];

  if (!videoFile) {
    alert("Please upload your oath video.");
    return;
  }

  const reader = new FileReader();
  reader.onloadend = async function () {
    const base64Video = reader.result.split(",")[1];
    const data = {
      name: formData.get("name"),
      father_name: formData.get("father_name"),
      address: formData.get("address"),
      permanent_address: formData.get("permanent_address"),
      email: formData.get("email"),
      parent_mobile: formData.get("parent_mobile"),
      guardian_mobile: formData.get("guardian_mobile"),
      previous_team: formData.get("previous_team"),
      facebook_link: formData.get("facebook_link"),
      verification: formData.get("verification"),
      birth_certificate: formData.get("birth_certificate"),
      birth_date: formData.get("birth_date"),
      photo: formData.get("photo"),
      teamRespectConsent: formData.get("teamRespectConsent"),
      oath_video_name: videoFile.name,
      oath_video_data: base64Video,
      id: "SCEF" + Math.floor(100000 + Math.random() * 900000)
    };

    const response = await fetch("YOUR_WEB_APP_URL", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const result = await response.json();
    document.getElementById("message").innerText = result.result === "success"
      ? "Submission successful!" : "Submission failed.";
  };
  reader.readAsDataURL(videoFile);
});
