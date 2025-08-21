// Aday kaydı için API fonksiyonu
export async function registerCandidate(data: {
  Email: string;
  Password: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
}) {
  const response = await fetch("http://localhost:5075/api/auth/register/candidate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response;
}

// Diğer API 