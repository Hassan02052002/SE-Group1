// components/ui/themed-input.tsx
import React, { forwardRef } from "react";
import { inputStyle } from "@/lib/theme";

export interface ThemedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
  helpText?: string;
  fullWidth?: boolean;
  containerClassName?: string;
  variant?: "default" | "filled" | "outline";
  endIcon?: React.ReactNode;
}

export const ThemedInput = forwardRef<HTMLInputElement, ThemedInputProps>(
  ({ 
    label, 
    icon, 
    error,
    helpText,
    fullWidth = true,
    className = "",
    containerClassName = "",
    variant = "default",
    endIcon,
    ...props 
  }, ref) => {
    // Base input style from theme
    const baseInputStyle = inputStyle();
    
    // Determine variant-specific styles
    let variantStyle = "";
    switch (variant) {
      case "filled":
        variantStyle = "bg-gray-800/70 border-transparent focus:bg-gray-800";
        break;
      case "outline":
        variantStyle = "bg-transparent border-gray-700 focus:border-emerald-700";
        break;
      default:
        variantStyle = "bg-gray-900/70 border-gray-800";
        break;
    }
    
    // Add error styling if there's an error
    const inputClasses = `
      ${baseInputStyle}
      ${variantStyle}
      ${icon ? 'pl-10' : 'pl-4'}
      ${endIcon ? 'pr-10' : 'pr-4'}
      ${error ? 'border-red-700 focus:ring-red-800/50' : ''}
      ${className}
    `;

    // Width class
    const widthClass = fullWidth ? 'w-full' : '';
    
    return (
      <div className={`${widthClass} ${containerClassName}`}>
        {label && (
          <label className="block font-heading font-medium text-gray-300 mb-2 text-sm">
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            className={inputClasses}
            {...props}
          />
          
          {endIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              {endIcon}
            </div>
          )}
        </div>
        
        {error && (
          <p className="mt-1 text-sm text-red-400">{error}</p>
        )}
        
        {helpText && !error && (
          <p className="mt-1 text-xs text-gray-500">{helpText}</p>
        )}
      </div>
    );
  }
);

ThemedInput.displayName = "ThemedInput";

// Textarea component extends the same styling principles
interface ThemedTextAreaProps 
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
  helpText?: string;
  fullWidth?: boolean;
  containerClassName?: string;
  variant?: "default" | "filled" | "outline";
}

export const ThemedTextArea = forwardRef<HTMLTextAreaElement, ThemedTextAreaProps>(
  ({ 
    label, 
    icon, 
    error,
    helpText,
    fullWidth = true,
    className = "",
    containerClassName = "",
    variant = "default",
    ...props 
  }, ref) => {
    // Determine variant-specific styles
    let variantStyle = "";
    switch (variant) {
      case "filled":
        variantStyle = "bg-gray-800/70 border-transparent focus:bg-gray-800";
        break;
      case "outline":
        variantStyle = "bg-transparent border-gray-700 focus:border-emerald-700";
        break;
      default:
        variantStyle = "bg-gray-900/70 border-gray-800";
        break;
    }
    
    // Build classes for textarea
    const textareaClasses = `
      w-full py-3 px-4 ${icon ? 'pl-10' : ''}
      ${variantStyle}
      border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800/50
      text-white placeholder-gray-500 transition-colors duration-200
      ${error ? 'border-red-700 focus:ring-red-800/50' : ''}
      ${className}
    `;

    // Width class
    const widthClass = fullWidth ? 'w-full' : '';
    
    return (
      <div className={`${widthClass} ${containerClassName}`}>
        {label && (
          <label className="block font-heading font-medium text-gray-300 mb-2 text-sm">
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-3 text-gray-500">
              {icon}
            </div>
          )}
          
          <textarea
            ref={ref}
            className={textareaClasses}
            {...props}
          />
        </div>
        
        {error && (
          <p className="mt-1 text-sm text-red-400">{error}</p>
        )}
        
        {helpText && !error && (
          <p className="mt-1 text-xs text-gray-500">{helpText}</p>
        )}
      </div>
    );
  }
);

ThemedTextArea.displayName = "ThemedTextArea";

// Export a select component that matches the design system
interface ThemedSelectProps 
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
  helpText?: string;
  fullWidth?: boolean;
  containerClassName?: string;
  options: Array<{ value: string; label: string }>;
  variant?: "default" | "filled" | "outline";
}

export const ThemedSelect = forwardRef<HTMLSelectElement, ThemedSelectProps>(
  ({ 
    label, 
    icon, 
    error,
    helpText,
    fullWidth = true,
    className = "",
    containerClassName = "",
    options = [],
    variant = "default",
    ...props 
  }, ref) => {
    // Determine variant-specific styles
    let variantStyle = "";
    switch (variant) {
      case "filled":
        variantStyle = "bg-gray-800/70 border-transparent focus:bg-gray-800";
        break;
      case "outline":
        variantStyle = "bg-transparent border-gray-700 focus:border-emerald-700";
        break;
      default:
        variantStyle = "bg-gray-900/70 border-gray-800";
        break;
    }
    
    // Build classes for select
    const selectClasses = `
      w-full py-3 ${icon ? 'pl-10' : 'pl-4'} pr-10
      ${variantStyle}
      border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800/50
      text-white placeholder-gray-500 transition-colors duration-200
      appearance-none bg-no-repeat bg-right
      ${error ? 'border-red-700 focus:ring-red-800/50' : ''}
      ${className}
    `;

    // Width class
    const widthClass = fullWidth ? 'w-full' : '';
    
    return (
      <div className={`${widthClass} ${containerClassName}`}>
        {label && (
          <label className="block font-heading font-medium text-gray-300 mb-2 text-sm">
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              {icon}
            </div>
          )}
          
          <select
            ref={ref}
            className={selectClasses}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          {/* Custom dropdown arrow */}
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
        
        {error && (
          <p className="mt-1 text-sm text-red-400">{error}</p>
        )}
        
        {helpText && !error && (
          <p className="mt-1 text-xs text-gray-500">{helpText}</p>
        )}
      </div>
    );
  }
);

ThemedSelect.displayName = "ThemedSelect";