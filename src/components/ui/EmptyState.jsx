import React from "react";

const EmptyState = ({ title, subtitle, action }) => {
  return (
    <div className="empty-state">
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
      {action}
    </div>
  );
};

export default EmptyState;
