import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { DashboardPreviewPage } from '../pages/DashboardPreviewPage';

describe('Dashboard Preview Interactions', () => {
  it('toggles between active sample data and empty state', () => {
    render(
      <MemoryRouter>
        <DashboardPreviewPage />
      </MemoryRouter>
    );

    // Initial state has active sample
    expect(screen.getAllByText(/Ovulatory Window/i).length).toBeGreaterThan(0);

    // Toggle to empty state
    const emptyStateBtn = screen.getByRole('button', { name: /New Account \(Empty State\)/i });
    fireEvent.click(emptyStateBtn);

    expect(screen.getByText(/Welcome to Your Personal Rhythm/i)).toBeInTheDocument();
    expect(screen.getByText(/Step 01/i)).toBeInTheDocument();

    // Toggle back to sample
    const backBtn = screen.getByRole('button', { name: /Switch Back to Active Sample Data/i });
    fireEvent.click(backBtn);

    expect(screen.getAllByText(/Ovulatory Window/i).length).toBeGreaterThan(0);
  });

  it('updates phase inspection when a phase button is clicked', () => {
    render(
      <MemoryRouter>
        <DashboardPreviewPage />
      </MemoryRouter>
    );

    // Click Follicular phase button in the cycle wheel selector
    const follicularButtons = screen.getAllByRole('button', { name: /Follicular/i });
    fireEvent.click(follicularButtons[0]);

    expect(screen.getByText(/Follicles mature inside the ovary/i)).toBeInTheDocument();
  });

  it('simulates daily check-in logging and displays preview confirmation', () => {
    render(
      <MemoryRouter>
        <DashboardPreviewPage />
      </MemoryRouter>
    );

    // Select energy option 'fully energized'
    const energyBtn = screen.getByLabelText(/fully energized/i);
    fireEvent.click(energyBtn);

    // Click submit button for simulation
    const submitBtn = screen.getByRole('button', { name: /Simulate Saving Daily Check-In/i });
    fireEvent.click(submitBtn);

    // Expect modal to open with summary
    expect(screen.getByText(/Sample Check-In Recorded/i)).toBeInTheDocument();
    expect(screen.getByText(/Period Blood Flow:/i)).toBeInTheDocument();
    expect(screen.getByText(/Spotting \(Separate\):/i)).toBeInTheDocument();

    // Close modal
    const closeBtn = screen.getByRole('button', { name: /Got it, continue previewing/i });
    fireEvent.click(closeBtn);

    expect(screen.getByText(/Preview Log Captured!/i)).toBeInTheDocument();
  });
});
