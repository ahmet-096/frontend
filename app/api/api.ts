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

// Giriş yapma API fonksiyonu
export async function login(data: { Email: string; Password: string }) {
  const response = await fetch("http://localhost:5075/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response;
}

// İşverenin kendi ilanlarını çek
export async function getEmployerJobs(token: string) {
  const response = await fetch("http://localhost:5075/api/jobposts/employer", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response;
}

// Yeni ilan ekle
export async function addEmployerJob(token: string, ilan: unknown) {
  const response = await fetch("http://localhost:5075/api/jobposts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(ilan),
  });
  return response;
}

// İlan sil
export async function deleteEmployerJob(token: string, id: string) {
  const response = await fetch(`http://localhost:5075/api/jobposts/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  return response;
}
//diğer API fonksiyonları