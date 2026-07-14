import { useMemo } from 'react'
import { categoryService } from '../services/categoryService'

export function useCategories(type = null) {
  const categories = useMemo(() => {
    if (type) return categoryService.getByType(type)
    return categoryService.getAll()
  }, [type])

  const getCategoryById = useMemo(
    () => (id) => categoryService.getById(id),
    []
  )

  return { categories, getCategoryById }
}
