import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

/**
 * Button Component - R6 Digital Inspired
 * 
 * A highly customizable button component with multiple variants, sizes, and states.
 * Features pill-shaped design, smooth transitions, and accessibility support.
 * 
 * @example
 * <Button variant="primary" size="lg" onClick={handleClick}>
 *   Get Started
 * </Button>
 */
const Button = forwardRef(({
  children,
  className,
  variant = 'primary',
  size = 'base',
  fullWidth = false,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  as: Component = 'button',
  onClick,
  type = 'button',
  ...props
}, ref) => {
  
  const baseClasses = 'btn';
  
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    ghost: 'btn-ghost' };
  
  const sizeClasses = {
    sm: 'btn-sm',
    base: '',
    lg: 'btn-lg',
    xl: 'btn-xl' };
  
  const classes = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    {
      'btn-full': fullWidth,
      'disabled': disabled,
      'loading': loading },
    className
  );
  
  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };
  
  const content = (
    <>
      {loading && (
        <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
      )}
      {!loading && leftIcon && (
        <span className="flex-shrink-0">
          {leftIcon}
        </span>
      )}
      <span className={loading ? 'opacity-0' : ''}>
        {children}
      </span>
      {!loading && rightIcon && (
        <span className="flex-shrink-0">
          {rightIcon}
        </span>
      )}
    </>
  );
  
  return (
    <Component
      ref={ref}
      className={classes}
      disabled={disabled || loading}
      type={Component === 'button' ? type : undefined}
      onClick={handleClick}
      {...props}
    >
      {content}
    </Component>
  );
});

Button.displayName = 'Button';

Button.propTypes = {
  /** Button content */
  children: PropTypes.node.isRequired,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Button variant */
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost']),
  /** Button size */
  size: PropTypes.oneOf(['sm', 'base', 'lg', 'xl']),
  /** Full width button */
  fullWidth: PropTypes.bool,
  /** Disabled state */
  disabled: PropTypes.bool,
  /** Loading state */
  loading: PropTypes.bool,
  /** Icon on the left */
  leftIcon: PropTypes.node,
  /** Icon on the right */
  rightIcon: PropTypes.node,
  /** Component to render as (button, a, etc.) */
  as: PropTypes.elementType,
  /** Click handler */
  onClick: PropTypes.func,
  /** Button type */
  type: PropTypes.oneOf(['button', 'submit', 'reset']) };

export default Button;