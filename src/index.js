import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, ShoppingCart, Coffee, Cookie, Sandwich, Clock, Search, Filter, ExternalLink } from "lucide-react";

// Mock data for the wireframe menu
const MENU = [
  { id: "m1", name: "Espresso", price: 3.5, category: "Bebidas", tags: ["Café"], img: "https://placehold.co/600x400?text=Espresso", desc: "Shot de espresso de tueste medio." },
  { id: "m2", name: "Latte", price: 4.25, category: "Bebidas", tags: ["Café"], img: "https://placehold.co/600x400?text=Latte", desc: "Leche vaporizada con espresso." },
  { id: "m3", name: "Concha de pistache", price: 5.0, category: "Panadería", tags: ["Dulce"], img: "https://placehold.co/600x400?text=Concha", desc: "Masa suave con cobertura de pistache." },
  { id: "m4", name: "Croissant", price: 4.5, category: "Panadería", tags: ["Mantequilla"], img: "https://placehold.co/600x400?text=Croissant", desc: "Hojaldre artesanal." },
  { id: "m5", name: "Chilaquiles rojos", price: 10.0, category: "Comida", tags: ["Desayuno"], img: "https://placehold.co/600x400?text=Chilaquiles", desc: "Totopos con salsa roja, queso y crema." },
  { id: "m6", name: "Mollete", price: 7.0, category: "Comida", tags: ["Vegetariano"], img: "https://placehold.co/600x400?text=Mollete", desc: "Bolillo, frijoles, queso gratinado." }
];

const CATEGORIES = ["Todos", "Bebidas", "Panadería", "Comida"];

// Basic analytics mock
function track(event, payload = {}) {
  // Replace with your analytics provider; this is only a stub
  // Example: window.gtag?.("event", event, payload)
  // For wireframe demo, we log to console
  // eslint-disable-next-line no-console
  console.log("analytics", { event, ...payload });
}

export default function WireframePanCoffee() {
  const [category, setCategory] = useState("Todos");
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Inject basic LocalBusiness JSON-LD for the wireframe
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "schema-localbusiness";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CafeOrCoffeeShop",
      name: "Pan & Coffee",
      url: "https://panandcoffeeusa.com/",
      telephone: "+1-210-555-0137",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1234 Sample Rd",
        addressLocality: "San Antonio",
        addressRegion: "TX",
        postalCode: "78201",
        addressCountry: "US"
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "07:00",
          closes: "15:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday", "Sunday"],
          opens: "08:00",
          closes: "15:00"
        }
      ]
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  const filtered = useMemo(() => {
    const list = category === "Todos" ? MENU : MENU.filter(i => i.category === category);
    const s = search.trim().toLowerCase();
    return s ? list.filter(i => i.name.toLowerCase().includes(s) || i.tags.join(" ").toLowerCase().includes(s)) : list;
  }, [category, search]);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:bg-white focus:text-black focus:px-3 focus:py-2 focus:rounded-md shadow">Saltar al contenido</a>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span aria-hidden className="inline-flex p-2 rounded-xl bg-neutral-100"><Coffee className="w-5 h-5" /></span>
            <span className="font-semibold tracking-tight">Pan & Coffee</span>
          </div>
          <nav aria-label="Principal" className="hidden md:flex items-center gap-6 text-sm">
            <a href="#menu" className="hover:underline">Menú</a>
            <a href="#ubicacion" className="hover:underline">Ubicación</a>
            <a href="#horarios" className="hover:underline">Horarios</a>
            <a href="#contacto" className="hover:underline">Contacto</a>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="tel:+12105550137"
              onClick={() => track("tap_to_call")}
              data-analytics="tap_to_call"
              className="inline-flex items-center gap-2 rounded-2xl border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400"
            >
              <Phone className="w-4 h-4" /> Llamar
            </a>
            <a
              href="https://maps.google.com/?q=Pan+%26+Coffee+San+Antonio"
              target="_blank" rel="noreferrer"
              onClick={() => track("tap_to_map")}
              data-analytics="tap_to_map"
              className="inline-flex items-center gap-2 rounded-2xl bg-neutral-900 text-white px-3 py-2 text-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-neutral-400"
            >
              <MapPin className="w-4 h-4" /> Cómo llegar
            </a>
            <button
              onClick={() => track("cta_order")}
              data-analytics="cta_order"
              className="hidden sm:inline-flex items-center gap-2 rounded-2xl border border-neutral-900 px-3 py-2 text-sm hover:bg-neutral-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400"
            >
              <ShoppingCart className="w-4 h-4" /> Ordenar
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section aria-labelledby="hero-title" className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-8 px-4 py-10 items-center">
          <div>
            <h1 id="hero-title" className="text-3xl md:text-4xl font-extrabold tracking-tight">Pan artesanal y café de especialidad</h1>
            <p className="mt-3 text-neutral-600">Calidad local, ingredientes honestos y un menú claro en HTML. Sin PDFs pesados, sin rodeos.</p>
            <div className="mt-5 flex gap-2">
              <a href="#menu" className="rounded-2xl bg-neutral-900 text-white px-4 py-2 text-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-neutral-400">Ver menú</a>
              <a href="#ubicacion" className="rounded-2xl border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400">Visítanos</a>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="aspect-video rounded-3xl bg-neutral-100 flex items-center justify-center">
            <span className="text-neutral-400">Imagen hero (lazy, 1600×900)</span>
          </motion.div>
        </div>
      </section>

      <main id="main" className="mx-auto max-w-6xl px-4">
        {/* Menu controls */}
        <section id="menu" aria-labelledby="menu-title" className="py-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2 id="menu-title" className="text-2xl font-bold tracking-tight">Menú</h2>
              <p className="text-sm text-neutral-600">Filtra por categoría o busca por nombre/etiquetas. Todos los ítems son HTML, listos para schema Menu/MenuItem.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <label className="relative">
                <span className="sr-only">Buscar</span>
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar…"
                  className="w-full sm:w-64 pl-9 pr-3 py-2 rounded-2xl border border-neutral-300 bg-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400"
                />
              </label>
              <label className="relative">
                <span className="sr-only">Categoría</span>
                <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="pl-9 pr-8 py-2 rounded-2xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-neutral-400"
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </label>
            </div>
          </div>

          {/* Menu grid */}
          <ul role="list" className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(item => (
              <li key={item.id} className="group rounded-3xl border border-neutral-200 bg-white overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-neutral-400">
                <a href="#" className="block focus:outline-none" aria-labelledby={`item-${item.id}-title`} onClick={(e) => { e.preventDefault(); track("view_menu_item", { id: item.id }); }}>
                  <div className="aspect-[4/3] bg-neutral-100">
                    <img
                      src={item.img}
                      alt={`Foto de ${item.name}`}
                      loading="lazy"
                      width="600"
                      height="400"
                      className="h-full w-full object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 id={`item-${item.id}-title`} className="font-semibold tracking-tight">{item.name}</h3>
                      <span className="text-sm text-neutral-600">${item.price.toFixed(2)}</span>
                    </div>
                    <p className="mt-1 text-sm text-neutral-600 line-clamp-2">{item.desc}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-neutral-600">
                      {item.tags.map(t => (
                        <span key={t} className="inline-flex items-center rounded-full border border-neutral-300 px-2 py-0.5">{t}</span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <button
                        className="inline-flex items-center gap-2 rounded-2xl border border-neutral-300 px-3 py-1.5 text-sm hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400"
                        onClick={() => track("cta_add_to_order", { id: item.id })}
                        data-analytics="add_to_order"
                      >
                        <ShoppingCart className="w-4 h-4" /> Agregar
                      </button>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>

          {/* Menu schema hint */}
          <details className="mt-6 p-4 rounded-2xl border border-dashed border-neutral-300 bg-neutral-50">
            <summary className="cursor-pointer font-medium">Sugerencia técnica: schema Menu/MenuItem</summary>
            <pre className="mt-2 text-xs overflow-auto"><code>{`
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Menu",
  "hasMenuSection": [
    {"@type": "MenuSection", "name": "Bebidas", "hasMenuItem": [{"@type": "MenuItem", "name": "Espresso", "offers": {"@type": "Offer", "price": "3.50", "priceCurrency": "USD"}}]}
  ]
}
</script>
`}</code></pre>
          </details>
        </section>

        {/* Location */}
        <section id="ubicacion" aria-labelledby="ubicacion-title" className="py-10 border-t border-neutral-200">
          <h2 id="ubicacion-title" className="text-2xl font-bold tracking-tight">Ubicación</h2>
          <div className="mt-4 grid md:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-neutral-200 bg-white p-4">
              <address className="not-italic text-sm text-neutral-700">
                Pan & Coffee<br />
                1234 Sample Rd, San Antonio, TX 78201<br />
                <a href="tel:+12105550137" className="underline">+1 (210) 555‑0137</a>
              </address>
              <div className="mt-4">
                <a
                  href="https://maps.google.com/?q=Pan+%26+Coffee+San+Antonio"
                  target="_blank" rel="noreferrer"
                  onClick={() => track("map_open")}
                  className="inline-flex items-center gap-2 rounded-2xl border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100"
                >
                  <MapPin className="w-4 h-4" /> Abrir mapa
                </a>
              </div>
            </div>
            <div className="rounded-3xl border border-neutral-200 bg-white p-4 aspect-video flex items-center justify-center">
              <span className="text-neutral-400">Mapa embebido / imagen del local</span>
            </div>
          </div>
        </section>

        {/* Hours */}
        <section id="horarios" aria-labelledby="horarios-title" className="py-10 border-t border-neutral-200">
          <h2 id="horarios-title" className="text-2xl font-bold tracking-tight">Horarios</h2>
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { d: "Lun–Vie", h: "7:00 – 15:00" },
              { d: "Sáb–Dom", h: "8:00 – 15:00" }
            ].map((row, i) => (
              <div key={i} className="rounded-2xl border border-neutral-200 bg-white p-4 flex items-center gap-3">
                <Clock className="w-5 h-5" />
                <div>
                  <div className="font-medium">{row.d}</div>
                  <div className="text-sm text-neutral-600">{row.h}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contacto" aria-labelledby="contacto-title" className="py-10 border-t border-neutral-200">
          <h2 id="contacto-title" className="text-2xl font-bold tracking-tight">Contacto</h2>
          <form className="mt-4 max-w-xl rounded-3xl border border-neutral-200 bg-white p-4" onSubmit={(e) => { e.preventDefault(); track("contact_submit"); }}>
            <div className="grid sm:grid-cols-2 gap-3">
              <label className="text-sm">Nombre
                <input type="text" required className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-400" />
              </label>
              <label className="text-sm">Email
                <input type="email" required className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-400" />
              </label>
            </div>
            <label className="block text-sm mt-3">Mensaje
              <textarea rows={4} className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-400"></textarea>
            </label>
            <div className="mt-4 flex items-center gap-2">
              <button type="submit" className="rounded-2xl bg-neutral-900 text-white px-4 py-2 text-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-neutral-400">Enviar</button>
              <p className="text-xs text-neutral-500">Este formulario es de demostración.</p>
            </div>
          </form>
        </section>

        {/* Notes / QA checklist */}
        <section className="py-10 border-t border-neutral-200">
          <h2 className="text-2xl font-bold tracking-tight">Checklist de calidad (wireframe)</h2>
          <ul className="mt-3 grid sm:grid-cols-2 gap-2 text-sm list-disc list-inside text-neutral-700">
            <li>Título y meta descripción únicas por página/sección</li>
            <li>Un H1 por página, subtítulos H2/H3 coherentes</li>
            <li>Datos estructurados LocalBusiness y Menu</li>
            <li>Imágenes en AVIF/WebP, lazy loading, dimensiones fijas</li>
            <li>CTA persistente para Ordenar, Llamar y Cómo llegar</li>
            <li>Eventos de analítica: tap-to-call, mapa, ordenar, vistas de ítems</li>
            <li>Accesibilidad: alt, foco visible, contraste AA</li>
          </ul>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-10 border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          <div>
            <div className="font-semibold">Pan & Coffee</div>
            <p className="text-neutral-600 mt-1">Panadería y cafetería local.</p>
          </div>
          <div>
            <div className="font-semibold">Legal</div>
            <ul className="mt-1 space-y-1">
              <li><a href="#" className="underline">Política de privacidad</a></li>
              <li><a href="#" className="underline">Términos y condiciones</a></li>
              <li><a href="#" className="inline-flex items-center gap-1 underline">Cookies <ExternalLink className="w-3 h-3" /></a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">Contacto</div>
            <ul className="mt-1 space-y-1 text-neutral-600">
              <li><a href="tel:+12105550137" className="underline">+1 (210) 555‑0137</a></li>
              <li><a href="mailto:hello@panandcoffeeusa.com" className="underline">hello@panandcoffeeusa.com</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">Síguenos</div>
            <ul className="mt-1 space-y-1">
              <li><a href="#" className="underline">Instagram</a></li>
              <li><a href="#" className="underline">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="text-xs text-neutral-500 px-4 py-4 text-center">© {new Date().getFullYear()} Pan & Coffee. Wireframe de demo.</div>
      </footer>
    </div>
  );
}
