/* eslint-disable react/jsx-props-no-spreading */
import React, { memo, useRef, useLayoutEffect } from "react";
import usePrevious from "../../../hooks/usePrevious";
import stylenew from "../../../../pages/patient/css/otp.module.scss";
export interface SingleOTPInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  focus?: boolean;
}

export function SingleOTPInputComponent(props: SingleOTPInputProps) {
  const { focus, autoFocus, ...rest } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const prevFocus = usePrevious(!!focus);
  useLayoutEffect(() => {
    if (inputRef.current) {
      if (focus && autoFocus) {
        inputRef.current.focus();
      }
      if (focus && autoFocus && focus !== prevFocus) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [autoFocus, focus, prevFocus]);

  return (
    <div className={`form_field_wrapper ${stylenew.form_field_wrapper}`}>
      <input ref={inputRef} {...rest} />
    </div>
  );
}

const SingleOTPInput = memo(SingleOTPInputComponent);
export default SingleOTPInput;
