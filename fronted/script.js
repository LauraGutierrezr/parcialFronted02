//  registro de los pagos del usuario
document.getElementById('paymentForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // voy a obtener datos del formulario usuario
    const usuarioId = document.getElementById('usuarioId').value;
    const productos = [];

    const productElements = document.querySelectorAll('.product');
    productElements.forEach((productElement) => {
        const nombre = productElement.querySelector('.productoNombre').value;
        const valorUnitario = parseFloat(productElement.querySelector('.productoValorUnitario').value);
        const cantidad = parseInt(productElement.querySelector('.productoCantidad').value);
        productos.push({ nombre, valorUnitario, cantidad });
    });

    try {
        // enviar la solicitud de post al backend(cuando esté conectado)
        const response = await fetch('https://mi-api.azurewebsites.net/pago', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuarioId, productos }),
        });
        const data = await response.json();

        alert('Pago realizado con éxito: ' + data.mensajeRespuesta);
    } catch (error) {
        console.error('Error al registrar el pago:', error);
        alert('Hubo un error al realizar el pago');
    }
});

// podré gregar más productos al formulario
function addProduct() {
    const productHTML = `
        <div class="product">
            <label for="productoNombre">Nombre del Producto:</label>
            <input type="text" class="productoNombre" required><br>

            <label for="productoValorUnitario">Valor Unitario:</label>
            <input type="number" class="productoValorUnitario" required><br>

            <label for="productoCantidad">Cantidad:</label>
            <input type="number" class="productoCantidad" required><br><br>
        </div>
    `;
    document.getElementById('products').insertAdjacentHTML('beforeend', productHTML);
}
