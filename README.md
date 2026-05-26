# RRCM Portfolio

A modern, responsive portfolio website built with **React**, **Vite**, **Tailwind CSS**, and **Firebase**. This site showcases services, processes, testimonials, and provides a contact form for inquiries.

## Features

- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Modern UI Components** - Navbar, Hero section, service cards, and more
- **Services Showcase** - Display detailed information about offered services
- **Process Timeline** - Visualize your workflow and methodology
- **Testimonials** - Build trust with client feedback
- **Contact Form** - Firebase-powered form for client inquiries
- **Performance Optimized** - Built with Vite for fast development and production builds
- **SEO Friendly** - Clean, semantic HTML structure
- **Smooth Animations** - Enhanced user experience with smooth scrolling and transitions

## Tech Stack

- **Frontend Framework** - React 18
- **Build Tool** - Vite
- **Styling** - Tailwind CSS
- **Backend** - Firebase (for form submissions and data management)
- **Deployment** - Vercel

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Navbar.jsx      # Navigation header
│   ├── Hero.jsx        # Hero section
│   ├── Services.jsx    # Services overview
│   ├── ServiceDetail.jsx # Detailed service view
│   ├── Process.jsx     # Process timeline
│   ├── ProcessDetail.jsx # Process details modal
│   ├── Stats.jsx       # Statistics display
│   ├── WhyUs.jsx       # Value proposition
│   ├── Testimonials.jsx # Client testimonials
│   ├── Contact.jsx     # Contact form
│   ├── Footer.jsx      # Footer section
│   ├── Ticker.jsx      # Scrolling ticker
│   └── BackToTop.jsx   # Back to top button
├── data/               # Data files
│   ├── servicesData.js # Services content
│   └── processData.js  # Process steps content
├── firebase.js         # Firebase configuration
├── App.jsx            # Main app component
├── main.jsx           # Entry point
└── index.css          # Global styles
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd rrcm-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase configuration:
   - Update `src/firebase.js` with your Firebase project credentials

### Development

Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Production Build

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Deployment

This project is configured for deployment on **Vercel**. The `vercel.json` configuration is included for optimal settings.

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically deploy on each push

## Configuration

### Tailwind CSS
Customized via `tailwind.config.js` for consistent styling across the site.

### PostCSS
Configured with `postcss.config.js` for CSS processing.

### Vite
Build configuration in `vite.config.js` with React plugin support.

## Features Breakdown

- **Navbar** - Sticky navigation with smooth scrolling to sections
- **Hero Section** - Eye-catching landing area
- **Services** - Display and detail view of offered services
- **Stats** - Key metrics and achievements
- **Why Us** - Unique value propositions
- **Process** - Step-by-step methodology
- **Testimonials** - Client success stories
- **Contact Form** - Firebase-integrated contact form
- **Footer** - Links and social information
- **Back to Top** - Easy navigation to the top of the page

## Performance

- **Fast Loading** - Vite's optimized bundling
- **Optimized Assets** - Tailwind CSS purging unused styles
- **Code Splitting** - Automatic with Vite
- **Lazy Loading** - Components load as needed

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary to RRCM.

## Contact

For inquiries or support, use the contact form on the website.

---

Built with ❤️ using modern web technologies.
