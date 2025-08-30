import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

/**
 * Grid Component - R6 Digital Inspired
 * 
 * A flexible CSS Grid component with responsive breakpoints.
 * Perfect for creating complex layouts and card grids.
 * 
 * @example
 * <Grid cols={3} gap={6} responsive={{ sm: 1, md: 2, lg: 3 }}>
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </Grid>
 */
const Grid = forwardRef(({
  children,
  className,
  cols = 1,
  rows,
  gap = 4,
  responsive = {},
  align = 'stretch',
  justify = 'start',
  as: Component = 'div',
  ...props
}, ref) => {
  
  const baseClasses = 'grid';
  
  // Column classes
  const getColumnClass = (colCount) => {
    const colClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      12: 'grid-cols-12',
    };
    return colClasses[colCount] || `grid-cols-${colCount}`;
  };
  
  // Row classes
  const getRowClass = (rowCount) => {
    const rowClasses = {
      1: 'grid-rows-1',
      2: 'grid-rows-2',
      3: 'grid-rows-3',
      4: 'grid-rows-4',
      5: 'grid-rows-5',
      6: 'grid-rows-6',
    };
    return rowClasses[rowCount] || `grid-rows-${rowCount}`;
  };
  
  // Gap classes
  const getGapClass = (gapSize) => {
    const gapClasses = {
      0: 'gap-0',
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      5: 'gap-5',
      6: 'gap-6',
      8: 'gap-8',
      10: 'gap-10',
      12: 'gap-12',
    };
    return gapClasses[gapSize] || `gap-${gapSize}`;
  };
  
  // Alignment classes
  const alignClasses = {
    start: 'items-start',
    centre: 'items-centre',
    end: 'items-end',
    stretch: 'items-stretch',
  };
  
  const justifyClasses = {
    start: 'justify-items-start',
    centre: 'justify-items-centre',
    end: 'justify-items-end',
    stretch: 'justify-items-stretch',
  };
  
  // Build responsive classes
  const responsiveClasses = [];
  
  // Add base column class
  responsiveClasses.push(getColumnClass(cols));
  
  // Add responsive column classes
  Object.entries(responsive).forEach(([breakpoint, colCount]) => {
    if (breakpoint === 'sm') {
      responsiveClasses.push(`sm:${getColumnClass(colCount)}`);
    } else if (breakpoint === 'md') {
      responsiveClasses.push(`md:${getColumnClass(colCount)}`);
    } else if (breakpoint === 'lg') {
      responsiveClasses.push(`lg:${getColumnClass(colCount)}`);
    } else if (breakpoint === 'xl') {
      responsiveClasses.push(`xl:${getColumnClass(colCount)}`);
    }
  });
  
  const classes = clsx(
    baseClasses,
    responsiveClasses,
    rows && getRowClass(rows),
    getGapClass(gap),
    alignClasses[align],
    justifyClasses[justify],
    className
  );
  
  return (
    <Component ref={ref} className={classes} {...props}>
      {children}
    </Component>
  );
});

Grid.displayName = 'Grid';

/**
 * Grid Item Component
 * 
 * For specific grid positioning and spanning.
 */
const GridItem = forwardRef(({
  children,
  className,
  colSpan,
  rowSpan,
  colStart,
  colEnd,
  rowStart,
  rowEnd,
  as: Component = 'div',
  ...props
}, ref) => {
  
  // Column span classes
  const getColSpanClass = (span) => {
    const colSpanClasses = {
      1: 'col-span-1',
      2: 'col-span-2',
      3: 'col-span-3',
      4: 'col-span-4',
      5: 'col-span-5',
      6: 'col-span-6',
      7: 'col-span-7',
      8: 'col-span-8',
      9: 'col-span-9',
      10: 'col-span-10',
      11: 'col-span-11',
      12: 'col-span-12',
      full: 'col-span-full',
    };
    return colSpanClasses[span] || `col-span-${span}`;
  };
  
  // Row span classes
  const getRowSpanClass = (span) => {
    const rowSpanClasses = {
      1: 'row-span-1',
      2: 'row-span-2',
      3: 'row-span-3',
      4: 'row-span-4',
      5: 'row-span-5',
      6: 'row-span-6',
      full: 'row-span-full',
    };
    return rowSpanClasses[span] || `row-span-${span}`;
  };
  
  // Position classes
  const getColStartClass = (start) => `col-start-${start}`;
  const getColEndClass = (end) => `col-end-${end}`;
  const getRowStartClass = (start) => `row-start-${start}`;
  const getRowEndClass = (end) => `row-end-${end}`;
  
  const classes = clsx(
    colSpan && getColSpanClass(colSpan),
    rowSpan && getRowSpanClass(rowSpan),
    colStart && getColStartClass(colStart),
    colEnd && getColEndClass(colEnd),
    rowStart && getRowStartClass(rowStart),
    rowEnd && getRowEndClass(rowEnd),
    className
  );
  
  return (
    <Component ref={ref} className={classes} {...props}>
      {children}
    </Component>
  );
});

GridItem.displayName = 'Grid.Item';

// Attach GridItem as sub-component
Grid.Item = GridItem;

Grid.propTypes = {
  /** Grid content */
  children: PropTypes.node.isRequired,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Number of columns */
  cols: PropTypes.number,
  /** Number of rows */
  rows: PropTypes.number,
  /** Grid gap size */
  gap: PropTypes.number,
  /** Responsive column settings */
  responsive: PropTypes.shape({
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number,
  }),
  /** Items alignment */
  align: PropTypes.oneOf(['start', 'centre', 'end', 'stretch']),
  /** Items justification */
  justify: PropTypes.oneOf(['start', 'centre', 'end', 'stretch']),
  /** Component to render as */
  as: PropTypes.elementType,
};

GridItem.propTypes = {
  /** Grid item content */
  children: PropTypes.node.isRequired,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Column span */
  colSpan: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['full'])]),
  /** Row span */
  rowSpan: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['full'])]),
  /** Column start position */
  colStart: PropTypes.number,
  /** Column end position */
  colEnd: PropTypes.number,
  /** Row start position */
  rowStart: PropTypes.number,
  /** Row end position */
  rowEnd: PropTypes.number,
  /** Component to render as */
  as: PropTypes.elementType,
};

export default Grid;