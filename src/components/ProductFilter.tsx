
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronDown, Check, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useIsMobile } from '@/hooks/use-mobile';

interface FilterOption {
  id: string;
  label: string;
}

interface FilterProps {
  categories: FilterOption[];
  brands: FilterOption[];
  colors: FilterOption[];
  onFilterChange: (filters: any) => void;
}

const ProductFilter = ({ categories, brands, colors, onFilterChange }: FilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (!isMobile) {
      setIsOpen(true);
    }
  }, [isMobile]);
  
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
    
    if (isMobile) {
      setIsOpen(false);
    }
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
  
  return (
    <div className="mb-2 sm:mb-6">
      <div className="flex md:hidden justify-between items-center mb-1">
        <Button
          variant="outline"
          className="gap-1 w-full text-xs"
          onClick={toggleFilter}
          size="sm"
        >
          <Filter size={14} />
          {isOpen ? 'Hide Filters' : 'Show Filters'}
          {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </Button>
      </div>
      
      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <motion.div
            initial={isMobile ? { height: 0, opacity: 0 } : { opacity: 1 }}
            animate={isMobile ? { height: "auto", opacity: 1 } : { opacity: 1 }}
            exit={isMobile ? { height: 0, opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-background rounded-lg shadow-lg border border-secondary/30 p-1 sm:p-4 md:p-6 overflow-hidden"
          >
            {isMobile && (
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-xs font-semibold text-accent">Filters</h3>
                <button 
                  onClick={toggleFilter}
                  className="text-accent/70 hover:text-accent p-1"
                >
                  <X size={14} />
                </button>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-1 sm:gap-4 md:gap-6">
              {/* Categories */}
              <FilterSection title="Categories" isMobile={isMobile}>
                {categories.map(category => (
                  <FilterCheckbox
                    key={category.id}
                    label={category.label}
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => toggleCategory(category.id)}
                    isMobile={isMobile}
                  />
                ))}
              </FilterSection>
              
              {/* Brands */}
              <FilterSection title="Brands" isMobile={isMobile}>
                {brands.map(brand => (
                  <FilterCheckbox
                    key={brand.id}
                    label={brand.label}
                    checked={selectedBrands.includes(brand.id)}
                    onChange={() => toggleBrand(brand.id)}
                    isMobile={isMobile}
                  />
                ))}
              </FilterSection>
              
              {/* Colors */}
              <FilterSection title="Colors" isMobile={isMobile}>
                {colors.map(color => (
                  <FilterCheckbox
                    key={color.id}
                    label={color.label}
                    checked={selectedColors.includes(color.id)}
                    onChange={() => toggleColor(color.id)}
                    isMobile={isMobile}
                  />
                ))}
              </FilterSection>
              
              {/* Price Range */}
              <FilterSection title="Price Range" isMobile={isMobile}>
                <div className="pt-1 sm:pt-4 px-1 sm:px-2">
                  <Slider
                    defaultValue={[0, 200]}
                    max={200}
                    step={5}
                    value={priceRange}
                    onValueChange={handlePriceChange}
                    className="mb-2 sm:mb-6"
                  />
                  <div className="flex justify-between items-center text-xs text-accent/80">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </FilterSection>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:justify-end gap-1 sm:gap-3 mt-2 sm:mt-6 pt-1 sm:pt-4 border-t border-secondary/30">
              <Button
                variant="outline"
                onClick={resetFilters}
                className="gap-1 w-full sm:w-auto py-0.5 sm:py-2 text-xs"
                size="sm"
              >
                <X size={12} />
                Reset
              </Button>
              
              <Button
                variant="default"
                onClick={applyFilters}
                className="gap-1 w-full sm:w-auto py-0.5 sm:py-2 text-xs"
                size="sm"
              >
                <Filter size={12} />
                Apply
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Active Filters */}
      {(selectedCategories.length > 0 || 
        selectedBrands.length > 0 || 
        selectedColors.length > 0 || 
        priceRange[0] > 0 || 
        priceRange[1] < 200) && (
        <div className="flex flex-wrap gap-1 mt-1 sm:mt-4 items-center">
          <span className="text-xs text-accent/80">Active:</span>
          
          {selectedCategories.map(catId => {
            const category = categories.find(c => c.id === catId);
            return category ? (
              <FilterTag
                key={`cat-${catId}`}
                label={category.label}
                onRemove={() => toggleCategory(catId)}
                isMobile={isMobile}
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
                isMobile={isMobile}
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
                isMobile={isMobile}
              />
            ) : null;
          })}
          
          {(priceRange[0] > 0 || priceRange[1] < 200) && (
            <FilterTag
              label={`$${priceRange[0]}-$${priceRange[1]}`}
              onRemove={() => setPriceRange([0, 200])}
              isMobile={isMobile}
            />
          )}
        </div>
      )}
    </div>
  );
};

const FilterSection = ({ title, children, isMobile }: { title: string, children: React.ReactNode, isMobile: boolean }) => {
  const [isOpen, setIsOpen] = useState(!isMobile);
  
  return (
    <div className="mb-1 sm:mb-4">
      <button
        className="flex justify-between items-center w-full text-left font-medium text-accent mb-0.5 sm:mb-2 p-0.5 sm:p-2 hover:bg-secondary/10 rounded-md transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xs">{title}</span>
        <ChevronDown
          size={14}
          className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-0.5 sm:space-y-3 py-0.5 sm:py-2 pl-1 sm:pl-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FilterCheckbox = ({ label, checked, onChange, isMobile }: 
  { label: string, checked: boolean, onChange: () => void, isMobile: boolean }) => {
  
  return (
    <label className="flex items-center space-x-1 cursor-pointer group py-0.5 sm:py-1">
      <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded border flex items-center justify-center transition-colors ${checked ? 'bg-primary border-primary' : 'border-secondary group-hover:border-primary/60'}`}>
        {checked && <Check size={isMobile ? 8 : 10} className="text-white" />}
      </div>
      <span className="text-xs text-accent/80 group-hover:text-accent transition-colors truncate">{label}</span>
    </label>
  );
};

const FilterTag = ({ label, onRemove, isMobile }: 
  { label: string, onRemove: () => void, isMobile: boolean }) => {
  
  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="inline-flex items-center gap-0.5 py-0.5 px-1 rounded-full bg-secondary/50 text-xs font-medium text-accent"
    >
      <span className="truncate max-w-[60px] sm:max-w-[120px]">{label}</span>
      <button
        onClick={onRemove}
        className="text-accent/70 hover:text-accent p-0.5"
      >
        <X size={8} />
      </button>
    </motion.span>
  );
};

export default ProductFilter;

