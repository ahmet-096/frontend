import React from "react";

type JobDetailProps = {
    title: string;
    company: string;
    location: string;
    postedDate: string;
    Description: string;
    requirements: string[] | string;
    applyUrl?: string;
    applicationCount?: number;
    jobType?: string;
};

const JobDetail: React.FC<JobDetailProps> = ({
    title,
    company,
    location,
    postedDate,
    Description,
    requirements,
    applyUrl,
    applicationCount,
    jobType

}) => {
    const reqList = Array.isArray(requirements)
        ? requirements
        : requirements
            ? requirements.split(",").map(r => r.trim())
            : [];
    const jobTypeToText = (type: string | number) => {
        switch (type) {
            case 0:
            case "0":
                return "Tam Zamanlı";
            case 1:
            case "1":
                return "Yarı Zamanlı";
            case 2:
            case "2":
                return "Dönemsel";
            default:
                return "Belirtilmedi";
        }
    };
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 w-full">
                {/* Üst alan */}
                <div className="bg-white rounded-t-xl border-b flex flex-col md:flex-row justify-between items-start px-6 pt-8 pb-6 relative">
                    <div>
                        <h1 className="text-2xl font-extrabold text-blue-700 tracking-tight m-0">{title}</h1>
                        <h2 className="text-lg font-semibold text-gray-700 mt-2">{company}</h2>
                        <div className="text-gray-500 text-sm mt-2 flex flex-wrap gap-2">
                            <span>{location}</span>
                            <span>|</span>
                            <span>
                                {new Date(postedDate).toLocaleDateString("tr-TR", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric"
                                })}
                            </span>
                        </div>
                    </div>
                    {/* Sağ üstte başvuru sayısı ve başvur butonu */}
                    <div className="flex flex-col items-end gap-2 mt-4 md:mt-0 md:absolute md:right-6 md:top-8">
                        {typeof applicationCount === "number" && (
                            <div className="text-blue-700 font-bold text-base">{applicationCount} başvuru</div>
                        )}
                        {applyUrl && (
                            <a
                                href={applyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg font-bold text-base shadow hover:from-blue-700 hover:to-blue-900 transition"
                            >
                                Başvur
                            </a>
                        )}
                    </div>
                </div>

                {/* Bilgi kutuları */}
                <div className="flex flex-col md:flex-row gap-4 px-6 pt-6">
                    <div className="bg-white rounded-lg shadow p-4 flex-1 min-w-[140px]">
                        <div className="text-gray-400 text-xs">Çalışma Şekli</div>
                        <div className="text-blue-700 font-semibold text-sm mt-1">{jobTypeToText(jobType ?? "")}</div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4 flex-1 min-w-[140px]">
                        <div className="text-gray-400 text-xs">Sektör</div>
                        <div className="text-blue-700 font-semibold text-sm mt-1">Yiyecek ve İçecek</div>
                    </div>
                </div>

                {/* Açıklama ve nitelikler */}
                <div className="px-6 pt-8 pb-8">
                    <h3 className="text-blue-700 font-bold text-base mb-3">GENEL NİTELİKLER VE İŞ TANIMI</h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-6">{Description}</p>
                    <h3 className="text-blue-700 font-bold text-base mb-2">Aranan Nitelikler</h3>
                    <ul className="list-disc pl-5">
                        {reqList.map((req, idx) => (
                            <li key={idx} className="text-gray-700 text-sm mb-2">{req}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default JobDetail;