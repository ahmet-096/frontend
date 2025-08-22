'use client'
import React, { useState } from "react";
import { UserOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Input, Modal, message, Avatar} from "antd";
import {Button} from 'antd'
import 'antd/lib/button/style';

const { TextArea } = Input;

const initialProfile = {
    name: "Ahmet Yılmaz",
    email: "ahmet.yilmaz@example.com",
    phone: "+90 555 123 45 67",
    profession: "Yazılım Geliştirici",
    bio: "5 yıldır web geliştirme alanında çalışıyorum. React ve Node.js konusunda uzmanım.",
};

const CandidateProfile: React.FC = () => {
    const [profile, setProfile] = useState(initialProfile);
    const [editing, setEditing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [form, setForm] = useState(initialProfile);

    const handleEdit = () => {
        setForm(profile);
        setEditing(true);
    };

    const handleSave = () => {
        setProfile(form);
        setEditing(false);
        message.success("Profiliniz başarıyla güncellendi.");
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleDelete = () => {
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        setShowDeleteModal(false);
        message.success("Hesabınız silindi.");
        // Burada yönlendirme veya başka bir işlem ekleyebilirsiniz.
    };

    return (
        <div
            style={{
                maxWidth: 420,
                margin: "48px auto",
                padding: 32,
                background: "linear-gradient(135deg,#f8fafc 0%,#e0e7ff 100%)",
                borderRadius: 24,
                boxShadow: "0 8px 32px rgba(60,60,120,0.10)",
                textAlign: "center",
                position: "relative",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: 24,
                    right: 24,
                }}
            >
                <Button
                    danger
                    icon={<DeleteOutlined />}
                    size="small"
                    onClick={handleDelete}
                >
                    Hesabı Sil
                </Button>
            </div>
            <Avatar
                size={100}
                icon={<UserOutlined />}
                style={{
                    marginBottom: 18,
                    background: "linear-gradient(135deg,#6366f1 0%,#818cf8 100%)",
                }}
            />
            {!editing ? (
                <>
                    <h2 style={{ marginBottom: 4, fontWeight: 700 }}>{profile.name}</h2>
                    <span
                        style={{
                            display: "inline-block",
                            background: "#eef2ff",
                            color: "#6366f1",
                            padding: "4px 12px",
                            borderRadius: 12,
                            fontSize: 15,
                            marginBottom: 16,
                        }}
                    >
                        {profile.profession}
                    </span>
                    <div
                        style={{
                            background: "#f1f5f9",
                            borderRadius: 12,
                            padding: "16px 0",
                            marginBottom: 16,
                            fontSize: 15,
                        }}
                    >
                        <div style={{ marginBottom: 8 }}>
                            <strong>Email:</strong> {profile.email}
                        </div>
                        <div>
                            <strong>Telefon:</strong> {profile.phone}
                        </div>
                    </div>
                    <p
                        style={{
                            fontStyle: "italic",
                            color: "#475569",
                            background: "#f3f4f6",
                            borderRadius: 10,
                            padding: 12,
                            marginBottom: 16,
                        }}
                    >
                        {profile.bio}
                    </p>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={handleEdit}
                        style={{
                            background: "linear-gradient(90deg,#6366f1 0%,#818cf8 100%)",
                            border: "none",
                            fontWeight: 600,
                        }}
                    >
                        Düzenle
                    </Button>
                </>
            ) : (
                <div style={{ textAlign: "left", marginTop: 8 }}>
                    <Input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Ad Soyad"
                        style={{ marginBottom: 14 }}
                        size="large"
                    />
                    <Input
                        name="profession"
                        value={form.profession}
                        onChange={handleChange}
                        placeholder="Meslek"
                        style={{ marginBottom: 14 }}
                        size="large"
                    />
                    <Input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email"
                        style={{ marginBottom: 14 }}
                        size="large"
                    />
                    <Input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Telefon"
                        style={{ marginBottom: 14 }}
                        size="large"
                    />
                    <TextArea
                        name="bio"
                        value={form.bio}
                        onChange={handleChange}
                        placeholder="Kısa Biyografi"
                        rows={3}
                        style={{ marginBottom: 14 }}
                    />
                    <div style={{ textAlign: "center", marginTop: 18 }}>
                        <Button
                            type="primary"
                            onClick={handleSave}
                            style={{
                                marginRight: 12,
                                background: "linear-gradient(90deg,#6366f1 0%,#818cf8 100%)",
                                border: "none",
                                fontWeight: 600,
                            }}
                        >
                            Kaydet
                        </Button>
                        <Button onClick={() => setEditing(false)}>İptal</Button>
                    </div>
                </div>
            )}

            <Modal
                title="Hesabı Sil"
                open={showDeleteModal}
                onOk={confirmDelete}
                onCancel={() => setShowDeleteModal(false)}
                okText="Evet, Sil"
                cancelText="Vazgeç"
                okButtonProps={{ danger: true }}
            >
                <p>Hesabınızı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.</p>
            </Modal>
        </div>
    );
};

export default CandidateProfile;