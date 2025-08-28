import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const FAQSection = () => {
  const [search, setSearch] = useState("");

  const faqs = [
    {
      question: "How do I become a driver with RideShare Pro?",
      answer:
        "Simply sign up through our driver portal, upload the required documents, and complete the onboarding process. Once approved, you can start accepting ride requests instantly.",
    },
    {
      question: "Is RideShare Pro available in my city?",
      answer:
        "RideShare Pro is expanding rapidly. Check our app or website to see the list of currently supported cities.",
    },
    {
      question: "How do I schedule a ride in advance?",
      answer:
        "In the RideShare Pro app, choose the 'Schedule Ride' option, pick your time and date, and confirm your booking.",
    },
    {
      question: "What safety features does RideShare Pro offer?",
      answer:
        "We have real-time GPS tracking, SOS alerts, driver background checks, and the ability to share your ride with friends or family.",
    },
    {
      question: "Can I use RideShare Pro for corporate travel?",
      answer:
        "Yes! We offer corporate accounts with centralized billing, expense tracking, and priority ride options.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card className="mt-16">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl mb-4">Frequently Asked Questions</CardTitle>
        <Input
          placeholder="Search for a question..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md mx-auto"
        />
      </CardHeader>
      <CardContent>
        {filteredFaqs.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="text-center text-muted-foreground">
            No matching questions found.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default FAQSection;
