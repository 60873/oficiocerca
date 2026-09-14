# RESGUARDO INDEPENDIENTE — WORKCERCA — 14/09/2026

Este documento es una segunda copia de seguridad del trabajo y las decisiones del 14 de septiembre de 2026. La ayuda memoria principal continúa en `docs/AYUDA_MEMORIA_WORKCERCA_2026-09-14.md`.



---

# Cierre y resguardo adicional — 14/09/2026

## Resultado técnico del bloque Empresa/RRHH

Se revisaron los videos enviados por Adriana y se confirmó que el problema no era solamente un “flash” inicial. También existía una pérdida de continuidad visual: al recorrer Publicar empleo, Postulantes, Buscar candidatos y Entrevistas, cada página dibujaba una versión distinta del panel lateral; al volver a Mi Empresa volvía a cambiar.

### Cambios aplicados

- Se creó el componente compartido `app/empresa/EmpresaSidebar.tsx`.
- Se aplicó el mismo panel de Empresa a:
  - `/empresa`
  - `/empresa/publicar-empleo`
  - `/empresa/postulantes`
  - `/empresa/candidatos`
  - `/empresa/entrevistas`
- El panel incluye:
  - Inicio WorkCerca.
  - Mi Empresa.
  - Publicar empleo.
  - Postulantes.
  - Buscar candidatos.
  - Entrevistas.
  - Mensajes, Agenda y Videollamadas con origen Empresa.
  - Productos/Servicios, Promociones, Proveedores y Publicidad.
  - Estadísticas y Configuración.
  - Cambio explícito a Mi WorkCerca.
- Se mantuvo la separación de contextos: Empresa no se mezcla con Mi WorkCerca.
- El pedido de iniciar sesión en Mi Empresa se conserva porque protege información real; no debe eliminarse para simular una sesión.
- Se eliminó la pantalla completamente vacía durante la consulta inicial a Supabase. El panel debe permanecer visible y la actualización se informa dentro de la interfaz.
- Se encontró una segunda causa del flash: `.routeTransition`, una capa clara con desenfoque que cubría toda la pantalla al navegar. Se eliminó junto con el estado `navigating`.

### Commits del bloque

- `cfa8b02`: creación del panel compartido de Empresa.
- `6541e2e`: panel en Publicar empleo.
- `d7662df`: panel en Postulantes.
- `bec1c2e`: panel en Buscar candidatos.
- `e1fed40`: panel en Entrevistas.
- `66f3fc3`: conservar la estructura visible mientras cargan datos de Empresa.
- `c6faffe`: agregar Inicio WorkCerca al panel estable.
- `df6eee4`: aplicar el mismo panel a Mi Empresa.
- `dcb9223`: eliminar la capa de transición que causaba el flash restante.

### Estado al pausar

La corrección final `dcb9223` quedó guardada en GitHub y Vercel estaba procesando el despliegue cuando se decidió descansar. Al retomar, primero hay que verificar el estado del despliegue y después realizar una sola prueba filmada:

**Publicar empleo → Mi Empresa → Postulantes → Buscar candidatos → Entrevistas → Mi Empresa.**

Criterio para pasar a verde:

1. El panel lateral no cambia de estructura, ancho ni orden.
2. Solo cambia la función marcada como activa.
3. No aparece pantalla blanca, capa clara ni salto al inicio general.
4. “Inicio WorkCerca” es una salida explícita; no se usa como retorno accidental.
5. “Cambiar a Mi WorkCerca” cambia de contexto de manera deliberada.
6. El aviso de ingreso puede aparecer en el contenido central, pero no debe reemplazar el panel de Empresa.

## Decisiones de producto incorporadas hoy

### Paneles simples y estables

- Cada actor conserva su propio panel durante todo su recorrido.
- Empresa y Persona/Mi WorkCerca son espacios distintos.
- Las funciones transversales deben recordar el origen y regresar al punto exacto.
- No obligar a salir al inicio general para continuar trabajando.
- Faltaba comprobar claramente Mi CV dentro del recorrido de Persona/Mi WorkCerca.

### Flor

- La entrada visual “La IA te acompaña / Decime qué necesitás” ya existe y corresponde a Flor.
- No crear una segunda Flor.
- Estado amarillo: falta conversación real, herramientas, permisos, GPS y conexiones con módulos.
- Flor debe preguntar lo necesario con precisión, sin encasillar por edad, profesión, rol o capacidad.
- Debe distinguir variantes reales: marca, modelo, color específico, talle, número, peso, presentación, cantidad, preparación y unidad.
- Ejemplos: blanco hueso/perla/huevo; mango brasilero; banana peruana; neumático o batería de moto; tres cajas de leche; carne por kilo, picada o feteada.
- Flor nunca debe afirmar stock, precio, frescura o disponibilidad sin consultar un dato vigente.

### Vidriera 24/7

- WorkCerca debe ofrecer la herramienta completa; no limitarse a sugerir que el comercio “podría hacerlo”.
- Carga sencilla de productos para comercios, empresas, emprendedores y otros actores.
- Ficha de producto completa y reutilizable:
  - producto y categoría;
  - marca, modelo y variante;
  - color;
  - talle o número;
  - peso, unidad y cantidad;
  - presentación y preparación;
  - precio y medios de pago habilitados;
  - stock declarado;
  - fecha/hora y fuente de la última confirmación;
  - retiro, entrega o envío;
  - horario de respuesta;
  - observaciones.
- Si el local está cerrado, la vidriera puede seguir recibiendo consultas o compras según lo que el comercio habilite.
- Caso Dotería/Córdoba: antecedente útil de venta automatizada 24 horas. WorkCerca no debe copiar el negocio; debe poder representar correctamente cortes, peso, preparación, stock declarado, pago y entrega/retiro.
- Ejemplo correcto: si una persona pide tres kilos de pulpa, Flor pregunta la preparación necesaria y devuelve solamente el stock que la ficha vigente permite confirmar.
- Frase guía: “Tu local cierra. Tu vidriera no tiene por qué cerrar”.

### Líneas transversales confirmadas

- Calendario Territorial de Grandes Eventos/Turismo, conectado con economía local, Vidriera, alojamientos, gastronomía, comercios, proveedores y Observatorio.
- Ejemplo territorial: Fiesta Nacional del Surubí y su movimiento previo, durante y posterior.
- Historias con miradas propias, narradas por protagonistas, sin héroes, moraleja, pianitos ni épica fabricada.
- Autonomía Cotidiana / Modo Acompañado integrado a las mismas funciones, con pasos simples, lenguaje claro, voz e imágenes cuando ayuden; no crear un espacio segregado.
- Foros accesibles desde el panel de cada actor y participación voluntaria.
- Observatorio: datos agregados, fuente, fecha y estado diferenciados.
- Supervisor: comprueba que las conclusiones estén justificadas.
- Una observación inicia una pregunta; no se convierte automáticamente en verdad territorial.
- Plan de Contingencia continúa como línea paralela al código funcional.

## Dominio y propiedad

- El 14/09 se comprobó en NIC Argentina que `workcerca.ar` aparecía disponible.
- Disponible no significa reservado: otra persona podría registrarlo mientras no se complete el trámite y el pago.
- El registro quedó pendiente porque NIC Argentina requiere ingreso con CUIL/CUIT y Clave Fiscal.
- Adriana indicó que gestionará la Clave Fiscal.
- No confundir:
  - dominio de Internet: NIC Argentina;
  - marca WorkCerca: INPI;
  - documentación/obra y evidencia de autoría: resguardo separado según corresponda.
- No publicar números de CUIL, claves fiscales ni contraseñas en documentos o conversaciones.

## Orden exacto para retomar

1. Confirmar que Vercel terminó el commit `dcb9223`.
2. Obtener el enlace directo real del despliegue; no construirlo por suposición.
3. Probar el recorrido completo de Empresa con video.
4. Si el panel y el flash quedan resueltos, pasar este punto a verde.
5. Continuar alineando las demás páginas de Empresa: detalle de candidato, Productos/Servicios, Promociones, Proveedores, Publicidad, Estadísticas y Configuración.
6. Revisar retornos de Mensajes, Agenda y Videollamadas al contexto Empresa.
7. Probar Persona/Mi WorkCerca, presencia de Mi CV y entrada existente de Flor.
8. Después continuar con Vidriera 24/7, carga de productos y ficha de disponibilidad.


## Regla permanente de trabajo

**Ordenar → localizar → probar → obtener evidencia → corregir solamente lo necesario → pasar a verde.**

Los rojos son puntos de revisión, no una afirmación de que algo esté roto.
