"use client";

import React from 'react';

interface Props {
  date?: Date;
}

const Converter: React.FC<Props> = ({ date }) => {
  return (
    <div>
      {date ? date.toString() : "No date available"}
    </div>
  );
};

export default Converter;