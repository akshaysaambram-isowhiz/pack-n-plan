import { useState, useCallback } from "react";

interface ValidationRule {
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  custom?: (value: string) => boolean;
  errorMessage?: string;
}

interface ValidationRules {
  [key: string]: ValidationRule;
}

interface FormErrors {
  [key: string]: string;
}

export function useFormValidation<T extends { [key: string]: string }>(
  initialValues: T,
  validationRules: ValidationRules,
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isValid, setIsValid] = useState(false);

  const validate = useCallback(
    (name: string, value: string): string => {
      const rules = validationRules[name];
      if (!rules) return "";

      if (rules.required && !value) {
        return rules.errorMessage || "This field is required";
      }

      if (rules.pattern && !rules.pattern.test(value)) {
        return rules.errorMessage || "Invalid format";
      }

      if (rules.minLength && value.length < rules.minLength) {
        return rules.errorMessage || `Minimum length is ${rules.minLength}`;
      }

      if (rules.maxLength && value.length > rules.maxLength) {
        return rules.errorMessage || `Maximum length is ${rules.maxLength}`;
      }

      if (rules.custom && !rules.custom(value)) {
        return rules.errorMessage || "Invalid value";
      }

      return "";
    },
    [validationRules],
  );

  const handleChange = useCallback(
    (name: string, value: string) => {
      const newValues = { ...values, [name]: value };
      const error = validate(name, value);
      const newErrors = { ...errors, [name]: error };

      setValues(newValues);
      setErrors(newErrors);
      setIsValid(Object.values(newErrors).every((error) => !error));
    },
    [values, errors, validate],
  );

  const validateAll = useCallback(() => {
    const newErrors: FormErrors = {};
    let isFormValid = true;

    Object.keys(values).forEach((name) => {
      const error = validate(name, values[name]);
      if (error) {
        isFormValid = false;
      }
      newErrors[name] = error;
    });

    setErrors(newErrors);
    setIsValid(isFormValid);
    return isFormValid;
  }, [values, validate]);

  return {
    values,
    errors,
    isValid,
    handleChange,
    validateAll,
  };
}
