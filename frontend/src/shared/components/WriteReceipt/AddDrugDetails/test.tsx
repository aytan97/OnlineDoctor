import { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button, Divider, Input, InputRef, Select, Space } from 'antd'
import { MinusOutlined, PlusOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet-async'
import logoicon from '../../../media/images/logoicon.png'
import { DRUGS, Repeats, TimeSlots, toBeTakenItems } from '../../../constants/BlogTags';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { getMe } from '../../../../redux/features/auth/getMeSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { Option } = Select;
for (let i = 23; i < 36; i++) {
    DRUGS.push(i.toString(36) + i)
}
for (let i = 23; i < 36; i++) {
    TimeSlots.push(i.toString(36) + i)
}

for (let i = 23; i < 36; i++) {
    Repeats.push(i.toString(36) + i)
}

for (let i = 23; i < 36; i++) {
    toBeTakenItems.push(i.toString(36) + i)
}

interface Drug {
    name?: string;
    dosage?: number;
    timeofday?: string[];
    repeats?: string[];
    toBeTakenItems?: string[];
}

const AddReceipt = ({ onSubmit, patientId }) => {
    const dispatch = useAppDispatch()
    const getme = useAppSelector((state) => state.getMe.user)
    const [drugs, setDrugs] = useState<Drug[]>([{}]);
    const inputRef = useRef<InputRef>(null);
    const [isDirty, setIsDirty] = useState<boolean>(false);
    const {
        formState: { errors },
        control,
        setError,
        reset,
        clearErrors,
    } = useForm();

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])


    const checkDirty = () => {
        const dirty = drugs.some(drug => Object.values(drug).some(value => value !== undefined)) || patientId !== undefined;
        setIsDirty(dirty);
    };
    useEffect(() => {
        checkDirty();
    }, [drugs]);

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

    const addDrug = () => {
        setDrugs([...drugs, {}]);
    };

    const removeDrug = (index: any) => {
        setDrugs(drugs.filter((_, i) => i !== index));
    };

    const handleItemsChange = (index: any, value: any) => {
        setDrugs(prevDrugs => {
            const updatedDrugs = [...prevDrugs];
            updatedDrugs[index].repeats = value;
            return updatedDrugs;
        });
    };

    const handleToBeTakenItemsChange = (index: any, value: any) => {
        setDrugs(prevDrugs => {
            const updatedDrugs = [...prevDrugs];
            updatedDrugs[index].toBeTakenItems = value;
            return updatedDrugs;
        });
    };
    const onTimeOfDayChange = (index: any, value: any) => {
        setDrugs(prevDrugs => {
            const updatedDrugs = [...prevDrugs];
            updatedDrugs[index].timeofday = value;
            return updatedDrugs;
        });
    };
    const onDrugNameChange = (index: any, value: any) => {

        setDrugs(prevDrugs => {
            const updatedDrugs = [...prevDrugs];
            if (!updatedDrugs[index]) {
                updatedDrugs[index] = {};
            }
            updatedDrugs[index].name = value;
            return updatedDrugs;
        });
    };

    const increase = (index: any) => {
        setDrugs(prevDrugs => {
            const updatedDrugs = [...prevDrugs];
            updatedDrugs[index].dosage = (updatedDrugs[index].dosage || 0) + 1;
            return updatedDrugs;
        });
    };

    const decline = (index: any) => {
        setDrugs(prevDrugs => {
            const updatedDrugs = [...prevDrugs];
            updatedDrugs[index].dosage = Math.max((updatedDrugs[index].dosage || 0) - 1, 0);
            return updatedDrugs;
        });
    };
    const handleSubmitBtn = () => {
        drugs.forEach((drug) => {
            if (drug.name?.length !== 0 && drug.dosage !== 0 && drug.repeats?.length !== 0 && drug.toBeTakenItems?.length !== 0 && drug.timeofday && patientId) {
                const drugsData = drugs.map((drug) => ({
                    name: drug.name,
                    dosage: drug.dosage,
                    items: drug.repeats,
                    toBeTakenItems: drug.toBeTakenItems,
                    timeofday: drug.timeofday,
                    patientId: patientId,
                    doctorId: getme.data.userId
                }));
                const formData = {

                    drugs: drugsData,
                };
                console.log(formData)
                onSubmit(formData);
                toast.success('Receipt has been created successfully!', {
                    autoClose: 3000,
                    position: "top-right",
                })
                clearErrors("drugdetails")

            }
            else {
                setError('drugdetails', {
                    type: 'manual',
                    message: 'Please fill in all fields'
                });
                console.log(errors)
                return
            }
        });

    };

    return (
        <>
            <Helmet>
                <title>Write Receipt</title>
                <link rel="icon" href={logoicon} />
            </Helmet>
            <div className="container">
                {drugs.map((drug, index) => (
                    <div key={index} className="form-items">
                        <Divider />
                        {errors.drugdetails && <p className="error mt-1">{errors.drugdetails.message}</p>}
                        <div className="form-item ml-2 drug-tags">
                            <Controller
                                control={control}
                                name={`drugs[${index}].name`}
                                render={({ field }) => (
                                    <Select
                                        mode="tags"
                                        placeholder="Add drugs"
                                        {...field}
                                        onChange={(value) => onDrugNameChange(index, value)}
                                    >
                                        {DRUGS.map((drug, idx) => (
                                            idx < 15 && <Option key={idx} value={drug}>
                                                {drug}
                                            </Option>
                                        ))}
                                    </Select>
                                )}
                            />
                        </div>

                        <div className="form-item ml-2 d-flex flex-column justify-space-around align-items-start dosage">
                            <span>Dosage</span>
                            <Button.Group className="d-flex justify-center align-items-center">
                                <Button onClick={() => decline(index)} icon={<MinusOutlined />} />
                                <Controller
                                    control={control}
                                    name={`drugs[${index}].dosage`}
                                    render={({ field }) => (
                                        <Input
                                            variant="filled"
                                            {...field}
                                            type="text"
                                            value={drug.dosage || 0}
                                            disabled
                                        />
                                    )}
                                />

                                <Button onClick={() => increase(index)} icon={<PlusOutlined />} />
                            </Button.Group>

                        </div>

                        <div className='form-item ml-2 repeat'>
                            <Controller
                                control={control}
                                name={`drugs[${index}].repeats`}
                                render={({ field }) => (
                                    <Select
                                        mode="tags"
                                        placeholder="Repeats"
                                        {...field}
                                        onChange={(value) => handleItemsChange(index, value)}
                                    >
                                        {Repeats.map((time, idx) => (
                                            idx < 2 && <Option key={idx} value={time}>{time}</Option>
                                        ))}
                                    </Select>
                                )}
                            />


                        </div>
                        <div className='form-item ml-2 tobetaken'>
                            <Controller
                                control={control}
                                name={`drugs[${index}].toBeTakenItems`}
                                render={({ field }) => (
                                    <Select
                                        mode="tags"
                                        placeholder="To be taken "
                                        {...field}
                                        onChange={(value) => handleToBeTakenItemsChange(index, value)}
                                    >
                                        {toBeTakenItems.map((time, idx) => (
                                            idx < 3 && <Option key={idx} value={time}>{time}</Option>
                                        ))}
                                    </Select>
                                )}
                            />

                        </div>

                        <div className='form-item ml-2 time-of-day'>
                            <Controller
                                control={control}
                                name={`drugs[${index}].timeofday`}
                                render={({ field }) => (
                                    <Select
                                        mode="tags"
                                        placeholder="Add time of day"
                                        {...field}
                                        onChange={(value) => onTimeOfDayChange(index, value)}
                                    >
                                        {TimeSlots.map((time, idx) => (
                                            idx <= 3 && <Option key={idx} value={time}>{time}</Option>
                                        ))}
                                    </Select>
                                )}
                            />


                        </div>

                        <Button type="link" icon={<MinusOutlined />} onClick={() => removeDrug(index)}>
                            Remove Drug
                        </Button>
                    </div>
                ))}

                <div className='d-flex justify-space-between align-items-center form-item addbtn'>
                    <hr style={{ width: '150px', color: 'var(--cancel-hover)' }} />
                    <Button type="link" icon={<PlusCircleOutlined style={{ color: '#dcdbdb', fontSize: '30px' }} />} onClick={addDrug}>
                    </Button>
                    <hr style={{ width: '150px', color: 'var(--cancel-hover)' }} />
                </div>

                <Button onClick={handleSubmitBtn} style={{ fontSize: '15px', width: '90px', height: '40px' }}>
                    Create
                </Button>

            </div>
            <ToastContainer />
        </>
    )
}
export default AddReceipt
