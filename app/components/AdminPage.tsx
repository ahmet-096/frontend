"use client";
import React, { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Box,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import HistoryIcon from "@mui/icons-material/History";
import { getEmployers,  approveJobPost, rejectJobPost } from "../api/api";

interface Employer {
  id: string;
  companyName: string;
  email: string;
  phone: string;
  website?: string;
  companyDescription?: string;
  logoUrl?: string;
}

interface JobPost {
  id: string;
  title: string;
  employer: string;
  status: string;
  desc: string;
  verified?: boolean;
}

interface Record {
  id: number;
  action: string;
  user: string;
  date: string;
}

export default function AdminPanelPage() {
  const [tab, setTab] = useState(0);
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [jobPosts, setJobPosts] = useState<JobPost[]>([]);
  const [records, setRecords] = useState<Record[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobPost | null>(null);
  const [selectedEmployer, setSelectedEmployer] = useState<Employer | null>(null);

  // Token'ı oturumdan veya context'ten almalısın
const token = typeof window !== "undefined" ? localStorage.getItem("token") ?? "" : "";
  useEffect(() => {
    // İşverenleri API'den çek
    getEmployers(token)
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setEmployers(data);
        } else {
          setEmployers([]);
        }
      })
      .catch(() => setEmployers([]));

    // İlanları API'den çek, en yeni ilanlar en üstte olacak şekilde sırala
    fetch("http://localhost:5075/api/jobposts", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setJobPosts([...data].reverse());
        } else {
          setJobPosts([]);
        }
      })
      .catch(() => setJobPosts([]));

    // Kayıtlar dummy, istersen API'den çekebilirsin
    setRecords([
      { id: 1, action: "İlan Onaylandı", user: "Admin", date: "2025-08-22" },
      { id: 2, action: "İşveren Silindi", user: "Admin", date: "2025-08-21" },
    ]);
  }, []);

  const handleApprove = async (id: number) => {
    try {
      await approveJobPost(id, token);
      setJobPosts((prev) =>
        prev.map((jp) => (jp.id === id.toString() ? { ...jp, status: "Onaylandı" } : jp))
      );
      setRecords((prev) => [
        { id: prev.length + 1, action: "İlan Onaylandı", user: "Admin", date: new Date().toISOString().slice(0, 10) },
        ...prev,
      ]);
    } catch (err) {
      alert("Onaylama işlemi başarısız!");
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectJobPost(Number(id), token);
      setJobPosts((prev) =>
        prev.map((jp) => (jp.id === id ? { ...jp, status: "Reddedildi" } : jp))
      );
      setRecords((prev) => [
        { id: prev.length + 1, action: "İlan Reddedildi", user: "Admin", date: new Date().toISOString().slice(0, 10) },
        ...prev,
      ]);
    } catch (err) {
      alert("Reddetme işlemi başarısız!");
    }
  };

  const handleDeleteEmployer = (id: string) => {
    setEmployers((prev) => prev.filter((emp) => emp.id !== id));
    setRecords((prev) => [
      { id: prev.length + 1, action: "İşveren Silindi", user: "Admin", date: new Date().toISOString().slice(0, 10) },
      ...prev,
    ]);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#f5f7fa", minHeight: "100vh" }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, maxWidth: 1100, mx: "auto", mb: 4 }}>
        <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
          Yönetici Paneli
        </Typography>
         <Button
          variant="outlined"
          color="error"
          sx={{ float: "right", mb: 2 }}
          onClick={() => {
            localStorage.removeItem("token"); // veya sessionStorage.removeItem("token")
            window.location.href = "/";
          }}
        >
          Çıkış Yap
        </Button>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Tüm işverenleri, ilanları ve kayıtları tek ekrandan yönetin.
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{ mb: 3 }}
          variant="fullWidth"
        >
          <Tab icon={<BusinessIcon />} label="İşverenler" />
          <Tab icon={<WorkIcon />} label="İlanlar" />
          <Tab icon={<HistoryIcon />} label="Kayıtlar" />
        </Tabs>

        {/* İşverenler Tabı */}
        {tab === 0 && (
          <Box>
            <Typography variant="h6" gutterBottom>İşverenler</Typography>
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              {employers.length === 0 ? (
                <Typography color="text.secondary">Kayıtlı işveren bulunamadı.</Typography>
              ) : (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Firma Adı</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Telefon</TableCell>
                      <TableCell>Web Sitesi</TableCell>
                      <TableCell>Açıklama</TableCell>
                      <TableCell>Logo</TableCell>
                      <TableCell align="center">İşlem</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {employers.map((emp) => (
                      <TableRow key={emp.id} hover>
                        <TableCell>{emp.companyName}</TableCell>
                        <TableCell>{emp.email}</TableCell>
                        <TableCell>{emp.phone}</TableCell>
                        <TableCell>{emp.website || "-"}</TableCell>
                        <TableCell>{emp.companyDescription || "-"}</TableCell>
                        <TableCell>
                          {emp.logoUrl ? (
                            <img src={emp.logoUrl} alt="logo" style={{ width: 40, height: 40, objectFit: "contain" }} />
                          ) : "-"}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton color="info" onClick={() => setSelectedEmployer(emp)}>
                            <InfoIcon />
                          </IconButton>
                          <IconButton color="error" onClick={() => handleDeleteEmployer(emp.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </Paper>
            <Dialog open={!!selectedEmployer} onClose={() => setSelectedEmployer(null)}>
              <DialogTitle>İşveren Detayları</DialogTitle>
              <DialogContent>
                {selectedEmployer && (
                  <Stack spacing={1}>
                    <Typography><b>Firma:</b> {selectedEmployer.companyName}</Typography>
                    <Typography><b>Email:</b> {selectedEmployer.email}</Typography>
                    <Typography><b>Telefon:</b> {selectedEmployer.phone}</Typography>
                    <Typography><b>Web Sitesi:</b> {selectedEmployer.website || "-"}</Typography>
                    <Typography><b>Açıklama:</b> {selectedEmployer.companyDescription || "-"}</Typography>
                    {selectedEmployer.logoUrl && (
                      <Box sx={{ mt: 2 }}>
                        <img src={selectedEmployer.logoUrl} alt="logo" style={{ width: 80, height: 80, objectFit: "contain" }} />
                      </Box>
                    )}
                  </Stack>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setSelectedEmployer(null)} variant="contained" color="primary">Kapat</Button>
              </DialogActions>
            </Dialog>
          </Box>
        )}

        {/* İlanlar Tabı */}
        {tab === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>İlanlar</Typography>
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              {jobPosts.length === 0 ? (
                <Typography color="text.secondary">Henüz ilan bulunamadı.</Typography>
              ) : (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Başlık</TableCell>
                      <TableCell>İşveren</TableCell>
                      <TableCell>Durum</TableCell>
                      <TableCell align="center">İşlem</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {jobPosts.map((jp) => (
                      <TableRow key={jp.id} hover>
                        <TableCell>{jp.title}</TableCell>
                        <TableCell>{jp.employer}</TableCell>
                        <TableCell>
                          <Typography color={jp.status === "Onaylandı" ? "success.main" : jp.status === "Reddedildi" ? "error.main" : "warning.main"}>
                            {jp.status}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton color="info" onClick={() => setSelectedJob(jp)}>
                            <InfoIcon />
                          </IconButton>
                          {jp.status === "Beklemede" && (
                            <>
                              <Button color="success" size="small" variant="contained" sx={{ mr: 1 }} onClick={() => handleApprove(Number(jp.id))}>
                                Onayla
                              </Button>
                              <Button color="error" size="small" variant="outlined" onClick={() => handleReject(jp.id)}>
                                Reddet
                              </Button>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </Paper>
            <Dialog open={!!selectedJob} onClose={() => setSelectedJob(null)}>
              <DialogTitle>İlan Detayları</DialogTitle>
              <DialogContent>
                {selectedJob && (
                  <Stack spacing={1}>
                    <Typography><b>Başlık:</b> {selectedJob.title}</Typography>
                    <Typography><b>İşveren:</b> {selectedJob.employer}</Typography>
                    <Typography><b>Durum:</b> {selectedJob.status}</Typography>
                    <Typography><b>Açıklama:</b> {selectedJob.desc}</Typography>
                  </Stack>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setSelectedJob(null)} variant="contained" color="primary">Kapat</Button>
              </DialogActions>
            </Dialog>
          </Box>
        )}

        {/* Kayıtlar Tabı */}
        {tab === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>Kayıtlar</Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              {records.length === 0 ? (
                <Typography color="text.secondary">Kayıt bulunamadı.</Typography>
              ) : (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>İşlem</TableCell>
                      <TableCell>Kullanıcı</TableCell>
                      <TableCell>Tarih</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {records.map((rec) => (
                      <TableRow key={rec.id} hover>
                        <TableCell>{rec.action}</TableCell>
                        <TableCell>{rec.user}</TableCell>
                        <TableCell>{rec.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </Paper>
          </Box>
        )}
      </Paper>
    </Box>
  );
}