import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupAsDoctorSchema } from '../../../validation';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchCategories } from '../../../redux/features/categories/categorySlice';
import { CategoryType } from '../../../redux/features/categories/types';
import arrowdropdown from '../../media/images/arrow-drop-down.svg'
import { addDoctor } from '../../../redux/features/register/DoctorSlice';
import { fetchUsers } from '../../../redux/features/register/PatientSlice';
import { DoctorSignupFormValues, IToggle } from '../../models';


const SignupasDoctor: React.FC<IToggle> = ({ role }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const categories = useAppSelector((state) => state.categories.list)
    const users = useAppSelector((state) => state.patient.result.content);
    console.log(users)
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const userEmails = users.map((user) => user.email);
    const userSsnID = users?.map((user) => user.ssnId);
    const dropdownRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchUsers());
    }, [dispatch]);


    const { register, handleSubmit, formState: { errors }, reset, setError } = useForm<DoctorSignupFormValues>({
        resolver: yupResolver(signupAsDoctorSchema),
        defaultValues: { categories: [] }
    });


    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const categoryValue = e.target.value;
        if (selectedCategories.includes(categoryValue)) {
            setSelectedCategories(selectedCategories.filter(cat => cat !== categoryValue));
        } else {
            setSelectedCategories([...selectedCategories, categoryValue]);
        }
    };

    const onSubmit = (data: any) => {
        data.categories = selectedCategories;
        const emailExists = userEmails.includes(data.email);
        const ssnIdexists = userSsnID.includes(data.ssnId)
        if (emailExists) {
            setError('email', {
                type: 'manual',
                message: 'Email already exists',
            });
            return;
        }

        if (ssnIdexists) {
            setError('ssnId', {
                type: 'manual',
                message: 'SSN ID already exists',
            });
            return;
        }
        dispatch(addDoctor(data))
        navigate("/otp-verification")
        reset()
    };



    const closeDropdown = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", closeDropdown);

        return () => {
            document.removeEventListener("mousedown", closeDropdown);
        };
    }, []);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='doctor-form-container'>
                <h2 className='mt-3'>Doctor registration</h2>
                <input type="hidden" {...register('role')} value={role} />
                <div className="dropdown-select">
                    <div className='form-item'>
                        <div className={`dropdown ${isDropdownOpen ? 'show' : ''}`} ref={dropdownRef}>
                            <div className="toggle-btn dropdown-toggle" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                <div> Select your Specialities</div>
                                <div className='accordion-icon'>
                                    {isDropdownOpen ? (
                                        <img src={arrowdropdown} alt="dropdownicon" className='turn-180' />
                                    ) : (
                                        <img src={arrowdropdown} alt="dropdownicon" />
                                    )}
                                </div>
                            </div>
                            <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                                <div className="close-btn dropdown-toggle" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                    Close
                                </div>
                                {categories.map((category: CategoryType) => (
                                    <div className="form-check" key={category._id}>
                                        <input {...register('categories')} className="form-check-input" type="checkbox" value={category._id} id={`category-${category._id}`}
                                            onChange={handleCategoryChange}
                                            checked={selectedCategories.includes(category._id)} />
                                        <label className="form-check-label" htmlFor={`category-${category._id}`}>
                                            {category.categoryName}
                                        </label>
                                    </div>
                                ))}

                            </div>
                        </div>
                        {errors.categories && (
                            <p className="error-message">{errors.categories.message}</p>
                        )}
                    </div>
                </div>
                <div className='form-lines'>
                    <div className='form-item'>
                        <label>First Name</label>
                        <input type="text" {...register('firstname')} />
                        {errors.firstname && <p>{errors.firstname.message}</p>}
                    </div>

                    <div className='form-item'>
                        <label>Last Name</label>
                        <input type="text" {...register('lastname')} />
                        {errors.lastname && <p>{errors.lastname.message}</p>}
                    </div>
                </div>
                <div className='form-lines'>
                    <div className='form-item'>
                        <label>Email</label>
                        <input type="email" {...register('email')} />
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>
                    <div className='form-item'>
                        <label>SSN ID</label>
                        <input type="text" {...register('ssnId')} />
                        {errors.ssnId && <p>{errors.ssnId.message}</p>}
                    </div>
                </div>



                <div className='form-lines'>
                    <div className='form-item'>
                        <label>Password</label>
                        <input type="password" {...register('password')} />
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>

                    <div className='form-item'>
                        <label>Confirm Password</label>
                        <input type="password" {...register('confirmPassword')} />
                        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                    </div>

                </div >

                <button type="submit" style={{ transform: "rotateY(0deg)" }} className='btn mb-4'>Submit</button>
            </form>
        </>
    );
};

export default SignupasDoctor;



