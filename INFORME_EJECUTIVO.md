# INFORME EJECUTIVO — AYNI

**Proyecto:** AYNI — Plataforma de Infraestructura para Reciclaje Inteligente
**Evento:** Hackathon QuipuSoft 2026
**Versión:** 1.0 — Julio 2026

---

## 1. ¿Qué es AYNI?

AYNI no es una aplicación móvil. AYNI es una **plataforma de infraestructura** que conecta el hogar del ciudadano con la municipalidad a través de tres agentes de inteligencia artificial.

El nombre AYNI proviene del quechua y significa "reciprocidad" — la idea de que hoy ayudas y mañana recibes. Eso es exactamente lo que hace el sistema: el ciudadano recicla y recibe descuentos en sus arbitrios municipales.

La plataforma tiene dos componentes visibles:

- **Interfaz del Ciudadano** — Un bot de WhatsApp/Telegram donde el usuario envía fotos de sus residuos y recibe validación, más un portal web minimalista donde ve sus puntos y beneficios.
- **Consola del Administrador** — Un dashboard web profesional donde la municipalidad monitorea el reciclaje del distrito, gestiona contribuyentes, y cumple con la Ley REP.

Y tres componentes invisibles que son el cerebro del sistema:

- **Agente Clasificador** — Algoritmo que identifica el tipo de residuo desde una foto.
- **Agente de Impacto** — Algoritmo que calcula el CO₂ equivalente evitado.
- **Agente Ayni** — Algoritmo que registra el beneficio y actualiza la billetera del ciudadano.

---

## 2. El Ciclo Completo del Sistema

### 2.1 Captura — La Experiencia del Ciudadano

El ciudadano interactúa con AYNI desde dos canales:

**WhatsApp/Telegram (canal principal):**
El usuario abre su chat con el bot de AYNI y envía una foto del residuo que quiere reciclar. El bot recibe la imagen y la envía a los agentes de IA para su procesamiento. Mientras los agentes trabajan, el bot mantiene al usuario informado del progreso. Cuando el procesamiento termina, el bot responde con el resultado: tipo de material identificado, peso estimado, CO₂ ahorrado, y beneficios generados.

El flujo es simple y directo:
1. Usuario envía foto → Bot confirma recepción
2. Agentes procesan → Bot muestra estado
3. Resultado devuelto → Bot notifica al usuario

**Portal Web (canal de consulta):**
Además del chat, el ciudadano tiene acceso a un portal web minimalista diseñado como un dashboard personal. Aquí puede ver:
- Su billetera Ayni con kilogramos reciclados acumulados
- CO₂ equivalente evitado
- Tickets Ayni obtenidos para sorteos
- Ahorro generado en arbitrios municipales
- Progreso hacia el siguiente nivel de descuento

El portal no reemplaza al chat — lo complementa. El chat es para la acción (enviar fotos, recibir resultados). El portal es para la reflexión (ver el progreso acumulado, entender el impacto).

### 2.2 Procesamiento — Los Agentes de IA

Cuando el ciudadano envía una foto desde WhatsApp o Telegram, el sistema activa una cadena de tres agentes que trabajan en secuencia:

**Agente Clasificador:**
Recibe la imagen y ejecuta un algoritmo de visión computacional para identificar el tipo de residuo. Determina si es PET, cartón, aluminio, vidrio, u orgánico. También evalúa el estado del material: si está limpio, aplastado, apto para reciclaje. Si la imagen no es clara o el material no es identificable, el agente rechaza la solicitud y el bot notifica al usuario para que intente con una foto mejor.

**Agente de Impacto:**
Una vez clasificado el material, este agente calcula el impacto ambiental. Determina los kilogramos de CO₂ equivalente que se evitaron al reciclar ese material en lugar de enviarlo a un botadero. El cálculo se basa en factores estándar de la industria para cada tipo de material.

**Agente Ayni:**
Finaliza el proceso registrando la transacción. Actualiza la billetera del ciudadano con los nuevos kilogramos, genera un ticket Ayni para el sorteo semanal, y calcula el progreso hacia el descuento en arbitrios. También sincroniza los datos con el sistema municipal para que el administrador vea la actividad en tiempo real.

Los tres agentes trabajan en cadena. Cada uno depende del resultado del anterior. Si alguno falla, el proceso se detiene y el usuario es notificado.

### 2.3 Gestión — La Consola Municipal

El administrador de la municipalidad accede a una consola web profesional diseñada para escritorio. Desde aquí tiene control sobre:

**Monitoreo del Distrito:**
- Métricas en tiempo real: ciudadanos activos, toneladas recuperadas, CO₂ evitado, ahorro generado
- Gráfico de recuperación mensual que compara lo reciclado contra la meta del MINAM
- Indicador de cumplimiento de la Ley REP con progreso hacia la cuota anual

**Gestión de Contribuyentes:**
- Lista completa de ciudadanos registrados con búsqueda por nombre o código predial
- Estado de cada contribuyente: activo o bloqueado
- Acción de bloqueo con motivo registrado para casos de incumplimiento
- Acción de desbloqueo cuando se regulariza la situación

**Registro de Solicitudes:**
- Historial cronológico de todas las transacciones de reciclaje
- Detalle por material, peso, CO₂ evitado, y resultado de la validación
- Filtro por tipo de material
- Opción de eliminar registros individuales

**Conciliación Tributaria:**
- Tabla de contribuyentes que califican a descuentos en arbitrios
- Firma electrónica de descuentos por parte del administrador
- Datos anonimizados según la Ley de Protección de Datos Personales
- Exportación a CSV para integración con el sistema SIAF municipal

---

## 3. Validación y Prevención de Fraude

Para garantizar que cada kilogramo reportado sea real, el sistema implementa tres validaciones:

**Control de duplicados:** Cada foto que envía el ciudadano genera un identificador único que se compara contra el historial. Si el mismo material ya fue registrado en el mismo día, el sistema lo rechaza como duplicado.

**Validación de calidad:** El Agente Clasificador evalúa si la imagen cumple con los criterios mínimos de calidad. Si la foto es borrosa, tiene poca luz, o el material no es claramente identificable, la solicitud es rechazada con una notificación al usuario.

**Registro de auditoría:** Cada transacción — aprobada, rechazada, o duplicada — queda registrada con timestamp, tipo de material, peso, y resultado. El administrador puede revisar todo el historial en cualquier momento.

---

## 4. Estructura del Proyecto

El proyecto AYNI está construido como una aplicación web frontend que emula el comportamiento del sistema completo para propósitos de demostración.

**Tecnologías utilizadas:**
- React para la interfaz de usuario
- Vite como empaquetador
- Tailwind CSS para los estilos
- Dexie.js como base de datos local en el navegador
- Recharts para los gráficos del dashboard

**Pantallas del sistema:**

- **Landing Page:** Presentación del proyecto con explicación de los tres agentes, métricas del sector, y llamado a la acción.
- **Formulario de Ingreso:** Acceso simple con dos credenciales predefinidas — una para ciudadano y otra para administrador.
- **Portal Ciudadano:** Dashboard personal con billetera Ayni y bot conversacional que simula la interacción de WhatsApp.
- **Consola Administrativa:** Panel de monitoreo con sidebar de navegación, gráficos, tabla de contribuyentes, y registro de solicitudes.

---

## 5. Modelo de Valor

AYNI cierra el círculo entre tres actores:

**El ciudadano** obtiene un incentivo económico real — descuento en sus arbitrios municipales — a cambio de reciclar. No tiene que llenar formularios ni visitar oficinas. Solo envía una foto desde WhatsApp y el sistema hace el resto.

**La municipalidad** obtiene datos verificables de reciclaje en su distrito. Puede monitorear el progreso hacia sus metas REP, gestionar contribuyentes, y exportar reportes listos para integrar con sus sistemas financieros.

**El medio ambiente** se beneficia porque más residuos terminan reciclados y menos terminan en botaderos.

La mayoría de los proyectos de reciclaje se quedan en la concientización. AYNI va más allá: conecta el acto de reciclar con un beneficio económico tangible, creando un ciclo que se retroalimenta.

---

## 6. Conclusión

AYNI no es una aplicación de reciclaje. Es un sistema de infraestructura que usa agentes de inteligencia artificial para conectar el esfuerzo del ciudadano con los incentivos municipales, utilizando WhatsApp como canal de comunicación y un dashboard web como centro de control.

El proyecto demuestra:

1. **Visión integral:** No solo clasifica residuos — cierra el ciclo completo desde la captura hasta el beneficio económico.
2. **Factibilidad técnica:** Cada componente tiene un camino claro a producción.
3. **Impacto real:** Resuelve un problema concreto de gestión municipal con una solución que beneficia a todos los actores.

Eso es lo que el jurado evaluará: no la complejidad del código, sino la completitud de la solución.
