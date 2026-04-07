import { Phone } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-background py-10">
    <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground sm:flex-row">
      <div className="flex items-center gap-2 font-display font-semibold text-foreground">
        <Phone className="h-4 w-4 text-primary" />
        CallCapture
      </div>
      <div className="flex gap-6">
        <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
        <a href="#" className="transition-colors hover:text-foreground">Terms</a>
      </div>
      <p>&copy; {new Date().getFullYear()} CallCapture. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
