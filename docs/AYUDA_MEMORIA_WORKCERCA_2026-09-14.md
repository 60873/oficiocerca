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
