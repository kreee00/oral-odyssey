import { useState } from "react";
// NOTE FOR CODESANDBOX: Make sure public/index.html has this in <head>:
// <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

// ─── TRANSLATIONS ──────────────────────────────────────────────────────────────
const T = {
  en: {
    tagline: "Explore. Learn. Smile.",
    missionTitle: "🩺 Your Mission",
    missionText: "You are a young dentist visiting a school to run a preventive dental campaign. Guide students to better oral health habits. Each correct choice earns points and improves the Community Oral Health Meter!",
    tags: ["27 Questions", "3 Sets", "Bilingual", "All Ages"],
    startBtn: "Start Your Odyssey 🚀",
    levelLabel: "Level",
    communityHealth: "Community Health",
    healthLabels: { good: "Excellent", fair: "Fair", poor: "Poor" },
    results: { best: "Best Choice!", okay: "Good Thinking!", wrong: "Not Quite!" },
    unlocked: "🎁 Unlocked:",
    pts: "pts",
    health: "health",
    nextLevel: "Next Level →",
    getPromoted: "🎉 Get Promoted!",
    finalResults: "See Final Results 🏁",
    continueJourney: "Continue Journey →",
    promotionTitle: "Promotion!",
    congratulations: "Congratulations!",
    promotedFrom: "You've been promoted from",
    odysseyComplete: "Odyssey Complete!",
    finalScore: "Final Score",
    performance: "Performance",
    communityHealthStat: "Community Health",
    badgesEarned: "Badges Earned",
    collection: "🎒 Your Collection",
    tipTitle: "💡 Remember:",
    tipText: "Brush twice daily, visit your dentist regularly, limit sugary foods, and share your knowledge with others. Every healthy smile starts with a good habit!",
    playAgain: "Play Again 🔄",
    scenario: "Scenario",
    grades: { champion: "Oral Health Champion!", good: "Good Dental Advocate!", keep: "Keep Learning!" },
    ranks: ["Junior Dentist", "Senior Dentist", "Community Dental Leader", "Public Health Specialist"],

    viewReport: "View Report 📊",
    teacherDashboard: "Teacher/Parent Dashboard",
    studentPerformance: "Student Performance",
    categoryBreakdown: "Performance by Category",
    detailedResults: "Detailed Results",
    recommendations: "Recommendations",
    printReport: "Print Report 🖨️",
    backToResults: "Back to Results",
    categories: {
      prevention: "Prevention & Habits",
      nutrition: "Nutrition & Diet",
      professional: "Professional Care",
      lifestyle: "Lifestyle Choices",
      technology: "Technology & Innovation",
    },
    setName: "Set",
    setsPlayed: "Sets Explored",
    randomSet: "🎲 Random Set Selected!",
    newSetDiscovered: "🌟 New Set Discovered!",
    allSetsComplete: "🏆 Master Explorer! You've completed all sets!",
    setThemes: {
      set1: { name: "Daily Habits", desc: "Master the basics of preventive oral care", icon: "🛡️" },
      set2: { name: "Real-Life Scenarios", desc: "Handle everyday dental challenges", icon: "🌍" },
      set3: { name: "Advanced Care", desc: "Explore advanced oral health topics", icon: "🎓" },
    },
  },
  my: {
    tagline: "Jelajah. Belajar. Senyum.",
    missionTitle: "🩺 Misi Kamu",
    missionText: "Kamu adalah seorang doktor gigi muda yang melawat sebuah sekolah untuk menjalankan kempen pergigian pencegahan. Pandukan pelajar ke arah tabiat kesihatan oral yang lebih baik. Setiap pilihan betul memberi kamu mata dan meningkatkan Meter Kesihatan Oral Komuniti!",
    tags: ["27 Soalan", "3 Set", "Dwibahasa", "Semua Peringkat Umur"],
    startBtn: "Mulakan Odyssey Kamu 🚀",
    levelLabel: "Tahap",
    communityHealth: "Kesihatan Komuniti",
    healthLabels: { good: "Cemerlang", fair: "Sederhana", poor: "Lemah" },
    results: { best: "Pilihan Terbaik!", okay: "Bagus Juga!", wrong: "Tidak Tepat!" },
    unlocked: "🎁 Terbuka:",
    pts: "mata",
    health: "kesihatan",
    nextLevel: "Tahap Seterusnya →",
    getPromoted: "🎉 Naik Pangkat!",
    finalResults: "Lihat Keputusan Akhir 🏁",
    continueJourney: "Teruskan Perjalanan →",
    promotionTitle: "Kenaikan Pangkat!",
    congratulations: "Tahniah!",
    promotedFrom: "Kamu telah dinaikkan pangkat daripada",
    odysseyComplete: "Odyssey Selesai!",
    finalScore: "Markah Akhir",
    performance: "Prestasi",
    communityHealthStat: "Kesihatan Komuniti",
    badgesEarned: "Lencana Diperolehi",
    collection: "🎒 Koleksi Kamu",
    tipTitle: "💡 Ingat:",
    tipText: "Berus gigi dua kali sehari, lawati doktor gigi secara berkala, hadkan makanan bergula, dan kongsi ilmu dengan orang lain. Setiap senyuman sihat bermula dengan tabiat yang baik!",
    playAgain: "Main Semula 🔄",
    scenario: "Senario",
    grades: { champion: "Juara Kesihatan Oral!", good: "Peguam Pergigian Yang Baik!", keep: "Teruskan Belajar!" },
    ranks: ["Doktor Gigi Muda", "Doktor Gigi Kanan", "Pemimpin Pergigian Komuniti", "Pakar Kesihatan Awam"],

    viewReport: "Lihat Laporan 📊",
    teacherDashboard: "Papan Pemuka Guru/Ibu Bapa",
    studentPerformance: "Prestasi Pelajar",
    categoryBreakdown: "Prestasi Mengikut Kategori",
    detailedResults: "Keputusan Terperinci",
    recommendations: "Cadangan",
    printReport: "Cetak Laporan 🖨️",
    backToResults: "Kembali ke Keputusan",
    categories: {
      prevention: "Pencegahan & Tabiat",
      nutrition: "Pemakanan & Diet",
      professional: "Penjagaan Profesional",
      lifestyle: "Pilihan Gaya Hidup",
      technology: "Teknologi & Inovasi",
    },
    setName: "Set",
    setsPlayed: "Set Diterokai",
    randomSet: "🎲 Set Rawak Dipilih!",
    newSetDiscovered: "🌟 Set Baru Ditemui!",
    allSetsComplete: "🏆 Penjelajah Pakar! Anda telah lengkapkan semua set!",
    setThemes: {
      set1: { name: "Tabiat Harian", desc: "Kuasai asas penjagaan oral pencegahan", icon: "🛡️" },
      set2: { name: "Senario Kehidupan", desc: "Hadapi cabaran pergigian harian", icon: "🌍" },
      set3: { name: "Penjagaan Lanjutan", desc: "Terokai topik kesihatan oral lanjutan", icon: "🎓" },
    },
  },
};

// ─── LEVEL DATA - 3 SETS × 9 LEVELS ────────────────────────────────────────────
const SETS = {
  set1: {
    en: [
      { id: 1, emoji: "🪥", title: "Brushing Basics", category: "prevention",
        scenario: "Your friend says he only brushes once at night because he's too lazy in the morning.",
        options: [
          { label: "A", text: "Tell him it's okay, at least he brushes once.", result: "wrong", feedback: "❌ Plaque builds up overnight AND during the day. Brushing once isn't enough — bad breath and caries risk rise!", points: 0, health: -15 },
          { label: "B", text: "Remind him to brush morning & night, 2 minutes each.", result: "best", feedback: "⭐ Perfect! Brushing twice daily removes plaque effectively!", points: 100, health: 20, unlock: "🪥 Toothbrush Upgrade" },
          { label: "C", text: "Tell him to just use mouthwash instead.", result: "wrong", feedback: "❌ Mouthwash is a supplement, not a replacement! Cavities will appear.", points: 0, health: -10 },
        ],
      },
      { id: 2, emoji: "🧋", title: "Sugary Drinks", category: "nutrition",
        scenario: "After school, your classmates buy bubble tea. They ask you to join.",
        options: [
          { label: "A", text: "Buy large bubble tea with extra sugar.", result: "wrong", feedback: "❌ High sugar feeds bacteria that cause tooth decay!", points: 0, health: -15 },
          { label: "B", text: "Choose a smaller size with less sugar, drink with a straw.", result: "best", feedback: "⭐ Smart move! Using a straw reduces sugar contact with teeth!", points: 100, health: 20, unlock: "🔍 Sugar Detective Badge" },
          { label: "C", text: "Refuse completely and only drink water.", result: "okay", feedback: "✅ Very healthy for teeth! Balance is also fine though.", points: 50, health: 10 },
        ],
      },
      { id: 3, emoji: "🦷", title: "Dentist Visit", category: "professional",
        scenario: "Your cousin hasn't been to the dentist in 3 years and is scared.",
        options: [
          { label: "A", text: "Say \"don't worry, you don't need a dentist if nothing hurts.\"", result: "wrong", feedback: "❌ Pain comes later — by then, untreated cavities become serious!", points: 0, health: -15 },
          { label: "B", text: "Encourage him to go for a check-up. Prevention is better!", result: "best", feedback: "⭐ Excellent! Regular check-ups catch problems early!", points: 100, health: 20, unlock: "🪞 Dental Mirror Tool" },
          { label: "C", text: "Tell him to wait until a tooth really hurts.", result: "wrong", feedback: "❌ Waiting for pain means late treatment — sometimes extraction!", points: 0, health: -10 },
        ],
        promotion: { fromKey: 0, toKey: 1, emoji: "🎓" },
      },
      { id: 4, emoji: "😬", title: "Braces Care", category: "prevention",
        scenario: "Your friend with braces says it's too hard to brush, so he skips.",
        options: [
          { label: "A", text: "Say \"braces already protect teeth, no need to brush much.\"", result: "wrong", feedback: "❌ Wrong! Plaque around brackets causes white spots and decay!", points: 0, health: -15 },
          { label: "B", text: "Suggest a special orthodontic brush & floss threader.", result: "best", feedback: "⭐ Great advice! The right tools make braces care effective!", points: 100, health: 20, unlock: "🧰 Braces Care Kit" },
          { label: "C", text: "Just tell him to avoid sticky food, brushing is optional.", result: "wrong", feedback: "❌ Food still gets trapped in braces. Brushing is essential!", points: 0, health: -10 },
        ],
      },
      { id: 5, emoji: "💧", title: "Fluoride Power", category: "prevention",
        scenario: "A teacher says school water has fluoride. Some students say it's harmful.",
        options: [
          { label: "A", text: "Agree fluoride is dangerous and avoid it.", result: "wrong", feedback: "❌ At correct levels, fluoride is safe and prevents decay!", points: 0, health: -15 },
          { label: "B", text: "Explain fluoride makes teeth stronger & is safe at correct levels.", result: "best", feedback: "⭐ Spot on! Science-backed knowledge wins!", points: 100, health: 20, unlock: "🛡️ Fluoride Shield Power" },
          { label: "C", text: "Say you're not sure, maybe better to avoid.", result: "okay", feedback: "✅ Caution is okay, but evidence-based knowledge is better.", points: 50, health: 5 },
        ],
      },
      { id: 6, emoji: "⚽", title: "Mouthguards & Sports", category: "prevention",
        scenario: "During football practice, a friend gets a chipped tooth.",
        options: [
          { label: "A", text: "Say \"teeth are strong, don't worry.\"", result: "wrong", feedback: "❌ Tooth fractures worsen without care!", points: 0, health: -15 },
          { label: "B", text: "Tell everyone to wear mouthguards for sports.", result: "best", feedback: "⭐ Champion decision! Mouthguards prevent injuries!", points: 100, health: 20, unlock: "🏅 Mouthguard Upgrade" },
          { label: "C", text: "Suggest chewing gum to strengthen teeth instead.", result: "wrong", feedback: "❌ Gum doesn't protect against impacts!", points: 0, health: -10 },
        ],
        promotion: { fromKey: 1, toKey: 2, emoji: "🏆" },
      },
      { id: 7, emoji: "🚭", title: "Tobacco Temptation", category: "lifestyle",
        scenario: "A senior offers you a cigarette, saying it's cool.",
        options: [
          { label: "A", text: "Say yes, try it once.", result: "wrong", feedback: "❌ Even one cigarette starts damage — gum disease risk!", points: 0, health: -20 },
          { label: "B", text: "Refuse and explain smoking damages teeth and gums.", result: "best", feedback: "⭐ Courageous and wise! You protect AND educate!", points: 100, health: 20, unlock: "🚭 Anti-Smoking Badge" },
          { label: "C", text: "Pretend to accept but throw it away secretly.", result: "okay", feedback: "✅ You avoided harm, but missed a teaching moment!", points: 50, health: 5 },
        ],
      },
      { id: 8, emoji: "🔒", title: "Seal the Deal", category: "professional",
        scenario: "A dentist offers pit & fissure sealants for your sibling's molars.",
        options: [
          { label: "A", text: "Say it's unnecessary, brushing is enough.", result: "wrong", feedback: "❌ Deep grooves in molars are hard to clean. Sealants protect them!", points: 0, health: -15 },
          { label: "B", text: "Agree — sealants protect molars from cavities.", result: "best", feedback: "⭐ Excellent! Sealants are top preventive tools!", points: 100, health: 20, unlock: "🔒 Sealant Power" },
          { label: "C", text: "Say you'll wait until the tooth hurts first.", result: "wrong", feedback: "❌ By then it's too late — cavity already formed!", points: 0, health: -10 },
        ],
      },
      { id: 9, emoji: "📱", title: "Digital Dentistry", category: "technology",
        scenario: "A new school program uses an app to track brushing habits.",
        options: [
          { label: "A", text: "Say it's spying, refuse to join.", result: "wrong", feedback: "❌ You lose monitoring benefits and chance to improve!", points: 0, health: -10 },
          { label: "B", text: "Join and encourage friends — data helps habits.", result: "best", feedback: "⭐ Brilliant! Tech for health is the future!", points: 100, health: 20, unlock: "📱 Smart Oral Health App" },
          { label: "C", text: "Join quietly but don't remind others.", result: "okay", feedback: "✅ Some benefit, but a leader brings others along!", points: 50, health: 8 },
        ],
        promotion: { fromKey: 2, toKey: 3, emoji: "🌟" },
      },
    ],
    my: [
      { id: 1, emoji: "🪥", title: "Asas Memberus Gigi", category: "prevention",
        scenario: "Kawan kamu hanya memberus gigi sekali pada waktu malam kerana malas pada waktu pagi.",
        options: [
          { label: "A", text: "Beritahunya tak apa, sekurang-kurangnya dia memberus.", result: "wrong", feedback: "❌ Plak terbina sepanjang malam dan siang. Sekali tidak cukup!", points: 0, health: -15 },
          { label: "B", text: "Ingatkan dia memberus pagi dan malam, 2 minit setiap kali.", result: "best", feedback: "⭐ Sempurna! Memberus dua kali sehari mengalihkan plak!", points: 100, health: 20, unlock: "🪥 Naik Taraf Berus Gigi" },
          { label: "C", text: "Beritahunya guna ubat kumur sahaja.", result: "wrong", feedback: "❌ Ubat kumur tambahan, bukan pengganti! Kaviti akan muncul.", points: 0, health: -10 },
        ],
      },
      { id: 2, emoji: "🧋", title: "Minuman Bergula", category: "nutrition",
        scenario: "Selepas sekolah, rakan sekelas membeli teh buih. Mereka menjemput kamu.",
        options: [
          { label: "A", text: "Beli teh buih besar dengan gula tambahan.", result: "wrong", feedback: "❌ Gula tinggi memberi makan bakteria penyebab kerosakan gigi!", points: 0, health: -15 },
          { label: "B", text: "Pilih saiz lebih kecil, kurang gula, guna straw.", result: "best", feedback: "⭐ Pilihan bijak! Straw mengurangkan sentuhan gula!", points: 100, health: 20, unlock: "🔍 Lencana Detektif Gula" },
          { label: "C", text: "Tolak sama sekali dan minum air sahaja.", result: "okay", feedback: "✅ Sangat sihat! Tetapi keseimbangan juga ok.", points: 50, health: 10 },
        ],
      },
      { id: 3, emoji: "🦷", title: "Lawatan Doktor Gigi", category: "professional",
        scenario: "Sepupu kamu tidak ke doktor gigi selama 3 tahun dan takut.",
        options: [
          { label: "A", text: "Kata \"jangan risau, tak perlu kalau tak sakit.\"", result: "wrong", feedback: "❌ Sakit datang kemudian — kaviti jadi serius!", points: 0, health: -15 },
          { label: "B", text: "Galakkan dia pergi untuk pemeriksaan.", result: "best", feedback: "⭐ Cemerlang! Pemeriksaan berkala mengesan masalah awal!", points: 100, health: 20, unlock: "🪞 Alat Cermin Pergigian" },
          { label: "C", text: "Beritahunya tunggu sehingga gigi sakit.", result: "wrong", feedback: "❌ Tunggu sakit bermakna rawatan lewat — mungkin cabutan!", points: 0, health: -10 },
        ],
        promotion: { fromKey: 0, toKey: 1, emoji: "🎓" },
      },
      { id: 4, emoji: "😬", title: "Penjagaan Pendakap", category: "prevention",
        scenario: "Kawan dengan pendakap kata susah memberus, jadi dia langkau.",
        options: [
          { label: "A", text: "Kata \"pendakap dah lindungi gigi, tak perlu memberus.\"", result: "wrong", feedback: "❌ Salah! Plak di sekeliling braket menyebabkan kerosakan!", points: 0, health: -15 },
          { label: "B", text: "Cadangkan berus ortodontik & benang gigi.", result: "best", feedback: "⭐ Nasihat bagus! Alatan betul menjadikan penjagaan berkesan!", points: 100, health: 20, unlock: "🧰 Kit Penjagaan Pendakap" },
          { label: "C", text: "Suruh elak makanan melekit, memberus pilihan.", result: "wrong", feedback: "❌ Makanan masih tersekat. Memberus adalah penting!", points: 0, health: -10 },
        ],
      },
      { id: 5, emoji: "💧", title: "Kekuatan Fluorida", category: "prevention",
        scenario: "Guru kata air sekolah ada fluorida. Sesetengah pelajar kata berbahaya.",
        options: [
          { label: "A", text: "Bersetuju fluorida berbahaya dan elakkannya.", result: "wrong", feedback: "❌ Pada tahap betul, fluorida selamat dan mencegah kerosakan!", points: 0, health: -15 },
          { label: "B", text: "Jelaskan fluorida menguatkan gigi & selamat.", result: "best", feedback: "⭐ Tepat! Pengetahuan berasaskan sains menang!", points: 100, health: 20, unlock: "🛡️ Kuasa Perisai Fluorida" },
          { label: "C", text: "Kata tidak pasti, lebih baik elakkan.", result: "okay", feedback: "✅ Berhati-hati ok, tapi pengetahuan berasaskan bukti lebih baik.", points: 50, health: 5 },
        ],
      },
      { id: 6, emoji: "⚽", title: "Pelindung Mulut & Sukan", category: "prevention",
        scenario: "Semasa latihan bola sepak, kawan kamu patah gigi.",
        options: [
          { label: "A", text: "Kata \"gigi kuat, jangan risau.\"", result: "wrong", feedback: "❌ Patahan gigi bertambah teruk tanpa rawatan!", points: 0, health: -15 },
          { label: "B", text: "Beritahu semua pakai pelindung mulut semasa bersukan.", result: "best", feedback: "⭐ Keputusan cemerlang! Pelindung mulut mencegah kecederaan!", points: 100, health: 20, unlock: "🏅 Naik Taraf Pelindung Mulut" },
          { label: "C", text: "Cadangkan kunyah gula-gula getah untuk kuatkan gigi.", result: "wrong", feedback: "❌ Getah tidak melindungi daripada hentaman!", points: 0, health: -10 },
        ],
        promotion: { fromKey: 1, toKey: 2, emoji: "🏆" },
      },
      { id: 7, emoji: "🚭", title: "Godaan Tembakau", category: "lifestyle",
        scenario: "Senior menawarkan rokok kepada kamu, kata ia 'cool'.",
        options: [
          { label: "A", text: "Kata ya, cuba sekali.", result: "wrong", feedback: "❌ Sebatang pun mula merosakkan — risiko penyakit gusi!", points: 0, health: -20 },
          { label: "B", text: "Tolak dan jelaskan merokok merosakkan gigi dan gusi.", result: "best", feedback: "⭐ Berani dan bijak! Kamu lindungi DAN didik!", points: 100, health: 20, unlock: "🚭 Lencana Anti-Merokok" },
          { label: "C", text: "Pura-pura terima tapi buang secara senyap.", result: "okay", feedback: "✅ Kamu elak bahaya, tapi terlepas peluang mengajar!", points: 50, health: 5 },
        ],
      },
      { id: 8, emoji: "🔒", title: "Sealant Gigi", category: "professional",
        scenario: "Doktor gigi menawarkan sealant untuk geraham adik kamu.",
        options: [
          { label: "A", text: "Kata tidak perlu, memberus sudah cukup.", result: "wrong", feedback: "❌ Alur dalam geraham susah dibersihkan. Sealant melindungi!", points: 0, health: -15 },
          { label: "B", text: "Bersetuju — sealant melindungi geraham dari kaviti.", result: "best", feedback: "⭐ Cemerlang! Sealant alat pencegahan terbaik!", points: 100, health: 20, unlock: "🔒 Kuasa Sealant" },
          { label: "C", text: "Kata tunggu sehingga gigi sakit dulu.", result: "wrong", feedback: "❌ Masa itu sudah terlambat — kaviti dah terbentuk!", points: 0, health: -10 },
        ],
      },
      { id: 9, emoji: "📱", title: "Pergigian Digital", category: "technology",
        scenario: "Program sekolah baru guna aplikasi untuk jejak tabiat memberus.",
        options: [
          { label: "A", text: "Kata ia mengintip, enggan menyertai.", result: "wrong", feedback: "❌ Hilang faedah pemantauan dan peluang memperbaiki!", points: 0, health: -10 },
          { label: "B", text: "Sertai dan galakkan rakan — data bantu tabiat.", result: "best", feedback: "⭐ Brilliant! Teknologi untuk kesihatan adalah masa depan!", points: 100, health: 20, unlock: "📱 Aplikasi Kesihatan Pintar" },
          { label: "C", text: "Sertai senyap tapi tidak ingatkan orang lain.", result: "okay", feedback: "✅ Sedikit faedah, tapi pemimpin bawa orang lain bersama!", points: 50, health: 8 },
        ],
        promotion: { fromKey: 2, toKey: 3, emoji: "🌟" },
      },
    ],
  },
  set2: {
    en: [
      { id: 1, emoji: "🧵", title: "Flossing Truth", category: "prevention",
        scenario: "Your sister says flossing is unnecessary because her toothbrush reaches everywhere.",
        options: [
          { label: "A", text: "Agree — brushing is enough.", result: "wrong", feedback: "❌ Toothbrush bristles can't reach between teeth! 40% of tooth surfaces are missed!", points: 0, health: -15 },
          { label: "B", text: "Show her how to floss daily — it cleans where brushes can't.", result: "best", feedback: "⭐ Perfect! Flossing is the only way to clean between teeth properly!", points: 100, health: 20, unlock: "🧵 Floss Master Badge" },
          { label: "C", text: "Tell her to use a toothpick instead.", result: "wrong", feedback: "❌ Toothpicks can damage gums and aren't a real substitute!", points: 0, health: -10 },
        ],
      },
      { id: 2, emoji: "🍋", title: "Acid Attack", category: "nutrition",
        scenario: "You drink lemon water every morning. A friend says it's eroding your teeth.",
        options: [
          { label: "A", text: "Ignore — lemon is healthy.", result: "wrong", feedback: "❌ Citrus acid erodes enamel over time, even though lemon has vitamins!", points: 0, health: -15 },
          { label: "B", text: "Drink with a straw, rinse with water after.", result: "best", feedback: "⭐ Perfect balance! You keep the benefits but protect enamel!", points: 100, health: 20, unlock: "🛡️ Enamel Guard Badge" },
          { label: "C", text: "Stop lemon water completely.", result: "okay", feedback: "✅ Safe, but you lose vitamin C benefits. Moderation works too!", points: 50, health: 8 },
        ],
      },
      { id: 3, emoji: "🚨", title: "Tooth Emergency!", category: "professional",
        scenario: "Your friend gets a tooth knocked out at the playground.",
        options: [
          { label: "A", text: "Throw it away, get a fake one later.", result: "wrong", feedback: "❌ A knocked-out tooth can be re-implanted if you act fast!", points: 0, health: -20 },
          { label: "B", text: "Pick by the crown, store in milk, see dentist within 30 min.", result: "best", feedback: "⭐ Lifesaver! Milk preserves root cells. Time is critical!", points: 100, health: 25, unlock: "🚨 Emergency Hero Badge" },
          { label: "C", text: "Wash it with soap and water thoroughly.", result: "wrong", feedback: "❌ Soap damages root cells! Only rinse with milk or saline!", points: 0, health: -10 },
        ],
        promotion: { fromKey: 0, toKey: 1, emoji: "🎓" },
      },
      { id: 4, emoji: "🩸", title: "Bleeding Gums", category: "prevention",
        scenario: "When you brush, your gums bleed sometimes. You're worried.",
        options: [
          { label: "A", text: "Stop brushing that area to avoid bleeding.", result: "wrong", feedback: "❌ This worsens gum disease! Bleeding means inflammation needing more care, not less!", points: 0, health: -15 },
          { label: "B", text: "Brush gently and see a dentist — it's a sign of gingivitis.", result: "best", feedback: "⭐ Smart! Early gingivitis is reversible with proper care!", points: 100, health: 20, unlock: "🛡️ Gum Guardian Badge" },
          { label: "C", text: "Use whitening toothpaste to fix it.", result: "wrong", feedback: "❌ Whitening doesn't address bleeding — and may irritate gums more!", points: 0, health: -10 },
        ],
      },
      { id: 5, emoji: "👅", title: "Tongue Hygiene", category: "prevention",
        scenario: "Your friend has bad breath even though he brushes twice daily.",
        options: [
          { label: "A", text: "Tell him it's just genetics, nothing to do.", result: "wrong", feedback: "❌ Bad breath usually comes from tongue bacteria — it's treatable!", points: 0, health: -15 },
          { label: "B", text: "Suggest tongue scraping or brushing the tongue.", result: "best", feedback: "⭐ Excellent! 80% of bad breath comes from tongue bacteria!", points: 100, health: 20, unlock: "👅 Fresh Breath Badge" },
          { label: "C", text: "Recommend chewing gum constantly.", result: "okay", feedback: "✅ Masks the smell but doesn't solve the cause!", points: 50, health: 5 },
        ],
      },
      { id: 6, emoji: "🎂", title: "Birthday Party Snacks", category: "nutrition",
        scenario: "You're at a birthday party with cake, candy, and fruit platters.",
        options: [
          { label: "A", text: "Eat sweets throughout the entire party.", result: "wrong", feedback: "❌ Constant sugar = constant acid attacks on teeth!", points: 0, health: -15 },
          { label: "B", text: "Eat sweets in one sitting, then enjoy fruits and cheese.", result: "best", feedback: "⭐ Smart! Less frequent sugar exposure protects teeth!", points: 100, health: 20, unlock: "🎯 Smart Snacker Badge" },
          { label: "C", text: "Skip everything sweet completely.", result: "okay", feedback: "✅ Very strict but safe. Moderation works too!", points: 50, health: 8 },
        ],
        promotion: { fromKey: 1, toKey: 2, emoji: "🏆" },
      },
      { id: 7, emoji: "💨", title: "Vape Trend", category: "lifestyle",
        scenario: "A classmate offers you a vape, saying \"it's just flavored water vapor, totally safe.\"",
        options: [
          { label: "A", text: "Try it — it's just flavored water.", result: "wrong", feedback: "❌ Vapes contain nicotine that harms gums and dries mouth!", points: 0, health: -20 },
          { label: "B", text: "Refuse — vaping still damages oral health.", result: "best", feedback: "⭐ Smart! Vaping causes gum disease and dry mouth too!", points: 100, health: 20, unlock: "💨 Vape-Free Badge" },
          { label: "C", text: "Take a small puff, then refuse more.", result: "wrong", feedback: "❌ Even one puff exposes you to harmful chemicals!", points: 0, health: -10 },
        ],
      },
      { id: 8, emoji: "🦷", title: "Wisdom Teeth Pain", category: "professional",
        scenario: "Your back gum is swollen and sore. Your aunt says it's wisdom teeth coming in.",
        options: [
          { label: "A", text: "Wait it out — it'll go away.", result: "wrong", feedback: "❌ Impacted wisdom teeth can become infected — needs assessment!", points: 0, health: -15 },
          { label: "B", text: "See a dentist for X-ray and proper assessment.", result: "best", feedback: "⭐ Wise choice! Early evaluation prevents major surgery later!", points: 100, health: 20, unlock: "🔬 X-Ray Vision Power" },
          { label: "C", text: "Just take painkillers and ignore.", result: "wrong", feedback: "❌ Painkillers mask the problem — infection can spread!", points: 0, health: -10 },
        ],
      },
      { id: 9, emoji: "📞", title: "Teledentistry", category: "technology",
        scenario: "Your village has no dentist. A new app offers video consultations with real dentists.",
        options: [
          { label: "A", text: "Don't trust online doctors.", result: "wrong", feedback: "❌ Teledentistry is verified medicine — you miss valuable care!", points: 0, health: -10 },
          { label: "B", text: "Try video consultation for advice and referrals.", result: "best", feedback: "⭐ Brilliant! Telehealth brings care to underserved areas!", points: 100, health: 20, unlock: "📞 Telehealth Innovator" },
          { label: "C", text: "Wait until you can travel to a city.", result: "okay", feedback: "✅ Cautious but delays needed care!", points: 50, health: 5 },
        ],
        promotion: { fromKey: 2, toKey: 3, emoji: "🌟" },
      },
    ],
    my: [
      { id: 1, emoji: "🧵", title: "Kebenaran Benang Gigi", category: "prevention",
        scenario: "Kakak kamu kata benang gigi tidak perlu kerana berus giginya capai semua tempat.",
        options: [
          { label: "A", text: "Bersetuju — memberus sudah cukup.", result: "wrong", feedback: "❌ Bulu berus tak boleh capai antara gigi! 40% permukaan terlepas!", points: 0, health: -15 },
          { label: "B", text: "Tunjuk cara guna benang setiap hari.", result: "best", feedback: "⭐ Sempurna! Benang gigi satu-satunya cara bersihkan antara gigi!", points: 100, health: 20, unlock: "🧵 Lencana Pakar Benang" },
          { label: "C", text: "Suruh dia guna pencungkil gigi.", result: "wrong", feedback: "❌ Pencungkil boleh rosakkan gusi dan bukan pengganti!", points: 0, health: -10 },
        ],
      },
      { id: 2, emoji: "🍋", title: "Serangan Asid", category: "nutrition",
        scenario: "Kamu minum air lemon setiap pagi. Kawan kata ia menghakis gigi.",
        options: [
          { label: "A", text: "Abaikan — lemon itu sihat.", result: "wrong", feedback: "❌ Asid sitrus menghakis enamel walaupun lemon ada vitamin!", points: 0, health: -15 },
          { label: "B", text: "Minum dengan straw, kumur dengan air selepasnya.", result: "best", feedback: "⭐ Keseimbangan sempurna! Dapat manfaat tapi lindungi enamel!", points: 100, health: 20, unlock: "🛡️ Lencana Pengawal Enamel" },
          { label: "C", text: "Berhenti minum air lemon sepenuhnya.", result: "okay", feedback: "✅ Selamat tapi hilang vitamin C. Sederhana juga ok!", points: 50, health: 8 },
        ],
      },
      { id: 3, emoji: "🚨", title: "Kecemasan Gigi!", category: "professional",
        scenario: "Kawan kamu tertanggal gigi di taman permainan.",
        options: [
          { label: "A", text: "Buang sahaja, dapatkan gigi palsu kemudian.", result: "wrong", feedback: "❌ Gigi yang tertanggal boleh ditanam semula jika cepat bertindak!", points: 0, health: -20 },
          { label: "B", text: "Pegang mahkota, simpan dalam susu, jumpa doktor dalam 30 minit.", result: "best", feedback: "⭐ Penyelamat! Susu memelihara sel akar. Masa kritikal!", points: 100, health: 25, unlock: "🚨 Lencana Wira Kecemasan" },
          { label: "C", text: "Cuci dengan sabun dan air sepenuhnya.", result: "wrong", feedback: "❌ Sabun rosakkan sel akar! Kumur dengan susu sahaja!", points: 0, health: -10 },
        ],
        promotion: { fromKey: 0, toKey: 1, emoji: "🎓" },
      },
      { id: 4, emoji: "🩸", title: "Gusi Berdarah", category: "prevention",
        scenario: "Bila memberus, gusi kamu berdarah kadang-kadang. Kamu risau.",
        options: [
          { label: "A", text: "Berhenti memberus kawasan itu untuk elak berdarah.", result: "wrong", feedback: "❌ Memburukkan penyakit gusi! Berdarah perlu lebih penjagaan, bukan kurang!", points: 0, health: -15 },
          { label: "B", text: "Memberus perlahan dan jumpa doktor — tanda gingivitis.", result: "best", feedback: "⭐ Bijak! Gingivitis awal boleh dipulihkan dengan penjagaan betul!", points: 100, health: 20, unlock: "🛡️ Lencana Pengawal Gusi" },
          { label: "C", text: "Guna ubat gigi pemutih untuk perbaikinya.", result: "wrong", feedback: "❌ Pemutih tidak selesaikan masalah berdarah!", points: 0, health: -10 },
        ],
      },
      { id: 5, emoji: "👅", title: "Kebersihan Lidah", category: "prevention",
        scenario: "Kawan kamu mulutnya berbau walaupun memberus dua kali sehari.",
        options: [
          { label: "A", text: "Beritahu itu genetik, tiada apa boleh dibuat.", result: "wrong", feedback: "❌ Bau mulut biasanya dari bakteria lidah — boleh dirawat!", points: 0, health: -15 },
          { label: "B", text: "Cadangkan pengikis lidah atau berus lidah.", result: "best", feedback: "⭐ Cemerlang! 80% bau mulut dari bakteria lidah!", points: 100, health: 20, unlock: "👅 Lencana Nafas Segar" },
          { label: "C", text: "Cadangkan kunyah gula-gula getah selalu.", result: "okay", feedback: "✅ Tutup bau tapi tidak selesai punca!", points: 50, health: 5 },
        ],
      },
      { id: 6, emoji: "🎂", title: "Snek Hari Jadi", category: "nutrition",
        scenario: "Kamu di parti hari jadi dengan kek, gula-gula, dan buah-buahan.",
        options: [
          { label: "A", text: "Makan manisan sepanjang parti.", result: "wrong", feedback: "❌ Gula berterusan = serangan asid berterusan pada gigi!", points: 0, health: -15 },
          { label: "B", text: "Makan manisan satu kali, kemudian buah dan keju.", result: "best", feedback: "⭐ Bijak! Kurang dedahan gula melindungi gigi!", points: 100, health: 20, unlock: "🎯 Lencana Snek Bijak" },
          { label: "C", text: "Langkau semua manisan sepenuhnya.", result: "okay", feedback: "✅ Sangat ketat tapi selamat. Sederhana juga ok!", points: 50, health: 8 },
        ],
        promotion: { fromKey: 1, toKey: 2, emoji: "🏆" },
      },
      { id: 7, emoji: "💨", title: "Trend Vape", category: "lifestyle",
        scenario: "Rakan sekelas tawarkan vape, kata \"ia hanya wap berperisa, selamat.\"",
        options: [
          { label: "A", text: "Cuba — ia hanya air berperisa.", result: "wrong", feedback: "❌ Vape ada nikotin yang merosakkan gusi dan keringkan mulut!", points: 0, health: -20 },
          { label: "B", text: "Tolak — vape masih merosakkan kesihatan oral.", result: "best", feedback: "⭐ Bijak! Vape juga sebabkan penyakit gusi dan mulut kering!", points: 100, health: 20, unlock: "💨 Lencana Bebas Vape" },
          { label: "C", text: "Hisap sedikit, kemudian tolak.", result: "wrong", feedback: "❌ Satu hisapan pun dedahkan kepada bahan kimia merbahaya!", points: 0, health: -10 },
        ],
      },
      { id: 8, emoji: "🦷", title: "Sakit Gigi Bongsu", category: "professional",
        scenario: "Gusi belakang kamu bengkak dan sakit. Mak cik kata gigi bongsu sedang tumbuh.",
        options: [
          { label: "A", text: "Tunggu sahaja — akan hilang sendiri.", result: "wrong", feedback: "❌ Gigi bongsu tersangkut boleh berjangkit — perlu pemeriksaan!", points: 0, health: -15 },
          { label: "B", text: "Jumpa doktor untuk X-ray dan penilaian.", result: "best", feedback: "⭐ Bijak! Penilaian awal elak pembedahan besar nanti!", points: 100, health: 20, unlock: "🔬 Kuasa Penglihatan X-Ray" },
          { label: "C", text: "Ambil ubat tahan sakit dan abaikan.", result: "wrong", feedback: "❌ Ubat tahan sakit tutup masalah — jangkitan boleh merebak!", points: 0, health: -10 },
        ],
      },
      { id: 9, emoji: "📞", title: "Teledentistry", category: "technology",
        scenario: "Kampung kamu tiada doktor gigi. Aplikasi baru tawarkan perundingan video.",
        options: [
          { label: "A", text: "Tidak percaya doktor dalam talian.", result: "wrong", feedback: "❌ Teledentistry adalah perubatan disahkan — kamu hilang penjagaan berharga!", points: 0, health: -10 },
          { label: "B", text: "Cuba perundingan video untuk nasihat.", result: "best", feedback: "⭐ Brilliant! Telehealth bawa penjagaan ke kawasan terpencil!", points: 100, health: 20, unlock: "📞 Inovator Telehealth" },
          { label: "C", text: "Tunggu sehingga boleh ke bandar.", result: "okay", feedback: "✅ Berhati-hati tapi melengahkan penjagaan!", points: 50, health: 5 },
        ],
        promotion: { fromKey: 2, toKey: 3, emoji: "🌟" },
      },
    ],
  },
  set3: {
    en: [
      { id: 1, emoji: "⚡", title: "Electric vs Manual", category: "prevention",
        scenario: "Your dad has arthritis and struggles to brush manually with proper technique.",
        options: [
          { label: "A", text: "Tell him to brush harder to compensate.", result: "wrong", feedback: "❌ Hard brushing damages enamel and gums — the opposite of what you need!", points: 0, health: -15 },
          { label: "B", text: "Suggest an electric toothbrush — easier and more effective.", result: "best", feedback: "⭐ Excellent! Electric brushes are great for limited mobility and remove more plaque!", points: 100, health: 20, unlock: "⚡ Power Brush Badge" },
          { label: "C", text: "Tell him to skip brushing some days when his hand hurts.", result: "wrong", feedback: "❌ Skipping causes plaque buildup. Electric brush solves the real problem!", points: 0, health: -10 },
        ],
      },
      { id: 2, emoji: "🏷️", title: "Hidden Sugars", category: "nutrition",
        scenario: "Mom buys \"sugar-free\" yogurt for your sibling. You read labels and find lots of hidden sugars.",
        options: [
          { label: "A", text: "Stay quiet — Mom knows best.", result: "wrong", feedback: "❌ \"Sugar-free\" can mean no added sugar but high natural sugar — knowledge helps!", points: 0, health: -10 },
          { label: "B", text: "Show her the label — explain hidden sugar names like fructose, maltose.", result: "best", feedback: "⭐ Brilliant! Reading labels is a superpower for oral health!", points: 100, health: 20, unlock: "🏷️ Label Reader Badge" },
          { label: "C", text: "Throw the yogurt away.", result: "wrong", feedback: "❌ Wasteful and rude. Education is better than confrontation!", points: 0, health: -10 },
        ],
      },
      { id: 3, emoji: "🌳", title: "Root Canal Truth", category: "professional",
        scenario: "Your uncle refuses a root canal, saying \"it's better to just extract the tooth.\"",
        options: [
          { label: "A", text: "Agree — extraction is simpler and cheaper.", result: "wrong", feedback: "❌ Saving natural teeth is always best! Extraction leads to other dental problems!", points: 0, health: -15 },
          { label: "B", text: "Explain root canals save the tooth and aren't painful with anesthesia.", result: "best", feedback: "⭐ Spot on! Modern root canals are 95% successful and pain-free!", points: 100, health: 20, unlock: "🌳 Tooth Saver Badge" },
          { label: "C", text: "Stay neutral — let him decide alone.", result: "okay", feedback: "✅ Respectful, but you missed a chance to share life-changing knowledge!", points: 50, health: 5 },
        ],
        promotion: { fromKey: 0, toKey: 1, emoji: "🎓" },
      },
      { id: 4, emoji: "🤰", title: "Pregnancy Care", category: "lifestyle",
        scenario: "Your pregnant cousin avoids the dentist, fearing it's unsafe for her baby.",
        options: [
          { label: "A", text: "Agree — wait until after the baby is born.", result: "wrong", feedback: "❌ Untreated gum disease during pregnancy increases premature birth risk!", points: 0, health: -15 },
          { label: "B", text: "Encourage second-trimester check-up — it's safe AND important.", result: "best", feedback: "⭐ Excellent! Dental care during pregnancy protects mom AND baby!", points: 100, health: 20, unlock: "🤰 Maternal Health Badge" },
          { label: "C", text: "Tell her to just brush more often.", result: "wrong", feedback: "❌ Brushing alone can't address pregnancy-related dental risks!", points: 0, health: -10 },
        ],
      },
      { id: 5, emoji: "😰", title: "Dental Anxiety", category: "professional",
        scenario: "Your little brother has panic attacks before every dentist visit.",
        options: [
          { label: "A", text: "Force him to go anyway — he'll get over it.", result: "wrong", feedback: "❌ Forcing worsens dental phobia for life. Empathy works better!", points: 0, health: -15 },
          { label: "B", text: "Talk to dentist about sedation or kid-friendly clinics.", result: "best", feedback: "⭐ Compassionate! Special clinics use distraction and gentle care!", points: 100, health: 20, unlock: "💚 Comfort Care Badge" },
          { label: "C", text: "Let him skip dental visits to avoid stress.", result: "wrong", feedback: "❌ Avoidance causes much bigger problems later!", points: 0, health: -10 },
        ],
      },
      { id: 6, emoji: "✨", title: "DIY Whitening Trap", category: "lifestyle",
        scenario: "Your friend wants to try viral \"DIY teeth whitening\" with lemon and baking soda.",
        options: [
          { label: "A", text: "Try it — it's natural so it must be safe.", result: "wrong", feedback: "❌ Acid + abrasion permanently damages enamel — natural ≠ safe!", points: 0, health: -20 },
          { label: "B", text: "Discourage — recommend dentist-approved whitening only.", result: "best", feedback: "⭐ Wise! Professional whitening is safe and effective!", points: 100, health: 20, unlock: "✨ Safe Smile Badge" },
          { label: "C", text: "Try just once to see what happens.", result: "wrong", feedback: "❌ Even one use can cause permanent enamel damage!", points: 0, health: -10 },
        ],
        promotion: { fromKey: 1, toKey: 2, emoji: "🏆" },
      },
      { id: 7, emoji: "🎗️", title: "Oral Cancer Warning", category: "lifestyle",
        scenario: "Your grandfather has a sore in his mouth that hasn't healed in 3 weeks.",
        options: [
          { label: "A", text: "It's just a regular ulcer — ignore it.", result: "wrong", feedback: "❌ Sores lasting over 2 weeks can be early oral cancer signs!", points: 0, health: -20 },
          { label: "B", text: "Insist he see a dentist immediately for screening.", result: "best", feedback: "⭐ Lifesaver! Early oral cancer detection has 90% survival rate!", points: 100, health: 25, unlock: "🎗️ Cancer Awareness Badge" },
          { label: "C", text: "Apply traditional remedies and wait.", result: "wrong", feedback: "❌ Delay can be deadly with oral cancer!", points: 0, health: -15 },
        ],
      },
      { id: 8, emoji: "🩺", title: "Diabetes Connection", category: "professional",
        scenario: "Your aunt has diabetes and frequent gum infections. She thinks they're unrelated.",
        options: [
          { label: "A", text: "Agree — diabetes and gums aren't connected.", result: "wrong", feedback: "❌ Strong link! Diabetes worsens gum disease, gum disease worsens diabetes!", points: 0, health: -15 },
          { label: "B", text: "Explain the link — she needs extra dental care.", result: "best", feedback: "⭐ Excellent! Oral health affects whole-body health!", points: 100, health: 20, unlock: "🩺 Whole Body Health Badge" },
          { label: "C", text: "Suggest she just take antibiotics.", result: "wrong", feedback: "❌ Antibiotics don't address the diabetes-gum cycle!", points: 0, health: -10 },
        ],
      },
      { id: 9, emoji: "🤖", title: "AI in Dentistry", category: "technology",
        scenario: "A new clinic uses AI to detect cavities from X-rays, sometimes catching what dentists miss.",
        options: [
          { label: "A", text: "Refuse — AI can't replace doctors.", result: "wrong", feedback: "❌ AI assists, doesn't replace! It catches issues humans might miss!", points: 0, health: -10 },
          { label: "B", text: "Embrace AI as a tool — it helps catch issues earlier.", result: "best", feedback: "⭐ Future-ready! AI + dentist = best detection rates!", points: 100, health: 20, unlock: "🤖 AI Pioneer Badge" },
          { label: "C", text: "Trust only AI, skip the dentist's opinion.", result: "wrong", feedback: "❌ AI is a tool, not a replacement! Combined approach is best!", points: 0, health: -10 },
        ],
        promotion: { fromKey: 2, toKey: 3, emoji: "🌟" },
      },
    ],
    my: [
      { id: 1, emoji: "⚡", title: "Elektrik vs Manual", category: "prevention",
        scenario: "Ayah kamu ada artritis dan susah memberus dengan teknik betul.",
        options: [
          { label: "A", text: "Suruh memberus lebih kuat untuk mengimbangi.", result: "wrong", feedback: "❌ Memberus kuat rosakkan enamel — sebaliknya dari yang diperlukan!", points: 0, health: -15 },
          { label: "B", text: "Cadangkan berus elektrik — lebih mudah dan berkesan.", result: "best", feedback: "⭐ Cemerlang! Berus elektrik bagus untuk pergerakan terhad!", points: 100, health: 20, unlock: "⚡ Lencana Berus Berkuasa" },
          { label: "C", text: "Suruh dia langkau memberus bila tangan sakit.", result: "wrong", feedback: "❌ Melangkau menyebabkan plak terbina!", points: 0, health: -10 },
        ],
      },
      { id: 2, emoji: "🏷️", title: "Gula Tersembunyi", category: "nutrition",
        scenario: "Mak beli yogurt \"tanpa gula\" untuk adik. Kamu baca label dan jumpa banyak gula tersembunyi.",
        options: [
          { label: "A", text: "Senyap sahaja — Mak lebih tahu.", result: "wrong", feedback: "❌ \"Tanpa gula\" boleh bermaksud tiada gula tambahan tapi gula semula jadi tinggi!", points: 0, health: -10 },
          { label: "B", text: "Tunjuk label — terangkan nama gula tersembunyi seperti fruktosa.", result: "best", feedback: "⭐ Brilliant! Membaca label adalah kuasa hebat untuk kesihatan oral!", points: 100, health: 20, unlock: "🏷️ Lencana Pembaca Label" },
          { label: "C", text: "Buang yogurt itu sahaja.", result: "wrong", feedback: "❌ Membazir dan kurang sopan!", points: 0, health: -10 },
        ],
      },
      { id: 3, emoji: "🌳", title: "Kebenaran Rawatan Akar", category: "professional",
        scenario: "Pak cik kamu tolak rawatan akar, kata \"lebih baik cabut sahaja.\"",
        options: [
          { label: "A", text: "Bersetuju — cabut lebih mudah dan murah.", result: "wrong", feedback: "❌ Selamatkan gigi asli sentiasa terbaik!", points: 0, health: -15 },
          { label: "B", text: "Jelaskan rawatan akar selamatkan gigi dan tidak sakit dengan bius.", result: "best", feedback: "⭐ Tepat! Rawatan akar moden 95% berjaya dan tanpa sakit!", points: 100, health: 20, unlock: "🌳 Lencana Penyelamat Gigi" },
          { label: "C", text: "Diam — biar dia putuskan sendiri.", result: "okay", feedback: "✅ Hormat, tapi terlepas peluang berkongsi pengetahuan penting!", points: 50, health: 5 },
        ],
        promotion: { fromKey: 0, toKey: 1, emoji: "🎓" },
      },
      { id: 4, emoji: "🤰", title: "Penjagaan Mengandung", category: "lifestyle",
        scenario: "Sepupu hamil kamu elak doktor gigi, takut tidak selamat untuk bayi.",
        options: [
          { label: "A", text: "Bersetuju — tunggu selepas bayi lahir.", result: "wrong", feedback: "❌ Penyakit gusi tidak dirawat semasa hamil tingkatkan risiko bersalin pramatang!", points: 0, health: -15 },
          { label: "B", text: "Galakkan pemeriksaan trimester kedua — selamat dan penting.", result: "best", feedback: "⭐ Cemerlang! Penjagaan gigi semasa hamil melindungi ibu DAN bayi!", points: 100, health: 20, unlock: "🤰 Lencana Kesihatan Ibu" },
          { label: "C", text: "Suruh dia memberus lebih kerap sahaja.", result: "wrong", feedback: "❌ Memberus sahaja tidak boleh atasi risiko gigi semasa hamil!", points: 0, health: -10 },
        ],
      },
      { id: 5, emoji: "😰", title: "Kebimbangan Gigi", category: "professional",
        scenario: "Adik lelaki kamu ada serangan panik sebelum setiap lawatan doktor gigi.",
        options: [
          { label: "A", text: "Paksa dia pergi — dia akan terbiasa.", result: "wrong", feedback: "❌ Memaksa burukkan fobia seumur hidup. Empati lebih baik!", points: 0, health: -15 },
          { label: "B", text: "Bincang dengan doktor tentang sedasi atau klinik mesra kanak-kanak.", result: "best", feedback: "⭐ Penyayang! Klinik khas guna pengalihan dan penjagaan lembut!", points: 100, health: 20, unlock: "💚 Lencana Penjagaan Selesa" },
          { label: "C", text: "Biar dia langkau lawatan untuk elak tekanan.", result: "wrong", feedback: "❌ Penghindaran sebabkan masalah lebih besar nanti!", points: 0, health: -10 },
        ],
      },
      { id: 6, emoji: "✨", title: "Perangkap DIY Pemutih", category: "lifestyle",
        scenario: "Kawan kamu nak cuba \"pemutih gigi DIY\" viral dengan lemon dan baking soda.",
        options: [
          { label: "A", text: "Cuba — semula jadi jadi mesti selamat.", result: "wrong", feedback: "❌ Asid + lelasan rosakkan enamel selamanya — semula jadi ≠ selamat!", points: 0, health: -20 },
          { label: "B", text: "Halang — cadangkan pemutih disahkan doktor sahaja.", result: "best", feedback: "⭐ Bijak! Pemutih profesional selamat dan berkesan!", points: 100, health: 20, unlock: "✨ Lencana Senyum Selamat" },
          { label: "C", text: "Cuba sekali sahaja untuk lihat.", result: "wrong", feedback: "❌ Sekali pun boleh sebabkan kerosakan enamel kekal!", points: 0, health: -10 },
        ],
        promotion: { fromKey: 1, toKey: 2, emoji: "🏆" },
      },
      { id: 7, emoji: "🎗️", title: "Amaran Kanser Mulut", category: "lifestyle",
        scenario: "Datuk kamu ada luka dalam mulut yang tidak sembuh selama 3 minggu.",
        options: [
          { label: "A", text: "Itu ulser biasa sahaja — abaikan.", result: "wrong", feedback: "❌ Luka lebih 2 minggu boleh jadi tanda awal kanser mulut!", points: 0, health: -20 },
          { label: "B", text: "Desak dia jumpa doktor segera untuk saringan.", result: "best", feedback: "⭐ Penyelamat! Pengesanan awal kanser mulut beri 90% kadar hidup!", points: 100, health: 25, unlock: "🎗️ Lencana Kesedaran Kanser" },
          { label: "C", text: "Sapu ubat tradisional dan tunggu.", result: "wrong", feedback: "❌ Lambat boleh maut dengan kanser mulut!", points: 0, health: -15 },
        ],
      },
      { id: 8, emoji: "🩺", title: "Hubungan Diabetes", category: "professional",
        scenario: "Mak cik kamu ada diabetes dan jangkitan gusi kerap. Dia fikir tiada kaitan.",
        options: [
          { label: "A", text: "Bersetuju — diabetes dan gusi tiada kaitan.", result: "wrong", feedback: "❌ Hubungan kuat! Diabetes burukkan gusi, gusi burukkan diabetes!", points: 0, health: -15 },
          { label: "B", text: "Jelaskan kaitan — dia perlu penjagaan gigi tambahan.", result: "best", feedback: "⭐ Cemerlang! Kesihatan oral pengaruhi seluruh badan!", points: 100, health: 20, unlock: "🩺 Lencana Kesihatan Menyeluruh" },
          { label: "C", text: "Suruh dia ambil antibiotik sahaja.", result: "wrong", feedback: "❌ Antibiotik tidak selesaikan kitaran diabetes-gusi!", points: 0, health: -10 },
        ],
      },
      { id: 9, emoji: "🤖", title: "AI dalam Pergigian", category: "technology",
        scenario: "Klinik baru guna AI untuk kesan kaviti dari X-ray, kadang kala tangkap apa doktor terlepas.",
        options: [
          { label: "A", text: "Tolak — AI tidak boleh ganti doktor.", result: "wrong", feedback: "❌ AI bantu, bukan ganti! Ia tangkap masalah yang manusia mungkin terlepas!", points: 0, health: -10 },
          { label: "B", text: "Terima AI sebagai alat — ia bantu kesan masalah lebih awal.", result: "best", feedback: "⭐ Bersedia masa depan! AI + doktor = pengesanan terbaik!", points: 100, health: 20, unlock: "🤖 Lencana Perintis AI" },
          { label: "C", text: "Percaya AI sahaja, langkau pendapat doktor.", result: "wrong", feedback: "❌ AI alat, bukan pengganti! Pendekatan gabungan terbaik!", points: 0, health: -10 },
        ],
        promotion: { fromKey: 2, toKey: 3, emoji: "🌟" },
      },
    ],
  },
};

const RANK_EMOJIS = ["🩺", "🎓", "🏆", "🌟"];
const SET_KEYS = ["set1", "set2", "set3"];

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function OralOdyssey() {
  const [lang, setLang] = useState("en");
  const [screen, setScreen] = useState("intro");
  const [currentSet, setCurrentSet] = useState("set1");
  const [levelIndex, setLevelIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(50);
  const [badges, setBadges] = useState([]);
  const [selected, setSelected] = useState(null);
  const [rankIndex, setRankIndex] = useState(0);
  const [answerHistory, setAnswerHistory] = useState([]);
  const [showDashboard, setShowDashboard] = useState(false);
  const [setsExplored, setSetsExplored] = useState([]);
  const [isNewSet, setIsNewSet] = useState(false);

  const t = T[lang];
  const levels = SETS[currentSet][lang];
  const level = levels[levelIndex];
  const rank = t.ranks[rankIndex];
  const setTheme = t.setThemes[currentSet];

  const healthColor = health >= 70 ? "#16a34a" : health >= 40 ? "#d97706" : "#dc2626";
  const healthLabel = health >= 70 ? t.healthLabels.good : health >= 40 ? t.healthLabels.fair : t.healthLabels.poor;


  function pickRandomSet() {
    // Smart random: prefer unexplored sets, fall back to truly random
    const unexplored = SET_KEYS.filter(k => !setsExplored.includes(k));
    const pool = unexplored.length > 0 ? unexplored : SET_KEYS;
    const picked = pool[Math.floor(Math.random() * pool.length)];
    setIsNewSet(!setsExplored.includes(picked));
    return picked;
  }

  function toggleLang() { setLang(l => l === "en" ? "my" : "en"); }

  function startGame() {
    const picked = pickRandomSet();
    setCurrentSet(picked);
    setScreen("game");
  }

  function handleSelect(opt) {
    if (selected) return;
    setSelected(opt);
    setHealth(h => Math.min(100, Math.max(0, h + opt.health)));
    setScore(s => s + opt.points);
    if (opt.unlock) setBadges(b => [...b, opt.unlock]);
    setAnswerHistory(h => [...h, {
      levelId: level.id, levelTitle: level.title, category: level.category,
      scenario: level.scenario, selectedOption: opt.label,
      selectedText: opt.text, result: opt.result, points: opt.points, health: opt.health,
    }]);
    setScreen("feedback");
  }

  function handleNext() {
    if (level.promotion) {
      setRankIndex(level.promotion.toKey);
      setScreen("promotion");
    } else { advance(); }
  }

  function advance() {
    setSelected(null);
    if (levelIndex + 1 >= levels.length) {
      // Save explored set
      const newExplored = setsExplored.includes(currentSet) ? setsExplored : [...setsExplored, currentSet];
      setSetsExplored(newExplored);
      setScreen("end");
    } else {
      setLevelIndex(i => i + 1);
      setScreen("game");
    }
  }

  function restart() {
    setScreen("intro"); setLevelIndex(0); setScore(0);
    setHealth(50); setBadges([]); setSelected(null); setRankIndex(0);
    setAnswerHistory([]); setShowDashboard(false);
    setIsNewSet(false);
  }

  function resetProgress() {
    setSetsExplored([]);
    restart();
  }

  const wrap = { minHeight: "100vh", background: "linear-gradient(135deg,#e0f7fa 0%,#b2ebf2 45%,#e8f5e9 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "70px 12px 24px", fontFamily: "'Nunito', sans-serif" };
  const card = { background: "white", borderRadius: 24, boxShadow: "0 8px 40px rgba(0,150,136,0.14),0 2px 8px rgba(0,0,0,0.06)", padding: "28px 24px", maxWidth: 560, width: "100%", animation: "fadeIn 0.35s ease", position: "relative", marginTop: 56 };

  return (
    <div style={wrap}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        @keyframes fadeIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pop{0%{transform:scale(.7);opacity:0}70%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        @keyframes sparkle{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.7;transform:scale(1.15)}}
        @keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-3px)}75%{transform:translateX(3px)}}
        @keyframes shine{0%{background-position:-200% 0}100%{background-position:200% 0}}
        *{box-sizing:border-box;}
        .opt{transition:transform .15s,box-shadow .15s,background .15s;min-height:52px;}
        .opt:hover:not(:disabled){transform:translateY(-3px) scale(1.01);box-shadow:0 6px 20px rgba(0,150,136,.2);}
        .btn{transition:all .2s;} .btn:hover{transform:scale(1.04);}
        .startbtn{transition:all .2s;} .startbtn:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,150,136,.45);}
        .new-set{background:linear-gradient(90deg,#fbbf24,#f59e0b,#fbbf24);background-size:200% 100%;animation:shine 2s linear infinite;}
        @media print { .no-print { display: none !important; } }
        @media (max-width:520px){
          .opt{font-size:12.5px !important;padding:11px 10px !important;}
          .lang-toggle{top:8px !important;right:8px !important;}
        }
      `}</style>

      {/* LANG TOGGLE */}
      <div style={{ position: "fixed", top: 14, right: 14, zIndex: 100 }} className="no-print">
        <button className="btn" onClick={toggleLang}
          style={{ background: "white", border: "2.5px solid #009688", borderRadius: 30, padding: "7px 18px", fontWeight: 900, fontSize: 13, cursor: "pointer", color: "#009688", boxShadow: "0 2px 10px rgba(0,150,136,.2)", display: "flex", alignItems: "center", gap: 6 }}>
          🌐 {lang === "en" ? "BM" : "EN"}
        </button>
      </div>

      {screen === "intro" && (
        <div style={{ ...card, textAlign: "center", marginTop: 0 }} key={lang}>
          <div style={{ fontSize: 60, animation: "float 2.5s ease-in-out infinite" }}>🦷</div>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#009688", textTransform: "uppercase", letterSpacing: 2, marginTop: 10 }}>
            {lang === "en" ? "An Oral Health Game" : "Permainan Kesihatan Oral"}
          </div>
          <div style={{ fontSize: 34, fontWeight: 900, color: "#0d3b38", lineHeight: 1.1, marginTop: 4 }}>Oral Odyssey</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#80cbc4", marginBottom: 14, letterSpacing: 1 }}>{t.tagline}</div>

          {/* Sets Progress Indicator */}
          {setsExplored.length > 0 && (
            <div style={{ background: "#f8fafc", borderRadius: 12, padding: "10px 14px", marginBottom: 14, fontSize: 12, fontWeight: 700, color: "#475569" }}>
              {t.setsPlayed}: {setsExplored.length}/3 {SET_KEYS.map(k => (
                <span key={k} style={{ marginLeft: 4, opacity: setsExplored.includes(k) ? 1 : 0.3 }}>{t.setThemes[k].icon}</span>
              ))}
              {setsExplored.length === 3 && <div style={{ marginTop: 4, color: "#15803d", fontWeight: 800 }}>{t.allSetsComplete}</div>}
            </div>
          )}

          <div style={{ background: "linear-gradient(135deg,#e0f7fa,#f1f8e9)", borderRadius: 16, padding: "15px 18px", fontSize: 14, color: "#2c5364", lineHeight: 1.7, fontWeight: 600, marginBottom: 18, textAlign: "left" }}>
            <div style={{ fontWeight: 900, color: "#009688", marginBottom: 5 }}>{t.missionTitle}</div>
            {t.missionText}
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 22 }}>
            {t.tags.map(tag => <span key={tag} style={{ background: "#e0f7fa", borderRadius: 20, padding: "5px 13px", fontSize: 12, fontWeight: 800, color: "#00796b" }}>{tag}</span>)}
          </div>
          <button className="startbtn" onClick={startGame}
            style={{ background: "linear-gradient(135deg,#009688,#00796b)", color: "white", border: "none", borderRadius: 14, padding: "15px 36px", fontSize: 16, fontWeight: 900, cursor: "pointer", width: "100%", boxShadow: "0 4px 16px rgba(0,150,136,.35)" }}>
            {t.startBtn}
          </button>
          {setsExplored.length > 0 && (
            <button onClick={resetProgress} className="btn"
              style={{ marginTop: 10, background: "transparent", border: "none", color: "#94a3b8", fontSize: 11, cursor: "pointer", fontWeight: 600, textDecoration: "underline" }}>
              {lang === "en" ? "Reset progress" : "Set semula kemajuan"}
            </button>
          )}
        </div>
      )}

      {screen === "game" && (
        <div style={card} key={`${currentSet}-${levelIndex}-${lang}`}>
          {/* Set Banner */}
          <div className={isNewSet && levelIndex === 0 ? "new-set" : ""}
            style={{ background: isNewSet && levelIndex === 0 ? "" : "linear-gradient(90deg,#e0f7fa,#b2ebf2)", borderRadius: 12, padding: "8px 14px", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center", color: isNewSet && levelIndex === 0 ? "white" : "#00695c" }}>
            <span style={{ fontSize: 12, fontWeight: 900, display: "flex", alignItems: "center", gap: 6 }}>
              {setTheme.icon} {t.setName} {SET_KEYS.indexOf(currentSet) + 1}: {setTheme.name}
            </span>
            {isNewSet && levelIndex === 0 && <span style={{ fontSize: 11, fontWeight: 800 }}>{t.newSetDiscovered}</span>}
          </div>

          <ToothAvatar health={health} healthLabel={healthLabel} />
          <HUD score={score} health={health} healthColor={healthColor} healthLabel={healthLabel} rank={rank} rankEmoji={RANK_EMOJIS[rankIndex]} level={level} total={levels.length} t={t} />
          <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "18px 0 10px" }}>
            <span style={{ fontSize: 30, animation: "float 2.5s ease-in-out infinite" }}>{level.emoji}</span>
            <div>
              <div style={{ fontSize: 10.5, fontWeight: 800, color: "#009688", textTransform: "uppercase", letterSpacing: 1 }}>{t.levelLabel} {level.id}</div>
              <div style={{ fontSize: 17, fontWeight: 900, color: "#0d3b38" }}>{level.title}</div>
            </div>
          </div>
          <div style={{ background: "linear-gradient(135deg,#e0f7fa,#f1f8e9)", borderRadius: 14, padding: "14px 16px", marginBottom: 16, fontSize: 14, color: "#2c5364", lineHeight: 1.65, fontWeight: 600, boxShadow: "inset 0 2px 6px rgba(0,150,136,.07)" }}>
            📋 {level.scenario}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {level.options.map(opt => (
              <button key={opt.label} className="opt" disabled={!!selected} onClick={() => handleSelect(opt)}
                style={{ border: "2.5px solid #b2dfdb", borderRadius: 14, padding: "12px 15px", background: "white", cursor: selected ? "default" : "pointer", textAlign: "left", fontSize: 13.5, fontWeight: 700, color: "#0d3b38", display: "flex", gap: 11, alignItems: "center" }}>
                <span style={{ background: "#009688", color: "white", borderRadius: 8, width: 27, height: 27, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, flexShrink: 0 }}>{opt.label}</span>
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {screen === "feedback" && selected && (
        <div style={{ ...card, textAlign: "center" }} key={`fb-${levelIndex}`}>
          <ToothAvatar health={health} healthLabel={healthLabel} />
          <HUD score={score} health={health} healthColor={healthColor} healthLabel={healthLabel} rank={rank} rankEmoji={RANK_EMOJIS[rankIndex]} level={level} total={levels.length} t={t} />
          <div style={{ marginTop: 22 }}>
            <div style={{ fontSize: 50, animation: "pop 0.45s ease" }}>{selected.result === "best" ? "🌟" : selected.result === "okay" ? "👍" : "💡"}</div>
            <div style={{ fontSize: 19, fontWeight: 900, marginTop: 8, color: selected.result === "best" ? "#15803d" : selected.result === "okay" ? "#b45309" : "#b91c1c" }}>
              {t.results[selected.result]}
            </div>
            <div style={{ background: selected.result === "best" ? "#f0fdf4" : selected.result === "okay" ? "#fefce8" : "#fef2f2", border: `1.5px solid ${selected.result === "best" ? "#86efac" : selected.result === "okay" ? "#fde68a" : "#fca5a5"}`, borderRadius: 14, padding: "13px 16px", fontSize: 13.5, fontWeight: 600, color: "#1e293b", lineHeight: 1.6, margin: "12px 0", textAlign: "left" }}>
              {selected.feedback}
            </div>
            {selected.unlock && (
              <div style={{ background: "linear-gradient(135deg,#fffbeb,#fef9c3)", border: "2px solid #fcd34d", borderRadius: 12, padding: "11px 16px", marginBottom: 14, fontSize: 13.5, fontWeight: 800, color: "#92400e", animation: "pop 0.4s ease" }}>
                {t.unlocked} {selected.unlock}
              </div>
            )}
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 10 }}>
              <Pill color="#1d4ed8" bg="#eff6ff">+{selected.points} {t.pts}</Pill>
              <Pill color={selected.health >= 0 ? "#15803d" : "#b91c1c"} bg={selected.health >= 0 ? "#f0fdf4" : "#fef2f2"}>
                {selected.health >= 0 ? `+${selected.health}` : selected.health} {t.health}
              </Pill>
            </div>

            <button className="startbtn" onClick={handleNext}
              style={{ background: "linear-gradient(135deg,#009688,#00796b)", color: "white", border: "none", borderRadius: 13, padding: "13px 32px", fontSize: 14.5, fontWeight: 800, cursor: "pointer", width: "100%" }}>
              {levelIndex + 1 >= levels.length ? t.finalResults : level.promotion ? t.getPromoted : t.nextLevel}
            </button>
          </div>
        </div>
      )}

      {screen === "promotion" && (
        <div style={{ ...card, textAlign: "center" }} key={`promo-${rankIndex}`}>
          <div style={{ fontSize: 62, animation: "float 1s ease-in-out infinite" }}>{level.promotion.emoji}</div>
          <div style={{ fontSize: 12, fontWeight: 800, color: "#009688", textTransform: "uppercase", letterSpacing: 1.5, marginTop: 10 }}>{t.promotionTitle}</div>
          <div style={{ fontSize: 24, fontWeight: 900, color: "#0d3b38", marginTop: 4 }}>{t.congratulations}</div>
          <div style={{ fontSize: 14, color: "#64748b", margin: "10px 0 18px", fontWeight: 600 }}>
            {t.promotedFrom}<br />
            <span style={{ fontWeight: 800, color: "#94a3b8" }}>{T[lang].ranks[level.promotion.fromKey]}</span>
            <span style={{ margin: "0 8px", fontSize: 20 }}>→</span>
            <span style={{ fontWeight: 900, color: "#009688" }}>{T[lang].ranks[level.promotion.toKey]}</span>
          </div>
          <div style={{ background: "linear-gradient(135deg,#e0f7fa,#b2ebf2)", borderRadius: 16, padding: "18px", marginBottom: 22, fontSize: 40 }}>
            {RANK_EMOJIS[level.promotion.toKey]}
          </div>
          <button className="startbtn" onClick={advance}
            style={{ background: "linear-gradient(135deg,#009688,#00796b)", color: "white", border: "none", borderRadius: 13, padding: "14px 32px", fontSize: 15, fontWeight: 800, cursor: "pointer", width: "100%" }}>
            {t.continueJourney}
          </button>
        </div>
      )}

      {screen === "end" && !showDashboard && (
        <EndScreen score={score} health={health} healthColor={healthColor} healthLabel={healthLabel} badges={badges} rank={rank} rankEmoji={RANK_EMOJIS[rankIndex]} onRestart={restart} onViewDashboard={() => setShowDashboard(true)} t={t} lang={lang} setsExplored={setsExplored} setTheme={setTheme} />
      )}

      {screen === "end" && showDashboard && (
        <Dashboard answerHistory={answerHistory} score={score} health={health} badges={badges} rank={rank} onBack={() => setShowDashboard(false)} t={t} lang={lang} />
      )}

    </div>
  );
}

// ─── TOOTH AVATAR ──────────────────────────────────────────────────────────────
function ToothAvatar({ health, healthLabel }) {
  const state = health >= 70 ? "excellent" : health >= 40 ? "fair" : "poor";
  const colors = {
    excellent: { tooth: "#ffffff", outline: "#e2e8f0", glow: "#86efac", face: "#16a34a" },
    fair: { tooth: "#fef3c7", outline: "#fcd34d", glow: "#fbbf24", face: "#d97706" },
    poor: { tooth: "#d4a574", outline: "#92400e", glow: "transparent", face: "#dc2626" },
  };
  const c = colors[state];
  return (
    <div style={{ position: "absolute", top: -52, left: "50%", transform: "translateX(-50%)", zIndex: 10 }}>
      <div style={{ position: "relative", width: 72, height: 72, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {state === "excellent" && (<>
          <div style={{ position: "absolute", top: 5, right: 8, fontSize: 16, animation: "sparkle 1.5s ease-in-out infinite" }}>✨</div>
          <div style={{ position: "absolute", bottom: 8, left: 5, fontSize: 14, animation: "sparkle 1.8s ease-in-out infinite 0.3s" }}>✨</div>
        </>)}
        <svg width="70" height="70" viewBox="0 0 100 100">
          <path d="M50 10 C30 10, 20 20, 20 35 C20 50, 25 70, 30 85 C35 95, 45 98, 50 98 C55 98, 65 95, 70 85 C75 70, 80 50, 80 35 C80 20, 70 10, 50 10 Z"
            fill={c.tooth} stroke={c.outline} strokeWidth="3"
            style={{ filter: state === "excellent" ? "drop-shadow(0 0 8px " + c.glow + ")" : "none" }} />
          {state === "poor" && (<>
            <path d="M45 25 L48 45" stroke="#78350f" strokeWidth="2" opacity="0.6" />
            <path d="M60 30 L57 50" stroke="#78350f" strokeWidth="1.5" opacity="0.5" />
            <path d="M35 40 L40 60" stroke="#78350f" strokeWidth="1.5" opacity="0.5" />
          </>)}
          {state === "excellent" && (<>
            <circle cx="40" cy="45" r="3" fill={c.face} />
            <circle cx="60" cy="45" r="3" fill={c.face} />
            <path d="M35 58 Q50 68, 65 58" stroke={c.face} strokeWidth="3" fill="none" strokeLinecap="round" />
          </>)}
          {state === "fair" && (<>
            <circle cx="40" cy="45" r="2.5" fill={c.face} />
            <circle cx="60" cy="45" r="2.5" fill={c.face} />
            <line x1="38" y1="62" x2="62" y2="62" stroke={c.face} strokeWidth="2.5" strokeLinecap="round" />
          </>)}
          {state === "poor" && (<>
            <circle cx="40" cy="45" r="2.5" fill={c.face} />
            <circle cx="60" cy="45" r="2.5" fill={c.face} />
            <path d="M35 68 Q50 58, 65 68" stroke={c.face} strokeWidth="3" fill="none" strokeLinecap="round" />
          </>)}
        </svg>
      </div>
      <div style={{ textAlign: "center", fontSize: 10, fontWeight: 800, color: c.face, marginTop: 2 }}>{healthLabel}</div>
    </div>
  );
}

// ─── HUD ───────────────────────────────────────────────────────────────────────
function HUD({ score, health, healthColor, healthLabel, rank, rankEmoji, level, total, t }) {
  return (
    <div style={{ marginTop: 30 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontSize: 11.5, fontWeight: 800, color: "#009688", background: "#e0f7fa", borderRadius: 20, padding: "4px 12px" }}>{rankEmoji} {rank}</span>
        <span style={{ fontSize: 13, fontWeight: 800, color: "#0d3b38" }}>⭐ {score} {t.pts}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 10.5, fontWeight: 700, color: "#64748b", whiteSpace: "nowrap" }}>{t.communityHealth}</span>
        <div style={{ flex: 1, background: "#e2e8f0", borderRadius: 10, height: 9, overflow: "hidden" }}>
          <div style={{ width: `${health}%`, height: "100%", background: `linear-gradient(90deg,${healthColor},${healthColor}bb)`, borderRadius: 10, transition: "width 0.6s ease" }} />
        </div>
        <span style={{ fontSize: 11, fontWeight: 800, color: healthColor, whiteSpace: "nowrap" }}>{health}%</span>
      </div>
      <div style={{ display: "flex", gap: 3, marginTop: 7 }}>
        {Array.from({ length: total }, (_, i) => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 4, background: i < level.id ? "#009688" : "#e2e8f0", transition: "background .3s" }} />
        ))}
      </div>
      <div style={{ textAlign: "right", fontSize: 10.5, color: "#94a3b8", fontWeight: 600, marginTop: 2 }}>{t.levelLabel} {level.id} / {total}</div>
    </div>
  );
}

// ─── DASHBOARD ─────────────────────────────────────────────────────────────────
function Dashboard({ answerHistory, score, health, badges, rank, onBack, t, lang }) {
  const categoryStats = {};
  answerHistory.forEach(a => {
    if (!categoryStats[a.category]) categoryStats[a.category] = { correct: 0, total: 0 };
    categoryStats[a.category].total++;
    if (a.result === "best") categoryStats[a.category].correct++;
  });
  const strengths = [], improvements = [];
  Object.entries(categoryStats).forEach(([cat, stats]) => {
    const pct = Math.round((stats.correct / stats.total) * 100);
    if (pct >= 75) strengths.push(t.categories[cat] || cat);
    else if (pct < 50) improvements.push(t.categories[cat] || cat);
  });

  return (
    <div style={{ background: "white", borderRadius: 24, boxShadow: "0 8px 40px rgba(0,150,136,0.14)", padding: "28px 24px", maxWidth: 700, width: "100%", fontFamily: "'Nunito', sans-serif", maxHeight: "90vh", overflowY: "auto" }}>
      <div className="no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#009688", textTransform: "uppercase", letterSpacing: 1.5 }}>{t.teacherDashboard}</div>
          <div style={{ fontSize: 20, fontWeight: 900, color: "#0d3b38", marginTop: 2 }}>{t.studentPerformance}</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => window.print()} className="btn"
            style={{ background: "#f1f5f9", color: "#0d3b38", border: "2px solid #cbd5e1", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 800, cursor: "pointer" }}>{t.printReport}</button>
          <button onClick={onBack} className="btn"
            style={{ background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 800, cursor: "pointer" }}>{t.backToResults}</button>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 20 }}>
        <StatBox label={t.finalScore} value={`${score}/900`} color="#1d4ed8" bg="#eff6ff" />
        <StatBox label={t.performance} value={`${Math.round((score/900)*100)}%`} color="#15803d" bg="#f0fdf4" />
        <StatBox label={t.communityHealthStat} value={`${health}%`} color={health >= 70 ? "#16a34a" : "#d97706"} bg="#fefce8" />
        <StatBox label={t.badgesEarned} value={badges.length} color="#92400e" bg="#fffbeb" />
      </div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#009688", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>{t.categoryBreakdown}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {Object.entries(categoryStats).map(([cat, stats]) => {
            const pct = Math.round((stats.correct / stats.total) * 100);
            const color = pct >= 75 ? "#16a34a" : pct >= 50 ? "#d97706" : "#dc2626";
            return (
              <div key={cat} style={{ background: "#f8fafc", borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: "#0d3b38" }}>{t.categories[cat] || cat}</span>
                  <span style={{ fontSize: 13, fontWeight: 900, color }}>{pct}%</span>
                </div>
                <div style={{ background: "#e2e8f0", borderRadius: 6, height: 6, overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 6, transition: "width 0.5s ease" }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#009688", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>{t.detailedResults}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {answerHistory.map((a, i) => (
            <div key={i} style={{ background: a.result === "best" ? "#f0fdf4" : a.result === "okay" ? "#fefce8" : "#fef2f2", border: `1.5px solid ${a.result === "best" ? "#86efac" : a.result === "okay" ? "#fde68a" : "#fca5a5"}`, borderRadius: 10, padding: "10px 12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#0d3b38" }}>Q{a.levelId}: {a.levelTitle}</span>
                <span style={{ fontSize: 11, fontWeight: 900, color: a.result === "best" ? "#15803d" : a.result === "okay" ? "#b45309" : "#b91c1c" }}>
                  {a.result === "best" ? "✓" : a.result === "okay" ? "~" : "✗"}
                </span>
              </div>
              <div style={{ fontSize: 11, color: "#64748b", fontWeight: 600 }}>
                <strong>{lang === "en" ? "Selected" : "Dipilih"}:</strong> {a.selectedOption} — {a.selectedText}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: "linear-gradient(135deg,#e0f7fa,#f1f8e9)", borderRadius: 14, padding: "14px 16px" }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#009688", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{t.recommendations}</div>
        <div style={{ fontSize: 13, color: "#2c5364", lineHeight: 1.6, fontWeight: 600 }}>
          {strengths.length > 0 && <div><strong>{lang === "en" ? "Strengths" : "Kekuatan"}:</strong> {strengths.join(", ")}</div>}
          {improvements.length > 0 && <div style={{ marginTop: 6 }}><strong>{lang === "en" ? "Areas for improvement" : "Bidang penambahbaikan"}:</strong> {improvements.join(", ")}</div>}
          <div style={{ marginTop: 8 }}>
            {lang === "en" ? "Continue practicing good oral health habits and share your knowledge!" : "Teruskan amalkan tabiat kesihatan oral dan kongsi ilmu!"}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── END SCREEN ────────────────────────────────────────────────────────────────
function EndScreen({ score, health, healthColor, healthLabel, badges, rank, rankEmoji, onRestart, onViewDashboard, t, lang, setsExplored, setTheme }) {
  const max = 900, pct = Math.round((score / max) * 100);
  const grade = pct >= 80 ? { label: t.grades.champion, color: "#15803d", emoji: "🏆" }
    : pct >= 50 ? { label: t.grades.good, color: "#b45309", emoji: "👍" }
    : { label: t.grades.keep, color: "#b91c1c", emoji: "📚" };

  return (
    <div style={{ background: "white", borderRadius: 24, boxShadow: "0 8px 40px rgba(0,150,136,.14)", padding: "28px 24px", maxWidth: 540, width: "100%", animation: "fadeIn .35s ease", fontFamily: "'Nunito',sans-serif" }}>
      <div style={{ textAlign: "center", marginBottom: 14 }}>
        <div style={{ fontSize: 52, animation: "float 2.5s ease-in-out infinite" }}>{grade.emoji}</div>
        <div style={{ fontSize: 12, fontWeight: 800, color: "#009688", textTransform: "uppercase", letterSpacing: 1.5, marginTop: 8 }}>{t.odysseyComplete}</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: "#0d3b38", marginTop: 4 }}>{grade.label}</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#80cbc4" }}>{rankEmoji} {rank}</div>
        <div style={{ marginTop: 8, fontSize: 11, fontWeight: 700, color: "#64748b" }}>{setTheme.icon} {setTheme.name}</div>
      </div>

      {/* Sets explored progress */}
      <div style={{ background: "#f8fafc", borderRadius: 10, padding: "10px 14px", marginBottom: 16, textAlign: "center", fontSize: 12, fontWeight: 700, color: "#475569" }}>
        {t.setsPlayed}: {setsExplored.length}/3
        {setsExplored.length === 3 && <div style={{ marginTop: 4, color: "#15803d", fontWeight: 800 }}>{t.allSetsComplete}</div>}
        {setsExplored.length < 3 && <div style={{ marginTop: 2, fontSize: 11, color: "#94a3b8" }}>{lang === "en" ? "Play again to discover new questions!" : "Main lagi untuk temui soalan baru!"}</div>}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
        <StatBox label={t.finalScore} value={`${score}/900`} color="#1d4ed8" bg="#eff6ff" />
        <StatBox label={t.performance} value={`${pct}%`} color={grade.color} bg="#f7fee7" />
        <StatBox label={t.communityHealthStat} value={healthLabel} color={healthColor} bg="#f0fdf4" />
        <StatBox label={t.badgesEarned} value={`${badges.length} 🏅`} color="#92400e" bg="#fffbeb" />
      </div>
      {badges.length > 0 && (
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 11.5, fontWeight: 800, color: "#009688", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{t.collection}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {badges.map((b, i) => (
              <div key={i} style={{ background: "linear-gradient(135deg,#fffbeb,#fef9c3)", border: "1.5px solid #fcd34d", borderRadius: 10, padding: "8px 13px", fontSize: 13, fontWeight: 700, color: "#92400e" }}>{b}</div>
            ))}
          </div>
        </div>
      )}
      <div style={{ background: "linear-gradient(135deg,#e0f7fa,#f1f8e9)", borderRadius: 13, padding: "13px 16px", fontSize: 13, color: "#2c5364", lineHeight: 1.65, fontWeight: 600, marginBottom: 12 }}>
        <strong>{t.tipTitle}</strong> {t.tipText}
      </div>
      <button className="btn" onClick={onViewDashboard}
        style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)", color: "white", border: "none", borderRadius: 13, padding: "13px 28px", fontSize: 14, fontWeight: 800, cursor: "pointer", width: "100%", marginBottom: 10 }}>
        {t.viewReport}
      </button>
      <button className="startbtn" onClick={onRestart}
        style={{ background: "linear-gradient(135deg,#009688,#00796b)", color: "white", border: "none", borderRadius: 13, padding: "14px 32px", fontSize: 15, fontWeight: 800, cursor: "pointer", width: "100%", boxShadow: "0 4px 16px rgba(0,150,136,.3)", fontFamily: "'Nunito',sans-serif" }}>
        {t.playAgain}
      </button>
    </div>
  );
}

function Pill({ color, bg, children }) {
  return <span style={{ background: bg, borderRadius: 20, padding: "5px 13px", fontSize: 12.5, fontWeight: 800, color }}>{children}</span>;
}
function StatBox({ label, value, color, bg }) {
  return (
    <div style={{ background: bg, borderRadius: 13, padding: "13px 15px", textAlign: "center", fontFamily: "'Nunito',sans-serif" }}>
      <div style={{ fontSize: 10.5, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 900, color }}>{value}</div>
    </div>
  );
}
