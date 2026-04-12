"use client";

import { motion } from "framer-motion";

const faqs = [
  [
    "How does CallCapture work?",
    "When a lead calls and no one answers, we instantly text them and begin qualification automatically.",
  ],
  [
    "Can I use my existing business phone number?",
    "Yes. CallCapture works with your current phone system.",
  ],
  [
    "How long does setup take?",
    "Typical setup takes about 15 minutes.",
  ],
  [
    "What information do you collect from leads?",
    "We can capture name, phone, address, service need, urgency, and custom intake fields.",
  ],
  [
    "Where do captured leads go?",
    "They can be delivered via text, email, CRM, webhook, or integrated workflow.",
  ],
  [
    "What if my team calls them back manually?",
    "Great. CallCapture simply improves your response speed and lead recovery.",
  ],
  [
    "Is there a contract?",
    "No. Month-to-month with cancel anytime flexibility.",
  ],
  [
    "Do I keep all captured leads?",
    "Yes. Always.",
  ],
];

const FAQ = () => (
  <section id="faq" className="bg-background py-24 md:py-32">
    <div className="container mx-auto px-6">
      <motion.div
        className="mx-auto max-w-3xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
          Frequently Asked Questions
        </h2>
      </motion.div>

      <div className="mx-auto mt-14 max-w-4xl space-y-4">
        {faqs.map(([question, answer], index) => (
          <motion.div
            key={question}
            className="rounded-2xl border border-border bg-card p-6 md:p-8"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: index * 0.05 }}
          >
            <h3 className="font-display text-xl font-bold text-foreground">
              {question}
            </h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {answer}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FAQ;
