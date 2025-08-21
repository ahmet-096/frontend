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

// İşveren kaydı için API fonksiyonu
export async function registerEmployer(data: {
  Email: string;
  Password: string;
  CompanyName: string;
  Phone: string;
}) {
  const response = await fetch("http://localhost:5075/api/auth/register/employer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response;
}

// Vitrin iş ilanlarını çekmek için API fonksiyonu
export async function getJobPosts() {
  const response = await fetch("http://localhost:5075/api/jobposts", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return response;
}


//diğer API fonksiyonları