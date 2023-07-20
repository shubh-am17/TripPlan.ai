import React from 'react';

function ScrollableList({ array, selectedOption, setSelectedOption }) {
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className='scrollable-list'>
      <ul>
        {array.map((option) => (
          <li
            key={option}
            className={selectedOption === option ? 'selected' : ''}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ScrollableList;
