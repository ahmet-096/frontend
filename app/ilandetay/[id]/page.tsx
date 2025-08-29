import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import JobDetail from "../../components/JobDetail";
import { getJobDetail } from "@/app/api/api";

// Next.js dinamik route parametresi ile detay sayfası
export default async function IlanDetayPage({ params }: { params: { id: string } }) {
  const response = await getJobDetail(params.id);
  const job = await response.json();

  if (!job) {
    return (
      <>
        <Header />
        <div style={{ textAlign: "center", margin: "40px 0", color: "red" }}>İlan bulunamadı.</div>
        <Footer />
      </>
    );
  }

  return (
    <>
    
      <Header />
      <JobDetail
        title={job.title}
        company={job.company}
        location={job.location}
        postedDate={job.createdAt}
        Description={job.description}
        requirements={job.requirements}
        applyUrl={job.applyUrl || "https://ornek-basvuru-linki.com"}
        jobType={job.jobType}
      />
      <Footer />
    </>
  );
}
export const dynamic = 'force-dynamic'; // Sayfanın her zaman dinamik olarak render edilmesini sağlar