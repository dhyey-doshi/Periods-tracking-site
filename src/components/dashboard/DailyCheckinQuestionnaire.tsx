import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import {
  Check,
  Sparkles,
  RotateCcw,
  Droplets,
  AlertCircle,
  ShieldCheck,
  Edit3,
} from 'lucide-react';
import {
  QUESTIONNAIRE_META,
  QUESTIONNAIRE_QUESTIONS,
  QUESTIONNAIRE_SECTIONS,
  INITIAL_CHECKIN_FORM_DATA,
  EMPTY_CHECKIN_FORM_DATA,
  type CheckinFormData,
  type QuestionnaireQuestion,
} from '../../data/questionnaireData';

export interface DailyCheckinQuestionnaireProps {
  className?: string;
  onSaved?: (data: CheckinFormData) => void;
}

export const DailyCheckinQuestionnaire: React.FC<DailyCheckinQuestionnaireProps> = ({
  className = '',
  onSaved,
}) => {
  const [formData, setFormData] = useState<CheckinFormData>(INITIAL_CHECKIN_FORM_DATA);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [savedBanner, setSavedBanner] = useState(false);
  const [submittedData, setSubmittedData] = useState<CheckinFormData | null>(null);

  // Field mapping helper
  const getFieldValues = (qId: string): string[] => {
    switch (qId) {
      case 'period_blood_flow':
        return formData.periodBloodFlow;
      case 'spotting':
        return formData.spotting;
      case 'feelings':
        return formData.feelings;
      case 'pain':
        return formData.pain;
      case 'sex_life':
        return formData.sexLife;
      case 'energy':
        return formData.energy;
      case 'mind':
        return formData.mind;
      case 'socail_life':
        return formData.socialLife;
      case 'cravings':
        return formData.cravings;
      case 'discharge':
        return formData.discharge;
      case 'skin':
        return formData.skin;
      case 'hair':
        return formData.hair;
      case 'digestion':
        return formData.digestion;
      case 'stool':
        return formData.stool;
      case 'exercise':
        return formData.exercise;
      default:
        return [];
    }
  };

  const toggleCheckbox = (qId: string, value: string) => {
    setValidationErrors((prev) => prev.filter((id) => id !== qId));

    setFormData((prev) => {
      const updateList = (current: string[]): string[] => {
        if (current.includes(value)) {
          return current.filter((item) => item !== value);
        } else {
          return [...current, value];
        }
      };

      switch (qId) {
        case 'period_blood_flow':
          return { ...prev, periodBloodFlow: updateList(prev.periodBloodFlow) };
        case 'spotting':
          return { ...prev, spotting: updateList(prev.spotting) };
        case 'feelings':
          return { ...prev, feelings: updateList(prev.feelings) };
        case 'pain':
          return { ...prev, pain: updateList(prev.pain) };
        case 'sex_life':
          return { ...prev, sexLife: updateList(prev.sexLife) };
        case 'energy':
          return { ...prev, energy: updateList(prev.energy) };
        case 'mind':
          return { ...prev, mind: updateList(prev.mind) };
        case 'socail_life':
          return { ...prev, socialLife: updateList(prev.socialLife) };
        case 'cravings':
          return { ...prev, cravings: updateList(prev.cravings) };
        case 'discharge':
          return { ...prev, discharge: updateList(prev.discharge) };
        case 'skin':
          return { ...prev, skin: updateList(prev.skin) };
        case 'hair':
          return { ...prev, hair: updateList(prev.hair) };
        case 'digestion':
          return { ...prev, digestion: updateList(prev.digestion) };
        case 'stool':
          return { ...prev, stool: updateList(prev.stool) };
        case 'exercise':
          return { ...prev, exercise: updateList(prev.exercise) };
        default:
          return prev;
      }
    });
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];

    if (formData.feelings.length === 0) errors.push('feelings');
    if (formData.pain.length === 0) errors.push('pain');
    if (formData.energy.length === 0) errors.push('energy');
    if (formData.mind.length === 0) errors.push('mind');
    if (formData.socialLife.length === 0) errors.push('socail_life');
    if (formData.cravings.length === 0) errors.push('cravings');
    if (formData.discharge.length === 0) errors.push('discharge');
    if (formData.skin.length === 0) errors.push('skin');
    if (formData.hair.length === 0) errors.push('hair');
    if (formData.digestion.length === 0) errors.push('digestion');
    if (formData.stool.length === 0) errors.push('stool');
    if (formData.exercise.length === 0) errors.push('exercise');

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      const firstErrorEl = document.querySelector('[data-has-error="true"]');
      if (firstErrorEl) {
        firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setSubmittedData(formData);
    setSavedBanner(true);
    setModalOpen(true);
    if (onSaved) {
      onSaved(formData);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_CHECKIN_FORM_DATA);
    setValidationErrors([]);
    setSavedBanner(false);
  };

  const handleClearAll = () => {
    setFormData(EMPTY_CHECKIN_FORM_DATA);
    setValidationErrors([]);
    setSavedBanner(false);
  };

  const questionMap = new Map<string, QuestionnaireQuestion>();
  QUESTIONNAIRE_QUESTIONS.forEach((q) => questionMap.set(q.id, q));

  return (
    <>
      <Card variant="elevated" padding="lg" className={`space-y-8 ${className}`}>
        {/* Card Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EED9D5] pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-[#9E4F66]">
                Daily Check-In
              </span>
              <Badge variant="rose" size="sm">
                16 Cues
              </Badge>
            </div>
            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#593744] mt-0.5">
              {QUESTIONNAIRE_META.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#74505F] mt-1 italic">
              "{QUESTIONNAIRE_META.description}"
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-[#8C6775] hover:text-[#593744] hover:underline cursor-pointer focus-visible:outline-2 focus-visible:outline-[#9E4F66]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo</span>
            </button>
          </div>
        </div>

        {/* Global Success Banner */}
        {savedBanner && (
          <div
            role="status"
            className="bg-[#EFF6F1] border border-[#C5DECA] rounded-2xl p-4 flex items-center justify-between gap-3 animate-in fade-in duration-200"
          >
            <div className="flex items-center gap-2.5 text-sm text-[#2F5938]">
              <Check className="w-4 h-4 text-[#2F5938] shrink-0" />
              <span>
                <strong>Preview Log Captured!</strong> In-memory state updated for Cycle Day 14.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSavedBanner(false)}
              className="text-xs text-[#2F5938] hover:underline font-semibold cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Validation Warning Alert */}
        {validationErrors.length > 0 && (
          <div
            role="alert"
            className="bg-[#FFF4F2] border border-[#E8CCD5] rounded-2xl p-4 flex items-start gap-3 text-sm text-[#8E2235]"
          >
            <AlertCircle className="w-5 h-5 text-[#9E4F66] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[#593744]">
                A few required questions need your input:
              </p>
              <p className="text-xs text-[#74505F] mt-1">
                Please review the highlighted items below to complete your check-in.
              </p>
            </div>
          </div>
        )}

        {/* Questionnaire Form */}
        <form onSubmit={handleSubmit} className="space-y-10" noValidate>
          {QUESTIONNAIRE_SECTIONS.map((section) => (
            <div key={section.id} className="space-y-6">
              {/* Section Header */}
              <div className="border-b border-[#F2DCD9] pb-2">
                <h4 className="font-editorial text-lg sm:text-xl font-bold text-[#593744]">
                  {section.title}
                </h4>
                {section.description && (
                  <p className="text-xs text-[#8C6775] mt-0.5">{section.description}</p>
                )}
              </div>

              {/* Questions in Section */}
              <div className="space-y-6">
                {section.questionIds.map((qId) => {
                  const q = questionMap.get(qId);
                  if (!q) return null;
                  const hasError = validationErrors.includes(q.id);

                  // 1. Multi-Select Checkbox Questions (including Blood Flow and Spotting)
                  if (q.type === 'checkboxes') {
                    const currentSelected = getFieldValues(q.id);

                    return (
                      <fieldset
                        key={q.id}
                        data-has-error={hasError}
                        className={`p-4 sm:p-5 rounded-2xl transition-all border ${
                          hasError
                            ? 'border-[#D99B9F] bg-[#FFF8F7]'
                            : 'border-[#EED9D5] bg-white hover:border-[#D99B9F]'
                        } space-y-3`}
                      >
                        <legend className="text-sm font-bold text-[#593744] px-1 flex flex-wrap items-center gap-1.5">
                          {q.id === 'period_blood_flow' && (
                            <Droplets className="w-4 h-4 text-[#B83A52] shrink-0" />
                          )}
                          {q.id === 'spotting' && (
                            <span className="w-3.5 h-3.5 rounded-full bg-[#8E2235] inline-block shrink-0" />
                          )}
                          <span>{q.title}</span>
                          {q.isRequired ? (
                            <span className="text-[#9E4F66] font-bold" title="Required">
                              *
                            </span>
                          ) : (
                            <span className="text-xs text-[#8C6775] font-normal">
                              (Optional)
                            </span>
                          )}
                        </legend>

                        <div className="flex flex-wrap gap-2.5 pt-1">
                          {q.options.map((opt) => {
                            const isChecked = currentSelected.includes(opt.value);
                            return (
                              <label
                                key={opt.value}
                                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-medium transition-all cursor-pointer border ${
                                  isChecked
                                    ? 'bg-[#FAF0ED] border-[#9E4F66] text-[#593744] font-semibold shadow-xs'
                                    : 'bg-white border-[#EED9D5] text-[#74505F] hover:bg-[#FBF1ED]'
                                } focus-within:ring-2 focus-within:ring-[#9E4F66]`}
                              >
                                <input
                                  type="checkbox"
                                  name={q.id}
                                  value={opt.value}
                                  checked={isChecked}
                                  onChange={() => toggleCheckbox(q.id, opt.value)}
                                  className="sr-only"
                                />
                                <span
                                  className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 border transition-colors ${
                                    isChecked
                                      ? 'bg-[#9E4F66] border-[#9E4F66] text-white'
                                      : 'border-[#D99B9F] bg-white'
                                  }`}
                                  aria-hidden="true"
                                >
                                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                                </span>
                                <span>{opt.label}</span>
                              </label>
                            );
                          })}
                        </div>

                        {hasError && (
                          <p className="text-xs text-[#9E4F66] font-medium pt-1">
                            Please select at least one option to continue.
                          </p>
                        )}
                      </fieldset>
                    );
                  }

                  // 2. Paragraph Question: "anything else you would  like to mention"
                  if (q.type === 'paragraph') {
                    return (
                      <div
                        key={q.id}
                        className="p-4 sm:p-5 rounded-2xl border border-[#EED9D5] bg-white space-y-2.5"
                      >
                        <label
                          htmlFor="daily-notes-input"
                          className="text-sm font-bold text-[#593744] block"
                        >
                          {q.title}
                          <span className="text-xs text-[#8C6775] font-normal ml-2">
                            (Optional)
                          </span>
                        </label>
                        <textarea
                          id="daily-notes-input"
                          rows={3}
                          value={formData.additionalNotes}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              additionalNotes: e.target.value,
                            }))
                          }
                          className="w-full text-xs sm:text-sm p-3.5 rounded-2xl border border-[#EED9D5] bg-[#FFF7F4] focus:bg-white focus:border-[#9E4F66] focus:outline-none transition-colors text-[#593744]"
                          placeholder="Feel free to add any thoughts, sleep notes, or details you want to keep track of..."
                        />
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
            </div>
          ))}

          {/* Form Actions */}
          <div className="pt-4 space-y-3 border-t border-[#EED9D5]">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="justify-center sm:w-auto"
                icon={<Sparkles className="w-4 h-4 text-white" />}
              >
                Simulate Saving Daily Check-In
              </Button>

              <button
                type="button"
                onClick={handleClearAll}
                className="text-xs text-[#8C6775] hover:text-[#593744] hover:underline cursor-pointer py-2 text-center"
              >
                Clear all fields
              </button>
            </div>

            <p className="text-[11px] text-[#8C6775] text-center sm:text-left">
              Preview action only. All data remains strictly in your local browser session and is never sent to Google Forms or external servers.
            </p>
          </div>
        </form>
      </Card>

      {/* Review & Educational Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Sample Check-In Recorded"
        description="Here is how the platform processes your daily check-in:"
      >
        <div className="space-y-4 text-xs sm:text-sm text-[#74505F] max-h-[70vh] overflow-y-auto pr-1">
          {/* Summary Box */}
          <div className="bg-[#FAF0ED] p-4 rounded-2xl border border-[#EED9D5] space-y-3">
            <div className="flex justify-between items-center text-xs font-semibold text-[#593744]">
              <span>Cycle Day 14 Entry</span>
              <span className="text-[#8E2235] bg-[#F7EBF0] px-2.5 py-0.5 rounded-full border border-[#E8CCD5] uppercase text-[10px]">
                Daily Check-In
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-[#EED9D5]">
                <strong className="text-[#593744] block">Period Blood Flow:</strong>
                <span className="text-[#74505F]">
                  {submittedData?.periodBloodFlow.length
                    ? submittedData.periodBloodFlow.join(', ')
                    : 'None logged'}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#EED9D5]">
                <strong className="text-[#593744] block">Spotting (Separate):</strong>
                <span className="text-[#74505F]">
                  {submittedData?.spotting.length
                    ? submittedData.spotting.join(', ')
                    : 'None logged'}
                </span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-[#74505F] pt-1">
              <div>
                <strong className="text-[#593744]">Feelings: </strong>
                {submittedData?.feelings.join(', ')}
              </div>
              <div>
                <strong className="text-[#593744]">Pain: </strong>
                {submittedData?.pain.join(', ')}
              </div>
              <div>
                <strong className="text-[#593744]">Energy: </strong>
                {submittedData?.energy.join(', ')}
              </div>
              <div>
                <strong className="text-[#593744]">Mind: </strong>
                {submittedData?.mind.join(', ')}
              </div>
              <div>
                <strong className="text-[#593744]">Social Life: </strong>
                {submittedData?.socialLife.join(', ')}
              </div>
              <div>
                <strong className="text-[#593744]">Cravings: </strong>
                {submittedData?.cravings.join(', ')}
              </div>
              <div>
                <strong className="text-[#593744]">Discharge: </strong>
                {submittedData?.discharge.join(', ')}
              </div>
              <div>
                <strong className="text-[#593744]">Skin: </strong>
                {submittedData?.skin.join(', ')}
              </div>
              <div>
                <strong className="text-[#593744]">Hair: </strong>
                {submittedData?.hair.join(', ')}
              </div>
              <div>
                <strong className="text-[#593744]">Digestion: </strong>
                {submittedData?.digestion.join(', ')}
              </div>
              <div>
                <strong className="text-[#593744]">Stool: </strong>
                {submittedData?.stool.join(', ')}
              </div>
              <div>
                <strong className="text-[#593744]">Exercise: </strong>
                {submittedData?.exercise.join(', ')}
              </div>
              {submittedData?.sexLife && submittedData.sexLife.length > 0 && (
                <div>
                  <strong className="text-[#593744]">Sex Life: </strong>
                  {submittedData.sexLife.join(', ')}
                </div>
              )}
              {submittedData?.additionalNotes && (
                <div>
                  <strong className="text-[#593744]">Notes: </strong>
                  {submittedData.additionalNotes}
                </div>
              )}
            </div>
          </div>

          {/* Privacy Guarantee */}
          <div className="bg-[#F7EBF0] p-3.5 rounded-2xl border border-[#E8CCD5] text-xs text-[#74505F] flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#9E4F66] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#593744] block">Local-First Commitment:</strong>
              Your check-in responses exist only in memory in this browser session. Nothing is sent to Google Forms, advertisers, or remote cloud servers.
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setModalOpen(false)}
              icon={<Edit3 className="w-3.5 h-3.5" />}
            >
              Edit Responses
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setModalOpen(false)}
            >
              Got it, continue previewing
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
