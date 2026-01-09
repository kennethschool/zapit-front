"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QuoteIcon } from "lucide-react";

const speeches = [
  {
    quote: "I love Zapit",
    name: "Petros D.",
    role: "Computer Scientist",
    avatar: "/images/default_person_image.jpg",
    initials: "PD",
  },
  {
    quote: "I love Zapit",
    name: "Jack H.",
    role: "Computer Scientist",
    avatar: "/images/default_person_image.jpg",
    initials: "JH",
  },
  {
    quote: "I love Zapit",
    name: "Gabriel M.",
    role: "Computer Scientist",
    avatar: "/images/default_person_image.jpg",
    initials: "GM",
  },
  {
    quote: "I love Zapit",
    name: "Wesley L.",
    role: "Computer Scientist",
    avatar: "/images/default_person_image.jpg",
    initials: "WL",
  },
];

export function speechesSection() {
  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-yellow-100 text-yellow-800 mb-6">
            <span className="text-sm font-medium">Success Stories</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by peers
          </h2>
          <p className="text-xl text-muted-foreground">
            How Zapit is transforming the learning experience in the UK
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {speeches.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="mr-4 mt-1 text-primary">
                      <QuoteIcon size={24} />
                    </div>
                    <p className="text-lg">{testimonial.quote}</p>
                  </div>
                  <div className="flex items-center mt-6">
                    <Avatar className="h-12 w-12 mr-4 border-2 border-primary">
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={testimonial.name}
                      />
                      <AvatarFallback>{testimonial.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
