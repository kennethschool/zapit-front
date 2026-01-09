"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LightningBoltIcon } from "@/components/icons/lightning-bolt-icon";
import Link from 'next/link'

export function CallToAction() {
  return (
    <section className="py-20 relative overflow-hidden">
    
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-300/10 rounded-full blur-3xl -z-10"></div>

      <div className="container px-4 mx-auto">
        <motion.div
          className="bg-gradient-to-r from-primary/80 to-yellow-600/80 rounded-3xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative px-6 py-16 md:p-16">
     
            <motion.div
              className="absolute top-12 left-12 text-white/20"
              initial={{ opacity: 0, rotate: -20 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <LightningBoltIcon className="h-16 w-16" />
            </motion.div>
            <motion.div
              className="absolute bottom-12 right-12 text-white/20"
              initial={{ opacity: 0, rotate: 20 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <LightningBoltIcon className="h-24 w-24" />
            </motion.div>

            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
                Ready to transform your learning experience?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Join thousands of teachers and students who are making education
                more engaging, interactive, and effective with Zapit.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/auth/signup">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg font-medium"
                  >
                    Get Started for Free
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-yellow-500 bg-transparent text-white hover:text-white hover:bg-white/10 px-8 py-6 text-lg font-medium"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
              <p className="text-white/80 mt-6">
                No credit card required. Free plan available for individual
                users.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
