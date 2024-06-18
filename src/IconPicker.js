import React, { useState } from "react";
import * as featherIcons from "feather-icons-react";
import "./IconPicker.css";

const IconPicker = ({
  rowsInOnePage,
  columnsInOnePage,
  iconHeight,
  iconWidth,
  pickerHeight = 500,
  pickerWidth = 500,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const iconsPerPage = rowsInOnePage * columnsInOnePage;
  const icons = Object.keys(featherIcons);
  const totalPages = Math.ceil(icons.length / iconsPerPage);

  const openPicker = () => setIsOpen(true);
  const closePicker = () => setIsOpen(false);

  const selectIcon = (icon) => {
    setSelectedIcon(icon);
    onSelect(icon);
    closePicker();
  };

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 0));

  const startIdx = currentPage * iconsPerPage;
  const endIdx = startIdx + iconsPerPage;
  const currentIcons = icons.slice(startIdx, endIdx);

  return (
    <div className="icon-parent">
      <div
        className="icon-picker-trigger"
        style={{ width: "100px", height: "100px" }}
        onClick={openPicker}
      >
        {selectedIcon
          ? React.createElement(featherIcons[selectedIcon])
          : "Select Icon"}
      </div>
      {isOpen && (
        <div
          className="icon-picker-modal"
          style={{ width: pickerWidth, height: pickerHeight }}
        >
          <div className="icon-picker-grid">
            {currentIcons.map((icon) => (
              <div
                key={icon}
                className="icon-picker-item"
                style={{ width: iconWidth, height: iconHeight }}
                onClick={() => selectIcon(icon)}
              >
                {React.createElement(featherIcons[icon])}
              </div>
            ))}
          </div>
          <div className="icon-picker-pagination">
            <button onClick={prevPage} disabled={currentPage === 0}>
              Prev
            </button>
            <span className="page-info">
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
            >
              Next
            </button>
          </div>
          <button className="icon-picker-close" onClick={closePicker}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default IconPicker;
