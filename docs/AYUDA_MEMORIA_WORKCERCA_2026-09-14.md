# Ayuda memoria de WorkCerca — 14 de septiembre de 2026

## Objetivo de este documento

Retomar el trabajo técnico sin repetir pasos ya realizados. Antes de modificar algo, comprobar primero el estado actual del repositorio y del despliegue.

## Proyecto técnico confirmado

- Repositorio: `60873/oficiocerca`
- Rama de trabajo: `workcerca-preview-empresa`
- Proyecto de Vercel: `oficiocerca-web`
- Archivo principal auditado: `app/empresa/page.tsx`
- Archivo de postulantes auditado: `app/empresa/postulantes/page.tsx`
- Fecha objetivo de lanzamiento de WorkCerca: **11/11/2026**

## Regla de trabajo acordada

WorkCerca no se reconstruye ni se inventa de nuevo: lo principal ya está programado.

El recorrido de auditoría es:

1. Ordenar.
2. Conectar.
3. Probar.
4. Verificar con evidencia.
5. Poner en verde solamente lo que complete el recorrido real.

No dar por terminado un punto solo porque el despliegue diga `Ready`. También debe probarse el comportamiento visible y el recorrido completo.

## Trabajo que ya quedó hecho

### Supabase y panel Empresa

Se corrigió el tratamiento del cliente Supabase posiblemente nulo en:

- `app/empresa/page.tsx`
- `app/empresa/postulantes/page.tsx`

El build remoto anterior terminó correctamente y mostró las 28 rutas.

### Diagnóstico del flash al entrar a Empresa

Prueba realizada por Adriana:

1. Se veía brevemente la pantalla de inicio.
2. Aparecía contenido sin estilo.
3. Se mostraba por un instante el panel completo de Empresa.
4. Finalmente aparecía “Ingresá para administrar tu Empresa”.

Causa confirmada:

- `loading` comenzaba en `true`.
- El render condicional caía temporalmente en la rama que mostraba el panel completo antes de terminar la comprobación de sesión.

### Arreglo definitivo guardado

Se agregó un retorno neutral mientras `loading` sea verdadero, antes del render principal:

```tsx
if (loading) {
  return (
    <main
      style={{ minHeight: "100vh", background: "#f6f8fb" }}
      aria-busy="true"
      aria-label="Comprobando acceso a Empresa"
    />
  );
}
```

Estado confirmado en GitHub:

- Commit: `60b009d62dfc3eecf3bc2d5c7ca4e3ce182fcb55`
- Commit corto: `60b009d`
- Mensaje: **Eliminar flash al ingresar a Empresa**
- Blob verificado: `99838b9ab145989b62ac9831ae3ff1f957153947`
- Se comprobó leyendo nuevamente el archivo que el bloque está realmente guardado.
- No fue un commit vacío.

## Conexión de GitHub resuelta

La aplicación **ChatGPT Codex Connector** quedó instalada y autorizada en la cuenta GitHub `60873`.

Configuración:

- Acceso limitado únicamente al repositorio `60873/oficiocerca`.
- Permisos de lectura y escritura para código.
- ChatGPT puede leer y modificar el repositorio sin que Adriana copie y pegue manualmente.
- Instalación confirmada por GitHub.
- Identificador observado de la instalación: `161671585`.

Importante:

- “Permitir todas las acciones” dentro de ChatGPT no era suficiente por sí solo.
- Faltaba instalar y autorizar el conector en GitHub y seleccionar el repositorio.
- Ese paso ya está resuelto y no debe repetirse.
- No compartir contraseñas, códigos de verificación ni tokens en el chat.

## Intentos anteriores que no deben confundirse con el arreglo final

- El commit anterior `8e83c06`, “Eliminar flash al ingresar a Empresa”, no había modificado realmente el archivo.
- La corrección válida y comprobada es la del commit `60b009d`.
- Si queda alguna pestaña vieja de edición manual de GitHub, no guardar ni volver a confirmar ese cambio. Descartarla para evitar duplicar el bloque.

## Próximo paso exacto

1. Esperar el despliegue automático de Vercel correspondiente al commit `60b009d`.
2. Confirmar que figure `Ready`.
3. Abrir la URL única de ese despliegue Preview, no una URL antigua.
4. Probar el ingreso a `/empresa` y grabar o mirar la transición.
5. Verificar que ya no aparezca:
   - el inicio fugaz;
   - contenido sin estilo;
   - el panel Empresa completo antes de la comprobación de sesión.
6. Si no hay sesión, debe mostrarse directamente el estado correcto: “Ingresá para administrar tu Empresa”.
7. Solo después de esa evidencia, marcar el punto “flash de Empresa” en verde.
8. Luego continuar con la prueba completa de `/empresa/postulantes`.

## Estado de Vercel

Al momento de escribir este documento:

- GitHub ya está conectado y habilitado para escritura.
- El commit nuevo debería disparar un Preview automático en Vercel.
- La conexión directa de Vercel con ChatGPT todavía debe comprobarse o configurarse por separado.
- No asumir que Vercel está conectado solo porque GitHub ya lo está.

## Prioridades funcionales posteriores

Una vez cerrada la prueba de Empresa/Postulantes:

1. Compra simple y Vidriera 24/7.
2. Recorrido: necesidad → Flor → opciones → precio/disponibilidad real → elección → pago habilitado → retiro o entrega.
3. Sin laberintos, pantallas innecesarias ni obligación de saber usar tecnología.
4. Flor debe acompañar transversalmente, preguntar solo lo necesario, no infantilizar y no inventar información.
5. Luego continuar la auditoría de los módulos existentes, convirtiendo de amarillo a verde únicamente con pruebas.

## Principios que deben conservarse

- WorkCerca es para todas las personas y no presenta la tecnología como condición para “no quedar obsoleto”.
- La accesibilidad se integra al recorrido general; no se utiliza la discapacidad como recurso publicitario.
- Todo dato se corrobora con fuentes, documentos o evidencia. Flor no inventa.
- La búsqueda cotidiana de profesionales debe poder comenzar sin registro.
- La experiencia debe ser sencilla para cualquier edad y nivel de experiencia digital.
- No crear módulos duplicados ni convertir cada idea en una pantalla nueva.


## Semáforo recuperado de la auditoría

### Verdes confirmados

- Inicio: funcionando.
- Búsqueda: funcionando.
- Perfiles demo: funcionando.
- Contacto: funcionando.
- Registro: funcionando.
- Oportunidades: funcionando.
- Profesionales: 10/10 en la auditoría.

### Amarillos: completar o volver a probar

- **Emprendedores:** funcional; quedaban detalles del menú lateral pequeño e INP aproximado de 224 ms.
- **Mi WorkCerca / Mi CV:** volver a probar la versión alineada y comprobar que no haya flash ni transición extraña.
- **Hablar con IA:** el acceso existía, pero todavía era un aviso; falta conversación real.
- **Accesos y roles:** cerrar la matriz completa de lo que puede ver y hacer Persona, Profesional, Empresa, Institución, Municipio y los demás actores.
- **Empresa / RRHH:** prioridad. Terminar las conexiones Empresa ↔ vacante ↔ postulantes/CV ↔ Persona y realizar una prueba real en Preview.
- **Vidriera 24/7:** probar necesidad → producto/comercio → consulta → disponibilidad y precio → compra → retiro o entrega.
- **Buscar/Subir con foto:** localizar primero lo existente, probarlo y corregir solamente si la evidencia lo exige.

### Rojos de revisión

Los puntos rojos no estaban confirmados como rotos. Significaban que la inspección había quedado pendiente. Deben revisarse antes de modificar código.

## Orden operativo del 14/09

1. **Empresa/RRHH:** cerrar la prueba de Empresa y Postulantes en Preview.
2. Usar como caso de análisis la búsqueda real de mantenimiento de espacios verdes de Reconquista/Avellaneda, sin inventar necesidades ni generalizar desde un solo aviso.
3. Comprobar el circuito: empresa expresa necesidad → publica → Flor acompaña → motor localiza perfiles compatibles → persona encuentra la oportunidad → se postula → empresa utiliza las funciones de RRHH habilitadas.
4. **Vidriera 24/7 y compra simple:** mantener separados los recorridos de comercio, profesionales y emergencias, aunque “¿Qué necesitás hoy?” sea transversal.
5. Localizar y probar **Buscar con foto** antes de cambiarlo.
6. Incorporar ordenadamente:
   - Calendario Territorial de Grandes Eventos/Turismo conectado con Vidriera y territorio.
   - Historias con miradas propias, narradas por protagonistas sin moraleja ni épica artificial.
   - Autonomía Cotidiana / Modo Acompañado como experiencia transversal, no como módulo segregado.
7. Revisar el cerebro interno:
   - Flor acompaña.
   - Observatorio analiza información agregada.
   - Supervisor comprueba que las conclusiones estén justificadas.
   - Dato, fuente, fecha y estado deben permanecer diferenciados.
8. Mantener el **Plan de Contingencia** como línea paralela al código funcional: energía, conectividad, modo degradado, colas, reintentos, mensajes claros, automatización e intervención humana.

## Punto exacto de reanudación

**Empresa/RRHH → Preview → Postulantes.**

El arreglo del flash fue programado, guardado y desplegado. Falta observar el Preview y reunir evidencia visual. Solo entonces se convierte ese amarillo en verde.


## Evidencia posterior al despliegue

### Empresa — flash de ingreso: VERDE

- Fecha de prueba visual: 14/09/2026.
- Preview de Vercel: despliegue asociado al commit de documentación `748f4b2`, que incluye el arreglo `60b009d`.
- Resultado informado por Adriana: **el flash desapareció**.
- Conclusión: el estado de carga neutral evita mostrar temporalmente el panel Empresa antes de completar la comprobación de sesión.
- Estado: **VERDE, verificado con evidencia visual**.
- Próxima prueba: **Empresa → Postulantes**.


## Relevamiento técnico ampliado de módulos

Se inspeccionó el árbol completo de la rama `workcerca-preview-empresa`.

- Total de pantallas `page.tsx` localizadas: **27**.
- Todas las rutas principales auditadas existen salvo `/emergencias`.
- Solo existe un `layout` general en `app/layout.tsx`; los módulos dibujan sus laterales dentro de cada página. Esto explica que un panel pueda cambiar al entrar en una pantalla interna.
- No se concluye que una función esté rota solo porque cambie el lateral.

### Empresa

- `/empresa`: verde; carga sin flash, verificada visualmente.
- `/empresa/postulantes`: se corrigió para conservar el panel completo de Empresa, con Postulantes activo y navegación interna. Commit `3e97f9b`; falta confirmación visual final.
- Requieren alineación de panel/navegación:
  - `/empresa/publicar-empleo`
  - `/empresa/candidatos`
  - `/empresa/candidatos/[id]`
  - `/empresa/entrevistas`
  - `/empresa/productos-servicios`
  - `/empresa/promociones`
  - `/empresa/proveedores`
  - `/empresa/publicidad`
  - `/empresa/estadisticas`
  - `/empresa/configuracion`
- Estas rutas existen; el amarillo corresponde a continuidad visual y recargas completas, no a ausencia de pantalla.

### Otros módulos

- Profesional, Emprendedores, Instituciones, Municipios, Feria de Carreras, Capacitaciones y Oportunidades tienen panel/pantalla propia.
- Profesional conserva el verde anterior 10/10 hasta que una nueva prueba aporte evidencia contraria.
- Emprendedores continúa amarillo por el menú lateral pequeño y el INP aproximado de 224 ms.
- Mi WorkCerca / Mi CV continúa amarillo: necesita prueba de alineación y transición.
- Agenda, Mensajes, Videollamadas y Solicitudes son pantallas transversales que deben revisarse para que el usuario no pierda el contexto del módulo de origen.
- Hablar con IA continúa amarillo: existe el acceso, pero falta conversación real.
- Accesos y roles continúa amarillo hasta cerrar la matriz completa.
- Vidriera 24/7 y Buscar/Subir con foto continúan amarillos hasta probar sus recorridos completos.

### Pendiente real localizado

- `/emergencias`: hay un acceso que apunta a esa dirección, pero la ruta no está construida en la rama actual.
- Estado: **rojo de revisión**, no corregir por suposición. Definir su recorrido antes de implementarlo.

### Orden recomendado después de Postulantes

1. Confirmar visualmente Postulantes.
2. Alinear, una por una, las restantes pantallas internas de Empresa.
3. Revisar pantallas transversales y retorno al módulo de origen.
4. Probar Mi WorkCerca / Mi CV.
5. Revisar Emprendedores e INP.
6. Continuar con accesos y roles, Vidriera 24/7, Buscar con foto y Hablar con IA.
7. Tratar `/emergencias` solamente cuando su recorrido esté definido.


## Descubrimiento visual: Flor ya tiene entrada

Durante el recorrido del 14/09 se identificó en pantalla el acceso **“La IA te acompaña / Decime qué necesitás”**. Esa presencia ya corresponde a la puerta de entrada de Flor.

Estado correcto: **amarillo**. Flor no está ausente, pero falta localizar la implementación existente, probar si permite conversación real y verificar sus conexiones con GPS, búsquedas, productos, servicios, Empresa y los demás módulos. No crear otra Flor ni duplicar el acceso.


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
