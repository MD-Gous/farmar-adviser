# 🌾 Farmers Adviser — Digital Krishi Officer

> AI-Powered Web-Based Agricultural Advisory System

A comprehensive full-stack platform that acts as a **Digital Krishi Officer** — providing instant, reliable, and farmer-friendly agricultural guidance anytime, anywhere.

---

## 🚀 Live Demo

> Access the application at the deployed URL.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI Chat Assistant** | Conversational AI for instant farming advice |
| 📸 **Crop Diagnosis** | Upload images to detect diseases with AI |
| 🎙️ **Voice Interaction** | Speak queries, get audio responses |
| 🌐 **Multilingual** | English, Hindi (हिंदी), Kannada (ಕನ್ನಡ) |
| 📋 **Govt Schemes** | PM-KISAN, PMFBY, KCC and more |
| 📚 **Advisory Center** | Knowledge base on diseases, pests, soil |
| 🌤️ **Weather Advisory** | Season-based recommendations |
| 💹 **Market Prices** | MSP and crop price tracking |

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** (App Router + TypeScript)
- **Tailwind CSS** (Custom agricultural theme)
- **Framer Motion** (Animations)
- **Lucide Icons**

### Backend
- **FastAPI** (Python)
- **Pydantic** (Data validation)
- Knowledge-based RAG simulation

### Infrastructure
- **Supabase** (Auth + Database)
- **Deployment**: Vercel/Netlify (Frontend), Railway/Render (Backend)

---

## 📁 Project Structure

```
farmers-adviser/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Landing page
│   ├── dashboard/         # Farmer dashboard
│   ├── chat/              # AI chat interface
│   ├── diagnosis/         # Crop disease diagnosis
│   ├── voice/             # Voice interaction
│   ├── advisory/          # Knowledge base
│   ├── schemes/           # Government schemes
│   └── auth/              # Login/Signup
├── components/
│   ├── layout/            # Navbar, BottomNav, AppLayout
│   ├── chat/              # Chat message components
│   └── ui/                # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Constants, translations, utils
├── types/                 # TypeScript types
└── backend/
    └── main.py            # FastAPI backend
```

---

## 🏃 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.9+

### Frontend Setup

```bash
# Install dependencies
npm install

# Copy env file
cp .env.example .env.local
# Fill in your Supabase credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Backend Setup

```bash
# Install Python dependencies
pip install fastapi uvicorn python-multipart pillow

# Start backend server
python backend/main.py
```

Backend runs at [http://localhost:8000](http://localhost:8000)
API Docs at [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🌐 Multilingual Support

| Language | Code | Status |
|----------|------|--------|
| English | `en` | ✅ Full |
| Hindi | `hi` | ✅ Full |
| Kannada | `kn` | ✅ Full |

---

## 📱 Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with features |
| `/auth/login` | Farmer login |
| `/auth/signup` | New registration (2-step) |
| `/dashboard` | Personal farm dashboard |
| `/chat` | AI chat interface |
| `/diagnosis` | Crop disease diagnosis |
| `/voice` | Voice query interface |
| `/advisory` | Knowledge base |
| `/schemes` | Government schemes |
| `/profile` | User profile & settings |

---

## 🔮 Future Enhancements

- [ ] Real ML model integration (TensorFlow/PyTorch)
- [ ] LangChain + FAISS RAG implementation
- [ ] Weather API integration
- [ ] Market price live feeds
- [ ] Expert escalation system
- [ ] IoT soil sensor integration
- [ ] Offline PWA support
- [ ] SMS integration (mKisan)

---

## 📞 Helplines

- **Kisan Call Centre**: 1800-180-1551 (Free, 24/7)
- **PM-KISAN Helpline**: 155261
- **PMFBY Helpline**: 1800-200-7710

---

## 🙏 Acknowledgments

Built with ❤️ for Indian farmers. Powered by AI to bridge the agricultural knowledge gap.

**© 2026 Farmers Adviser — Digital Krishi Officer**
