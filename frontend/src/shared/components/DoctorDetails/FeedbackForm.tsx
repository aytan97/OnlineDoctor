import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "antd";
import { Controller, useForm } from "react-hook-form";
import { FeedBackForm } from "../../../types/FormTypes";
import { feedBackSchema } from "../../../validation";
import { AiFillStar } from "react-icons/ai";
import { useState } from "react";
const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FeedBackForm>({
    resolver: yupResolver(feedBackSchema),
  });
  const handleSubmitBtn = async (formResult: any) => {
    console.log(formResult);
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(handleSubmitBtn)}
      className="feedback-form mt-4"
    >
      <div className="d-flex mb-2 starred-feedback">
        {[...Array(5).keys()].map((_, index) => {
          index += 1;
          return (
            <div
              key={index}
              className={`${
                index <= ((rating && hover) || hover)
                  ? "text-yellowColor"
                  : "text-gray-400"
              } starcolor`}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
              onDoubleClick={() => {
                setHover(0);
                setRating(0);
              }}
            >
              <span>
                <AiFillStar />
              </span>
            </div>
          );
        })}
      </div>

      <Controller
        defaultValue=""
        control={control}
        name="commentText"
        render={({ field }) => (
          <>
            <textarea
              {...field}
              className="bio"
              placeholder="Help others to know your thoughts about doctor..."
            />
          </>
        )}
      />
      {errors?.commentText && (
        <p className="error">{errors?.commentText.message}</p>
      )}
      <div className="give-feedback-form submit-btn">
        <Button htmlType="submit">Submit</Button>
      </div>
    </form>
  );
};

export default FeedbackForm;
