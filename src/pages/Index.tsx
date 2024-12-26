import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <Navigation />
      <Hero />
    </motion.div>
  );
};

export default Index;