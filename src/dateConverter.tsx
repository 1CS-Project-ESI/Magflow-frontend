import React from 'react';

interface Props {
  date: Date | undefined;
}

const Converter: React.FC<Props> = ({ date }) => {
  return (
    <div>
      {date ? date.toLocaleDateString() : "No date available"}
    </div>
  );
};

export default Converter;