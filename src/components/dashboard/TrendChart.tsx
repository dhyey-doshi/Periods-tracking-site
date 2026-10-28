import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { SAMPLE_HISTORICAL_CYCLES } from '../../data/sampleCycleData';
import { SEMANTIC_TOKENS } from '../../theme/tokens';
import { useTheme } from '../../context/ThemeContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { BarChart3, Table as TableIcon, Info } from 'lucide-react';

export interface TrendChartProps {
  className?: string;
}

export const TrendChart: React.FC<TrendChartProps> = ({ className = '' }) => {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const chartTheme = {
    grid: isDark ? '#493744' : '#EED9D5',
    axisText: isDark ? '#C7B8C2' : '#74505F',
    axisLine: isDark ? '#493744' : '#EED9D5',
    cycleLength: isDark ? '#E8A2B6' : SEMANTIC_TOKENS.chart.cycleLength,
    periodLength: isDark ? '#D99B9F' : SEMANTIC_TOKENS.chart.periodLength,
    referenceLine: isDark ? '#F3BF90' : SEMANTIC_TOKENS.chart.referenceLine,
  };

  const chartData = SAMPLE_HISTORICAL_CYCLES.map((cycle) => ({
    name: `Cycle ${cycle.cycleNumber}`,
    startDate: cycle.startDate,
    totalDays: cycle.totalDays,
    periodLength: cycle.periodLengthDays,
    ovulationDay: cycle.ovulationEstimatedDay,
    lutealLength: cycle.lutealLengthDays,
    notes: cycle.primaryMoodPattern,
  }));

  return (
    <Card variant="elevated" padding="lg" className={`space-y-6 ${className}`}>
      {/* Header with View Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EED9D5] dark:border-[#493744] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="berry" size="sm">
              Fictional Sample Trends
            </Badge>
            <span className="text-xs text-[#8C6775]">Historical 6-Cycle Analysis</span>
          </div>
          <h3 className="font-editorial text-2xl font-bold text-[#593744]">
            Cycle Length & Bleeding Variability
          </h3>
        </div>

        {/* View switcher */}
        <div className="flex items-center gap-1 bg-[#FBF1ED] p-1 rounded-full border border-[#EED9D5]">
          <button
            onClick={() => setViewMode('chart')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'chart'
                ? 'bg-white text-[#593744] shadow-xs'
                : 'text-[#74505F] hover:text-[#593744]'
            }`}
            aria-pressed={viewMode === 'chart'}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Chart View</span>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'table'
                ? 'bg-white text-[#593744] shadow-xs'
                : 'text-[#74505F] hover:text-[#593744]'
            }`}
            aria-pressed={viewMode === 'table'}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>Data Table</span>
          </button>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-[#74505F] leading-relaxed">
        This sample demonstrates how historical cycle duration and period length can be visually tracked over time without false precision. In this sample history, total cycle duration ranges between 28 and 31 days (average 29.2 days).
      </p>

      {/* Chart View */}
      {viewMode === 'chart' ? (
        <div className="space-y-4">
          <div className="h-[280px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%" minWidth={100} minHeight={250}>
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 20, left: -15, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartTheme.grid} />
                <XAxis
                  dataKey="name"
                  tick={{ fill: chartTheme.axisText, fontSize: 12 }}
                  axisLine={{ stroke: chartTheme.axisLine }}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 35]}
                  ticks={[0, 7, 14, 21, 28, 35]}
                  tick={{ fill: chartTheme.axisText, fontSize: 12 }}
                  axisLine={{ stroke: chartTheme.axisLine }}
                  tickLine={false}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-white dark:bg-[#2B222C] p-3 rounded-2xl shadow-lg border border-[#EED9D5] dark:border-[#493744] text-xs space-y-1.5">
                          <p className="font-bold text-[#593744] dark:text-[#F8F0F3]">{d.name} ({d.startDate})</p>
                          <div className="flex items-center gap-2 text-[#8E2235] dark:text-[#F5A3B2]">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#A85F76] dark:bg-[#E8A2B6]" />
                            <span>Total Length: <strong>{d.totalDays} days</strong></span>
                          </div>
                          <div className="flex items-center gap-2 text-[#593744] dark:text-[#F8F0F3]">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#593744] dark:bg-[#D99B9F]" />
                            <span>Bleeding: <strong>{d.periodLength} days</strong></span>
                          </div>
                          <p className="text-[#8C6775] dark:text-[#A3919D] border-t border-[#EED9D5] dark:border-[#493744] pt-1 mt-1">
                            {d.notes}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <ReferenceLine
                  y={28}
                  stroke={chartTheme.referenceLine}
                  strokeDasharray="4 4"
                  label={{
                    value: '28-day reference',
                    position: 'insideTopRight',
                    fill: chartTheme.referenceLine,
                    fontSize: 11,
                  }}
                />
                <Bar
                  dataKey="totalDays"
                  name="Total Cycle Days"
                  fill={chartTheme.cycleLength}
                  radius={[6, 6, 0, 0]}
                  maxBarSize={45}
                />
                <Bar
                  dataKey="periodLength"
                  name="Menstrual Bleeding Days"
                  fill={chartTheme.periodLength}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={45}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend and Caption */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-[#74505F] pt-2 border-t border-[#EED9D5] dark:border-[#493744]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#A85F76] dark:bg-[#E8A2B6]" />
                <span>Total Cycle Length</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#593744] dark:bg-[#D99B9F]" />
                <span>Period Flow Days</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 bg-[#B85C27] dark:bg-[#F3BF90]" />
                <span>28-Day Benchmark</span>
              </div>
            </div>
            <span className="text-[#8C6775] italic">Fictional demonstration data</span>
          </div>
        </div>
      ) : (
        /* Accessible Table View */
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-[#74505F] border-collapse">
            <thead>
              <tr className="border-b border-[#EED9D5] text-[#593744] font-semibold bg-[#FBF1ED]">
                <th className="p-3 rounded-l-xl">Cycle</th>
                <th className="p-3">Start Date</th>
                <th className="p-3">Total Duration</th>
                <th className="p-3">Flow Length</th>
                <th className="p-3">Estimated Ovulation</th>
                <th className="p-3 rounded-r-xl">Observations</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((c, i) => (
                <tr
                  key={i}
                  className="border-b border-[#EED9D5] hover:bg-[#FFF7F4] transition-colors"
                >
                  <td className="p-3 font-semibold text-[#593744]">{c.name}</td>
                  <td className="p-3">{c.startDate}</td>
                  <td className="p-3 font-semibold text-[#8E2235]">{c.totalDays} days</td>
                  <td className="p-3 text-[#593744] font-medium">{c.periodLength} days</td>
                  <td className="p-3">Day {c.ovulationDay}</td>
                  <td className="p-3 text-[#8C6775]">{c.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Grounded Insight Box */}
      <div className="bg-[#FBF1ED] rounded-2xl p-4 border border-[#EED9D5] flex items-start gap-3 text-xs text-[#74505F]">
        <Info className="w-4 h-4 text-[#9E4F66] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#593744] block mb-0.5">Clinical Pattern Recognition:</strong>
          Note that in Cycle 3, total length expanded to 31 days while the luteal phase remained 14 days. This demonstrates how stress or travel typically lengthens the pre-ovulatory follicular phase rather than the post-ovulatory luteal phase.
        </div>
      </div>
    </Card>
  );
};
