function getField(container, name) {
  return container.querySelector('#' + name);
}

function setError(container, fieldName, message) {
  const errorEl = container.querySelector('[data-error-for="' + fieldName + '"]');
  if (!errorEl) return;
  if (message) {
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
  } else {
    errorEl.textContent = '';
    errorEl.classList.add('hidden');
  }
}

function validateName(value) {
  const trimmed = (value || '').trim();
  if (trimmed.length < 3) return 'Ingrese su nombre completo (mín. 3 caracteres)';
  if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s'.-]+$/.test(trimmed)) return 'El nombre contiene caracteres inválidos';
  return '';
}

function normalizePhone(raw) {
  return (raw || '').replace(/[^\d+]/g, '');
}

function validatePhone(value) {
  const v = normalizePhone(value);
  // Acepta formatos con +54, 549, 11, etc., mínimo 8-10 dígitos locales
  const digits = v.replace(/\D/g, '');
  if (digits.length < 8) return 'Ingrese un teléfono válido';
  return '';
}

function validateMessage(value) {
  const trimmed = (value || '').trim();
  if (trimmed.length < 10) return 'Describa su consulta con al menos 10 caracteres';
  return '';
}

function validateDni(value) {
  const v = (value || '').replace(/\D/g, '');
  if (!v) return '';
  if (v.length < 7 || v.length > 9) return 'DNI inválido';
  return '';
}

function validateLicense(value) {
  const v = (value || '').toUpperCase().trim();
  if (!v) return '';
  // Patentes AR viejas ABC123 o nuevas AA123AA
  const oldFmt = /^[A-Z]{3}\d{3}$/;
  const newFmt = /^[A-Z]{2}\d{3}[A-Z]{2}$/;
  if (!oldFmt.test(v) && !newFmt.test(v)) return 'Patente inválida (ej: ABC123 o AA123AA)';
  return '';
}

function validateForm(container) {
  const name = getField(container, 'name')?.value;
  const phone = getField(container, 'phone')?.value;
  const message = getField(container, 'message')?.value;
  const dni = getField(container, 'dni')?.value;
  const license = getField(container, 'license')?.value;

  const errors = {
    name: validateName(name),
    phone: validatePhone(phone),
    message: validateMessage(message),
    dni: validateDni(dni),
    license: validateLicense(license),
  };

  // pintar errores
  Object.entries(errors).forEach(([field, msg]) => setError(container, field, msg));

  // focus en el primero
  const firstError = Object.entries(errors).find(([, msg]) => !!msg);
  if (firstError) {
    const [field] = firstError;
    const el = getField(container, field);
    if (el && typeof el.focus === 'function') el.focus();
  }

  const hasErrors = Object.values(errors).some((m) => !!m);
  return { valid: !hasErrors, normalized: { name, phone: normalizePhone(phone), message, dni, license } };
}

export function handleSubmitForm(url) {
  const form = document.getElementById('contactFormV2');
  if (!form) return;

  // Validación en blur/input para UX
  form.addEventListener('blur', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) return;
    const fieldName = target.name;
    if (!fieldName) return;
    const singleContainer = form;
    switch (fieldName) {
      case 'name': setError(singleContainer, 'name', validateName(target.value)); break;
      case 'phone': setError(singleContainer, 'phone', validatePhone(target.value)); break;
      case 'message': setError(singleContainer, 'message', validateMessage(target.value)); break;
      case 'dni': setError(singleContainer, 'dni', validateDni(target.value)); break;
      case 'license': setError(singleContainer, 'license', validateLicense(target.value)); break;
    }
  }, true);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!e.target) return;

    if (!url) {
      alert('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo más tarde. 0001');
      return;
    }

    const { valid, normalized } = validateForm(form);
    if (!valid) return;

    // @ts-expect-error
    const submitBtn = e.target.querySelector('button[type="submit"]');

    try {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Enviando...';

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(normalized)
      });

      if (response.ok) {
        const result = await response.json();
        if (!result.error) {
          alert('¡Consulta enviada con éxito! Nos pondremos en contacto contigo pronto.');
          // @ts-expect-error
          e.target.reset();
          // limpiar errores
          ['name','phone','message','dni','license'].forEach((f) => setError(form, f, ''));
          return;
        }
      }
      alert('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo más tarde.');
    } catch (error) {
      console.log('Error:', error);
      alert('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo más tarde.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4 20-7z"/><path d="M22 2 11 13"/></svg>Enviar Consulta Gratuita';
    }
  });
}