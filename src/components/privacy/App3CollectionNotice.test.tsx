/**
 * App3CollectionNotice render test (DR-782).
 *
 * The homepage (app/page.tsx) renders <App3CollectionNotice variant="full" />
 * to satisfy APP 3 / APP 5. That is the ONLY variant that exposes the labelled
 * region node, so this test pins the exact node the homepage now relies on.
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { App3CollectionNotice } from './App3CollectionNotice';

describe('App3CollectionNotice', () => {
  it('full variant renders a region labelled "Privacy collection notice"', () => {
    render(<App3CollectionNotice variant="full" />);
    const region = screen.getByRole('region', { name: 'Privacy collection notice' });
    expect(region).toBeTruthy();
  });
});
