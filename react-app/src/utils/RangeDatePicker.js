import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import moment from 'moment';
import 'daterangepicker/daterangepicker.css';

// Must be set at module-level, before daterangepicker is dynamically loaded,
// so the plugin's IIFE captures window.moment (the real function) not the ESM namespace.
window.moment = moment;

const RangeDatePicker = ({ setDate }) => {
  const datePickerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    // Load daterangepicker lazily so window.moment is already set when its
    // module-level IIFE runs (export default require_daterangepicker()).
    import('daterangepicker').then(() => {
      if (!isMounted || !datePickerRef.current) return;

      $(datePickerRef.current).daterangepicker(
        {
          autoApply: true,
          opens: 'right',
          locale: { format: 'YYYY-MM-DD' },
          ranges: {
            Today: [moment(), moment()],
            Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 14 Days': [moment().subtract(13, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [
              moment().subtract(1, 'month').startOf('month'),
              moment().subtract(1, 'month').endOf('month'),
            ],
            'Last 3 Months': [
              moment().subtract(3, 'month').startOf('month'),
              moment().subtract(1, 'month').endOf('month'),
            ],
            'Last 6 Months': [
              moment().subtract(6, 'month').startOf('month'),
              moment().subtract(1, 'month').endOf('month'),
            ],
            'Last 12 Months': [
              moment().subtract(12, 'month').startOf('month'),
              moment().subtract(1, 'month').endOf('month'),
            ],
            'This year': [moment().startOf('year'), moment().endOf('year')],
          },
        },
        (start, end) => {
          setDate(`${start.format('YYYY-MM-DD')} to ${end.format('YYYY-MM-DD')}`);
        }
      );
    });

    return () => {
      isMounted = false;
      const drp = $(datePickerRef.current)?.data('daterangepicker');
      if (drp) drp.remove();
    };
  }, [setDate]);

  return <input ref={datePickerRef} type="text" placeholder="Select date range" />;
};

export default RangeDatePicker;
