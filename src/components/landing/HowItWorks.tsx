export default function HowItWorks() {
  const steps = [
    { num: "01", title: "A client calls your business" },
    { num: "02", title: "You miss the call" },
    { num: "03", title: "CallCapture responds instantly with a professional text" },
    { num: "04", title: "We collect key information — name, service need, urgency" },
    { num: "05", title: "You receive a clean, ready-to-follow-up lead" },
  ];

  return (
    <section id="how" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold tracking-tight mb-4">How CallCapture Works</h2>
          <p className="text-xl text-zinc-400">From missed call to captured client in seconds</p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 hover:border-yellow-500/50 transition-all group">
              <div className="text-7xl font-bold text-yellow-500/20 group-hover:text-yellow-500/40 transition mb-6">{step.num}</div>
              <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
