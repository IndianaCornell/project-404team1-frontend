import React from "react";
import Button from "@/components/ui/Button";

export default function FavoriteButton({ active, onToggle }) {
  if (active) {
    return (
      <Button variant="primary" size="lg" onClick={onToggle}>
        &nbsp;ADD TO FAVORITES
      </Button>
    );
  }
  return (
    <Button variant="outline" size="lg" onClick={onToggle}>
        &nbsp;ADD TO FAVORITES
    </Button>
  );
}
