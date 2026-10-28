import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { EncyclopediaPage } from '../pages/EncyclopediaPage';

describe('Encyclopedia Page Discovery & Functionality', () => {
  beforeEach(() => {
    document.title = '';
  });

  it('renders all starter articles by default', () => {
    render(
      <MemoryRouter>
        <EncyclopediaPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/The Four Phases of the Menstrual Cycle/i)).toBeInTheDocument();
    expect(screen.getByText(/Understanding Estrogen & Progesterone/i)).toBeInTheDocument();
    expect(screen.getByText(/Navigating the Luteal Phase/i)).toBeInTheDocument();
    expect(screen.getByText(/Cycle Variability: Why "Normal" Isn't Always 28 Days/i)).toBeInTheDocument();
    expect(screen.getByText(/Body Signals: Reading Cervical Fluid/i)).toBeInTheDocument();
  });

  it('filters articles with case-insensitive and multi-word whitespace-tolerant search', () => {
    render(
      <MemoryRouter>
        <EncyclopediaPage />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText(/Search topics, hormones, cues/i);
    
    // Test whitespace tolerance and multi-token matching
    fireEvent.change(searchInput, { target: { value: '  luteal   metabolic  ' } });

    expect(screen.getByText(/Navigating the Luteal Phase/i)).toBeInTheDocument();
    expect(screen.queryByText(/Body Signals: Reading Cervical Fluid/i)).not.toBeInTheDocument();
  });

  it('displays empty state when search finds no results and allows reset', () => {
    render(
      <MemoryRouter>
        <EncyclopediaPage />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText(/Search topics, hormones, cues/i);
    fireEvent.change(searchInput, { target: { value: 'nonexistentquery123' } });

    expect(screen.getByText(/No matching articles found/i)).toBeInTheDocument();
    expect(screen.getByText(/Try searching for biological terms like/i)).toBeInTheDocument();

    const clearButton = screen.getByRole('button', { name: /Clear Search & Show All Articles/i });
    fireEvent.click(clearButton);

    expect(screen.getByText(/The Four Phases of the Menstrual Cycle/i)).toBeInTheDocument();
  });

  it('filters articles by category tab', () => {
    render(
      <MemoryRouter>
        <EncyclopediaPage />
      </MemoryRouter>
    );

    const hormonesTab = screen.getByRole('tab', { name: /Hormones & Biology/i });
    fireEvent.click(hormonesTab);

    expect(screen.getByText(/Understanding Estrogen & Progesterone/i)).toBeInTheDocument();
    expect(screen.queryByText(/Body Signals: Reading Cervical Fluid/i)).not.toBeInTheDocument();
  });

  it('filters articles by topic tag and allows clearing the active tag', () => {
    render(
      <MemoryRouter>
        <EncyclopediaPage />
      </MemoryRouter>
    );

    // Click on #ovulation tag in popular topics bar
    const ovulationTag = screen.getAllByRole('button', { name: '#ovulation' })[0];
    fireEvent.click(ovulationTag);

    // Should match articles tagged with ovulation
    expect(screen.getByText(/The Four Phases of the Menstrual Cycle/i)).toBeInTheDocument();
    expect(screen.getByText(/Understanding Estrogen & Progesterone/i)).toBeInTheDocument();

    // Clear tag via clear button
    const clearTagBtn = screen.getByRole('button', { name: /clear tag/i });
    fireEvent.click(clearTagBtn);

    expect(screen.getByText(/Navigating the Luteal Phase/i)).toBeInTheDocument();
  });

  it('supports combined category and search filtering with predictable results', () => {
    render(
      <MemoryRouter>
        <EncyclopediaPage />
      </MemoryRouter>
    );

    // Select category 'Cycle Phases'
    const phasesTab = screen.getByRole('tab', { name: /Cycle Phases/i });
    fireEvent.click(phasesTab);

    // Search for 'variability'
    const searchInput = screen.getByPlaceholderText(/Search topics, hormones, cues/i);
    fireEvent.change(searchInput, { target: { value: 'variability' } });

    expect(screen.getByText(/Cycle Variability: Why "Normal" Isn't Always 28 Days/i)).toBeInTheDocument();
    expect(screen.queryByText(/The Four Phases of the Menstrual Cycle/i)).not.toBeInTheDocument();
  });

  it('resets all filters when clicking Reset all filters', () => {
    render(
      <MemoryRouter>
        <EncyclopediaPage />
      </MemoryRouter>
    );

    const hormonesTab = screen.getByRole('tab', { name: /Hormones & Biology/i });
    fireEvent.click(hormonesTab);

    const searchInput = screen.getByPlaceholderText(/Search topics, hormones, cues/i);
    fireEvent.change(searchInput, { target: { value: 'progesterone' } });

    const resetBtn = screen.getByRole('button', { name: /reset all filters/i });
    fireEvent.click(resetBtn);

    expect(screen.getByText(/The Four Phases of the Menstrual Cycle/i)).toBeInTheDocument();
    expect(screen.getByText(/Body Signals: Reading Cervical Fluid/i)).toBeInTheDocument();
  });

  it('renders Evidence Tier badges on article cards', () => {
    render(
      <MemoryRouter>
        <EncyclopediaPage />
      </MemoryRouter>
    );

    expect(screen.getAllByText(/Established Finding/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Emerging Research/i).length).toBeGreaterThan(0);
  });

  it('synchronizes SEO document title and metadata', () => {
    render(
      <MemoryRouter>
        <EncyclopediaPage />
      </MemoryRouter>
    );

    expect(document.title).toContain('Health & Cycle Encyclopedia');
    const descMeta = document.querySelector('meta[name="description"]');
    expect(descMeta).toHaveAttribute('content');
    expect(descMeta?.getAttribute('content')).toContain('endocrine physiology');
  });
});
