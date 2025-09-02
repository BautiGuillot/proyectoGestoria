export async function POST({ request }: { request: Request }) {
  try {
    const data = await request.json();
    
    // Your Google Apps Script URL - usar variable de entorno normal
    const scriptUrl = import.meta.env.URL_SUBMIT_FORM || 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
    
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const result = await response.json();
      console.log("🚀 ~ POST ~ result:", result)
      if (result.error) {
        return new Response(JSON.stringify({ error: result.error }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
      return new Response(JSON.stringify({ success: true, message: 'Formulario enviado correctamente' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    return new Response(JSON.stringify({ error: 'Error al enviar el formulario' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error: any) {
    console.error('Error en submit-form:', error);
    return new Response(JSON.stringify({ error: error?.message || 'Error interno del servidor' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}