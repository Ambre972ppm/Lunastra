import { notFound, redirect } from 'next/navigation';
import { sections } from '@/lib/navigation';
export const dynamic = 'force-dynamic';
export default async function PrivateSection({params}: {params: Promise<{section:string}>}) {
  const {section} = await params;
  if (!sections.some(([slug]) => slug === section)) notFound();
  // No personal surface is opened until server authentication is integrated.
  redirect('/connexion');
}
