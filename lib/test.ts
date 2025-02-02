const lastSeen = "2025-02-02T16:56:49.463Z";

console.log(
  new Date(lastSeen).toLocaleDateString("en-IN", {
    hour:"numeric",
    minute:"numeric",
    hour12: true,
    timeZone: "Asia/Kolkata",
  })
);
