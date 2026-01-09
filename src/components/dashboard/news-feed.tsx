import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Newspaper, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const NEWS_ITEMS = [
  {
    id: '1',
    title: 'New Feature: Flashcards!',
    description: 'Create and study with our new flashcard system.',
    date: 'Just now',
    type: 'feature'
  },
  {
    id: '2',
    title: 'Weekend Challenge',
    description: 'Join our weekend learning challenge to earn special badges.',
    date: '2 hours ago',
    type: 'event'
  },
  {
    id: '3',
    title: 'System Update',
    description: 'Performance improvements and bug fixes.',
    date: 'Yesterday',
    type: 'update'
  }
];

export function NewsFeed() {
  const [isOpen, setIsOpen] = useState(false);
  const [news, setNews] = useState(NEWS_ITEMS);

  const removeNews = (id: string) => {
    setNews(news.filter(item => item.id !== id));
  };

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 rounded-full h-12 w-12 shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Newspaper className="h-5 w-5" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-20 right-4 w-80 max-h-[70vh] overflow-auto"
          >
            <Card>
              <CardHeader>
                <CardTitle>News & Updates</CardTitle>
                <CardDescription>Stay up to date with Zapit</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {news.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Card>
                      <CardContent className="p-4 relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 h-6 w-6 p-0"
                          onClick={() => removeNews(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.date}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}