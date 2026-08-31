

# 📚 Aaron-zon.github.io

A personal technical blog and documentation site built with **VitePress** and **Vue 3**. This repository serves as a centralized hub for development notes, technical articles, AI/LLM research, and interactive developer tools. It covers a wide range of topics including frontend engineering, backend development, DevOps, Android architecture, and practical coding guides.

## ✨ Features
- 📖 **Categorized Notes**: Structured documentation for JavaScript, Java, Vue 3, Python, Docker, Linux, Redis, Nginx, AI, and more.
- 📝 **Blog Archive**: Yearly indexed technical posts covering troubleshooting, environment setup, and framework tips.
- 🛠️ **Online Utilities**: Client-side tools for Base64/URL/MD5 encoding, JSON formatting, camelCase conversion, QR code generation, and image-to-PDF conversion.
- 🤖 **AI & LLM Focus**: Comprehensive guides on Prompt Engineering, RAG architecture, Knowledge Base setup, and AI product design patterns.
- 🎨 **Enhanced Theme**: Custom VitePress theme extended with `Element Plus` for a clean, responsive, and modern UI.
- ⚡ **Static & Fast**: Leverages VitePress for instant dev hot-reload and optimized static site generation.

## 🛠️ Tech Stack
| Category | Tools |
|:---|:---|
| **Static Site Generator** | VitePress `^1.5.0` |
| **Framework** | Vue 3 `^3.4.0` |
| **UI Component Library** | Element Plus `^2.11.4` |
| **Package Manager** | pnpm `^10.27.0` |
| **CI/CD** | GitHub Actions (Auto-deploy to GitHub Pages) |
| **Client Utilities** | `crypto-js`, `pdf-lib`, `qrcode.vue`, `vue-json-pretty`, `imagetracerjs` |

## 📦 Installation

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) and [pnpm](https://pnpm.io/) installed.

```bash
# Clone the repository
git clone https://github.com/Aaron-zon/Aaron-zon.github.io.git
cd Aaron-zon.github.io

# Install dependencies
pnpm install
```

## 🚀 Usage

### Local Development
Start the development server with hot module replacement:
```bash
pnpm docs:dev
# or
pnpm dev
```
The site will be accessible at `http://localhost:5173` (or the port assigned by VitePress).

### Production Build
Compile the site for deployment:
```bash
pnpm docs:build
```
The output will be generated in the `docs/.vitepress/dist` directory.

### Preview Build
Locally preview the production build:
```bash
pnpm docs:preview
```

## 📁 Project Structure
```
├── docs/
│   ├── .vitepress/           # Config, theme customization & route scripts
│   ├── ai/                   # AI/LLM guides, RAG & Prompt Engineering notes
│   ├── blog/                 # Technical articles & setup tutorials
│   ├── tools/                # Interactive utility implementations
│   ├── linux/                # Linux, Ubuntu & server management notes
│   ├── java/                 # Java core, Spring Boot & Cloud notes
│   ├── vue3/                 # Vue 3 internals, reactivity & compilation
│   ├── android/              # Android directory structure & AAOS notes
│   └── ...                   # Additional categorized documentation
├── .github/                  # GitHub Actions deployment workflow
├── package.json
└── README.md
```

## 🌐 Deployment
This repository uses a GitHub Actions workflow (`.github/workflows/deploy.yml`) to automatically build and deploy the site to **GitHub Pages** upon every push to the `main` branch. No manual deployment is required.

## 📜 License
This project is licensed under the ISC License.
