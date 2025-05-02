// SearchBar.tsx - Further refined icon alignment and floating label
import React, { useRef, useState } from 'react';
import { Search as SearchIcon, ArrowRight, X, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input'; // Assuming Shadcn UI Input
import { Button } from '@/components/ui/button'; // Assuming Shadcn UI Button
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  value: string;
  onChange: (query: string) => void;
  onSearch: (query: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export default function SearchBar({
  value,
  onChange,
  onSearch,
  onFocus,
  onBlur,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value);
    }
    inputRef.current?.blur();
    // No need to manually set isFocused here, onBlur will handle it
  };

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    // Delay blur slightly to allow clicks on suggestions/buttons within the form/dropdown
    setTimeout(() => {
      // Check if focus is still *somewhere* within the search bar's parent container
      // This is a basic check; more robust might involve checking relatedTarget
      if (inputRef.current && !inputRef.current.contains(document.activeElement)) {
         setIsFocused(false);
         onBlur?.();
      }
    }, 150);
  };

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus(); // Keep focus after clearing
  };

  // Define consistent height (e.g., h-14 or h-16)
  const barHeight = "h-16"; // Tailwind class for height
  const iconSize = 20; // Size for most icons
  const paddingX = "px-4"; // Horizontal padding for the bar

  return (
    <motion.div
      className="max-w-3xl mx-auto relative"
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <form onSubmit={handleSubmit} className="relative group">
        {/* Background Effect */}
        <motion.div
          className={`absolute inset-0 bg-background/80 dark:bg-background/60 backdrop-blur-lg rounded-full border border-muted/30 shadow-md group-hover:shadow-lg transition-shadow duration-300 ${barHeight}`}
          animate={{ scale: isFocused ? 1.01 : 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />

        {/* Content Layer - Using Flexbox for alignment */}
        <div className={`relative z-10 flex items-center w-full ${barHeight} ${paddingX}`}>

          {/* Left Icons Group */}
          <div className="flex items-center shrink-0 mr-3 pointer-events-none">
            <SearchIcon className={`w-5 h-5 transition-colors duration-200 ${isFocused ? 'text-primary' : 'text-muted-foreground'}`} />
            <AnimatePresence>
                {isFocused && (
                    <motion.div
                        initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                        animate={{ opacity: 1, width: 'auto', marginLeft: '0.5rem' }} // Animate margin too
                        exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center" // Needed for alignment if margin animates
                    >
                        <Sparkles className="w-4 h-4 text-accent animate-pulse" />
                    </motion.div>
                )}
            </AnimatePresence>
          </div>

          {/* Input with Floating Label */}
          <div className="relative flex-grow h-full flex items-center">
            <Input
              ref={inputRef}
              type="text"
              id="search-input"
              placeholder=" " // Keep space for label trick
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              // Adjusted padding: No horizontal padding here, handled by parent flex gap/margins
              // Vertical padding needed to push text down for label
              className={`peer h-full w-full rounded-full border-none bg-transparent text-foreground text-base focus-visible:ring-0 focus-visible:ring-offset-0 pt-5 pb-1`} // pt-5 provides space for label
            />
            <label
                htmlFor="search-input"
                className={`absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none transition-all duration-300 ease-out origin-left
                           peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-base
                           peer-focus:top-2.5 peer-focus:-translate-y-0 peer-focus:scale-75 peer-focus:text-primary
                           ${value ? 'top-2.5 -translate-y-0 scale-75 text-primary' : ''} `} // Handle non-empty state
            >
              Search lenses, cameras, accessories...
            </label>
          </div>

          {/* Right Icons Group */}
          <div className="flex items-center shrink-0 ml-3 space-x-2">
            {/* Clear Button */}
            <AnimatePresence>
              {value && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.15 }}
                >
                  <button
                    type="button"
                    onClick={handleClear}
                    aria-label="Clear search"
                    // Use padding to control hit area, rounded-full for style
                    className="p-1.5 text-muted-foreground hover:text-destructive rounded-full focus:outline-none focus:ring-1 focus:ring-destructive/50 focus:ring-offset-1 focus:ring-offset-background"
                  >
                    <X size={iconSize} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="default" // Use theme's default button style
              aria-label="Submit search"
              // Consistent size, flex center for icon
              className="rounded-full w-10 h-10 p-0 flex items-center justify-center shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-shadow duration-200"
            >
              <ArrowRight size={iconSize} className="text-primary-foreground" />
            </Button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}