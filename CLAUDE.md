# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js TypeScript portfolio website for a front-end developer. It's built using the pages directory structure (not the newer app directory) and uses Tailwind CSS for styling with Framer Motion and Anime.js for animations.

## Development Commands

- **Start development server**: `yarn dev` or `npm run dev`
- **Build for production**: `yarn build` or `npm run build`
- **Start production server**: `yarn start` or `npm start`
- **Lint code**: `yarn lint` or `npm run lint`

The project uses Yarn as the package manager (v1.22.19).

## Architecture

### Component Structure
The application follows a single-page application structure with all sections on the home page:

- **Layout**: Grid-based layout with a fixed sidebar (54px) and main content area
- **Sections**: Hero, About, Projects, Experience, Contact - all rendered in sequence
- **Navigation**: Fixed sidebar (`SideBar`) and header (`Header`) components

### Key Technologies
- **Next.js 14.2.1**: Using pages directory structure
- **TypeScript**: Strict mode enabled
- **Tailwind CSS**: Custom color palette using CSS variables
- **Framer Motion**: Primary animation library for most UI animations
- **Anime.js**: Used specifically for the staggered grid animation in the hero section
- **React Icons**: For icon components

### Styling System
- **Custom Color Palette**: 
  - Primary colors: Orange/red tones (`--primary`, `--primary-light`, `--primary-dark`)
  - Secondary colors: Purple tones (`--secondary`, `--secondary-light`, `--secondary-dark`)
  - Colors defined as CSS variables in `globals.css` and referenced in Tailwind config
- **Custom Tailwind Classes**:
  - `.bg-main-element`: Main background gradient
  - `.bg-mask-pattern`: Dotted pattern overlay with blur effect
  - `.writing-vertical`: Vertical text orientation
  - `.no-scrollbar`: Hide scrollbars

### File Organization
- **Pages**: `src/pages/` - Next.js pages structure
- **Components**: `src/components/` - Organized by feature/section
  - `hero/` - Hero section components
  - `about/` - About section with stats
  - `projects/` - Project showcase with modal
  - `experience/` - Experience timeline
  - `contact/` - Contact form/information
  - `nav/` - Navigation components
  - `buttons/` - Reusable button components
  - `util/` - Utility components (Chip, Reveal, SectionHeader)
- **Hooks**: `src/hooks/` - Custom React hooks
- **Styles**: `src/styles/globals.css` - Global styles and Tailwind imports

### Import Paths
- Uses TypeScript path mapping: `@/*` maps to `./src/*`
- Components are exported from `src/components/index.tsx` for cleaner imports

### Assets
- **Public folder**: Static assets including project images, CV PDF, and favicon
- **Project images**: Stored in `public/project-imgs/`

## Development Notes

- The project uses strict TypeScript configuration
- All styling follows Tailwind CSS utility-first approach
- Animation components use either Framer Motion or Anime.js depending on the use case
- The layout is responsive with different styling for mobile/desktop views
- SEO meta tags are configured in the main index page