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
