export default function WhosItFor() {
  const industries = [
    "Medical aesthetics — Med spas & cosmetic clinics",
    "Legal intake — Law firms & case intake teams",
    "Professional services — Consulting & financial advisory",
    "Appointment-based businesses",
    "Any inbound-dependent high-value service",
  ];

  return (
    <section className="py-24 px-6 bg-zinc-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold tracking-tight text-center mb-16">Built for High-Intent Inbound Businesses</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, i) => (
            <div key={i} className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 hover:border-yellow-500/30 transition">
              <p className="text-lg">{industry}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
