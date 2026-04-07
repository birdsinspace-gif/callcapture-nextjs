export default function Footer() {
  return (
    <footer className="bg-zinc-950 py-12 px-6 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} CallCapture. All rights reserved.<br />
        Built for high-value inbound businesses that refuse to lose clients to missed calls.
      </div>
    </footer>
  );
}
