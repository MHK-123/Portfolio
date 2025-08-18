# Mohammed Hussain - Cyberpunk Portfolio

## Overview

This is a personal portfolio website for Mohammed Hussain featuring a cyberpunk aesthetic with interactive particle effects, smooth animations, and responsive design. The site showcases personal information, skills, projects, and contact details in a futuristic dark theme with electric blue, neon purple, and cyber cyan accents. Built as a static website optimized for GitHub Pages hosting with no build process required.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

**Frontend Architecture**
- Static single-page application (SPA) using vanilla HTML, CSS, and JavaScript
- No framework dependencies - pure web technologies for maximum compatibility
- Modular structure with separate HTML, CSS, and JavaScript files
- Responsive design using CSS Grid and Flexbox layouts
- CSS custom properties (variables) for consistent theming across components

**Styling System**
- CSS-in-file approach with embedded styles or separate stylesheet
- Custom CSS animations and transitions for interactive effects
- Cyberpunk color scheme defined through CSS custom properties
- Font integration via Google Fonts CDN (Orbitron and Rajdhani families)
- Responsive breakpoints for desktop, tablet, and mobile viewports

**Interactive Features**
- Particle.js integration for animated background particle system
- Intersection Observer API for scroll-triggered animations
- Typing animation effects for dynamic text display
- Smooth scrolling navigation between sections
- Form validation for contact section
- Hover effects with 3D CSS transforms

**Performance Optimizations**
- CDN-based external resources (fonts, icons, libraries)
- Minimal JavaScript footprint with vanilla implementations
- Optimized particle system configuration for smooth animations
- Lazy loading and efficient DOM manipulation strategies

## External Dependencies

**JavaScript Libraries**
- Particles.js (v2.0.0) - Particle animation system for interactive background effects
- CDN: `https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js`

**Typography**
- Google Fonts API - Orbitron and Rajdhani font families
- CDN: `https://fonts.googleapis.com/css2`

**Icons**
- Font Awesome (v6.4.0) - Icon library for UI elements and social media links
- CDN: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css`

**Hosting Platform**
- GitHub Pages - Static site hosting with automatic deployment from repository
- No server-side processing or database requirements
- Direct file serving from repository root directory