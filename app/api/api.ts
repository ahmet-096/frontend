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
  const response = await fetch("http://localhost:5075/api/jobposts", {
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
//ilan detay çek
export async function getJobDetail(id: string) {
  const response = await fetch(`http://localhost:5075/api/jobposts/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return response;
}


export async function getCurrentUser(token: string) {
  const response = await fetch("http://localhost:5075/api/auth/me", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response;
}
//admin ilan onayla
export async function approveJobPost(id: number, token: string) {
  const response = await fetch(`http://localhost:5075/api/jobposts/approve/${id}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }
  });
  return response;
};
// admin İlanı reddet (backend'de reject endpointi yoksa eklemelisin)
export async function rejectJobPost(id: number, token: string) {
  const response = await fetch(`http://localhost:5075/api/jobposts/reject/${id}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }
  });
  return response;
};
// Admin olarak tüm işverenleri çek
export async function getEmployers(token: string) {
  const response = await fetch("http://localhost:5075/api/employers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  return response;
}
// Aday profilini getir
export async function getCandidate(id: string, token: string) {
  const response = await fetch(`http://localhost:5075/api/candidates/${id}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` }
  });
  return response;
}

// Aday profilini güncelle
export async function updateCandidate(id: string, token: string, dto: unknown) {
  const response = await fetch(`http://localhost:5075/api/candidates/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(dto)
  });
  return response;
}

// Admin olarak aday sil
export async function deleteCandidate(id: string, token: string) {
  const response = await fetch(`http://localhost:5075/api/candidates/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  return response;
}

// Admin olarak tüm adayları getir
export async function getAllCandidates(token: string) {
  const response = await fetch("http://localhost:5075/api/candidates", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` }
  });
  return response;
}
// İşveren detayını getir (admin veya kendi hesabı)
export async function getEmployer(id: string, token: string) {
  const response = await fetch(`http://localhost:5075/api/employers/${id}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` }
  });
  return response;
}

// İşveren güncelle (admin veya kendi hesabı)
export async function updateEmployer(id: string, token: string, dto: unknown) {
  const response = await fetch(`http://localhost:5075/api/employers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(dto)
  });
  return response;
}

// Admin olarak işveren sil
export async function deleteEmployer(id: string, token: string) {
  const response = await fetch(`http://localhost:5075/api/employers/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  return response;
}

// Admin olarak işvereni onayla
export async function approveEmployer(id: string, token: string) {
  const response = await fetch(`http://localhost:5075/api/employers/approve/${id}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }
  });
  return response;
}
// İş ilanına başvuru oluştur (sadece Candidate rolü)
export async function createJobApplication(token: string, data: unknown) {
  const response = await fetch("http://localhost:5075/api/jobapplications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return response;
}

// Başvuruları listele (Admin/Employer rolü)
export async function getJobApplications(token: string, jobPostId?: string) {
  const url = jobPostId
    ? `http://localhost:5075/api/jobapplications?jobPostId=${jobPostId}`
    : "http://localhost:5075/api/jobapplications";
  const response = await fetch(url, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` }
  });
  return response;
}

// Başvuru detayını getir
export async function getJobApplicationById(token: string, id: string) {
  const response = await fetch(`http://localhost:5075/api/jobapplications/${id}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` }
  });
  return response;
}

// Başvuru durumunu güncelle (Admin/Employer rolü)
export async function updateJobApplicationStatus(token: string, id: string, statusData: unknown) {
  const response = await fetch(`http://localhost:5075/api/jobapplications/${id}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(statusData)
  });
  return response;
}

// Başvuruyu sil (Admin/Employer rolü)
export async function deleteJobApplication(token: string, id: string) {
  const response = await fetch(`http://localhost:5075/api/jobapplications/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  return response;
}

// Başvuruyu reddet (Admin/Employer rolü) bu yok EKLENİCEK!!
export async function rejectJobApplication(token: string, id: string) {
  const response = await fetch(`http://localhost:5075/api/jobapplications/${id}/reject`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }
  });
  return response;
}

// Belirli bir işverenin ilanlarını çek
export async function getJobPostsByEmployer(employerId: string, token: string) {
  const response = await fetch(`http://localhost:5075/api/jobposts/employer/${employerId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` }
  });
  return response;
}
// Diğer API fonksiyonları