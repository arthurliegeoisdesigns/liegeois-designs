'use server'

export type ContactFormState =
  | { status: 'idle' }
  | { status: 'success'; name: string }
  | { status: 'error'; message: string }

export async function sendContactForm(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = (formData.get('name') as string)?.trim()
  const company = (formData.get('company') as string)?.trim()
  const email = (formData.get('email') as string)?.trim()
  const projectType = formData.get('projectType') as string
  const timeline = formData.get('timeline') as string
  const budget = formData.get('budget') as string
  const message = (formData.get('message') as string)?.trim()

  // Basic server-side validation
  if (!name || !email || !message) {
    return { status: 'error', message: 'Please fill in all required fields.' }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: 'error', message: 'Please enter a valid email address.' }
  }

  const formId = process.env.FORMSPREE_FORM_ID

  // If no Formspree ID is configured, log and return success (dev mode)
  if (!formId) {
    console.log('[Contact form] No FORMSPREE_FORM_ID set — submission logged only:', {
      name, company, email, projectType, timeline, budget, message,
    })
    return { status: 'success', name }
  }

  try {
    const payload = new FormData()
    payload.append('name', name)
    payload.append('company', company || '')
    payload.append('email', email)
    payload.append('project_type', projectType || '')
    payload.append('timeline', timeline || '')
    payload.append('budget', budget || '')
    payload.append('message', message)
    payload.append('_replyto', email)
    payload.append('_subject', `New enquiry from ${name}${company ? ` (${company})` : ''}`)

    const res = await fetch(`https://formspree.io/f/${formId}`, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: payload,
    })

    if (res.ok) return { status: 'success', name }

    const data = await res.json().catch(() => ({}))
    const msg = data?.errors?.[0]?.message ?? 'Something went wrong. Please try again.'
    return { status: 'error', message: msg }
  } catch {
    return { status: 'error', message: 'Network error. Please try again or email me directly.' }
  }
}
