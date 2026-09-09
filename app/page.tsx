import Link from "next/link";
import { Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function Home() { return <main className="luna-page luna-welcome"><Moon size={64} aria-hidden="true"/><p className="luna-kicker">Un espace à soi</p><h1>Lunastra</h1><p className="luna-tagline">Les astres, les cycles, à mon rythme.</p><p>Explorez votre ciel, vos saisons et ce qui résonne en vous.</p><div className="luna-actions"><Button asChild size="lg"><Link href="/inscription">Créer mon compte</Link></Button><Button asChild variant="outline" size="lg"><Link href="/connexion">Me connecter</Link></Button></div><Link href="/apercu">Découvrir les rubriques</Link><p className="luna-caption">Base de développement · Comptes non activés</p></main>; }
