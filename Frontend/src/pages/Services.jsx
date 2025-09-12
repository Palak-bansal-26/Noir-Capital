import React, { useEffect, useState } from "react";
import "../styles/style.css";

const serviceData = [
  {
    title: "BUILDING A BUSINESS PLAN",
    intro: "We help craft business plans that are investor-ready, data-backed, and strategically sound.",
    details: [
      "Crafting a business plan is more than just numbers—it’s about creating a roadmap for success.",
      "At Noir Capital, we specialize in helping entrepreneurs and companies develop clear, actionable, and investor-ready business plans that align with their long-term goals.",
      "Whether you're launching a startup, scaling operations, or seeking investment, our team works closely with you to understand your vision and convert it into a compelling narrative supported by solid financials, market analysis, and strategic direction.",
      "From idea to execution, we ensure your plan stands out and speaks to the right audience—investors, partners, or stakeholders.",
    ],
  },
  {
    title: "STRATEGY AND OPERATION",
    intro: "Aligning your goals with execution through operational audits, strategic design, and performance improvements.",
    details: [
      "At Noir Capital, we don’t just help you set goals—we help you achieve them.",
      "Our Strategy and Operations services focus on aligning your business vision with practical, results-driven execution.",
      "We work with leadership teams to assess current operations, identify inefficiencies, and design strategic frameworks that foster growth, streamline processes, and boost performance.",
      "Whether it's scaling your company, entering a new market, or improving internal workflows, we deliver actionable insights and hands-on support every step of the way.",
      "Success isn't just about having the right strategy—it’s about flawlessly executing it. That’s where we come in.",
    ],
  },
  {
    title: "IMPROVING PROCESSES",
    intro: "We analyze, optimize, and implement efficient systems to reduce waste and increase output quality.",
    details: [
      "Efficiency is the backbone of any successful organization.",
      "At Noir Capital, we specialize in identifying bottlenecks and streamlining operations to help your business run smarter, not harder.",
      "Our approach is simple—analyze, optimize, and implement.",
      "We take a close look at your current workflows, uncover areas of waste or redundancy, and design custom solutions that improve productivity, reduce costs, and increase output quality.",
      "Whether you're scaling up or refining existing systems, we provide the tools and expertise to make your processes more agile and effective.",
    ],
  },
  {
    title: "HUMAN CAPITAL",
    intro: "Talent strategies, leadership development, and culture building—because people drive performance.",
    details: [
      "People are at the heart of every successful organisation.",
      "At Noir Capital, we understand that investing in your team is one of the most powerful ways to drive growth and sustainability.",
      "We help you align your talent strategy with your business goals — from attracting and retaining top-tier talent to developing leadership and strengthening company culture.",
      "Our tailored solutions focus on optimising team structure, improving employee engagement, and unlocking the full potential of your workforce.",
    ],
  },
  {
    title: "INVESTMENT MANAGEMENT",
    intro: "We deliver personalized, risk-aware strategies to grow and protect your capital long-term.",
    details: [
      "At Noir Capital, we provide strategic investment management solutions designed to preserve wealth, maximize returns, and align with your long-term goals.",
      "Whether you're an individual investor, a startup, or a growing enterprise, our expert team offers data-driven insights, risk-managed portfolios, and personalized strategies tailored to your unique financial vision.",
      "We combine market intelligence with disciplined execution to ensure your assets are working as efficiently as possible.",
      "With us, your investments are not just managed — they're empowered.",
    ],
  },
];

const Services = () => {
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowCards(true), 200);
  }, []);

  return (
    <div className="services-page">
      <section className="services-hero">
        <h1>OUR SERVICES</h1>
        <p>Strategic consulting for businesses that demand results</p>
        <button className="btn-primary">Let's Talk</button>
      </section>

      <section className="services-grid">
        {serviceData.map((service, index) => (
          <div
            key={index}
            className={`service-card ${showCards ? "show" : ""}`}
          >
            <h2>{service.title}</h2>
            <p><strong>{service.intro}</strong></p>
            {service.details.map((point, i) => (
              <p key={i}>{point}</p>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
};

export default Services;
