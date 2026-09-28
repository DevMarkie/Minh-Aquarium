// Product data – dựng từ ảnh thật trong /public/images/anh
// Giá là giá tham khảo thị trường, chỉnh lại theo shop nếu cần.

const BASE = './images/anh'

export const categories = [
  { id: 'ca-canh',      label: 'Cá Cảnh',            icon: 'fa-fish',        path: 'cá' },
  { id: 'tep-canh',     label: 'Tép Cảnh',           icon: 'fa-shrimp',      path: 'tép' },
  { id: 'cay-thuy-sinh',label: 'Cây Thủy Sinh',      icon: 'fa-seedling',    path: 'cây thủy sinh' },
  { id: 'den-thuy-sinh',label: 'Đèn Thủy Sinh',      icon: 'fa-lightbulb',   path: 'đèn thủy sinh' },
  { id: 'may-loc',      label: 'Máy Lọc & Vật Liệu', icon: 'fa-filter',      path: 'máy lọc và vật liệu lọc' },
  { id: 'may-suoi-sui', label: 'Máy Sủi & Sưởi',     icon: 'fa-fan',         path: '' },
  { id: 'phan-nen',     label: 'Phân Nền & Cát Nền', icon: 'fa-layer-group', path: 'phân nền , cốt nền , cát trải nền' },
  { id: 'thuc-an',      label: 'Thức Ăn',            icon: 'fa-bowl-food',   path: 'thức ăn' },
  { id: 'vi-sinh',      label: 'Vi Sinh & Chế Phẩm', icon: 'fa-vial',        path: '' },
  { id: 'thuoc-ve-sinh',label: 'Thuốc & Dưỡng Cá',   icon: 'fa-pills',       path: 'Thuốc & Chế phẩm dưỡng cá' },
]

// helper để bớt lặp đường dẫn
const P = (folder, file) => `${BASE}/${folder}/${file}`
const LOGO = `${BASE}/logo_transparent.png` // ảnh tạm cho sản phẩm chưa có hình thật
const CA = 'cá', TEP = 'tép', CAY = 'cây thủy sinh', DEN = 'đèn thủy sinh'
const LOC = 'máy lọc và vật liệu lọc', NEN = 'phân nền , cốt nền , cát trải nền'
const AN = 'thức ăn', THUOC = 'Thuốc & Chế phẩm dưỡng cá'

export const products = [
  // ===== CÁ CẢNH =====
  { id:1,  name:'Cá Congo',              cat:'ca-canh', catLabel:'Cá Cảnh', price:120000, img:P(CA,'Cá Congo.jpg'), featured:true },
  { id:2,  name:'Cá Blenny',             cat:'ca-canh', catLabel:'Cá Cảnh', price:45000,  img:P(CA,'Cá Blenny.jpg') },
  { id:3,  name:'Cá Otto',               cat:'ca-canh', catLabel:'Cá Cảnh', price:15000,  img:P(CA,'Cá Otto.jpg') },
  { id:4,  name:'Cá Ranchu',             cat:'ca-canh', catLabel:'Cá Cảnh', price:80000,  img:P(CA,'Cá Ranchu.jpg'), featured:true },
  { id:5,  name:'Betta Fancy',           cat:'ca-canh', catLabel:'Cá Cảnh', price:150000, img:P(CA,'betta fancy.webp') },
  { id:6,  name:'Betta Galaxy',          cat:'ca-canh', catLabel:'Cá Cảnh', price:180000, img:P(CA,'betta galaxy.webp'), featured:true },
  { id:7,  name:'Betta Half Moon',       cat:'ca-canh', catLabel:'Cá Cảnh', price:120000, img:P(CA,'betta half moon.webp') },
  { id:8,  name:'Cá Chuột Panda',        cat:'ca-canh', catLabel:'Cá Cảnh', price:35000,  img:P(CA,'chuột panda.webp') },
  { id:9,  name:'Cá Chuột Cafe',         cat:'ca-canh', catLabel:'Cá Cảnh', price:30000,  img:P(CA,'chuột cafe.webp') },
  { id:10, name:'Cá Chuột Gold Laser',   cat:'ca-canh', catLabel:'Cá Cảnh', price:45000,  img:P(CA,'chuột gold laser.webp') },
  { id:11, name:'Cá Chuột Pygmy',        cat:'ca-canh', catLabel:'Cá Cảnh', price:25000,  img:P(CA,'chuột pygmy.webp') },
  { id:12, name:'Cá Chuột Sao',          cat:'ca-canh', catLabel:'Cá Cảnh', price:30000,  img:P(CA,'chuột sao.webp') },
  { id:13, name:'Cá Bống Panda',         cat:'ca-canh', catLabel:'Cá Cảnh', price:25000,  img:P(CA,'bống panda.webp') },
  { id:14, name:'Cá Bống Tê Giác',       cat:'ca-canh', catLabel:'Cá Cảnh', price:40000,  img:P(CA,'bống tê giác.webp') },
  { id:15, name:'Cá Bác Sĩ Panda',       cat:'ca-canh', catLabel:'Cá Cảnh', price:35000,  img:P(CA,'bác sĩ panda.webp') },
  { id:16, name:'Cá Trâm',               cat:'ca-canh', catLabel:'Cá Cảnh', price:8000,   img:P(CA,'cá trâm.webp') },
  { id:17, name:'Cá Cầu Vồng Chấm Bi',   cat:'ca-canh', catLabel:'Cá Cảnh', price:35000,  img:P(CA,'cầu vồng chấm bi.webp') },
  { id:18, name:'Cá Diếc Anh Đào',       cat:'ca-canh', catLabel:'Cá Cảnh', price:12000,  img:P(CA,'diếc anh dào.webp') },
  { id:19, name:'Cá Diếc Anh Đào Albino',cat:'ca-canh', catLabel:'Cá Cảnh', price:15000,  img:P(CA,'diếc anh đào abino.webp') },
  { id:20, name:'Cá Ember Tetra',        cat:'ca-canh', catLabel:'Cá Cảnh', price:10000,  img:P(CA,'ember tetra.webp') },
  { id:21, name:'Cá Neon Xanh',          cat:'ca-canh', catLabel:'Cá Cảnh', price:8000,   img:P(CA,'neon xanh.webp') },
  { id:22, name:'Cá Neon Vua',           cat:'ca-canh', catLabel:'Cá Cảnh', price:20000,  img:P(CA,'neon vua.webp') },
  { id:23, name:'Cá Neon Hoàng Đế',      cat:'ca-canh', catLabel:'Cá Cảnh', price:25000,  img:P(CA,'neon hoàng đế.webp') },
  { id:24, name:'Cá Neon Kim Cương',     cat:'ca-canh', catLabel:'Cá Cảnh', price:15000,  img:P(CA,'neon kim cương.png') },
  { id:25, name:'Cá Neon Chỉ Đỏ',        cat:'ca-canh', catLabel:'Cá Cảnh', price:10000,  img:P(CA,'neon chỉ đỏ.webp') },
  { id:26, name:'Cá Neon Đen',           cat:'ca-canh', catLabel:'Cá Cảnh', price:12000,  img:P(CA,'neon đen.webp') },
  { id:27, name:'Cá Neon Albino',        cat:'ca-canh', catLabel:'Cá Cảnh', price:12000,  img:P(CA,'neon abino.webp') },
  { id:28, name:'Cá Sóc Đầu Đỏ',         cat:'ca-canh', catLabel:'Cá Cảnh', price:15000,  img:P(CA,'sóc đầu đỏ.webp') },
  { id:29, name:'Cá Tam Giác',           cat:'ca-canh', catLabel:'Cá Cảnh', price:12000,  img:P(CA,'tam giác.webp') },
  { id:30, name:'Cá Tam Giác Vua',       cat:'ca-canh', catLabel:'Cá Cảnh', price:18000,  img:P(CA,'tam giác vua.webp') },
  { id:31, name:'Cá Trâm Galaxy',        cat:'ca-canh', catLabel:'Cá Cảnh', price:15000,  img:P(CA,'trâm galaxy.webp') },
  { id:32, name:'Cá Trạch Culi',         cat:'ca-canh', catLabel:'Cá Cảnh', price:35000,  img:P(CA,'trạch culi.webp') },
  { id:33, name:'Cá Kili Ngọc Trai Đen', cat:'ca-canh', catLabel:'Cá Cảnh', price:55000,  img:P(CA,'kili ngọc trai đen.webp') },
  { id:34, name:'Cá Kili Guetheri',      cat:'ca-canh', catLabel:'Cá Cảnh', price:60000,  img:P(CA,'kili guetheri.webp') },
  { id:35, name:'Cá Kili Rachovii',      cat:'ca-canh', catLabel:'Cá Cảnh', price:50000,  img:P(CA,'kili rachovii.webp') },
  { id:36, name:'Cá Logfin',             cat:'ca-canh', catLabel:'Cá Cảnh', price:15000,  img:P(CA,'logfin.webp') },

  // ===== TÉP CẢNH =====
  { id:37, name:'Tép Fire Red',          cat:'tep-canh', catLabel:'Tép Cảnh', price:20000,  img:P(TEP,'fire red.webp'), featured:true },
  { id:38, name:'Tép Blue Dream',        cat:'tep-canh', catLabel:'Tép Cảnh', price:25000,  img:P(TEP,'bule fream.webp') },
  { id:39, name:'Tép Yamato',            cat:'tep-canh', catLabel:'Tép Cảnh', price:15000,  img:P(TEP,'yamto.webp') },
  { id:40, name:'Tép Mũi Đỏ',            cat:'tep-canh', catLabel:'Tép Cảnh', price:30000,  img:P(TEP,'mũi đỏ.webp') },
  { id:41, name:'Tép Loạn Màu',          cat:'tep-canh', catLabel:'Tép Cảnh', price:15000,  img:P(TEP,'loạn màu.webp') },
  { id:42, name:'Tép Vàng Đài',          cat:'tep-canh', catLabel:'Tép Cảnh', price:22000,  img:P(TEP,'vàng đài.webp') },
  { id:43, name:'Tép Sula Chân Trắng',   cat:'tep-canh', catLabel:'Tép Cảnh', price:18000,  img:P(TEP,'sula chân trắng.webp') },
  { id:44, name:'Tép Yellow Cheek',      cat:'tep-canh', catLabel:'Tép Cảnh', price:35000,  img:P(TEP,'yellow cheek.webp') },
  { id:45, name:'Tép Pure Red Line',     cat:'tep-canh', catLabel:'Tép Cảnh', price:120000, img:P(TEP,'pure red line.webp'), featured:true },
  { id:46, name:'Tép Red Pinto Galaxy',  cat:'tep-canh', catLabel:'Tép Cảnh', price:250000, img:P(TEP,'red pinto galaxy.webp') },

  // ===== CÂY THỦY SINH =====
  { id:47, name:'Ráy Nana Petite',       cat:'cay-thuy-sinh', catLabel:'Cây Thủy Sinh', price:40000,  img:P(CAY,'ráy nana petite.webp'), featured:true },
  { id:48, name:'Ráy Nan White',         cat:'cay-thuy-sinh', catLabel:'Cây Thủy Sinh', price:45000,  img:P(CAY,'ráy nan white.png') },
  { id:49, name:'Ráy Pinto',             cat:'cay-thuy-sinh', catLabel:'Cây Thủy Sinh', price:120000, img:P(CAY,'ráy pinto.png'), featured:true },
  { id:50, name:'Ráy Châu Phi',          cat:'cay-thuy-sinh', catLabel:'Cây Thủy Sinh', price:35000,  img:P(CAY,'ráy châu phi.png') },
  { id:51, name:'Dương Xỉ Java',         cat:'cay-thuy-sinh', catLabel:'Cây Thủy Sinh', price:25000,  img:P(CAY,'dương xỉ java.jpg') },
  { id:52, name:'Dương Xỉ Châu Phi',     cat:'cay-thuy-sinh', catLabel:'Cây Thủy Sinh', price:35000,  img:P(CAY,'dương xỉ châu phi.jpg') },
  { id:53, name:'Dương Xỉ Lá Hẹp',       cat:'cay-thuy-sinh', catLabel:'Cây Thủy Sinh', price:30000,  img:P(CAY,'dương xỉ lá hẹp.jpg') },
  { id:54, name:'Dương Xỉ Lá Kim',       cat:'cay-thuy-sinh', catLabel:'Cây Thủy Sinh', price:35000,  img:P(CAY,'dương xỉ lá kim.jpg') },
  { id:55, name:'Dương Xỉ Sừng Hươu',    cat:'cay-thuy-sinh', catLabel:'Cây Thủy Sinh', price:45000,  img:P(CAY,'dương xỉ sừng hươu.jpg') },
  { id:56, name:'Dương Xỉ Mỹ Nhân',      cat:'cay-thuy-sinh', catLabel:'Cây Thủy Sinh', price:40000,  img:P(CAY,'dương xỉ mỹ nhân.jpg') },
  { id:57, name:'Rêu Java',              cat:'cay-thuy-sinh', catLabel:'Cây Thủy Sinh', price:25000,  img:P(CAY,'rêu java.jpg') },
  { id:58, name:'Rêu Mini Fiss',         cat:'cay-thuy-sinh', catLabel:'Cây Thủy Sinh', price:60000,  img:P(CAY,'rêu mini fiss.png'), featured:true },
  { id:59, name:'Rêu Weeping',           cat:'cay-thuy-sinh', catLabel:'Cây Thủy Sinh', price:45000,  img:P(CAY,'rêu weeping.png') },
  { id:60, name:'Rêu Willow',            cat:'cay-thuy-sinh', catLabel:'Cây Thủy Sinh', price:40000,  img:P(CAY,'rêu willow.png') },
  { id:61, name:'Rêu Flame',             cat:'cay-thuy-sinh', catLabel:'Cây Thủy Sinh', price:50000,  img:P(CAY,'rêu flame.png') },
  { id:62, name:'Rêu Christmas',         cat:'cay-thuy-sinh', catLabel:'Cây Thủy Sinh', price:45000,  img:P(CAY,'Rêu christmas.png') },
  { id:63, name:'Trân Châu Cuba',        cat:'cay-thuy-sinh', catLabel:'Cây Thủy Sinh', price:55000,  img:P(CAY,'trân châu cuba.jpg') },
  { id:64, name:'Cỏ Thìa',               cat:'cay-thuy-sinh', catLabel:'Cây Thủy Sinh', price:20000,  img:P(CAY,'cỏ thìa.jpg') },
  { id:65, name:'Hẹ Thẳng',              cat:'cay-thuy-sinh', catLabel:'Cây Thủy Sinh', price:15000,  img:P(CAY,'hẹ thẳng.jpg') },
  { id:66, name:'Tiêu Thảo',             cat:'cay-thuy-sinh', catLabel:'Cây Thủy Sinh', price:20000,  img:P(CAY,'tiêu thảo.png') },
  { id:67, name:'Huyết Tâm Lan Mini',    cat:'cay-thuy-sinh', catLabel:'Cây Thủy Sinh', price:30000,  img:P(CAY,'huyết tâm lan mini.png') },
  { id:68, name:'Hồng Thái Dương',       cat:'cay-thuy-sinh', catLabel:'Cây Thủy Sinh', price:35000,  img:P(CAY,'hồng thái dương.jpg') },
  { id:69, name:'La Hán Đỏ',             cat:'cay-thuy-sinh', catLabel:'Cây Thủy Sinh', price:40000,  img:P(CAY,'la hán đỏ.jpeg') },
  { id:70, name:'Tân Đế Tài Hồng',       cat:'cay-thuy-sinh', catLabel:'Cây Thủy Sinh', price:30000,  img:P(CAY,'tân đế tài hồng.png') },
  { id:71, name:'Vẩy Ốc Đỏ',             cat:'cay-thuy-sinh', catLabel:'Cây Thủy Sinh', price:35000,  img:P(CAY,'vẩy ốc đỏ.jpg') },
  { id:72, name:'Đại Hồng Điệp',         cat:'cay-thuy-sinh', catLabel:'Cây Thủy Sinh', price:30000,  img:P(CAY,'đại hồng điệp.jpeg') },
  { id:73, name:'Keo Dán Thủy Sinh',     cat:'cay-thuy-sinh', catLabel:'Cây Thủy Sinh', price:12000,  img:P(CAY,'Keo Dán Thủy Sinh.jpg') },

  // ===== ĐÈN THỦY SINH =====
  { id:74, name:'Đèn Thủy Sinh Chihiros A2',              cat:'den-thuy-sinh', catLabel:'Đèn Thủy Sinh', price:700000,  img:P(DEN,'Đèn Thủy Sinh Chihiros A2.jpg'), featured:true },
  { id:75, name:'Đèn LED Thủy Sinh ZY',                   cat:'den-thuy-sinh', catLabel:'Đèn Thủy Sinh', price:150000,  img:P(DEN,'Đèn LED Thủy Sinh ZY.jpg') },
  { id:76, name:'Đèn Thủy Sinh ZY-F4',                    cat:'den-thuy-sinh', catLabel:'Đèn Thủy Sinh', price:159000,  img:P(DEN,'Đèn Thủy Sinh ZY-F4.jpg') },
  { id:77, name:'Đèn LED Thủy Sinh D',                    cat:'den-thuy-sinh', catLabel:'Đèn Thủy Sinh', price:270000,  img:P(DEN,'Đèn led thủy sinh D.jpg') },
  { id:78, name:'Đèn Thủy Sinh Neo Helios Flat XP',       cat:'den-thuy-sinh', catLabel:'Đèn Thủy Sinh', price:350000,  img:P(DEN,'Đèn Thủy Sinh Neo Helios Flat XP.jpg'), featured:true },
  { id:79, name:'Đèn LED Thủy Sinh Siêu Sáng DFS',        cat:'den-thuy-sinh', catLabel:'Đèn Thủy Sinh', price:347000,  img:P(DEN,'Đèn LED Thủy Sinh Siêu Sáng DFS.jpg') },
  { id:80, name:'Đèn LED Thủy Sinh Siêu Sáng DF',         cat:'den-thuy-sinh', catLabel:'Đèn Thủy Sinh', price:365000,  img:P(DEN,'Đèn Led Thủy Sinh Siêu Sáng DF.jpg') },
  { id:81, name:'Đèn Thủy Sinh RGB Week Raptor PRO',      cat:'den-thuy-sinh', catLabel:'Đèn Thủy Sinh', price:1300000, img:P(DEN,'Đèn Thủy Sinh RGB Week Raptor PRO (M series).jpg') },
  { id:82, name:'Đèn Thủy Sinh 6 Hàng LED Siêu Sáng',     cat:'den-thuy-sinh', catLabel:'Đèn Thủy Sinh', price:120000,  img:P(DEN,'Đèn Thủy Sinh 6 Hàng LED Siêu Sáng.jpg') },

  // ===== MÁY LỌC & VẬT LIỆU =====
  { id:83, name:'Máy Lọc Váng Cherlam',   cat:'may-loc', catLabel:'Máy Lọc & Vật Liệu', price:120000,  img:P(LOC,'Máy Lọc Váng Cherlam.jpg'), featured:true },
  { id:84, name:'Máy Lọc Treo Marine',    cat:'may-loc', catLabel:'Máy Lọc & Vật Liệu', price:249000,  img:P(LOC,'Máy Lọc Treo Marine.jpg') },
  { id:85, name:'Máy Lọc Thùng Dophin',   cat:'may-loc', catLabel:'Máy Lọc & Vật Liệu', price:1240000, img:P(LOC,'Máy Lọc Thùng Dophin.jpg') },
  { id:86, name:'Máy Lọc Thùng OWL',      cat:'may-loc', catLabel:'Máy Lọc & Vật Liệu', price:900000,  img:P(LOC,'Máy Lọc Thùng OWL.jpg') },
  { id:87, name:'Máy Lọc Thác Hepo',      cat:'may-loc', catLabel:'Máy Lọc & Vật Liệu', price:160000,  img:P(LOC,'Máy Lọc Thác Hepo.jpg') },
  { id:88, name:'Máy Lọc Thùng CP',       cat:'may-loc', catLabel:'Máy Lọc & Vật Liệu', price:890000,  img:P(LOC,'Máy Lọc Thùng CP.jpg'), featured:true },
  { id:89, name:'Máy Lọc Thùng Jinwa FTA',cat:'may-loc', catLabel:'Máy Lọc & Vật Liệu', price:850000,  img:P(LOC,'Máy Lọc Thùng Jinwa FTA.jpg') },
  { id:90, name:'Máy Lọc Treo SunSun YBG', cat:'may-loc', catLabel:'Máy Lọc & Vật Liệu', price:380000,  img:P(LOC,'Máy Lọc Treo SunSun YBG.jpg') },
  { id:91, name:'Máy Lọc Thác Sunsun XBA',cat:'may-loc', catLabel:'Máy Lọc & Vật Liệu', price:129000,  img:P(LOC,'Máy Lọc Thác Sunsun XBA.jpg') },
  { id:92, name:'Máy Lọc Thùng Eheim Classic', cat:'may-loc', catLabel:'Máy Lọc & Vật Liệu', price:1800000, img:P(LOC,'Máy Lọc Thùng Eheim Classic.jpg') },
  { id:93, name:'Máy Lọc Váng Sunsun JY', cat:'may-loc', catLabel:'Máy Lọc & Vật Liệu', price:79000,   img:P(LOC,'Máy lọc váng Sunsun JY.jpg') },

  // ===== PHÂN NỀN & CÁT NỀN =====
  { id:94,  name:'Phân Nền ADA Amazonia Ver.2 (1L)', cat:'phan-nen', catLabel:'Phân Nền & Cát Nền', price:115000, img:P(NEN,'ADA Amazonia Ver.2.webp'), featured:true },
  { id:95,  name:'ADA Power Sand',              cat:'phan-nen', catLabel:'Phân Nền & Cát Nền', price:350000, img:P(NEN,'ADA Power Sand.webp') },
  { id:96,  name:'Phân Nền Contro Soil',        cat:'phan-nen', catLabel:'Phân Nền & Cát Nền', price:280000, img:P(NEN,'Contro Soil.webp') },
  { id:97,  name:'Phân Nền Neo Soil Plant',     cat:'phan-nen', catLabel:'Phân Nền & Cát Nền', price:250000, img:P(NEN,'Neo Soil Plant.webp') },
  { id:98,  name:'Phân Nền JBL AquaBasis Plus', cat:'phan-nen', catLabel:'Phân Nền & Cát Nền', price:320000, img:P(NEN,'JBL AquaBasis Plus.webp') },
  { id:99,  name:'Phân Nền GEX Green (1kg)',   cat:'phan-nen', catLabel:'Phân Nền & Cát Nền', price:75000, img:P(NEN,'GEX Green (Xanh).webp') },
  { id:100, name:'Cốt Nền Magic Base',          cat:'phan-nen', catLabel:'Phân Nền & Cát Nền', price:150000, img:P(NEN,'Magic Base.webp') },
  { id:101, name:'Phân Nền Senda',              cat:'phan-nen', catLabel:'Phân Nền & Cát Nền', price:120000, img:P(NEN,'Senda (Việt Nam).webp'), featured:true },
  { id:102, name:'Cát Muối Tiêu',               cat:'phan-nen', catLabel:'Phân Nền & Cát Nền', price:60000,  img:P(NEN,'Cát Muối Tiêu.webp') },
  { id:103, name:'Cát Nắng Trắng',              cat:'phan-nen', catLabel:'Phân Nền & Cát Nền', price:55000,  img:P(NEN,'Cát Nắng Trắng.webp') },
  { id:104, name:'Cát Nắng Vàng',               cat:'phan-nen', catLabel:'Phân Nền & Cát Nền', price:55000,  img:P(NEN,'Cát Nắng Vàng.webp') },
  { id:105, name:'Cát Đỏ Ruby',                 cat:'phan-nen', catLabel:'Phân Nền & Cát Nền', price:70000,  img:P(NEN,'cát đỏ ruby.webp') },

  // ===== THỨC ĂN =====
  { id:106, name:'Thức Ăn Cá Cảnh MULTI COLOR',            cat:'thuc-an', catLabel:'Thức Ăn', price:50000,  img:P(AN,'Thức Ăn Cá Cảnh MULTI COLOR.jpg'), featured:true },
  { id:107, name:'Thức Ăn Tetra Color',                    cat:'thuc-an', catLabel:'Thức Ăn', price:35000,  img:P(AN,'Thức Ăn Cho Cá Cảnh Tetra Color.jpg') },
  { id:108, name:'Tổng Hợp Thức Ăn Cho Cá PLECO',          cat:'thuc-an', catLabel:'Thức Ăn', price:135000, img:P(AN,'Tổng Hợp Thức Ăn Cho Cá PLECO.jpg') },
  { id:109, name:'Thức Ăn Tầng Đáy Algae Wafers HIKARI',   cat:'thuc-an', catLabel:'Thức Ăn', price:55000,  img:P(AN,'Thức Ăn Cho Cá Tầng Đáy Algae Wafers - HIKARI.jpg'), featured:true },
  { id:110, name:'Trùng Huyết Sấy Khô BIOZYM',             cat:'thuc-an', catLabel:'Thức Ăn', price:120000, img:P(AN,'Thức Ăn Trùng Huyết Sấy Khô BIOZYM Dried Bloodworm.jpg') },
  { id:111, name:'Hikari Betta Bio-Gold',                  cat:'thuc-an', catLabel:'Thức Ăn', price:60000,  img:P(AN,'Hikari Betta Bio-Gold.webp') },
  { id:112, name:'Shirakura Ebi Dama (Thức Ăn Tép)',       cat:'thuc-an', catLabel:'Thức Ăn', price:180000, img:P(AN,'Shirakura Ebi Dama.webp'), featured:true },
  { id:113, name:'Sera Vipagran',                          cat:'thuc-an', catLabel:'Thức Ăn', price:95000,  img:P(AN,'Sera Vipagran.webp') },
  { id:114, name:'Tropical Nanovit',                       cat:'thuc-an', catLabel:'Thức Ăn', price:85000,  img:P(AN,'Tropical Nanovit.webp') },
  { id:115, name:'Tropical Soft Line',                     cat:'thuc-an', catLabel:'Thức Ăn', price:90000,  img:P(AN,'Tropical Soft Line.webp') },
  { id:116, name:'Artemia Sấy Khô',                        cat:'thuc-an', catLabel:'Thức Ăn', price:45000,  img:P(AN,'Artemia Sấy Khô.webp') },
  { id:117, name:'Trứng Artemia Mỹ',                       cat:'thuc-an', catLabel:'Thức Ăn', price:220000, img:P(AN,'Trứng Artemia Mỹ.webp') },
  { id:118, name:'Trùng Huyết Đông Lạnh',                  cat:'thuc-an', catLabel:'Thức Ăn', price:25000,  img:P(AN,'Trùng Huyết Đông Lạnh.webp') },
  { id:119, name:'Trùng Chỉ Tươi',                         cat:'thuc-an', catLabel:'Thức Ăn', price:15000,  img:P(AN,'Trùng Chỉ Tươi.webp') },
  { id:120, name:'Cám Thía',                               cat:'thuc-an', catLabel:'Thức Ăn', price:20000,  img:P(AN,'cám thía.webp') },

  // ===== THUỐC & DƯỠNG CÁ =====
  { id:121, name:'Thuốc Diệt Đa Khuẩn Anti-Bio NUPHAR',        cat:'thuoc-ve-sinh', catLabel:'Thuốc & Dưỡng Cá', price:25000,  img:P(THUOC,'Thuốc Diệt Đa Khuẩn Anti-Bio NUPHAR.jpg') },
  { id:122, name:'Thuốc Sát Khuẩn Pranee Aquarium',           cat:'thuoc-ve-sinh', catLabel:'Thuốc & Dưỡng Cá', price:8000,   img:P(THUOC,'Thuốc Sát Khuẩn Hồ Cá Tép Pranee Aquarium-1.jpg') },
  { id:123, name:'API Melafix - Trị Thối Vây, Nấm',           cat:'thuoc-ve-sinh', catLabel:'Thuốc & Dưỡng Cá', price:270000, img:P(THUOC,'API Melafix - Trị Thối Vây, Nấm, Rách Đuôi và Nhiễm Khuẩn.jpg') },
  { id:124, name:'API Pimafix - Trị Nấm, Ký Sinh Trùng',      cat:'thuoc-ve-sinh', catLabel:'Thuốc & Dưỡng Cá', price:250000, img:P(THUOC,'API Pimafix - Chữa bệnh nấm cá, mốc cá, ký sinh trùng.jpg') },
  { id:125, name:'Seachem Stressguard - Dưỡng Cá',            cat:'thuoc-ve-sinh', catLabel:'Thuốc & Dưỡng Cá', price:175000, img:P(THUOC,'Seachem Stressguard - dưỡng cá, giảm stress, khử độc nước.jpg'), featured:true },
  { id:126, name:'Dung Dịch Diệt Rêu Hại COMFY',             cat:'thuoc-ve-sinh', catLabel:'Thuốc & Dưỡng Cá', price:85000,  img:P(THUOC,'Dung Dịch Diệt Rêu Hại COMFY.jpg') },

  // ===== BỔ SUNG THEO THAM KHẢO THỊ TRƯỜNG (ảnh tạm, chờ ảnh thật) =====
  // -- Máy lọc & vật liệu --
  { id:127, name:'Máy Lọc Treo Sunsun HBL',        cat:'may-loc', catLabel:'Máy Lọc & Vật Liệu', price:280000, img:LOGO },
  { id:128, name:'Máy Lọc Treo Xiaoli Sunsun XBL', cat:'may-loc', catLabel:'Máy Lọc & Vật Liệu', price:250000, img:LOGO },
  { id:129, name:'Máy Lọc Treo SunSun YBF (Xả Đáy)',cat:'may-loc', catLabel:'Máy Lọc & Vật Liệu', price:430000, img:LOGO },
  { id:130, name:'Máy Lọc Thác ZY-003',            cat:'may-loc', catLabel:'Máy Lọc & Vật Liệu', price:69000,  img:LOGO },
  { id:131, name:'Vật Liệu Lọc Matrix (Túi 1L)',   cat:'may-loc', catLabel:'Máy Lọc & Vật Liệu', price:115000, img:LOGO },
  { id:132, name:'Vật Liệu Lọc Nitro Ring Mountain Tree', cat:'may-loc', catLabel:'Máy Lọc & Vật Liệu', price:13000, img:LOGO },
  // -- Máy sủi & sưởi --
  { id:133, name:'Sưởi Bể Cá Inox JBA Y3',         cat:'may-suoi-sui', catLabel:'Máy Sủi & Sưởi', price:95000, img:LOGO, featured:true },
  { id:134, name:'Sưởi Bể Cá Thủy Tinh RS',        cat:'may-suoi-sui', catLabel:'Máy Sủi & Sưởi', price:55000, img:LOGO },
  { id:135, name:'Đĩa Sủi Oxy Siêu Mịn YEE',       cat:'may-suoi-sui', catLabel:'Máy Sủi & Sưởi', price:80000, img:LOGO },
  // -- Phân nền & cốt nền --
  { id:136, name:'Phân Nền Tropica (1L)',          cat:'phan-nen', catLabel:'Phân Nền & Cát Nền', price:105000, img:LOGO },
  { id:137, name:'Phân Nền Master Soil (1L)',      cat:'phan-nen', catLabel:'Phân Nền & Cát Nền', price:88000,  img:LOGO },
  { id:138, name:'Phân Nền Miracle Soil (1L)',     cat:'phan-nen', catLabel:'Phân Nền & Cát Nền', price:78000,  img:LOGO },
  { id:139, name:'Cốt Nền Tropica Substrate',      cat:'phan-nen', catLabel:'Phân Nền & Cát Nền', price:410000, img:LOGO },
  { id:140, name:'Akadama Super Hard SS (1kg)',    cat:'phan-nen', catLabel:'Phân Nền & Cát Nền', price:35000,  img:LOGO },
  { id:141, name:'Phân Nền Ever Green (1kg)',      cat:'phan-nen', catLabel:'Phân Nền & Cát Nền', price:30000,  img:LOGO },
  { id:142, name:'Cốt Nền Vũ Aqua (1L)',           cat:'phan-nen', catLabel:'Phân Nền & Cát Nền', price:55000,  img:LOGO },
  { id:143, name:'Phân Nền Aqua Growth Soil PRODIBIO', cat:'phan-nen', catLabel:'Phân Nền & Cát Nền', price:880000, img:LOGO, featured:true },
  // -- Đèn thủy sinh cao cấp --
  { id:144, name:'Đèn Chihiros WRGB 2 Slim60',     cat:'den-thuy-sinh', catLabel:'Đèn Thủy Sinh', price:2250000, img:LOGO, featured:true },
  { id:145, name:'Đèn Chihiros WRGB 2 (60cm)',     cat:'den-thuy-sinh', catLabel:'Đèn Thủy Sinh', price:3150000, img:LOGO },
  { id:146, name:'Đèn Chihiros WRGB 2 Slim45',     cat:'den-thuy-sinh', catLabel:'Đèn Thủy Sinh', price:1750000, img:LOGO },
  { id:147, name:'Đèn Chihiros C2 RGB (Kẹp)',      cat:'den-thuy-sinh', catLabel:'Đèn Thủy Sinh', price:1950000, img:LOGO },
  { id:148, name:'Đèn ONF Flat Nano',              cat:'den-thuy-sinh', catLabel:'Đèn Thủy Sinh', price:2200000, img:LOGO },
  { id:149, name:'Đèn ONF Flat Nano+',             cat:'den-thuy-sinh', catLabel:'Đèn Thủy Sinh', price:2500000, img:LOGO },
  // -- Thức ăn cá/tép --
  { id:150, name:'Cám Tép Cao Cấp V-Mix Pro',      cat:'thuc-an', catLabel:'Thức Ăn', price:79000,  img:LOGO, featured:true },
  { id:151, name:'Cám Tép V-MIX',                  cat:'thuc-an', catLabel:'Thức Ăn', price:69000,  img:LOGO },
  { id:152, name:'Thức Ăn Viên Dán Luxury Mix',    cat:'thuc-an', catLabel:'Thức Ăn', price:69000,  img:LOGO },
  { id:153, name:'Thức Ăn Viên Dán STICK ON PRODAC',cat:'thuc-an', catLabel:'Thức Ăn', price:175000, img:LOGO },
  { id:154, name:'Thức Ăn COLOR GRANULES PRODAC',  cat:'thuc-an', catLabel:'Thức Ăn', price:70000,  img:LOGO },
  { id:155, name:'Thức Ăn GARLIC FISH FLAKES PRODAC',cat:'thuc-an', catLabel:'Thức Ăn', price:70000, img:LOGO },
  { id:156, name:'Cám DISCUS Food Up Color - TL',  cat:'thuc-an', catLabel:'Thức Ăn', price:50000,  img:LOGO },
  // -- Vi sinh & chế phẩm --
  { id:157, name:'Vi Sinh V-Active Plus',          cat:'vi-sinh', catLabel:'Vi Sinh & Chế Phẩm', price:145000, img:LOGO, featured:true },
  { id:158, name:'Vi Sinh Tép V-Active Ver.2',     cat:'vi-sinh', catLabel:'Vi Sinh & Chế Phẩm', price:135000, img:LOGO },
  { id:159, name:'Chế Phẩm Sinh Học Extrabio 250ml',cat:'vi-sinh', catLabel:'Vi Sinh & Chế Phẩm', price:105000, img:LOGO },
  { id:160, name:'Dung Dịch Khử Nước FAST & SAFE', cat:'vi-sinh', catLabel:'Vi Sinh & Chế Phẩm', price:29000,  img:LOGO },
  { id:161, name:'Aquasana PRODAC (Ổn Định Nước)', cat:'vi-sinh', catLabel:'Vi Sinh & Chế Phẩm', price:70000,  img:LOGO },
  // -- Thuốc --
  { id:162, name:'Thuốc Trị Nấm Nano Care Multibio 20ml', cat:'thuoc-ve-sinh', catLabel:'Thuốc & Dưỡng Cá', price:55000, img:LOGO },
]

export function formatPrice(n) {
  return n.toLocaleString('vi-VN') + 'đ'
}

// Đơn vị hiển thị: chỉ sinh vật sống tính theo "con", còn lại theo "sản phẩm"
export function unitLabel(cat) {
  return cat === 'ca-canh' || cat === 'tep-canh' ? 'con' : 'sản phẩm'
}
