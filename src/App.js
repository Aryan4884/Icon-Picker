import React, { useState } from "react";
import * as featherIcons from "feather-icons-react";
import IconPicker from "./IconPicker";
import "./App.css";

const App = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
  };

  return (
    <div className="App">
      <h1>Icon Picker Demo</h1>
      <div className="icon-container">
        <IconPicker
          rowsInOnePage={4}
          columnsInOnePage={4}
          iconHeight="50px"
          iconWidth="50px"
          pickerHeight="500px"
          pickerWidth="500px"
          onSelect={handleIconSelect}
        />
        {selectedIcon && (
          <div className="selected-icon">
            <h2>Selected Icon:</h2>
            {React.createElement(featherIcons[selectedIcon])}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
