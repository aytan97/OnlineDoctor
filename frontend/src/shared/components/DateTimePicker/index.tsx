import dayjs from 'dayjs';
import { useForm, Controller } from 'react-hook-form';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Button } from 'antd';
import AvailabilityList from './addedAvailabilitiesForm';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const timeRanges = [
    { start: '07:00', end: '07:30' },
    { start: '07:30', end: '08:00' },
    { start: '08:00', end: '08:30' },
    { start: '08:30', end: '09:00' },
    { start: '09:00', end: '09:30' },
    { start: '09:30', end: '10:00' },
    { start: '10:00', end: '10:30' },
    { start: '10:30', end: '11:00' },
    { start: '11:00', end: '11:30' },
    { start: '11:30', end: '12:00' },
    { start: '12:00', end: '12:30' },
    { start: '12:30', end: '13:00' },
    { start: '13:00', end: '13:30' },
];

export default function DateTimePickerForm() {
    const { control, handleSubmit, formState: { errors, isDirty }, reset, setError } = useForm();


    const handleBeforeUnload = (event: any) => {
        if (isDirty) {
            event.preventDefault();
            event.returnValue = "";
        }
    };

    useEffect(() => {
        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);

        };
    }, [isDirty]);


    const onSubmit = (data: any) => {
        if (!data.timeRange) {
            setError('timeRange', {
                type: 'manual',
                message: 'Please add time',
            });
            return;
        }
        console.log('Selected Time and date:', data);
        toast.success('New time added successfully!', {
            autoClose: 3000,
            position: "top-right",
        })
        reset()
    };

    return (
        <>
            <div className='container'>
                <h2 className='mb-3 ml-3' style={{ color: 'var(--primary-color)' }}>Manage your availabilities</h2>
                <div className='date-time-container'>
                    <div className="date-time-picker">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateCalendar']}>
                                    <Controller
                                        name="date"
                                        control={control}
                                        defaultValue={dayjs('2024-05-07')}
                                        render={({ field }) => (
                                            <DateCalendar {...field} referenceDate={dayjs('2024-04-29')} views={['year', 'month', 'day']} />
                                        )}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            <FormControl fullWidth>
                                <InputLabel>Select Time Range</InputLabel>
                                <Controller
                                    name="timeRange"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Select {...field}>
                                            <MenuItem value="">Select</MenuItem>
                                            {timeRanges.map((range, index) => (
                                                <MenuItem key={index} value={`${range.start}-${range.end}`}>
                                                    {`${range.start} - ${range.end}`}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                                {errors.timeRange && (<p className="error">{errors.timeRange.message}</p>)}
                            </FormControl>
                            <Button htmlType="submit">Add</Button>
                        </form>
                    </div>

                    <div className="my-availability-list">
                        <AvailabilityList />
                    </div>
                </div>

            </div>

            <ToastContainer />
        </>
    );
}