import React from "react";

const SizeSelector = ({ sizes, onSizeSlect }) => {
  const [selectedSize, setSelectedSize] = React.useState(null);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    onSizeSlect(size);
  };
  return (
    <div>
      <h3>Size</h3>
      <div className="size-selector">
        {sizes.map((size) => (
          <div
            key={size}
            onClick={() => handleSizeSelect(size)}
            className={`size-item ${selectedSize === size ? "active" : ""}`}
          >
            {size}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
