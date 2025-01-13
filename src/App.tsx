import React, { useState, useEffect } from 'react';
import { Calculator, PackageSearch, Hammer, RefreshCw, Plus, Minus, Watch, Diamond, Gem, Link, Gamepad, Laptop, Camera, Smartphone, ChevronDown } from 'lucide-react';

const STACK_NOTE_VALUE = 650;
const ROLL_OF_CASH_VALUE = 575;
const LOOSE_NOTE_VALUE = 90;

interface AutoExoticItem {
  name: string;
  stack?: number;
  roc?: number;
  ln?: number;
  category: 'AutoExotic';
  icon: keyof typeof itemIcons;
}

interface ScrapeYardItem {
  name: string;
  value: number;
  category: 'ScrapeYard';
  icon: keyof typeof itemIcons;
}

interface QuantityButtonsProps {
  itemName: string;
  value: number;
  onChange: (value: number) => void;
  expandedButtons: string | null;
  setExpandedButtons: (value: string | null) => void;
  lastUsedValues: Record<string, number>;
  setLastUsedValues: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}

const itemIcons = {
  Watch,
  Diamond,
  Gem,
  Link,
  Gamepad,
  Laptop,
  Camera,
  Smartphone,
} as const;

type Item = AutoExoticItem | ScrapeYardItem;

const items: Item[] = [
  { name: "Rolex", roc: 2, ln: 1, category: "AutoExotic", icon: "Watch" },
  { name: "Assorted Jewellery", ln: 1, category: "AutoExotic", icon: "Diamond" },
  { name: "5CT Chain", ln: 2, category: "AutoExotic", icon: "Link" },
  { name: "Diamond Skull", roc: 1, ln: 3, category: "AutoExotic", icon: "Diamond" },
  { name: "Vintage Ring", roc: 1, category: "AutoExotic", icon: "Gem" },
  { name: "Action Figure", ln: 6, category: "AutoExotic", icon: "Diamond" },
  { name: "Boss Chain", stack: 1, roc: 1, ln: 4, category: "AutoExotic", icon: "Link" },
  { name: "Pair of Yeezys", ln: 3, category: "AutoExotic", icon: "Diamond" },
  { name: "Wedding Ring", stack: 2, category: "AutoExotic", icon: "Gem" },
  { name: "Yellow Diamond", ln: 5, category: "AutoExotic", icon: "Diamond" },
  { name: "Blue Diamond", stack: 1, ln: 2, category: "AutoExotic", icon: "Diamond" },
  { name: "Watch", value: 100, category: "ScrapeYard", icon: "Watch" },
  { name: "Oakley Sunglasses", value: 55, category: "ScrapeYard", icon: "Diamond" },
  { name: "Gameboy", value: 62.5, category: "ScrapeYard", icon: "Gamepad" },
  { name: "2ct Gold Chain", value: 100, category: "ScrapeYard", icon: "Link" },
  { name: "PSP", value: 107.5, category: "ScrapeYard", icon: "Gamepad" },
  { name: "Pixel 3", value: 97.5, category: "ScrapeYard", icon: "Smartphone" },
  { name: "Casio Watch", value: 75, category: "ScrapeYard", icon: "Watch" },
  { name: "Stolen Laptop", value: 137.5, category: "ScrapeYard", icon: "Laptop" },
  { name: "Video Games", value: 72.5, category: "ScrapeYard", icon: "Gamepad" },
  { name: "Nintendo 64", value: 87.5, category: "ScrapeYard", icon: "Gamepad" },
  { name: "Old Coin", value: 45, category: "ScrapeYard", icon: "Diamond" },
  { name: "Deformed Nail", value: 7.5, category: "ScrapeYard", icon: "Diamond" },
  { name: "Bottle Cap", value: 4.5, category: "ScrapeYard", icon: "Diamond" },
  { name: "Rusted Tin Can", value: 4.5, category: "ScrapeYard", icon: "Diamond" },
  { name: "Rusted Watch", value: 55, category: "ScrapeYard", icon: "Watch" },
  { name: "Pork & Beans", value: 4.5, category: "ScrapeYard", icon: "Diamond" },
  { name: "Rusted Lighter", value: 6, category: "ScrapeYard", icon: "Diamond" },
];

const QuantityButtons: React.FC<QuantityButtonsProps> = ({
  itemName,
  value,
  onChange,
  expandedButtons,
  setExpandedButtons,
  lastUsedValues,
  setLastUsedValues
}) => {
  const isExpanded = expandedButtons === itemName;

  const handleIncrementBy = (amount: number) => {
    const incrementAmount = Math.abs(amount) === 1 
      ? (amount > 0 ? (lastUsedValues[itemName] || 1) : -(lastUsedValues[itemName] || 1))
      : amount;

    onChange(Math.max(0, (value || 0) + incrementAmount));
  };

  const handleDropdownSelect = (amount: number) => {
    setLastUsedValues(prev => ({
      ...prev,
      [itemName]: Math.abs(amount)
    }));
    handleIncrementBy(amount);
    setExpandedButtons(null);
  };

  const handleQuantityChange = (newValue: string) => {
    const parsedValue = newValue === '' ? 0 : parseInt(newValue);
    if (parsedValue < 0) return;
    onChange(parsedValue);
  };

  const buttonBaseClasses = "h-[32px] flex items-center justify-center bg-indigo-900/20 border rounded hover:bg-indigo-800/30 transition-colors text-indigo-200 border-indigo-700/50";

  return (
    <div className="flex gap-1.5 mt-1.5">
      <div className="relative">
        <button
          onClick={() => setExpandedButtons(isExpanded ? null : itemName)}
          className={`${buttonBaseClasses} w-[32px]`}
        >
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
        {isExpanded && (
          <div className="absolute top-full left-0 mt-1 bg-indigo-900/90 rounded-lg shadow-lg border border-indigo-700/50 py-1 z-10">
            {[-50, -10, -5].map(amount => (
              <button
                key={amount}
                onClick={() => handleDropdownSelect(amount)}
                className="w-full px-3 py-1 text-xs font-medium text-left hover:bg-indigo-800/50 transition-colors text-indigo-200 flex items-center gap-2"
              >
                <Minus className="w-3 h-3" />
                {Math.abs(amount)}x
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => handleIncrementBy(-1)}
        className={`${buttonBaseClasses} w-[32px]`}
      >
        <Minus className="w-3.5 h-3.5" />
      </button>

      <input
        type="number"
        value={value || ''}
        onChange={(e) => handleQuantityChange(e.target.value)}
        onBlur={(e) => {
          if (e.target.value === '') {
            handleQuantityChange('0');
          }
        }}
        className="flex-1 px-2 h-[32px] bg-indigo-900/20 border rounded text-indigo-200 border-indigo-700/50 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 placeholder-indigo-400/30 text-sm"
        placeholder="0"
        min="0"
      />

      <button
        onClick={() => handleIncrementBy(1)}
        className={`${buttonBaseClasses} w-[32px]`}
      >
        <Plus className="w-3.5 h-3.5" />
      </button>

      <div className="relative">
        <button
          onClick={() => setExpandedButtons(isExpanded ? null : itemName)}
          className={`${buttonBaseClasses} w-[32px]`}
        >
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
        {isExpanded && (
          <div className="absolute top-full right-0 mt-1 bg-indigo-900/90 rounded-lg shadow-lg border border-indigo-700/50 py-1 z-10">
            {[5, 10, 50].map(amount => (
              <button
                key={amount}
                onClick={() => handleDropdownSelect(amount)}
                className="w-full px-3 py-1 text-xs font-medium text-left hover:bg-indigo-800/50 transition-colors text-indigo-200 flex items-center gap-2"
              >
                <Plus className="w-3 h-3" />
                {amount}x
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});
  const [totalValue, setTotalValue] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<'AutoExotic' | 'ScrapeYard'>('AutoExotic');
  const [expandedButtons, setExpandedButtons] = useState<string | null>(null);
  const [lastUsedValues, setLastUsedValues] = useState<Record<string, number>>({});

  const calculateAutoExoticValue = (item: AutoExoticItem): number => {
    let value = 0;
    if (item.stack) value += item.stack * STACK_NOTE_VALUE;
    if (item.roc) value += item.roc * ROLL_OF_CASH_VALUE;
    if (item.ln) value += item.ln * LOOSE_NOTE_VALUE;
    return value;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (expandedButtons && !(event.target as Element).closest('.relative')) {
        setExpandedButtons(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [expandedButtons]);

  useEffect(() => {
    const total = Object.entries(selectedItems).reduce((acc, [itemName, quantity]) => {
      const item = items.find(i => i.name === itemName);
      if (!item) return acc;

      if (item.category === 'AutoExotic') {
        return acc + (calculateAutoExoticValue(item as AutoExoticItem) * quantity);
      } else {
        return acc + ((item as ScrapeYardItem).value * quantity);
      }
    }, 0);

    setTotalValue(total);
  }, [selectedItems]);

  const resetCalculator = () => {
    setSelectedItems({});
    setTotalValue(0);
  };

  return (
    <div 
      // className="min-h-screen bg-[#0a0b1e] bg-gradient-to-br from-indigo-900/20 to-purple-900/20 p-3 md:p-4"
      style={{
        backgroundImage: `url('${window.innerWidth <= 768 ? 'https://soulcity.gg/Soulcity_Cover_Mobile.jpg' : 'https://soulcity.gg/Soulcity_Cover.jpg'}')`,
        // backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="w-6 h-6 text-indigo-400" />
          <h1 className="text-2xl font-bold text-indigo-200">SoulCity Rate Calculator</h1>
        </div>

        <div className="bg-indigo-950/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-indigo-800/50">
          <div className="flex gap-2 p-2 border-b border-indigo-800/50">
            <button
              onClick={() => setActiveCategory('AutoExotic')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 text-sm ${
                activeCategory === 'AutoExotic'
                  ? 'bg-indigo-600/20 text-indigo-200 border border-indigo-500/50'
                  : 'text-indigo-400 hover:bg-indigo-800/20'
              }`}
            >
              <PackageSearch className="w-3.5 h-3.5" />
              AutoExotic
            </button>
            <button
              onClick={() => setActiveCategory('ScrapeYard')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 text-sm ${
                activeCategory === 'ScrapeYard'
                  ? 'bg-indigo-600/20 text-indigo-200 border border-indigo-500/50'
                  : 'text-indigo-400 hover:bg-indigo-800/20'
              }`}
            >
              <Hammer className="w-3.5 h-3.5" />
              ScrapeYard
            </button>
          </div>

          <div className="p-3">
            <div className="grid gap-2">
              {items
                .filter(item => item.category === activeCategory)
                .map(item => {
                  const ItemIcon = itemIcons[item.icon];
                  const itemValue = item.category === 'AutoExotic'
                    ? calculateAutoExoticValue(item as AutoExoticItem)
                    : (item as ScrapeYardItem).value;

                  return (
                    <div
                      key={item.name}
                      className="p-2.5 rounded-lg bg-indigo-900/20 border border-indigo-700/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 flex-1">
                          <div className="p-1.5 rounded-full bg-indigo-800/50">
                            <ItemIcon className="w-4 h-4 text-indigo-300" />
                          </div>
                          <div>
                            <h3 className="font-medium text-indigo-200 text-sm">{item.name}</h3>
                            <p className="text-xs text-indigo-400">${itemValue.toFixed(2)}</p>
                          </div>
                        </div>

                        <div className="text-right font-medium text-indigo-200 text-sm">
                          ${((selectedItems[item.name] || 0) * itemValue).toFixed(2)}
                        </div>
                      </div>
                      <QuantityButtons
                        itemName={item.name}
                        value={selectedItems[item.name] || 0}
                        onChange={(value) => setSelectedItems(prev => ({ ...prev, [item.name]: value }))}
                        expandedButtons={expandedButtons}
                        setExpandedButtons={setExpandedButtons}
                        lastUsedValues={lastUsedValues}
                        setLastUsedValues={setLastUsedValues}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-indigo-950/95 backdrop-blur-sm border-t border-indigo-800/50 p-3 z-50">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-3 justify-between items-center">
            <div className="text-xl font-bold text-indigo-200">
              Total Value: ${totalValue.toFixed(2)}
            </div>
            <button
              onClick={resetCalculator}
              className="px-4 py-2 flex items-center gap-2 bg-indigo-900/20 text-indigo-200 rounded-lg hover:bg-indigo-800/30 transition-colors font-medium border border-indigo-700/50 text-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;