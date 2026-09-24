// Product data – mirrors all products in products.html
// Images use paths relative to /public/images/ (copy from src/assets/images/anh/)

const BASE = './images/anh'

export const categories = [
  { id: 'ca-canh',      label: 'Cá Cảnh',              icon: 'fa-fish',         path: 'cá' },
  { id: 'tep-canh',     label: 'Tép Cảnh',              icon: 'fa-shrimp',       path: 'tép' },
  { id: 'cay-thuy-sinh',label: 'Cây Thủy Sinh',         icon: 'fa-seedling',     path: 'cây thủy sinh' },
  { id: 'den-thuy-sinh',label: 'Đèn Thủy Sinh',         icon: 'fa-lightbulb',    path: 'đèn thủy sinh' },
  { id: 'may-loc',      label: 'Máy Lọc & Vật Liệu',   icon: 'fa-filter',       path: 'máy lọc và vật liệu lọc' },
  { id: 'phan-nen',     label: 'Phân Nền & Cốt Nền',   icon: 'fa-layer-group',  path: 'phân nền , cốt nền , cát trải nền' },
  { id: 'thuc-an',      label: 'Thức Ăn',               icon: 'fa-bowl-food',    path: 'thức ăn' },
  { id: 'thuoc-ve-sinh',label: 'Thuốc & Vệ Sinh',       icon: 'fa-pills',        path: 'Thuốc & Chế phẩm dưỡng cá' },
]

export const products = [
  { id:1, name:'Thức Ăn Cá Cảnh MULTI COLOR', cat:'ca-canh', catLabel:'Cá Cảnh', price:50000, img:`${BASE}/cá/Thức Ăn Cá Cảnh MULTI COLOR.jpg`, featured:true },
  { id:2, name:'Thức Ăn Cho Cá Cảnh Tetra Color', cat:'ca-canh', catLabel:'Cá Cảnh', price:35000, img:`${BASE}/cá/Thức Ăn Cho Cá Cảnh Tetra Color.jpg` },
  { id:3, name:'Cá Congo', cat:'ca-canh', catLabel:'Cá Cảnh', price:120000, img:`${BASE}/cá/Cá Congo.jpg` },
  { id:4, name:'Cá Blenny', cat:'ca-canh', catLabel:'Cá Cảnh', price:45000, img:`${BASE}/cá/Cá Blenny.jpg` },
  { id:5, name:'Cá Otto', cat:'ca-canh', catLabel:'Cá Cảnh', price:65000, img:`${BASE}/cá/Cá Otto.jpg` },
  { id:6, name:'Cá Ranchu', cat:'ca-canh', catLabel:'Cá Cảnh', price:25000, img:`${BASE}/cá/Cá Ranchu.jpg`, featured:true },
  { id:7, name:'Keo Dán Thủy Sinh', cat:'cay-thuy-sinh', catLabel:'Cây Thủy Sinh', price:12000, img:`${BASE}/cây thủy sinh/Keo Dán Thủy Sinh.jpg` },
  { id:8, name:'Đèn Thủy Sinh Chihiros A2', cat:'cay-thuy-sinh', catLabel:'Cây Thủy Sinh', price:700000, img:`${BASE}/cây thủy sinh/Đèn Thủy Sinh Chihiros A2.jpg` },
  { id:9, name:'Đèn led thủy sinh D', cat:'cay-thuy-sinh', catLabel:'Cây Thủy Sinh', price:270000, img:`${BASE}/cây thủy sinh/Đèn led thủy sinh D.jpg` },
  { id:10, name:'Đèn LED Thủy Sinh ZY', cat:'cay-thuy-sinh', catLabel:'Cây Thủy Sinh', price:150000, img:`${BASE}/cây thủy sinh/Đèn LED Thủy Sinh ZY.jpg` },
  { id:11, name:'Đèn Thủy Sinh ZY-F4', cat:'cay-thuy-sinh', catLabel:'Cây Thủy Sinh', price:159000, img:`${BASE}/cây thủy sinh/Đèn Thủy Sinh ZY-F4.jpg`, featured:true },
  { id:12, name:'Đèn Thủy Sinh Chihiros A2', cat:'den-thuy-sinh', catLabel:'Đèn Thủy Sinh', price:700000, img:`${BASE}/đèn thủy sinh/Đèn Thủy Sinh Chihiros A2.jpg` },
  { id:13, name:'Đèn LED Thủy Sinh ZY', cat:'den-thuy-sinh', catLabel:'Đèn Thủy Sinh', price:150000, img:`${BASE}/đèn thủy sinh/Đèn LED Thủy Sinh ZY.jpg` },
  { id:14, name:'Đèn Thủy Sinh ZY-F4', cat:'den-thuy-sinh', catLabel:'Đèn Thủy Sinh', price:159000, img:`${BASE}/đèn thủy sinh/Đèn Thủy Sinh ZY-F4.jpg` },
  { id:15, name:'Đèn led thủy sinh D', cat:'den-thuy-sinh', catLabel:'Đèn Thủy Sinh', price:270000, img:`${BASE}/đèn thủy sinh/Đèn led thủy sinh D.jpg` },
  { id:16, name:'Đèn Thủy Sinh Neo Helios Flat XP', cat:'den-thuy-sinh', catLabel:'Đèn Thủy Sinh', price:350000, img:`${BASE}/đèn thủy sinh/Đèn Thủy Sinh Neo Helios Flat XP.jpg`, featured:true },
  { id:17, name:'Đèn LED Thủy Sinh Siêu Sáng DFS', cat:'den-thuy-sinh', catLabel:'Đèn Thủy Sinh', price:347000, img:`${BASE}/đèn thủy sinh/Đèn LED Thủy Sinh Siêu Sáng DFS.jpg` },
  { id:18, name:'Đèn Led Thủy Sinh Siêu Sáng DF', cat:'den-thuy-sinh', catLabel:'Đèn Thủy Sinh', price:365000, img:`${BASE}/đèn thủy sinh/Đèn Led Thủy Sinh Siêu Sáng DF.jpg` },
  { id:19, name:'Đèn Thủy Sinh RGB Week Raptor PRO (M series)', cat:'den-thuy-sinh', catLabel:'Đèn Thủy Sinh', price:1300000, img:`${BASE}/đèn thủy sinh/Đèn Thủy Sinh RGB Week Raptor PRO (M series).jpg` },
  { id:20, name:'Đèn Thủy Sinh 6 Hàng LED Siêu Sáng', cat:'den-thuy-sinh', catLabel:'Đèn Thủy Sinh', price:120000, img:`${BASE}/đèn thủy sinh/Đèn Thủy Sinh 6 Hàng LED Siêu Sáng.jpg` },
  { id:21, name:'Máy Lọc Váng Cherlam', cat:'may-loc', catLabel:'Máy Lọc & Vật Liệu', price:120000, img:`${BASE}/máy lọc và vật liệu lọc/Máy Lọc Váng Cherlam.jpg`, featured:true },
  { id:22, name:'Máy Lọc Treo Marine', cat:'may-loc', catLabel:'Máy Lọc & Vật Liệu', price:249000, img:`${BASE}/máy lọc và vật liệu lọc/Máy Lọc Treo Marine.jpg` },
  { id:23, name:'Máy Lọc Thùng Dophin', cat:'may-loc', catLabel:'Máy Lọc & Vật Liệu', price:1240000, img:`${BASE}/máy lọc và vật liệu lọc/Máy Lọc Thùng Dophin.jpg` },
  { id:24, name:'Máy Lọc Thùng OWL', cat:'may-loc', catLabel:'Máy Lọc & Vật Liệu', price:900000, img:`${BASE}/máy lọc và vật liệu lọc/Máy Lọc Thùng OWL.jpg` },
  { id:25, name:'Máy Lọc Thác Hepo', cat:'may-loc', catLabel:'Máy Lọc & Vật Liệu', price:160000, img:`${BASE}/máy lọc và vật liệu lọc/Máy Lọc Thác Hepo.jpg` },
  { id:26, name:'Máy Lọc Thùng CP', cat:'may-loc', catLabel:'Máy Lọc & Vật Liệu', price:890000, img:`${BASE}/máy lọc và vật liệu lọc/Máy Lọc Thùng CP.jpg`, featured:true },
  { id:27, name:'Máy Lọc Thùng Jinwa FTA', cat:'may-loc', catLabel:'Máy Lọc & Vật Liệu', price:850000, img:`${BASE}/máy lọc và vật liệu lọc/Máy Lọc Thùng Jinwa FTA.jpg` },
  { id:28, name:'Máy Lọc Treo SunSun YBG', cat:'may-loc', catLabel:'Máy Lọc & Vật Liệu', price:275000, img:`${BASE}/máy lọc và vật liệu lọc/Máy Lọc Treo SunSun YBG.jpg` },
  { id:29, name:'Máy Lọc Thác Sunsun XBA', cat:'may-loc', catLabel:'Máy Lọc & Vật Liệu', price:129000, img:`${BASE}/máy lọc và vật liệu lọc/Máy Lọc Thác Sunsun XBA.jpg` },
  { id:30, name:'Máy Lọc Thùng Eheim Classic', cat:'may-loc', catLabel:'Máy Lọc & Vật Liệu', price:1800000, img:`${BASE}/máy lọc và vật liệu lọc/Máy Lọc Thùng Eheim Classic.jpg` },
  { id:31, name:'Máy lọc váng Sunsun JY', cat:'may-loc', catLabel:'Máy Lọc & Vật Liệu', price:79000, img:`${BASE}/máy lọc và vật liệu lọc/Máy lọc váng Sunsun JY.jpg`, featured:true },
  { id:32, name:'Thức Ăn Cá Cảnh MULTI COLOR', cat:'thuc-an', catLabel:'Thức Ăn', price:50000, img:`${BASE}/thức ăn/Thức Ăn Cá Cảnh MULTI COLOR.jpg` },
  { id:33, name:'Tổng Hợp Thức Ăn Cho Cá PLECO', cat:'thuc-an', catLabel:'Thức Ăn', price:135000, img:`${BASE}/thức ăn/Tổng Hợp Thức Ăn Cho Cá PLECO.jpg` },
  { id:34, name:'Thức Ăn Cho Cá Cảnh Tetra Color', cat:'thuc-an', catLabel:'Thức Ăn', price:35000, img:`${BASE}/thức ăn/Thức Ăn Cho Cá Cảnh Tetra Color.jpg` },
  { id:35, name:'Thức Ăn Trùng Huyết Sấy Khô BIOZYM Dried Bloodworm', cat:'thuc-an', catLabel:'Thức Ăn', price:120000, img:`${BASE}/thức ăn/Thức Ăn Trùng Huyết Sấy Khô BIOZYM Dried Bloodworm.jpg` },
  { id:36, name:'Thức Ăn Cho Cá Tầng Đáy Algae Wafers - HIKARI', cat:'thuc-an', catLabel:'Thức Ăn', price:55000, img:`${BASE}/thức ăn/Thức Ăn Cho Cá Tầng Đáy Algae Wafers - HIKARI.jpg`, featured:true },
  { id:37, name:'Thuốc Diệt Đa Khuẩn Anti-Bio NUPHAR', cat:'thuoc-ve-sinh', catLabel:'Thuốc & Vệ Sinh', price:25000, img:`${BASE}/Thuốc & Chế phẩm dưỡng cá/Thuốc Diệt Đa Khuẩn Anti-Bio NUPHAR.jpg` },
  { id:38, name:'Thuốc Sát Khuẩn Hồ Cá Tép Pranee Aquarium-1', cat:'thuoc-ve-sinh', catLabel:'Thuốc & Vệ Sinh', price:8000, img:`${BASE}/Thuốc & Chế phẩm dưỡng cá/Thuốc Sát Khuẩn Hồ Cá Tép Pranee Aquarium-1.jpg` },
  { id:39, name:'API Melafix - Trị Thối Vây, Nấm, Rách Đuôi và Nhiễm Khuẩn', cat:'thuoc-ve-sinh', catLabel:'Thuốc & Vệ Sinh', price:270000, img:`${BASE}/Thuốc & Chế phẩm dưỡng cá/API Melafix - Trị Thối Vây, Nấm, Rách Đuôi và Nhiễm Khuẩn.jpg` },
  { id:40, name:'API Pimafix - Chữa bệnh nấm cá, mốc cá, ký sinh trùng', cat:'thuoc-ve-sinh', catLabel:'Thuốc & Vệ Sinh', price:250000, img:`${BASE}/Thuốc & Chế phẩm dưỡng cá/API Pimafix - Chữa bệnh nấm cá, mốc cá, ký sinh trùng.jpg` },
  { id:41, name:'Seachem Stressguard - dưỡng cá, giảm stress, khử độc nước', cat:'thuoc-ve-sinh', catLabel:'Thuốc & Vệ Sinh', price:175000, img:`${BASE}/Thuốc & Chế phẩm dưỡng cá/Seachem Stressguard - dưỡng cá, giảm stress, khử độc nước.jpg`, featured:true },
  { id:42, name:'Dung Dịch Diệt Rêu Hại COMFY', cat:'thuoc-ve-sinh', catLabel:'Thuốc & Vệ Sinh', price:85000, img:`${BASE}/Thuốc & Chế phẩm dưỡng cá/Dung Dịch Diệt Rêu Hại COMFY.jpg` },
]

export function formatPrice(n) {
  return n.toLocaleString('vi-VN') + 'đ'
}
