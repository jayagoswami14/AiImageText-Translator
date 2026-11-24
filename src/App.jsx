
import React, { useEffect, useRef, useState } from "react";
import {
  LayoutDashboard,
  Languages,
  History,
  ChartNoAxesCombined,
  Camera,
  ShieldAlert,
  Settings,
  LogOut,
  Upload,
  Image as ImageIcon,
  ArrowRight,
  Sparkles,
  Globe,
  Trash2,
  Download,
  Menu,
  X,
  ScanText,
  Check,
  FileText,
  RotateCcw,
  User,
  Lock,
  Mail,
  WandSparkles,
  Copy,
  ChevronDown,
} from "lucide-react";

import "./App.css";

const LANGUAGES = [
  "English",
  "Hindi",
  "French",
  "Italian",
  "Korean",
  "Spanish",
  "German",
  "Japanese",
  "Chinese",
  "Arabic",
  "Portuguese",
  "Russian",
];

const DEMO_TRANSLATIONS = {
  English: "My name is Riya",
  Hindi: "मेरा नाम रिया है",
  French: "Je m'appelle Riya",
  Italian: "Mi chiamo Riya",
  Korean: "제 이름은 리야입니다",
  Spanish: "Me llamo Riya",
  German: "Mein Name ist Riya",
  Japanese: "私の名前はリヤです",
  Chinese: "我的名字是里娅",
  Arabic: "اسمي ريا",
  Portuguese: "Meu nome é Riya",
  Russian: "Меня зовут Рия",
};

const initialHistory = [
  {
    id: 1,
    original: "Welcome to our store",
    translated: "Bienvenue dans notre magasin",
    from: "English",
    to: "French",
    date: "Demo translation",
  },
  {
    id: 2,
    original: "Exit",
    translated: "Salida",
    from: "English",
    to: "Spanish",
    date: "Demo translation",
  },
];

function readHistory() {
  try {
    const saved = localStorage.getItem("lingua_history");
    return saved ? JSON.parse(saved) : initialHistory;
  } catch {
    return initialHistory;
  }
}

function Sidebar({ page, setPage, onLogout, mobileOpen, closeMobile }) {
  const items = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "translator", label: "Image Translator", icon: Languages },
    { id: "text", label: "Text Translator", icon: ScanText },
    { id: "camera", label: "Camera Scanner", icon: Camera },
    { id: "signs", label: "Sign Recognition", icon: ShieldAlert },
    { id: "history", label: "Translation History", icon: History },
    { id: "analytics", label: "Analytics", icon: ChartNoAxesCombined },
  ];

  return (
    <>
      {mobileOpen && (
        <div className="mobile-overlay" onClick={closeMobile} />
      )}

      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-logo">
            <Languages size={23} />
          </div>
          <div>
            <h2>LinguaVision</h2>
            <span>AI TRANSLATOR</span>
          </div>
          <button className="mobile-close" onClick={closeMobile}>
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-label">MENU</div>

        <nav className="nav-list">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-item ${page === item.id ? "active" : ""}`}
                onClick={() => {
                  setPage(item.id);
                  closeMobile();
                }}
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <button className="nav-item">
            <Settings size={19} />
            <span>Settings</span>
          </button>

          <div className="profile-card">
            <div className="avatar">R</div>
            <div className="profile-info">
              <strong>Riya Sharma</strong>
              <small>Free Account</small>
            </div>
            <button className="logout-icon" onClick={onLogout} title="Logout">
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

function LoginPage({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submit(e) {
    e.preventDefault();
    onLogin(name || email.split("@")[0] || "User");
  }

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-brand">
          <div className="brand-logo">
            <Languages size={23} />
          </div>
          <h2>LinguaVision AI</h2>
        </div>

        <div className="login-hero">
          <span className="hero-tag">
            <Sparkles size={15} /> AI POWERED TRANSLATION
          </span>
          <h1>
            Every image.
            <br />
            Every language.
            <br />
            <span>One vision.</span>
          </h1>
          <p>
            Understand the world around you. Translate image text,
            signs, and messages into your language.
          </p>

          <div className="login-art">
            <div className="art-glow" />
            <div className="art-card art-card-back">
              <span>Bonjour le monde</span>
              <Globe size={24} />
            </div>
            <div className="art-card art-card-front">
              <div className="art-image">
                <ImageIcon size={50} />
              </div>
              <div className="art-line" />
              <div className="art-line short" />
              <div className="art-translation">
                <Languages size={18} />
                <span>Translated instantly</span>
                <Check size={17} />
              </div>
            </div>
          </div>
        </div>

        <div className="login-footer">
          AI Image Text Translator · Explore beyond language
        </div>
      </div>

      <div className="login-right">
        <form className="login-form" onSubmit={submit}>
          <div className="form-top-tag">WELCOME TO LINGUAVISION</div>
          <h2>{isSignup ? "Create your account" : "Welcome back!"}</h2>
          <p>
            {isSignup
              ? "Create an account to get started."
              : "Enter your details to access your dashboard."}
          </p>

          {isSignup && (
            <div className="form-field">
              <label>Full name</label>
              <div className="input-wrap">
                <User size={18} />
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
            </div>
          )}

          <div className="form-field">
            <label>Email address</label>
            <div className="input-wrap">
              <Mail size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label>Password</label>
            <div className="input-wrap">
              <Lock size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button className="primary-btn login-btn" type="submit">
            {isSignup ? "Create account" : "Sign in"}
            <ArrowRight size={18} />
          </button>

          <div className="login-switch">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? "Sign in" : "Sign up"}
            </button>
          </div>

          <div className="demo-note">
            <Sparkles size={15} />
            Frontend demo — authentication will be connected to FastAPI.
          </div>
        </form>
      </div>
    </div>
  );
}

function DashboardHome({ setPage, history, username }) {
  const stats = [
    {
      label: "Total Translations",
      value: history.length + 24,
      icon: Languages,
      color: "purple",
      trend: "+12 this week",
    },
    {
      label: "Languages Used",
      value: "08",
      icon: Globe,
      color: "blue",
      trend: "Across translations",
    },
    {
      label: "Images Scanned",
      value: "32",
      icon: ImageIcon,
      color: "green",
      trend: "Images processed",
    },
    {
      label: "Signs Identified",
      value: "14",
      icon: ShieldAlert,
      color: "orange",
      trend: "Safety sign demo",
    },
  ];

  return (
    <div>
      <div className="welcome-banner">
        <div>
          <span className="welcome-chip">
            <Sparkles size={14} /> YOUR AI LANGUAGE COMPANION
          </span>
          <h1>Good evening, {username} <span>✦</span></h1>
          <p>Break language barriers. Understand images from around the world.</p>
          <button className="banner-btn" onClick={() => setPage("translator")}>
            Start translating <ArrowRight size={16} />
          </button>
        </div>
        <div className="banner-graphic">
          <div className="graphic-circle circle-one" />
          <div className="graphic-circle circle-two" />
          <div className="floating-translation">
            <Globe size={24} />
            <span>Bonjour</span>
            <span className="mini-label">Hello</span>
          </div>
          <Languages className="banner-icon" size={70} />
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div className="stat-card" key={stat.label}>
              <div className={`stat-icon ${stat.color}`}>
                <Icon size={21} />
              </div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-trend">{stat.trend}</div>
            </div>
          );
        })}
      </div>

      <div className="home-grid">
        <div className="panel quick-panel">
          <div className="panel-heading">
            <div>
              <h3>Quick Actions</h3>
              <p>Choose what you want to do today</p>
            </div>
          </div>

          <div className="quick-actions">
            <button onClick={() => setPage("translator")} className="quick-card">
              <div className="quick-icon purple">
                <Upload size={22} />
              </div>
              <strong>Translate Image</strong>
              <span>Upload any image</span>
              <ArrowRight size={17} className="quick-arrow" />
            </button>

            <button onClick={() => setPage("camera")} className="quick-card">
              <div className="quick-icon blue">
                <Camera size={22} />
              </div>
              <strong>Scan with Camera</strong>
              <span>Capture & translate</span>
              <ArrowRight size={17} className="quick-arrow" />
            </button>

            <button onClick={() => setPage("text")} className="quick-card">
              <div className="quick-icon green">
                <ScanText size={22} />
              </div>
              <strong>Translate Text</strong>
              <span>Text to text</span>
              <ArrowRight size={17} className="quick-arrow" />
            </button>

            <button onClick={() => setPage("signs")} className="quick-card">
              <div className="quick-icon orange">
                <ShieldAlert size={22} />
              </div>
              <strong>Understand Signs</strong>
              <span>Safety & symbols</span>
              <ArrowRight size={17} className="quick-arrow" />
            </button>
          </div>
        </div>

        <div className="panel recent-panel">
          <div className="panel-heading">
            <div>
              <h3>Recent Activity</h3>
              <p>Your latest translations</p>
            </div>
            <button className="text-btn" onClick={() => setPage("history")}>
              View all
            </button>
          </div>

          {history.slice(0, 3).map((item) => (
            <div className="recent-item" key={item.id}>
              <div className="recent-icon">
                <Languages size={18} />
              </div>
              <div className="recent-info">
                <strong>{item.original}</strong>
                <span>{item.from} → {item.to}</span>
              </div>
              <div className="recent-result">{item.translated}</div>
            </div>
          ))}

          {history.length === 0 && (
            <div className="empty-state">No translations yet.</div>
          )}
        </div>
      </div>

      <div className="feature-strip">
        <div className="feature-strip-icon">
          <Sparkles size={21} />
        </div>
        <div>
          <strong>Explore language without limits</strong>
          <p>Translate text from images, signs, documents and more.</p>
        </div>
        <button onClick={() => setPage("translator")}>
          Explore <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

function TranslatorPage({ addHistory }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [from, setFrom] = useState("English");
  const [to, setTo] = useState("French");
  const [translated, setTranslated] = useState("");
  const [originalText, setOriginalText] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileInput = useRef(null);

  function handleFile(f) {
    if (!f) return;

    if (!f.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }

    setFile(f);
    setPreview(URL.createObjectURL(f));
    setTranslated("");
    setOriginalText("");
  }

  function demoTranslate() {
    setLoading(true);

    setTimeout(() => {
      const sample = DEMO_TRANSLATIONS[to] || "Translated text demo";
      const original = "My name is Riya";

      setOriginalText(original);
      setTranslated(sample);
      setLoading(false);

      addHistory({
        original,
        translated: sample,
        from,
        to,
        date: new Date().toLocaleString(),
      });
    }, 1000);
  }

  function downloadImage() {
    if (!preview) return;

    const img = new Image();
    img.src = preview;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      if (translated) {
        ctx.fillStyle = "rgba(255,255,255,0.94)";
        ctx.fillRect(0, img.height * 0.65, img.width, img.height * 0.35);

        ctx.fillStyle = "#222";
        ctx.font = `bold ${Math.max(18, img.width / 25)}px Arial`;
        ctx.textAlign = "center";
        ctx.fillText(translated, img.width / 2, img.height * 0.83);
      }

      const link = document.createElement("a");
      link.download = "linguavision-translation.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
  }

  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <div className="eyebrow">AI IMAGE TRANSLATOR</div>
          <h1>Translate text in images</h1>
          <p>Upload an image, select your language, and get a translation.</p>
        </div>
      </div>

      <div className="translator-grid">
        <div className="panel upload-panel">
          <div className="panel-heading">
            <div>
              <h3>Upload Image</h3>
              <p>Upload the image you want to translate</p>
            </div>
          </div>

          <div
            className={`drop-zone ${dragging ? "dragging" : ""} ${preview ? "has-image" : ""}`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              handleFile(e.dataTransfer.files[0]);
            }}
            onClick={() => fileInput.current?.click()}
          >
            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleFile(e.target.files[0])}
            />

            {preview ? (
              <img className="uploaded-image" src={preview} alt="Uploaded preview" />
            ) : (
              <>
                <div className="upload-icon">
                  <Upload size={26} />
                </div>
                <h4>Drag & drop your image here</h4>
                <p>or click to browse files</p>
                <span className="file-types">PNG · JPG · JPEG · WEBP</span>
              </>
            )}
          </div>

          {preview && (
            <button
              className="remove-image-btn"
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
                setPreview("");
                setTranslated("");
              }}
            >
              <Trash2 size={15} /> Remove image
            </button>
          )}

          <div className="language-row">
            <div className="language-field">
              <label>Translate from</label>
              <div className="select-wrap">
                <Globe size={17} />
                <select value={from} onChange={(e) => setFrom(e.target.value)}>
                  {LANGUAGES.map((lang) => (
                    <option key={lang}>{lang}</option>
                  ))}
                </select>
                <ChevronDown size={16} />
              </div>
            </div>

            <div className="language-arrow">
              <ArrowRight size={19} />
            </div>

            <div className="language-field">
              <label>Translate to</label>
              <div className="select-wrap">
                <Globe size={17} />
                <select value={to} onChange={(e) => setTo(e.target.value)}>
                  {LANGUAGES.map((lang) => (
                    <option key={lang}>{lang}</option>
                  ))}
                </select>
                <ChevronDown size={16} />
              </div>
            </div>
          </div>

          <button
            className="primary-btn translate-btn"
            onClick={demoTranslate}
            disabled={!preview || loading}
          >
            {loading ? (
              <>
                <RotateCcw className="spin" size={18} /> Translating...
              </>
            ) : (
              <>
                <Sparkles size={18} /> Translate Image
              </>
            )}
          </button>

          <p className="demo-warning">
            <Sparkles size={14} />
            Demo translation is active. AI processing will be connected later.
          </p>
        </div>

        <div className="panel result-panel">
          <div className="panel-heading">
            <div>
              <h3>Translation Result</h3>
              <p>Your translated image will appear here</p>
            </div>
            {translated && (
              <button className="icon-button" onClick={downloadImage} title="Download">
                <Download size={18} />
              </button>
            )}
          </div>

          {translated && preview ? (
            <div className="result-content">
              <div className="result-image-wrap">
                <img src={preview} alt="Translated image" />
                <div className="translation-overlay">
                  <span>{translated}</span>
                </div>
              </div>
              <div className="result-text-card">
                <div className="result-language">
                  <span>{from}</span>
                  <ArrowRight size={15} />
                  <span>{to}</span>
                </div>
                <div className="result-original">
                  <small>ORIGINAL TEXT · DEMO</small>
                  <p>{originalText}</p>
                </div>
                <div className="result-translated">
                  <small>TRANSLATED TEXT</small>
                  <p>{translated}</p>
                  <button
                    className="copy-btn"
                    onClick={() => navigator.clipboard.writeText(translated)}
                  >
                    <Copy size={14} /> Copy translation
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="result-empty">
              <div className="result-empty-icon">
                <Languages size={35} />
              </div>
              <h3>Ready to translate</h3>
              <p>
                Your translated image and detected text will appear here
                after you upload an image and start translation.
              </p>
              <div className="empty-steps">
                <span><Check size={14} /> Upload image</span>
                <span><Check size={14} /> Select language</span>
                <span><Sparkles size={14} /> Translate</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TextTranslatorPage() {
  const [text, setText] = useState("");
  const [to, setTo] = useState("French");
  const [result, setResult] = useState("");

  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <div className="eyebrow">TEXT TRANSLATOR</div>
          <h1>Translate any text</h1>
          <p>Type or paste text to translate it into another language.</p>
        </div>
      </div>

      <div className="panel text-translator-panel">
        <div className="text-translate-grid">
          <div className="text-box">
            <div className="text-box-header">
              <span>English · Original text</span>
              <button className="text-btn" onClick={() => setText("")}>Clear</button>
            </div>
            <textarea
              placeholder="Type or paste your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="text-box-footer">{text.length} characters</div>
          </div>

          <div className="text-box">
            <div className="text-box-header">
              <span>Translated text</span>
              <select value={to} onChange={(e) => setTo(e.target.value)}>
                {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div className="text-output">
              {result || "Your translated text will appear here..."}
            </div>
            <div className="text-box-footer">
              {result ? (
                <button
                  className="text-btn"
                  onClick={() => navigator.clipboard.writeText(result)}
                >
                  <Copy size={14} /> Copy
                </button>
              ) : "Translation preview"}
            </div>
          </div>
        </div>

        <button
          className="primary-btn"
          onClick={() => setResult(text ? `Demo translation (${to}): ${text}` : "")}
          disabled={!text.trim()}
        >
          <Languages size={18} /> Translate Text
        </button>
        <p className="demo-warning">
          <Sparkles size={14} /> Demo mode. Real translation will be added with AI backend.
        </p>
      </div>
    </div>
  );
}

function CameraPage() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [active, setActive] = useState(false);
  const [captured, setCaptured] = useState("");

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setActive(true);
    } catch (err) {
      alert("Camera access denied or unavailable. Please allow camera permission.");
    }
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setActive(false);
  }

  function capturePhoto() {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    setCaptured(canvas.toDataURL("image/png"));
  }

  useEffect(() => {
    return () => streamRef.current?.getTracks().forEach((track) => track.stop());
  }, []);

  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <div className="eyebrow">CAMERA SCANNER</div>
          <h1>Scan with your camera</h1>
          <p>Capture an image and translate text from it.</p>
        </div>
      </div>

      <div className="panel camera-panel">
        <div className="camera-view">
          <video ref={videoRef} autoPlay playsInline muted />
          {!active && (
            <div className="camera-placeholder">
              <Camera size={45} />
              <h3>Camera is ready</h3>
              <p>Start your camera to capture an image</p>
            </div>
          )}
        </div>
        <div className="camera-controls">
          {!active ? (
            <button className="primary-btn" onClick={startCamera}>
              <Camera size={18} /> Start Camera
            </button>
          ) : (
            <>
              <button className="primary-btn" onClick={capturePhoto}>
                <Camera size={18} /> Capture Photo
              </button>
              <button className="secondary-btn" onClick={stopCamera}>
                Stop Camera
              </button>
            </>
          )}
        </div>
        {captured && (
          <div className="captured-photo">
            <h3>Captured image</h3>
            <img src={captured} alt="Captured from camera" />
            <p>Camera capture is working. Image translation will be connected to backend.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function SignsPage() {
  const [file, setFile] = useState("");
  const [result, setResult] = useState("");

  const examples = [
    { name: "Danger", desc: "Potential danger. Stay alert and keep a safe distance.", icon: "⚠️" },
    { name: "Exit", desc: "Exit route or emergency way out.", icon: "🚪" },
    { name: "No Entry", desc: "Entry is restricted in this area.", icon: "⛔" },
    { name: "Fire Safety", desc: "Fire-related safety information or equipment.", icon: "🧯" },
  ];

  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <div className="eyebrow">SIGN RECOGNITION</div>
          <h1>Understand signs & symbols</h1>
          <p>Identify common signs and understand what they mean.</p>
        </div>
      </div>

      <div className="signs-grid">
        <div className="panel sign-upload-panel">
          <h3>Upload a sign image</h3>
          <p>Upload a photo of a sign or symbol</p>
          <label className="sign-drop">
            <Upload size={27} />
            <span>Click to upload sign</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files[0];
                if (f) setFile(URL.createObjectURL(f));
              }}
            />
          </label>
          {file && <img className="sign-preview" src={file} alt="Sign preview" />}
          <button
            className="primary-btn"
            disabled={!file}
            onClick={() => setResult("Demo recognition: This sign may indicate a warning, restriction, direction or safety instruction. The actual sign will be identified by the AI backend.")}
          >
            <Sparkles size={18} /> Understand Sign
          </button>
          {result && <div className="sign-result">{result}</div>}
          <p className="demo-warning">
            This demo is not a substitute for official safety instructions.
          </p>
        </div>

        <div className="panel sign-examples-panel">
          <h3>Common sign categories</h3>
          <p>Learn what common symbols generally communicate.</p>
          {examples.map((example) => (
            <div className="sign-example" key={example.name}>
              <div className="sign-emoji">{example.icon}</div>
              <div>
                <strong>{example.name}</strong>
                <p>{example.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HistoryPage({ history, clearHistory }) {
  return (
    <div className="page-content">
      <div className="page-heading heading-row">
        <div>
          <div className="eyebrow">YOUR ACTIVITY</div>
          <h1>Translation history</h1>
          <p>View your previous translation activity.</p>
        </div>
        {history.length > 0 && (
          <button className="secondary-btn" onClick={clearHistory}>
            <Trash2 size={16} /> Clear History
          </button>
        )}
      </div>

      <div className="panel history-panel">
        {history.length === 0 ? (
          <div className="empty-state">No translation history yet.</div>
        ) : (
          history.map((item) => (
            <div className="history-item" key={item.id}>
              <div className="history-icon">
                <Languages size={19} />
              </div>
              <div className="history-main">
                <strong>{item.original}</strong>
                <span>{item.translated}</span>
                <small>{item.date}</small>
              </div>
              <div className="history-language">
                {item.from} <ArrowRight size={14} /> {item.to}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function AnalyticsPage({ history }) {
  const languages = ["French", "Italian", "Hindi", "Korean", "Spanish", "German"];
  const values = [8, 12, 6, 10, 5, 3];
  const max = Math.max(...values);

  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <div className="eyebrow">YOUR STATISTICS</div>
          <h1>Analytics & insights</h1>
          <p>Visual overview of your translation activity.</p>
        </div>
      </div>

      <div className="stats-grid analytics-stats">
        <div className="stat-card">
          <div className="stat-icon purple"><Languages size={21} /></div>
          <div className="stat-label">Total translations</div>
          <div className="stat-value">{24 + history.length}</div>
          <div className="stat-trend">All time</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue"><Globe size={21} /></div>
          <div className="stat-label">Languages</div>
          <div className="stat-value">8</div>
          <div className="stat-trend">Used so far</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><ImageIcon size={21} /></div>
          <div className="stat-label">Images</div>
          <div className="stat-value">32</div>
          <div className="stat-trend">Scanned</div>
        </div>
      </div>

      <div className="panel analytics-panel">
        <div className="panel-heading">
          <div>
            <h3>Language usage</h3>
            <p>Demo translation activity by language</p>
          </div>
        </div>

        <div className="bar-chart">
          {languages.map((lang, i) => (
            <div className="bar-column" key={lang}>
              <span className="bar-value">{values[i]}</span>
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{ height: `${(values[i] / max) * 100}%` }}
                />
              </div>
              <span className="bar-label">{lang}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("lingua_demo_logged") === "true"
  );
  const [username, setUsername] = useState(
    localStorage.getItem("lingua_demo_user") || "Riya"
  );
  const [page, setPage] = useState("dashboard");
  const [history, setHistory] = useState(readHistory);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("lingua_history", JSON.stringify(history));
  }, [history]);

  function login(name) {
    const safeName = name.charAt(0).toUpperCase() + name.slice(1);
    setUsername(safeName);
    setLoggedIn(true);
    localStorage.setItem("lingua_demo_logged", "true");
    localStorage.setItem("lingua_demo_user", safeName);
  }

  function logout() {
    setLoggedIn(false);
    localStorage.removeItem("lingua_demo_logged");
    setPage("dashboard");
  }

  function addHistory(item) {
    setHistory((prev) => [
      {
        ...item,
        id: Date.now(),
      },
      ...prev,
    ]);
  }

  function clearHistory() {
    if (window.confirm("Clear all translation history?")) {
      setHistory([]);
    }
  }

  if (!loggedIn) {
    return <LoginPage onLogin={login} />;
  }

  const pageTitles = {
    dashboard: "Dashboard",
    translator: "Image Translator",
    text: "Text Translator",
    camera: "Camera Scanner",
    signs: "Sign Recognition",
    history: "Translation History",
    analytics: "Analytics",
  };

  return (
    <div className="app-shell">
      <Sidebar
        page={page}
        setPage={setPage}
        onLogout={logout}
        mobileOpen={mobileOpen}
        closeMobile={() => setMobileOpen(false)}
      />

      <main className="main-area">
        <header className="topbar">
          <button className="mobile-menu-btn" onClick={() => setMobileOpen(true)}>
            <Menu size={22} />
          </button>
          <div className="breadcrumb">
            <span>LinguaVision</span>
            <span>/</span>
            <strong>{pageTitles[page]}</strong>
          </div>
          <div className="topbar-right">
            <div className="topbar-badge">
              <Sparkles size={14} /> AI Translator
            </div>
            <div className="topbar-avatar">{username[0]?.toUpperCase()}</div>
          </div>
        </header>

        {page === "dashboard" && (
          <DashboardHome setPage={setPage} history={history} username={username} />
        )}

        {page === "translator" && <TranslatorPage addHistory={addHistory} />}
        {page === "text" && <TextTranslatorPage />}
        {page === "camera" && <CameraPage />}
        {page === "signs" && <SignsPage />}
        {page === "history" && <HistoryPage history={history} clearHistory={clearHistory} />}
        {page === "analytics" && <AnalyticsPage history={history} />}
      </main>
    </div>
  );
}
