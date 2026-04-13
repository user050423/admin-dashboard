import { useCallback, useState, useEffect } from 'react'

/**
 * Custom hook for managing pagination
 */
export const usePagination = (pageSize: number = 10) => {
  const [currentPage, setCurrentPage] = useState(1)

  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(1, page))
  }, [])

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => prev + 1)
  }, [])

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(1, prev - 1))
  }, [])

  return { currentPage, goToPage, nextPage, prevPage, pageSize }
}

/**
 * Custom hook for managing form state
 */
export const useForm = <T extends Record<string, any>>(initialValues: T) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<Partial<T>>({})

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }))
    },
    []
  )

  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }))
  }, [])

  const setFieldError = useCallback((field: keyof T, error: string) => {
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }))
  }, [])

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
  }, [initialValues])

  return {
    values,
    errors,
    handleChange,
    setFieldValue,
    setFieldError,
    reset,
  }
}

/**
 * Custom hook for managing async operations
 */
export const useAsync = <T, E = string>(
  asyncFunction: () => Promise<T>,
  immediate = true
) => {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>(
    'idle'
  )
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<E | null>(null)

  const execute = useCallback(async () => {
    setStatus('pending')
    setData(null)
    setError(null)

    try {
      const response = await asyncFunction()
      setData(response)
      setStatus('success')
      return response
    } catch (err) {
      setError(err as E)
      setStatus('error')
    }
  }, [asyncFunction])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return { execute, status, data, error }
}
