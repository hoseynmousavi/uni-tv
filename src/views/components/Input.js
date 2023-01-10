import {forwardRef, memo, useEffect, useRef, useState} from "react"
import regexConstant from "../../constant/regexConstant"
import checkNationalCode from "../../helpers/checkNationalCode"
import numberCorrection from "../../seyed-modules/helpers/numberCorrection"
import inputKeyDownEnter from "../../helpers/inputKeyDownEnter"
import validationConstant from "../../constant/validationConstant"
import onScroll from "../../seyed-modules/helpers/onScroll"
import showPhoneNumber from "../../seyed-modules/helpers/showPhoneNumber"
import ShowValidationError from "./ShowValidationError"
import fixInputScroll from "../../helpers/fixInputScroll"
import GetTextConstant from "../../seyed-modules/hooks/GetTextConstant"

const Input = forwardRef(({
                              className, name, autoComplete = "off", focusOnMountDesktop, label, type = "text", validation, password, placeholder = "", onIconClick, disableOnScroll, fixScroll, isArea,
                              defaultValue, onChange, disabled, ltr, ltrPlaceHolder, Icon, required, onSubmit, onSubmitDisable, disableSubmit, labelClassName, iconClassName, noSpace,
                          }, ref) =>
{
    const Tag = isArea ? "textarea" : "input"
    const {language} = GetTextConstant()
    const tempRef = useRef(null)
    const inputRef = ref || tempRef
    const [value, setValue] = useState("")
    const [error, setError] = useState("")
    const validationTimer = useRef(null)
    const timerFixScroll = useRef(null)

    useEffect(() =>
    {
        let scrollListener = null
        if (disableOnScroll) scrollListener = onScroll({callback: () => inputRef.current?.blur?.()})
        if (focusOnMountDesktop && window.innerWidth > 480) setTimeout(() => inputRef?.current?.focus(), 300)
        if (defaultValue)
        {
            if (validation)
            {
                if (validation === "email" || validation === "url")
                {
                    const value = numberCorrection(defaultValue.trim())
                    setValue(value)
                }
                else if (validation === "national_code")
                {
                    const value = numberCorrection(defaultValue.trim())
                    if (!isNaN(value) && value.length <= 10) setValue(value)
                }
                else if (validation === "phone")
                {
                    const value = numberCorrection(defaultValue.trim())
                    if (!isNaN(value) && value.length <= 11) setValue(value)
                }
            }
            else setValue(defaultValue.trim())
        }

        return () =>
        {
            scrollListener?.()
            clearTimeout(validationTimer.current)
            clearTimeout(timerFixScroll.current)
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() =>
    {
        if (password && value && validation === "confirm_password") checkErrTimer()
        // eslint-disable-next-line
    }, [password])

    function resetInput()
    {
        onInputChange({target: {value: ""}})
    }

    function onInputChange(e)
    {
        if (validation)
        {
            if (validation === "email")
            {
                const value = numberCorrection(e.target.value.replace(/ /g, ""))
                setValue(value)
                if (regexConstant.EMAIL_REGEX.test(value)) onChange({name, value, reset: resetInput})
                else onChange({name, value: value || required ? null : "", reset: resetInput})
                checkErrTimer()
            }
            else if (validation === "national_code")
            {
                const value = numberCorrection(e.target.value.replace(/ /g, "").slice(0, 10))
                if (!isNaN(value) && value.length <= 10) setValue(value)
                if (checkNationalCode(value)) onChange({name, value, reset: resetInput})
                else onChange({name, value: value || required ? null : "", reset: resetInput})
                checkErrTimer()
            }
            else if (validation === "phone")
            {
                const value = numberCorrection(showPhoneNumber.fixToNumber(e.target.value))
                if (!isNaN(value) && value.length <= 11) setValue(value)
                if (regexConstant.PHONE_REGEX.test(value)) onChange({name, value, reset: resetInput})
                else onChange({name, value: value || required ? null : "", reset: resetInput})
                checkErrTimer()
            }
            else if (validation === "url")
            {
                const value = numberCorrection(e.target.value.replace(/ /g, ""))
                setValue(value)
                if (regexConstant.URL_REGEX.test(value)) onChange({name, value, reset: resetInput})
                else onChange({name, value: value || required ? null : "", reset: resetInput})
                checkErrTimer()
            }
            else if (validation === "password")
            {
                const value = e.target.value
                setValue(value)
                if (value.length >= 6) onChange({name, value, reset: resetInput})
                else onChange({name, value: value || required ? null : "", reset: resetInput})
                checkErrTimer()
            }
            else if (validation === "confirm_password")
            {
                const value = e.target.value
                setValue(value)
                if (value === password) onChange({name, value, reset: resetInput})
                else onChange({name, value: value || required ? null : "", reset: resetInput})
                checkErrTimer()
            }
        }
        else
        {
            const value = numberCorrection(e.target.value)
            setValue(value)
            onChange({name, value: value.trim() ? value.trim() : required ? null : "", reset: resetInput})
            checkErrTimer()
        }
        setError("")
    }

    function checkErrTimer()
    {
        clearTimeout(validationTimer.current)
        validationTimer.current = setTimeout(onInputBlur, 800)
    }

    function onInputBlur()
    {
        clearTimeout(timerFixScroll.current)
        let tempValue = inputRef.current.value.trim()
        if (validation === "phone") tempValue = showPhoneNumber.fixToNumber(tempValue)
        let tempErr = ""
        if (!tempValue)
        {
            if (required) tempErr = validationConstant[language].requiredField
        }
        else
        {
            if (validation)
            {
                if (validation === "email")
                {
                    if (!regexConstant.EMAIL_REGEX.test(tempValue)) tempErr = validationConstant[language].unValidEmail
                }
                else if (validation === "national_code")
                {
                    if (!checkNationalCode(tempValue)) tempErr = validationConstant[language].unValidNationalCode
                }
                else if (validation === "phone")
                {
                    if (!regexConstant.PHONE_REGEX.test(tempValue)) tempErr = validationConstant[language].unValidPhone
                }
                else if (validation === "url")
                {
                    if (!regexConstant.URL_REGEX.test(tempValue)) tempErr = validationConstant[language].unValidUrl
                }
                else if (validation === "password")
                {
                    if (tempValue.length < 6) tempErr = validationConstant[language].unValidPassword
                }
                else if (validation === "confirm_password")
                {
                    if (tempValue !== password) tempErr = validationConstant[language].unValidConfirmPassword
                }
            }
        }
        setError(tempErr)
    }

    function onFocusClick()
    {
        if (fixScroll)
        {
            clearTimeout(timerFixScroll.current)
            timerFixScroll.current = fixInputScroll({inputRef})
        }
    }

    return (
        <label className={`input-label ${className}`}>
            <p className={`input-label-text ${labelClassName}`}>{label}</p>
            <div className="input-label-relative">
                <Tag autoComplete={autoComplete}
                     name={name}
                     className={`input-main ${isArea ? "area" : ""} ${ltrPlaceHolder ? "ltr-placeholder" : ""} ${Icon || (validation === "email" && value) ? "have-icon" : ""} ${error ? "err" : ""} ${ltr ? "ltr" : ""}`}
                     rows={5}
                     disabled={disabled}
                     ref={inputRef}
                     type={type}
                     placeholder={placeholder}
                     value={validation === "phone" ? showPhoneNumber.showPhone(value) : value}
                     onChange={onInputChange}
                     onBlur={onInputBlur}
                     onKeyDown={onSubmit || onSubmitDisable ? inputKeyDownEnter({onSubmit, onSubmitDisable, disableSubmit, checkValidation: onInputBlur}) : undefined}
                     onFocus={onFocusClick}
                     onClick={onFocusClick}
                />
                {Icon && <Icon className={`input-icon icon ${iconClassName} ${ltr ? "" : "rtl"}`} onClick={onIconClick}/>}
            </div>
            <ShowValidationError error={error} noSpace={noSpace}/>
        </label>
    )
})

export default memo(Input)