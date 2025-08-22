export interface Ilan {
  _id?: string;
  baslik: string;
  sirket?: string;
  sehir: string;
  mahalle?: string;
  tarih: string;
  maas?: string;
  yabanci_dil?: string;
  bilgisayar_programi?: string;
}
  
export const beylikduzuMahalleleri = [
  "Adnan Kahveci", 
  "Barış", 
  "Büyükşehir", 
  "Cumhuriyet", 
  "Dereağzı", 
  "Gürpınar", 
  "Kavaklı", 
  "Marmara", 
  "Sahil", 
  "Yakuplu"
];

export default beylikduzuMahalleleri;
export const populerPozisyonlar = [
  "Yazılım Geliştirici",
  "Satış Temsilcisi",
  "Proje Yöneticisi",
  "Muhasebe Uzmanı",
  "İnsan Kaynakları Uzmanı",
  "Sekreter",
  "Pazarlama Uzmanı",
  "Çağrı Merkezi Temsilcisi",
  "Teknik Servis",
  "Şoför",
];
export const yabanciDiller = [
  "İngilizce",
  "Almanca",
  "Fransızca",
  "Rusça",
  "Arapça",
  "İspanyolca",
  "İtalyanca"
];
export const bilgisayarProgramlari = [
  "Microsoft Office",
  "Excel",
  "Word",
  "PowerPoint",
  "Photoshop",
  "AutoCAD",
  "SolidWorks",
  "Logo",
  "SAP",
  "Canva",
  "CorelDRAW",
  "Premiere Pro",
  "Illustrator",
  "Unity",
  "Visual Studio",
  "NetCAD"
];