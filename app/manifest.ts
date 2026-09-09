import type { MetadataRoute } from 'next';
export default function manifest(): MetadataRoute.Manifest { return {
  id: '/', name: 'Lunastra', short_name: 'Lunastra', lang: 'fr', start_url: '/', scope:'/',
  description: 'Les astres, les cycles, à mon rythme.', display: 'standalone', background_color:'#0b1726', theme_color:'#0b1726',
}; }
