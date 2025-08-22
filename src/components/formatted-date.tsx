"use client"

type FormattedDateProps = {
  date: string | Date
  locale?: string
  className?: string
}

export function FormattedDate({ date, locale = "en", className }: FormattedDateProps) {
  const dateObj = typeof date === "string" ? new Date(date) : date

  return (
    <time dateTime={dateObj.toISOString()} className={className}>
      {dateObj.toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </time>
  )
}
