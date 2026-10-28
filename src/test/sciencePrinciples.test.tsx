import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SciencePage } from '../pages/SciencePage';

const renderSciencePage = () => {
  return render(
    <MemoryRouter>
      <SciencePage />
    </MemoryRouter>
  );
};

describe('Science & Evidence Principles Refinement', () => {
  it('renders all four conversational principle headlines', () => {
    renderSciencePage();

    expect(screen.getByRole('heading', { level: 3, name: /Your cycle isn't a clock\./i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Your normal is your normal\./i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Real evidence\. Clear answers\./i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Here to inform, never diagnose\./i })).toBeInTheDocument();
  });

  it('renders the two-part contrast ("What we challenge" and "How NASA does it differently") on each card', () => {
    renderSciencePage();

    const challenges = screen.getAllByText(/What we challenge/i);
    expect(challenges).toHaveLength(4);

    const nasaDifferences = screen.getAllByText(/How NASA does it differently/i);
    expect(nasaDifferences).toHaveLength(4);
  });

  it('removes the old academic "Practical Application" box', () => {
    renderSciencePage();

    expect(screen.queryByText(/Practical Application:/i)).not.toBeInTheDocument();
  });

  it('faithfully renders the specific content for Card 1 (Probabilistic window)', () => {
    renderSciencePage();

    expect(screen.getByText(/Your period doesn't run on an exact schedule\./i)).toBeInTheDocument();
    expect(screen.getByText(/Design commitment: We aim to show a range of possible dates/i)).toBeInTheDocument();
  });

  it('faithfully renders the specific content for Card 2 (Individual norms & medical caveat)', () => {
    renderSciencePage();

    expect(screen.getByText(/A 28-day cycle isn't the rule everyone must follow\./i)).toBeInTheDocument();
    expect(screen.getByText(/We want to help you understand your own patterns/i)).toBeInTheDocument();
    expect(screen.getByText(/concerning symptoms always deserve professional medical attention\./i)).toBeInTheDocument();
  });

  it('faithfully renders the specific content for Card 3 (Evidence transparency)', () => {
    renderSciencePage();

    expect(screen.getByText(/Not every health claim online has the same level of scientific support\./i)).toBeInTheDocument();
    expect(screen.getByText(/We aim to make the strength of the evidence clear\./i)).toBeInTheDocument();
  });

  it('faithfully renders the specific content for Card 4 (Non-diagnostic educational boundary)', () => {
    renderSciencePage();

    expect(screen.getByText(/An app cannot know everything about your health/i)).toBeInTheDocument();
    expect(screen.getByText(/We do not diagnose conditions such as PCOS, endometriosis, or PMDD\./i)).toBeInTheDocument();
  });
});
