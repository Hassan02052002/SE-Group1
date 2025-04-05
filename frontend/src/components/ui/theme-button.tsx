// components/ui/themed-button.tsx
import React from "react";
import { ButtonProps } from "@/components/ui/button";
import { 
  primaryButton, 
  secondaryButton, 
  outlineButton 
} from "@/lib/theme";

type ThemeVariant = "primary" | "secondary" | "outline";

interface ThemedButtonProps extends Omit<ButtonProps, "className" | "variant"> {
  themeVariant?: ThemeVariant;
  fullWidth?: boolean;
  className?: string;
  buttonSize?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export function ThemedButton({
  children,
  themeVariant = "primary",
  fullWidth = false,
  className = "",
  buttonSize = "md",
  icon,
  iconPosition = "left",
  ...props
}: ThemedButtonProps) {
  // Generate base style based on variant
  let baseStyle = "";
  
  switch (themeVariant) {
    case "primary":
      baseStyle = primaryButton();
      break;
    case "secondary": 
      baseStyle = secondaryButton();
      break;
    case "outline":
      baseStyle = outlineButton();
      break;
  }
  
  // Add sizing classes
  let sizeClasses = "";
  switch (buttonSize) {
    case "sm":
      sizeClasses = "px-4 py-2 text-sm";
      break;
    case "md":
      sizeClasses = "px-6 py-3";
      break;
    case "lg":
      sizeClasses = "px-8 py-4 text-lg";
      break;
  }
  
  // Add full width if needed
  const widthClass = fullWidth ? "w-full" : "";
  
  // Combine all classes
  const buttonClasses = `${baseStyle} ${sizeClasses} ${widthClass} ${className} font-heading font-medium`;
  
  return (
    <button className={buttonClasses} {...props}>
      {icon && iconPosition === "left" && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
}