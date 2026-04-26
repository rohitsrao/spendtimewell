"use client"

import { useEffect, useId, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

// Basic shape check: non-empty local + @ + domain with a dot (no full RFC, fast UX feedback).
function isValidEmail(value: string): boolean {
  const trimmed = value.trim()
  if (!trimmed) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
}

const VALIDATION_DEBOUNCE_MS = 500

export function EmailContinueForm() {
  const [email, setEmail] = useState("")
  // After user pauses typing, this catches up; until then, avoid showing the error.
  const [debouncedEmail, setDebouncedEmail] = useState("")
  const id = useId()
  const inputId = `${id}-email`

  useEffect(() => {
    const t = setTimeout(() => setDebouncedEmail(email), VALIDATION_DEBOUNCE_MS)
    return () => clearTimeout(t)
  }, [email])

  // Only show validation once input has "settled" (matches last debounced value), not on every keystroke.
  const settled = email === debouncedEmail
  const valid = settled && isValidEmail(debouncedEmail)
  const showError = settled && debouncedEmail.length > 0 && !isValidEmail(debouncedEmail)

  return (
    <FieldSet className="w-full max-w-sm gap-4">
      <FieldLegend className="text-base">Enter email address to continue</FieldLegend>
      <FieldGroup>
        <Field data-invalid={showError || undefined}>
          <FieldContent>
            <Input
              id={inputId}
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              value={email}
              aria-invalid={showError}
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            {showError ? (
              <FieldError>Enter a valid email address.</FieldError>
            ) : null}
          </FieldContent>
        </Field>
        {valid ? (
          <Button type="button">Email me a login link</Button>
        ) : null}
      </FieldGroup>
    </FieldSet>
  )
}
