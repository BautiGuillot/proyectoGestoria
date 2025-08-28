import { URL_SUBMIT_FORM } from "astro:env/server";

export async function POST({ request }: { request: Request }) {
  try {
    const data = await request.json();
    
    // Your Google Apps Script URL
    const scriptUrl = URL_SUBMIT_FORM;
    
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
      return new Response(result, {
        status: response.status,
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
    return new Response(JSON.stringify({ error: error?.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}