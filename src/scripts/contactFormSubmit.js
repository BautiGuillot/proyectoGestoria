export function handleSubmitForm() {
  document.getElementById('contactFormV2')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!e.target) return;
    
    // @ts-expect-error
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    // @ts-expect-error
    const submitBtn = e.target.querySelector('button[type="submit"]');

    try {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Enviando...';
      
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (response.status === 200) {
        alert('¡Consulta enviada con éxito! Nos pondremos en contacto contigo pronto.');
        // @ts-expect-error
        e.target.reset();
      } else {
        alert('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo más tarde.');
      }
      
    } catch (error) {
      console.log('Error:', error);
      alert('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo más tarde.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4 20-7z"/><path d="M22 2 11 13"/></svg>Enviar Consulta Gratuita';
    }
  });  
}