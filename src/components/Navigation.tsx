import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Navigation = () => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm"
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-bold">Cashora</span>
        </div>
        <nav className="flex items-center space-x-4">
          <Button variant="ghost">Features</Button>
          <Button variant="ghost">About</Button>
          <Button variant="ghost">Contact</Button>
          <Button variant="outline">Sign In</Button>
          <Button>Sign Up</Button>
        </nav>
      </div>
    </motion.header>
  );
};

export default Navigation;