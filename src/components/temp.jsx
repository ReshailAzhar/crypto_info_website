import React from 'react';

const TimestampToDate = () => {
  const timestamp='1706271600'
  // Assuming 'timestamp' is a Unix timestamp in seconds
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds

  // Format the date as a string
  const formattedDate = date.toLocaleDateString();

  return (
    <div>
      <p>Original Timestamp: {timestamp}</p>
      <p>Formatted Date: {formattedDate}</p>
    </div>
  );
};

export default TimestampToDate