import { DateTime } from 'luxon';
import { PlotParams } from 'react-plotly.js';
import { syntheticData, syntheticPrediction } from '../data/synthetic';

export const getSyntheticChartData = () => {
  const { target, start } = syntheticData;
  const startDate = DateTime.fromSQL(start);
  const data: PlotParams['data'] = [
    {
      type: 'scatter',
      mode: 'lines',
      name: 'Original Data',
      y: target,
      x: target.map((_, index) =>
        startDate.plus({ hours: index }).toSQL({ includeOffset: false })
      ),
      line: { color: '#c62828' },
    },
    {
      type: 'scatter',
      mode: 'lines',
      name: 'Mean',
      y: syntheticPrediction.predictions[0].mean,
      x: target.map((_, index) =>
        startDate
          .plus({ hours: target.length + index })
          .toSQL({ includeOffset: false })
      ),
      line: { color: '#43a047' },
    },
    {
      type: 'scatter',
      mode: 'lines',
      name: 'Prediction 0.1 Quantile',
      y: syntheticPrediction.predictions[0].quantiles['0.1'],
      x: target.map((_, index) =>
        startDate
          .plus({ hours: target.length + index })
          .toSQL({ includeOffset: false })
      ),
      line: { color: '#7cb342' },
    },
    {
      type: 'scatter',
      mode: 'lines',
      name: 'Prediction 0.9 Quantile',
      y: syntheticPrediction.predictions[0].quantiles['0.9'],
      x: target.map((_, index) =>
        startDate
          .plus({ hours: target.length + index })
          .toSQL({ includeOffset: false })
      ),
      line: { color: '#c0ca33' },
    },
  ];

  return data;
};
