const steps = [
  { text: "We check the date — usually within [48 hours].", color: "#f1ac91" },
  { text: "We suggest a setup: which sides, when, and for how long.", color: "#e9a0bd" },
  { text: "You get a clear quote. No hard sell, promise.", color: "#b9c6ea" },
];

// Questions from the approved design — answers still to be written with Simona & Xavier
const faqs = [
  { question: "Do you bring your own sound system?", answer: "[Answer — to be written with Simona & Xavier]" },
  { question: "How much space do you need?", answer: "[Answer — to be written with Simona & Xavier]" },
  { question: "Can we send song requests?", answer: "[Answer — to be written with Simona & Xavier]" },
  { question: "Do you travel?", answer: "[Answer — to be written with Simona & Xavier]" },
];

/** Sidebar next to the booking form: next steps, direct contact and FAQ. */
export default function BookingInfo() {
  return (
    <aside className="flex flex-col gap-10">
      <section aria-labelledby="next-steps" className="flex flex-col gap-[18px]">
        <h2 id="next-steps" className="text-[28px] leading-none font-semibold tracking-[-0.045em] md:text-[30px]">
          What happens next
        </h2>
        <ol className="flex flex-col gap-4 text-base leading-normal">
          {steps.map((step, i) => (
            <li key={step.text} className="flex gap-3.5">
              <span
                aria-hidden="true"
                className="flex size-8 shrink-0 items-center justify-center rounded-full font-semibold"
                style={{ background: step.color }}
              >
                {i + 1}
              </span>
              <span>{step.text}</span>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="rather-talk" className="flex flex-col gap-2 text-base">
        <h2 id="rather-talk" className="mb-2 text-[28px] leading-none font-semibold tracking-[-0.045em] md:text-[30px]">
          Rather talk?
        </h2>
        <a
          href="mailto:peachnpicklemusic@gmail.com"
          className="flex min-h-11 items-center self-start font-semibold underline decoration-peach decoration-2 underline-offset-[6px] hover:text-magenta"
        >
          peachnpicklemusic@gmail.com
        </a>
        <p>Instagram · @peachnpicklemusic</p>
      </section>

      <section aria-labelledby="faq" className="flex flex-col">
        <h2 id="faq" className="mb-3.5 text-[28px] leading-none font-semibold tracking-[-0.045em] md:text-[30px]">
          FAQ
        </h2>
        {faqs.map((faq) => (
          <details key={faq.question} className="group border-t-[1.5px] border-ink py-4 last:border-b-[1.5px]">
            <summary className="flex min-h-7 cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-semibold [&::-webkit-details-marker]:hidden">
              {faq.question}
              <span aria-hidden="true" className="text-xl transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-2.5 text-[15px] leading-normal text-muted">{faq.answer}</p>
          </details>
        ))}
      </section>
    </aside>
  );
}
