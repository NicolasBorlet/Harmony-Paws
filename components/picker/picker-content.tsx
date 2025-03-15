// PickerContent.tsx
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import PickerColumn from './picker-column'
import styles from './styles'
import { PickerColumnType, PickerItemType, PickerType } from './types'

interface PickerContentProps {
  type: PickerType
  initialValue?: Date | string | number
  minDate?: Date
  maxDate?: Date
  columns?: PickerColumnType[]
  onConfirm: (values: any[]) => void
  onCancel: () => void
  headerComponent?: React.ReactNode
  footerComponent?: React.ReactNode
  confirmText?: string
  cancelText?: string
  confirmButtonStyle?: object
  confirmTextStyle?: object
  cancelButtonStyle?: object
  cancelTextStyle?: object
  itemStyle?: object
  containerStyle?: object
  headerStyle?: object
}

const PickerContent: React.FC<PickerContentProps> = ({
  type,
  initialValue,
  minDate,
  maxDate,
  columns: customColumns,
  onConfirm,
  onCancel,
  headerComponent,
  footerComponent,
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  confirmButtonStyle,
  confirmTextStyle,
  cancelButtonStyle,
  cancelTextStyle,
  itemStyle,
  containerStyle,
  headerStyle,
}) => {
  // État pour stocker les colonnes et valeurs sélectionnées
  const [columns, setColumns] = useState<PickerColumnType[]>([])
  const [selectedIndices, setSelectedIndices] = useState<number[]>([])

  useEffect(() => {
    // Configurer les colonnes selon le type
    const setupColumns = () => {
      switch (type) {
        case 'date':
          return setupDateColumns()
        case 'time':
          return setupTimeColumns()
        case 'datetime':
          return [...setupDateColumns(), ...setupTimeColumns()]
        case 'birthday':
          return setupBirthdayColumns()
        case 'duration':
          return setupDurationColumns()
        case 'custom':
          return customColumns || []
        default:
          return []
      }
    }

    const cols = setupColumns()
    setColumns(cols)

    // Initialiser les indices sélectionnés
    initializeSelectedIndices(cols)
  }, [type, initialValue, minDate, maxDate, customColumns])

  // Configurations pour différents types de pickers
  const setupDateColumns = (): PickerColumnType[] => {
    const today = new Date()
    const min = minDate || new Date(today.getFullYear() - 10, 0, 1)
    const max = maxDate || new Date(today.getFullYear() + 10, 11, 31)

    // Générer les années
    const years: PickerItemType[] = []
    for (let y = min.getFullYear(); y <= max.getFullYear(); y++) {
      years.push({ label: `${y}`, value: y })
    }

    // Générer les mois
    const months: PickerItemType[] = []
    for (let m = 1; m <= 12; m++) {
      const monthName = new Date(2000, m - 1, 1).toLocaleString('default', {
        month: 'long',
      })
      months.push({ label: monthName, value: m })
    }

    // Générer les jours (31 par défaut, sera ajusté à la sélection)
    const days: PickerItemType[] = []
    for (let d = 1; d <= 31; d++) {
      days.push({ label: `${d}`, value: d })
    }

    return [{ items: years }, { items: months }, { items: days }]
  }

  const setupTimeColumns = (): PickerColumnType[] => {
    // Heures
    const hours: PickerItemType[] = []
    for (let h = 0; h < 24; h++) {
      hours.push({ label: h.toString().padStart(2, '0'), value: h })
    }

    // Minutes
    const minutes: PickerItemType[] = []
    for (let m = 0; m < 60; m++) {
      minutes.push({ label: m.toString().padStart(2, '0'), value: m })
    }

    return [{ items: hours }, { items: minutes }]
  }

  const setupBirthdayColumns = (): PickerColumnType[] => {
    const today = new Date()
    const min = minDate || new Date(today.getFullYear() - 100, 0, 1)
    const max = maxDate || new Date()

    return setupDateColumns().map((column, index) => {
      if (index === 0) {
        // Années
        return {
          ...column,
          items: column.items.filter(item => {
            const year = Number(item.value)
            return year >= min.getFullYear() && year <= max.getFullYear()
          }),
        }
      }
      return column
    })
  }

  const setupDurationColumns = (): PickerColumnType[] => {
    // Heures (0-10)
    const hours: PickerItemType[] = []
    for (let h = 0; h <= 10; h++) {
      const label = h === 1 ? '1 heure' : `${h} heures`
      hours.push({ label, value: h })
    }

    // Minutes (0, 15, 30, 45)
    const minutes: PickerItemType[] = []
    const minuteValues = [0, 15, 30, 45]

    minuteValues.forEach(m => {
      const label =
        m === 0
          ? '0 minute'
          : m === 15
            ? '15 minutes'
            : m === 30
              ? '30 minutes'
              : '45 minutes'
      minutes.push({ label, value: m })
    })

    return [{ items: hours }, { items: minutes }]
  }

  // PickerContent.tsx - Correction

  const initializeSelectedIndices = (cols: PickerColumnType[]) => {
    let defaultValue: Date

    if (initialValue) {
      defaultValue =
        initialValue instanceof Date ? initialValue : new Date(initialValue)
    } else {
      defaultValue = new Date()
    }

    let indices: number[] = []

    switch (type) {
      case 'date':
      case 'birthday':
        indices = [
          Math.max(
            0,
            cols[0].items.findIndex(
              item => item.value === defaultValue.getFullYear(),
            ),
          ),
          Math.max(
            0,
            cols[1].items.findIndex(
              item => item.value === defaultValue.getMonth() + 1,
            ),
          ),
          Math.max(
            0,
            cols[2].items.findIndex(
              item => item.value === defaultValue.getDate(),
            ),
          ),
        ]
        break

      case 'time':
        indices = [
          Math.max(
            0,
            cols[0].items.findIndex(
              item => item.value === defaultValue.getHours(),
            ),
          ),
          Math.max(
            0,
            cols[1].items.findIndex(
              item => item.value === defaultValue.getMinutes(),
            ),
          ),
        ]
        break

      case 'datetime':
        indices = [
          Math.max(
            0,
            cols[0].items.findIndex(
              item => item.value === defaultValue.getFullYear(),
            ),
          ),
          Math.max(
            0,
            cols[1].items.findIndex(
              item => item.value === defaultValue.getMonth() + 1,
            ),
          ),
          Math.max(
            0,
            cols[2].items.findIndex(
              item => item.value === defaultValue.getDate(),
            ),
          ),
          Math.max(
            0,
            cols[3].items.findIndex(
              item => item.value === defaultValue.getHours(),
            ),
          ),
          Math.max(
            0,
            cols[4].items.findIndex(
              item => item.value === defaultValue.getMinutes(),
            ),
          ),
        ]
        break

      case 'duration':
        if (
          initialValue &&
          typeof initialValue === 'object' &&
          'hours' in initialValue &&
          'minutes' in initialValue
        ) {
          // Si initialValue est un objet DurationValue
          const durationValue = initialValue as any
          const hourIndex = Math.max(
            0,
            cols[0].items.findIndex(item => item.value === durationValue.hours),
          )
          const minuteIndex = Math.max(
            0,
            cols[1].items.findIndex(
              item => item.value === durationValue.minutes,
            ),
          )
          indices = [hourIndex, minuteIndex]
        } else if (typeof initialValue === 'number') {
          // Si initialValue est un nombre de minutes total
          const hours = Math.floor(Number(initialValue) / 60)
          const minutes = Number(initialValue) % 60

          // Trouver l'indice le plus proche pour les minutes
          const minuteValues = cols[1].items.map(item => Number(item.value))
          let closestMinuteValue = minuteValues[0]
          let minDiff = Math.abs(minutes - minuteValues[0])

          for (let i = 1; i < minuteValues.length; i++) {
            const diff = Math.abs(minutes - minuteValues[i])
            if (diff < minDiff) {
              minDiff = diff
              closestMinuteValue = minuteValues[i]
            }
          }

          const hourIndex = Math.max(
            0,
            cols[0].items.findIndex(
              item =>
                item.value ===
                Math.min(
                  Number(cols[0].items[cols[0].items.length - 1].value),
                  hours,
                ),
            ),
          )
          const minuteIndex = Math.max(
            0,
            cols[1].items.findIndex(item => item.value === closestMinuteValue),
          )

          indices = [hourIndex, minuteIndex]
        } else {
          // Valeur par défaut : 0h 0m
          indices = [0, 0]
        }
        break

      case 'custom':
      default:
        // Pour un picker personnalisé, commencer avec tous les premiers éléments
        indices = cols.map(() => 0)
        break
    }

    setSelectedIndices(indices)
  }

  const handleValueChange = (
    columnIndex: number,
    value: string | number,
    itemIndex: number,
  ) => {
    const newIndices = [...selectedIndices]
    newIndices[columnIndex] = itemIndex
    setSelectedIndices(newIndices)

    // Mise à jour dynamique des jours selon le mois sélectionné pour les dates
    if (
      (type === 'date' || type === 'datetime' || type === 'birthday') &&
      (columnIndex === 0 || columnIndex === 1)
    ) {
      updateDaysInMonth(newIndices, columnIndex === 0 ? 0 : columnIndex)
    }
  }

  const updateDaysInMonth = (indices: number[], changedColumnIndex: number) => {
    const yearIndex = changedColumnIndex === 0 ? indices[0] : indices[0]
    const monthIndex = changedColumnIndex === 1 ? indices[1] : indices[1]

    const year = Number(columns[0].items[yearIndex]?.value)
    const month = Number(columns[1].items[monthIndex]?.value)

    const daysInMonth = new Date(year, month, 0).getDate()

    // Mettre à jour la colonne des jours
    const updatedColumns = [...columns]
    const newDays: PickerItemType[] = []

    for (let d = 1; d <= daysInMonth; d++) {
      newDays.push({ label: `${d}`, value: d })
    }

    updatedColumns[2] = { items: newDays }
    setColumns(updatedColumns)

    // Ajuster l'index du jour si nécessaire
    const newIndices = [...indices]
    if (newIndices[2] >= daysInMonth) {
      newIndices[2] = daysInMonth - 1 // Sélectionner le dernier jour du mois
      setSelectedIndices(newIndices)
    }
  }

  const handleConfirm = () => {
    const selectedValues = columns.map(
      (column, index) => column.items[selectedIndices[index] || 0]?.value,
    )

    // Convertir en objet/date selon le type
    let result: any

    switch (type) {
      case 'date':
      case 'birthday': {
        const [year, month, day] = selectedValues
        result = new Date(Number(year), Number(month) - 1, Number(day))
        break
      }
      case 'time': {
        const [hours, minutes] = selectedValues
        const date = new Date()
        date.setHours(Number(hours), Number(minutes), 0, 0)
        result = date
        break
      }
      case 'datetime': {
        const [year, month, day, hours, minutes] = selectedValues
        result = new Date(
          Number(year),
          Number(month) - 1,
          Number(day),
          Number(hours),
          Number(minutes),
        )
        break
      }
      case 'duration': {
        const [hours, minutes] = selectedValues
        const totalMinutes = Number(hours) * 60 + Number(minutes)

        result = {
          hours: Number(hours),
          minutes: Number(minutes),
          totalMinutes,
        }
        break
      }
      case 'custom':
      default:
        result = selectedValues
        break
    }

    onConfirm(result)
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Header */}
      {headerComponent ? (
        headerComponent
      ) : (
        <View style={[styles.header, headerStyle]}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton, cancelButtonStyle]}
            onPress={onCancel}
          >
            <Text style={[styles.cancelText, cancelTextStyle]}>
              {cancelText}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.confirmButton, confirmButtonStyle]}
            onPress={handleConfirm}
          >
            <Text style={[styles.confirmText, confirmTextStyle]}>
              {confirmText}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Columns */}
      <View style={styles.columnsContainer}>
        {columns.map((column, index) => (
          <PickerColumn
            key={`column-${index}`}
            items={column.items}
            selectedIndex={selectedIndices[index] || 0}
            onValueChange={(value, itemIndex) =>
              handleValueChange(index, value, itemIndex)
            }
            itemStyle={itemStyle}
            keyExtractor={column.keyExtractor}
          />
        ))}
      </View>

      {/* Footer */}
      {footerComponent && <View style={styles.footer}>{footerComponent}</View>}
    </View>
  )
}

export default PickerContent
