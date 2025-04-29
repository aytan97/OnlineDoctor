import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "antd"
import { Controller, useForm } from "react-hook-form";
import { FeedBackForm } from "../../../types/FormTypes";
import { feedBackSchema } from "../../../validation";
const AskQuestionForm = () => {

    const {
        getValues,
        register,
        handleSubmit, reset, control,
        formState: { errors },
    } = useForm<FeedBackForm>({
        resolver: yupResolver(feedBackSchema),
    });


    const handleSubmitBtn = async (formResult: any) => {
        console.log(formResult)
        reset();
    };
    return (
        <div className="mt-4 ">
            <p style={{ color: "var(--primary-color)" }}><i>We would be happy to hear from you!</i></p>
            <form onSubmit={handleSubmit(handleSubmitBtn)} className="mt-3 question-form">
                <div className="frm-container d-flex flex-column">
                    <Controller
                        defaultValue=""
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <>
                                <input
                                    {...field}
                                    variant="filled"
                                    type="email"
                                    placeholder='Email'
                                    className="mb-2"
                                />{' '}
                            </>
                        )}
                    />
                    <Controller
                        defaultValue=""
                        control={control}
                        name="questionText"
                        render={({ field }) => (
                            <>
                                <textarea
                                    {...field}
                                    variant="filled"
                                    className='bio'
                                    placeholder="..."
                                />{' '}
                            </>
                        )}
                    />
                    {errors.questionText && <p className="error">{errors.questionText.message}</p>}
                </div>
                <div className="give-feedback-form submit-btn">
                    <Button htmlType="submit">Send</Button>
                </div>
            </form>
        </div>
    )
}

export default AskQuestionForm
