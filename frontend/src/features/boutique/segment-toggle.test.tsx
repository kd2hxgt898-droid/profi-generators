import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';
import { SegmentToggle } from './segment-toggle';

const renderWithI18n = (ui: JSX.Element): ReturnType<typeof render> =>
  render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>);

describe('SegmentToggle', () => {
  it('renders both segments', () => {
    renderWithI18n(<SegmentToggle segment="home" onChange={() => {}} />);
    expect(screen.getByText(/Для дома|For home/i)).toBeInTheDocument();
    expect(screen.getByText(/бизнеса|business/i)).toBeInTheDocument();
  });

  it('triggers onChange on switching', () => {
    const onChange = vi.fn();
    renderWithI18n(<SegmentToggle segment="home" onChange={onChange} />);
    fireEvent.click(screen.getByText(/бизнеса|business/i));
    expect(onChange).toHaveBeenCalledWith('business');
  });
});
