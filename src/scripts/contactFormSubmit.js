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
      submitBtn.textContent = 'Enviando...';
      
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error('Error en la respuesta del servidor');
      
      const result = await response.json();
      alert('¡Consulta enviada con éxito! Nos pondremos en contacto contigo pronto.');
    // @ts-expect-error
      e.target.reset();
      
    } catch (error) {
      console.log('Error:', error);
      alert('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo más tarde.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar consulta';
    }
  });  
}