import { useState } from "react";
import { Text, View, TouchableOpacity, } from "react-native";
import { sizeSelector } from "@/styles/components/sizeSelector";

interface SizeSelectorProps {
  currentSize: number;
  onSizeChange: (size: number) => void;
  minSize?: number;
  maxSize?: number;
}

const SizeSelector = ({ 
  currentSize, 
  onSizeChange, 
  minSize = 3, 
  maxSize = 7 
}: SizeSelectorProps) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleSizeSelect = (size: number) => {
    onSizeChange(size);
    setShowMenu(false);
  };

  const sizes = Array.from(
    { length: maxSize - minSize + 1 }, 
    (_, i) => i + minSize
  );

  return (
    <View style={sizeSelector.container}>
      <TouchableOpacity 
        style={sizeSelector.button}
        onPress={() => setShowMenu(!showMenu)}
      >
        <Text style={sizeSelector.buttonText}>
          Size: {currentSize}x{currentSize}
        </Text>
      </TouchableOpacity>
      
      {showMenu && (
        <View style={sizeSelector.menu}>
          {sizes.map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                sizeSelector.menuItem,
                currentSize === size && sizeSelector.menuItemActive
              ]}
              onPress={() => handleSizeSelect(size)}
            >
              <Text style={[
                sizeSelector.menuText,
                currentSize === size && sizeSelector.menuTextActive
              ]}>
                {size}x{size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default SizeSelector;
