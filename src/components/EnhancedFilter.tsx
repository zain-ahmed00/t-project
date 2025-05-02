import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronDown, Check, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

interface FilterOption {
  id: string;
  label: string;
}

interface EnhancedFilterProps {
  categories: FilterOption[];
  brands: FilterOption[];
  colors: FilterOption[];
  onFilterChange: (filters: any) => void;
}

const EnhancedFilter = ({ categories, brands, colors, onFilterChange }: EnhancedFilterProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 200]);
  
  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };
  
  const toggleCategory = (id: string) => {
    setSelectedCategories(prev => 
      prev.includes(id) 
        ? prev.filter(catId => catId !== id) 
        : [...prev, id]
    );
  };
  
  const toggleBrand = (id: string) => {
    setSelectedBrands(prev => 
      prev.includes(id) 
        ? prev.filter(brandId => brandId !== id) 
        : [...prev, id]
    );
  };
  
  const toggleColor = (id: string) => {
    setSelectedColors(prev => 
      prev.includes(id) 
        ? prev.filter(colorId => colorId !== id) 
        : [...prev, id]
    );
  };
  
  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };
  
  const applyFilters = () => {
    onFilterChange({
      categories: selectedCategories,
      brands: selectedBrands,
      colors: selectedColors,
      priceRange
    });
  };
  
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedColors([]);
    setPriceRange([0, 200]);
    
    onFilterChange({
      categories: [],
      brands: [],
      colors: [],
      priceRange: [0, 200]
    });
  };
  
  const hasActiveFilters = () => {
    return selectedCategories.length > 0 || 
      selectedBrands.length > 0 || 
      selectedColors.length > 0 || 
      priceRange[0] > 0 || 
      priceRange[1] < 200;
  };

  // Apply filters whenever selection changes
  useEffect(() => {
    applyFilters();
  }, [selectedCategories, selectedBrands, selectedColors, priceRange]);

  return (
    <div className="mb-2">
      <div className="flex justify-between items-center mb-2">
        <Button
          variant="outline"
          className="gap-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
          onClick={toggleFilter}
        >
          <SlidersHorizontal size={16} className="group-hover:rotate-12 transition-transform duration-300" />
          {isOpen ? 'Hide Filters' : 'Show Filters'}
        </Button>
        
        {hasActiveFilters() && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-accent hover:text-primary transition-all duration-300 group"
          >
            <X size={16} className="mr-1 group-hover:rotate-90 transition-transform duration-300" />
            Reset
          </Button>
        )}
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <Card className="border-secondary/20 bg-secondary/5 overflow-hidden mb-2 shadow-sm hover:shadow-md transition-shadow duration-300">
  <CardContent className="p-4">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {/* Categories */}
                  <FilterSection title="Categories">
                    {categories.map(category => (
                      <FilterCheckbox
                        key={category.id}
                        label={category.label}
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => toggleCategory(category.id)}
                      />
                    ))}
                  </FilterSection>
                  
                  {/* Brands */}
                  <FilterSection title="Brands">
                    {brands.map(brand => (
                      <FilterCheckbox
                        key={brand.id}
                        label={brand.label}
                        checked={selectedBrands.includes(brand.id)}
                        onChange={() => toggleBrand(brand.id)}
                      />
                    ))}
                  </FilterSection>
                  
                  {/* Colors */}
                  <FilterSection title="Colors">
                    {colors.map(color => (
                      <FilterCheckbox
                        key={color.id}
                        label={color.label}
                        checked={selectedColors.includes(color.id)}
                        onChange={() => toggleColor(color.id)}
                      />
                    ))}
                  </FilterSection>
                  
                  {/* Price Range */}
                  <FilterSection title="Price Range">
                    <div className="pt-2 px-1">
                      <Slider
                        defaultValue={[0, 200]}
                        max={200}
                        step={5}
                        value={priceRange}
                        onValueChange={handlePriceChange}
                        className="mb-4 [&_.absolute.h-full]:bg-primary [&_[data-orientation=horizontal]]:h-2 [&_[data-orientation=horizontal]]:bg-secondary/40"
                      />
                      <div className="flex justify-between items-center text-sm text-accent">
                        <motion.span 
                          key={`min-${priceRange[0]}`}
                          initial={{ scale: 0.8, opacity: 0.5 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.2 }}
                          className="font-medium"
                        >
                          ${priceRange[0]}
                        </motion.span>
                        <motion.span 
                          key={`max-${priceRange[1]}`}
                          initial={{ scale: 0.8, opacity: 0.5 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.2 }}
                          className="font-medium"
                        >
                          ${priceRange[1]}
                        </motion.span>
                      </div>
                    </div>
                  </FilterSection>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Active Filters */}
      <AnimatePresence>
        {hasActiveFilters() && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-wrap gap-2 mt-2 mb-4 items-center"
          >
            <span className="text-sm text-accent font-medium">Active filters:</span>
            
            {selectedCategories.map(catId => {
              const category = categories.find(c => c.id === catId);
              return category ? (
                <FilterTag
                  key={`cat-${catId}`}
                  label={category.label}
                  onRemove={() => toggleCategory(catId)}
                />
              ) : null;
            })}
            
            {selectedBrands.map(brandId => {
              const brand = brands.find(b => b.id === brandId);
              return brand ? (
                <FilterTag
                  key={`brand-${brandId}`}
                  label={brand.label}
                  onRemove={() => toggleBrand(brandId)}
                />
              ) : null;
            })}
            
            {selectedColors.map(colorId => {
              const color = colors.find(c => c.id === colorId);
              return color ? (
                <FilterTag
                  key={`color-${colorId}`}
                  label={color.label}
                  onRemove={() => toggleColor(colorId)}
                />
              ) : null;
            })}
            
            {(priceRange[0] > 0 || priceRange[1] < 200) && (
              <FilterTag
                label={`$${priceRange[0]} - $${priceRange[1]}`}
                onRemove={() => setPriceRange([0, 200])}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FilterSection = ({ title, children }: { title: string, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div className="mb-2">
      <motion.button
        whileTap={{ scale: 0.98 }}
        className="flex justify-between items-center w-full text-left font-medium text-accent mb-0 hover:text-primary transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <ChevronDown
          size={18}
          className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="space-y-1 pl-1">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FilterCheckbox = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer group py-1 rounded-sm hover:bg-secondary/20 transition-colors duration-200 px-1">
      <div className="relative">
        <Checkbox 
          checked={checked} 
          onCheckedChange={onChange}
          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary border-secondary/60 group-hover:border-primary/60 transition-colors duration-200"
        />
      </div>
      <span className="text-accent/80 group-hover:text-accent transition-colors duration-200">{label}</span>
    </label>
  );
};

const FilterTag = ({ label, onRemove }: { label: string, onRemove: () => void }) => {
  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center gap-1 py-0.5 px-1.5 rounded-full bg-secondary/30 text-xs font-medium text-accent border border-secondary/20 transition-all duration-200 hover:border-primary/30 hover:bg-secondary/40"

    >
      {label}
      <button
        onClick={onRemove}
        className="ml-1 text-accent/70 hover:text-primary transition-colors duration-200 rounded-full hover:bg-secondary/50 p-0.5"
      >
        <X size={12} />
      </button>
    </motion.span>
  );
};

export default EnhancedFilter;
