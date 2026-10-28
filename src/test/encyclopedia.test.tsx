import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { EncyclopediaPage } from '../pages/EncyclopediaPage';

describe('Encyclopedia Page Functionality', () => {
  it('renders all starter articles by default', () => {
    render(
      <MemoryRouter>
        <EncyclopediaPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/The Four Phases of the Menstrual Cycle/i)).toBeInTheDocument();
    expect(screen.getByText(/Understanding Estrogen & Progesterone/i)).toBeInTheDocument();
    expect(screen.getByText(/Navigating the Luteal Phase/i)).toBeInTheDocument();
  });

  it('filters articles when search query is entered', () => {
    render(
      <MemoryRouter>
        <EncyclopediaPage />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText(/Search topics, hormones, cues/i);
    fireEvent.change(searchInput, { target: { value: 'Metabolic' } });

    expect(screen.getByText(/Navigating the Luteal Phase/i)).toBeInTheDocument();
    // Non-matching articles are filtered out
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
  });
});
