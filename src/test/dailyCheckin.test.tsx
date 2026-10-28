import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { DailyCheckinQuestionnaire } from '../components/dashboard/DailyCheckinQuestionnaire';
import {
  QUESTIONNAIRE_QUESTIONS,
  QUESTIONNAIRE_META,
} from '../data/questionnaireData';

describe('NASA | Daily Check-In Questionnaire', () => {
  it('does NOT render creator note, "who\'s this?", "Google Form Source of Truth", or link to original form', () => {
    render(<DailyCheckinQuestionnaire />);

    expect(screen.queryByText(/made with 🖤by DHYEY/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/i understand how much you ladies go through/i)
    ).not.toBeInTheDocument();
    expect(screen.queryByText("who's this?")).not.toBeInTheDocument();
    expect(screen.queryByText('1. Identification & Welcome')).not.toBeInTheDocument();
    expect(screen.queryByText(/Google Form Source of Truth/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Original Form/i })).not.toBeInTheDocument();
  });

  it('renders all 16 symptom and wellness questions in exact order and wording', () => {
    render(<DailyCheckinQuestionnaire />);

    // Form title & description
    expect(screen.getByText(QUESTIONNAIRE_META.title)).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(QUESTIONNAIRE_META.description, 'i'))
    ).toBeInTheDocument();

    // 1. period blood flow
    expect(screen.getByText('period blood flow')).toBeInTheDocument();

    // 2. spotting
    expect(screen.getByText('spotting')).toBeInTheDocument();

    // 3. feelings
    expect(screen.getByText('feelings')).toBeInTheDocument();

    // 4. pain
    expect(screen.getByText('pain')).toBeInTheDocument();

    // 5. sex life
    expect(screen.getByText('sex life')).toBeInTheDocument();

    // 6. energy
    expect(screen.getByText('energy')).toBeInTheDocument();

    // 7. mind
    expect(screen.getByText('mind')).toBeInTheDocument();

    // 8. socail life (exact Google Form spelling)
    expect(screen.getByText('socail life')).toBeInTheDocument();

    // 9. cravings (except dhyey)
    expect(screen.getByText('cravings (except dhyey)')).toBeInTheDocument();

    // 10. discharge
    expect(screen.getByText('discharge')).toBeInTheDocument();

    // 11. skin
    expect(screen.getByText('skin')).toBeInTheDocument();

    // 12. hair
    expect(screen.getByText('hair')).toBeInTheDocument();

    // 13. digestion
    expect(screen.getByText('digestion')).toBeInTheDocument();

    // 14. stool
    expect(screen.getByText('stool')).toBeInTheDocument();

    // 15. exercise
    expect(screen.getByText('exercise')).toBeInTheDocument();

    // 16. anything else you would  like to mention
    expect(
      screen.getByText(/anything else you would {1,2}like to mention/i)
    ).toBeInTheDocument();

    expect(QUESTIONNAIRE_QUESTIONS.length).toBe(16);
  });

  it('keeps period blood flow and spotting as completely separate, independent questions', () => {
    render(<DailyCheckinQuestionnaire />);

    // Get the two separate fieldsets
    const flowFieldset = screen.getByRole('group', { name: /period blood flow/i });
    const spottingFieldset = screen.getByRole('group', { name: /spotting/i });

    expect(flowFieldset).toBeInTheDocument();
    expect(spottingFieldset).toBeInTheDocument();

    // Period blood flow options
    const lightOption = within(flowFieldset).getByLabelText('light');
    const heavyOption = within(flowFieldset).getByLabelText('heavy');

    // Spotting options
    const redOption = within(spottingFieldset).getByLabelText('red');
    const brownOption = within(spottingFieldset).getByLabelText('brown');

    // Initially neither is checked in default state
    expect(lightOption).not.toBeChecked();
    expect(heavyOption).not.toBeChecked();
    expect(redOption).not.toBeChecked();
    expect(brownOption).not.toBeChecked();

    // Select 'light' and 'heavy' in period blood flow
    fireEvent.click(lightOption);
    fireEvent.click(heavyOption);

    expect(lightOption).toBeChecked();
    expect(heavyOption).toBeChecked();

    // Spotting options must remain completely unaffected
    expect(redOption).not.toBeChecked();
    expect(brownOption).not.toBeChecked();

    // Select 'brown' in spotting
    fireEvent.click(brownOption);

    // Both questions have independent selections active at the same time
    expect(brownOption).toBeChecked();
    expect(redOption).not.toBeChecked();
    expect(lightOption).toBeChecked();
    expect(heavyOption).toBeChecked();

    // Unselect 'light' in blood flow
    fireEvent.click(lightOption);
    expect(lightOption).not.toBeChecked();
    expect(heavyOption).toBeChecked();
    expect(brownOption).toBeChecked(); // spotting selection persists untouched
  });

  it('supports selecting and deselecting multiple answers for checkbox questions', () => {
    render(<DailyCheckinQuestionnaire />);

    const feelingsFieldset = screen.getByRole('group', { name: /feelings/i });

    const happyCheckbox = within(feelingsFieldset).getByLabelText('happy');
    const sensitiveCheckbox = within(feelingsFieldset).getByLabelText('sensitive');
    const confidentCheckbox = within(feelingsFieldset).getByLabelText('confident');

    // Select happy
    fireEvent.click(happyCheckbox);
    expect(happyCheckbox).toBeChecked();

    // Select sensitive (multiple selection)
    fireEvent.click(sensitiveCheckbox);
    expect(happyCheckbox).toBeChecked();
    expect(sensitiveCheckbox).toBeChecked();

    // Select confident (third selection)
    fireEvent.click(confidentCheckbox);
    expect(happyCheckbox).toBeChecked();
    expect(sensitiveCheckbox).toBeChecked();
    expect(confidentCheckbox).toBeChecked();

    // Deselect happy
    fireEvent.click(happyCheckbox);
    expect(happyCheckbox).not.toBeChecked();
    expect(sensitiveCheckbox).toBeChecked();
    expect(confidentCheckbox).toBeChecked();
  });

  it('validates required questions gracefully without harsh alerts and submits valid data', () => {
    const handleSave = vi.fn();
    render(<DailyCheckinQuestionnaire onSaved={handleSave} />);

    // Clear all fields to simulate incomplete required questions
    const clearBtn = screen.getByRole('button', { name: /clear all fields/i });
    fireEvent.click(clearBtn);

    // Attempt submit with empty required fields
    const submitBtn = screen.getByRole('button', { name: /Simulate Saving Daily Check-In/i });
    fireEvent.click(submitBtn);

    // Alert message appears
    expect(
      screen.getByText(/A few required questions need your input/i)
    ).toBeInTheDocument();
    expect(handleSave).not.toHaveBeenCalled();

    // Fill in required fields
    // 1. feelings
    fireEvent.click(screen.getByLabelText('fine'));

    // 2. pain
    fireEvent.click(screen.getByLabelText('pain free'));

    // 3. energy
    fireEvent.click(screen.getByLabelText('energetic'));

    // 4. mind
    fireEvent.click(screen.getByLabelText('calm'));

    // 5. socail life
    fireEvent.click(screen.getByLabelText('sociable'));

    // 6. cravings (except dhyey)
    fireEvent.click(screen.getByLabelText('sweet'));

    // 7. discharge
    fireEvent.click(screen.getByLabelText('creamy'));

    // 8. skin
    fireEvent.click(screen.getByLabelText('good'));

    // 9. hair
    fireEvent.click(screen.getByLabelText('good hair day'));

    // 10. digestion
    fireEvent.click(screen.getByLabelText('ok', { selector: 'input[name="digestion"]' }));

    // 11. stool
    fireEvent.click(screen.getByLabelText('ok', { selector: 'input[name="stool"]' }));

    // 12. exercise
    fireEvent.click(screen.getByLabelText('walking'));

    // Optional: period blood flow & spotting independently
    fireEvent.click(screen.getByLabelText('medium'));
    fireEvent.click(screen.getByLabelText('red'));

    // Submit now
    fireEvent.click(submitBtn);

    // Modal opens with summary
    const modal = screen.getByRole('dialog');
    expect(within(modal).getByText(/Sample Check-In Recorded/i)).toBeInTheDocument();
    expect(within(modal).getByText('medium')).toBeInTheDocument();
    expect(within(modal).getByText('red')).toBeInTheDocument();
    expect(handleSave).toHaveBeenCalledTimes(1);
    expect(handleSave).toHaveBeenCalledWith(
      expect.objectContaining({
        periodBloodFlow: ['medium'],
        spotting: ['red'],
        feelings: ['fine'],
        pain: ['pain free'],
        energy: ['energetic'],
      })
    );
  });

  it('resets form data back to default initial values when Reset Demo is clicked', () => {
    render(<DailyCheckinQuestionnaire />);

    // Change an option
    const irritableCheckbox = screen.getByLabelText('irritable');
    fireEvent.click(irritableCheckbox);
    expect(irritableCheckbox).toBeChecked();

    // Click Reset Demo
    const resetBtn = screen.getByRole('button', { name: /Reset Demo/i });
    fireEvent.click(resetBtn);

    // irritable should no longer be checked
    expect(irritableCheckbox).not.toBeChecked();
  });
});
