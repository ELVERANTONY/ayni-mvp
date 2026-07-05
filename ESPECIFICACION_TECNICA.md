# ESPECIFICACIÓN TÉCNICA Y METODOLÓGICA DEL MVP

**Proyecto:** AYNI — Ecosistema de Agentes de IA para la Gestión Circular de Residuos
**Evento:** Hackathon QuipuSoft 2026
**Responsable:** Lead Software Engineer
**Versión:** 1.0 — Julio 2026

---

## 1. Diagrama de Flujo Lógico

El dato viaja desde el dispositivo del ciudadano hasta el dashboard municipal a través de seis etapas secuenciales:

### Etapa 1: Captura (WhatsApp/Telegram)
El ciudadano abre el chat con el bot de AYNI en WhatsApp o Telegram. Toma una foto del residuo que desea reciclar y la envía al chat. El bot confirma la recepción inmediatamente con un mensaje de texto. En este punto, la imagen aún no ha sido procesada — solo está en cola.

### Etapa 2: Ingesta y Prevalidación
El sistema recibe la imagen y ejecuta tres validaciones preliminares antes de tocar los agentes de IA:

- **Validación de integridad:** Se verifica que el archivo no esté corrupto y que tenga un formato soportado (JPEG, PNG).
- **Control de duplicados:** Se calcula el hash perceptual (pHash) de la imagen y se compara contra el historial de las últimas 24 horas. Si el hash coincide con un registro existente, la solicitud se rechaza como duplicado y el flujo termina aquí.
- **Extracción de metadatos EXIF:** Se leen los metadatos incrustados en la imagen para verificar que fue tomada con una cámara en tiempo real y no es una captura de pantalla o un archivo descargado.

Si la imagen supera estas tres validaciones, pasa a la cadena de agentes.

### Etapa 3: Cadena de Agentes de IA

**Agente Clasificador:**
Recibe la imagen y ejecuta un modelo de visión computacional. Identifica el tipo de residuo (PET, cartón, aluminio, vidrio, orgánico), evalúa su estado (limpio, aplastado, apto), y asigna un nivel de confianza a la clasificación. Si la confianza es baja o el material no es identificable, la solicitud se rechaza y se notifica al usuario.

**Output:** `{ material: string, estado: string, confianza: float, peso_estimado: float }`

**Agente de Impacto:**
Toma el output del Agente Clasificador y calcula el impacto ambiental. Usa factores de emisión estándar por tipo de material para determinar los kilogramos de CO₂ equivalente evitados. También calcula la mitigación de metano (CH₄) comparando contra el escenario de disposición en botadero.

**Output:** `{ co2_evitado: float, ch4_mitigado: float, equivalencia: string }`

**Agente Ayni:**
Toma los outputs de los dos agentes anteriores y ejecuta la lógica de recompensa. Actualiza la billetera del ciudadano sumando los kilogramos al acumulado, incrementando los tickets Ayni, recalculando el progreso hacia el descuento en arbitrios, y registrando la transacción en la base de datos del sistema. Finalmente, sincroniza los datos agregados con el panel municipal.

**Output:** `{ kg_acumulado: float, tickets: int, progreso: float, ahorro: float, id_transaccion: string }`

### Etapa 4: Notificación al Ciudadano
El bot de WhatsApp/Telegram envía el resultado al ciudadano. Si fue aprobado, incluye: tipo de material identificado, peso, CO₂ evitado, tickets ganados, y un resumen de su billetera actualizada. Si fue rechazado, incluye el motivo y una sugerencia para mejorar la foto.

### Etapa 5: Visualización en Portal Web
El ciudadano puede ingresar a su portal web personal — la Billetera Ayni — para ver el histórico completo de sus transacciones, el progreso acumulado hacia el descuento en arbitrios, las estadísticas de impacto ambiental, y los beneficios disponibles.

### Etapa 6: Sincronización con Dashboard Municipal
Cada transacción aprobada actualiza en tiempo real las métricas del dashboard del administrador municipal: toneladas recuperadas, CO₂ evitado, ciudadanos activos, y cumplimiento de la cuota REP. El administrador puede visualizar, filtrar, y exportar estos datos sin intervención manual.

---

## 2. Definición de Agentes

### Agente Clasificador

| Atributo | Descripción |
|----------|-------------|
| **Rol** | Identificación y validación del residuo |
| **Modelo** | Red neuronal convolucional para clasificación de imágenes (visión computacional) |
| **Input** | Imagen JPEG/PNG enviada por el ciudadano |
| **Procesamiento** | Segmentación semántica del objeto, clasificación por tipo de material, evaluación de estado físico |
| **Output** | Tipo de material, estado, nivel de confianza, peso estimado |
| **Criterios de rechazo** | Confianza menor al 70%, material no identificable, imagen de baja calidad |

### Agente de Impacto

| Atributo | Descripción |
|----------|-------------|
| **Rol** | Cuantificación ambiental de la acción de reciclaje |
| **Modelo** | Algoritmo determinístico basado en factores de emisión estándar (IPCC, MINAM) |
| **Input** | Output del Agente Clasificador (tipo de material, peso estimado) |
| **Procesamiento** | Cálculo de CO₂ equivalente evitado usando factores por tipo de material. Cálculo de mitigación de metano comparando contra escenario de botadero |
| **Output** | kg de CO₂ evitado, kg de CH₄ mitigado, texto de equivalencia ambiental |
| **Criterios de rechazo** | Ninguno (depende del output del Clasificador) |

### Agente Ayni

| Atributo | Descripción |
|----------|-------------|
| **Rol** | Orquestación de recompensa y persistencia de datos |
| **Modelo** | Lógica de negocio transaccional (no requiere ML) |
| **Input** | Outputs del Clasificador y del Agente de Impacto |
| **Procesamiento** | Actualización de billetera del ciudadano, generación de tickets, cálculo de progreso de descuento, registro de transacción, sincronización con dashboard municipal |
| **Output** | Estado actualizado de la billetera, confirmación de transacción, datos sincronizados al municipio |
| **Criterios de rechazo** | Error en persistencia de datos, inconsistencia en valores recibidos |

---

## 3. Matriz de Seguridad

AYNI implementa tres capas de protección contra fraude, diseñadas para operar en conjunto sin afectar la experiencia del usuario.

### Capa 1: Control de Duplicados — Hashing Perceptual (pHash)

| Aspecto | Descripción |
|---------|-------------|
| **Propósito** | Evitar que una misma imagen sea registrada múltiples veces |
| **Mecanismo** | Cada imagen entrante genera un hash perceptual que es invariante a cambios menores (rotación, escalado, compresión). Este hash se compara contra el historial de las últimas 24 horas |
| **Resultado** | Si el hash coincide con un registro existente, la transacción es rechazada como duplicado |
| **Efecto en usuario** | El bot notifica que el material ya fue registrado hoy |

### Capa 2: Validación de Origen — Metadatos EXIF

| Aspecto | Descripción |
|---------|-------------|
| **Propósito** | Verificar que la imagen fue tomada en vivo y no es una captura de pantalla o archivo descargado |
| **Mecanismo** | Se extraen y analizan los metadatos EXIF de la imagen: modelo de cámara, fecha de captura, coordenadas GPS, perfil de color. Ausencia o inconsistencia de metadatos sugiere manipulación |
| **Resultado** | Si los metadatos indican que la imagen no fue tomada en vivo, la transacción es rechazada |
| **Efecto en usuario** | El bot notifica que la imagen no cumple con los requisitos de validación |

### Capa 3: Anonimización y Privacidad — Segmentación Semántica

| Aspecto | Descripción |
|---------|-------------|
| **Propósito** | Cumplir con la Ley N° 29733 de Protección de Datos Personales, garantizando que ninguna imagen almacenada contenga datos sensibles |
| **Mecanismo** | Antes de persistir la imagen, se ejecuta un modelo de segmentación semántica que detecta y ofusca rostros humanos, placas de vehículos, direcciones, y cualquier otro dato personal visible en la foto |
| **Resultado** | La imagen almacenada en el sistema está anonimizada. Solo el dato estructurado (material, peso, CO₂) queda vinculado al perfil del ciudadano |
| **Efecto en usuario** | Ninguno — el proceso es transparente para el ciudadano |

---

## 4. Justificación de Factibilidad

### Desacoplamiento Asíncrono

La comunicación entre el frontend de captura (WhatsApp/Telegram) y los agentes de IA es asíncrona. El ciudadano envía la imagen y recibe una confirmación inmediata. El procesamiento ocurre en segundo plano. Cuando los agentes terminan, el bot notifica al usuario. Este patrón tiene tres ventajas:

1. **Escalabilidad:** Los agentes pueden escalar independientemente según la demanda. Si hay un pico de envíos a las 8 PM, se pueden asignar más recursos al Agente Clasificador sin afectar al Agente Ayni.
2. **Tolerancia a fallos:** Si un agente falla, los demás no se ven afectados. La transacción queda en cola y se reintenta automáticamente.
3. **Experiencia de usuario:** El ciudadano no espera bloqueado frente a la pantalla. Envía la foto y sigue con su día.

### Arquitectura Preparada para Producción

Cada componente del sistema puede migrarse a un entorno de producción sin cambiar la lógica de negocio:

- **Base de datos:** La capa de persistencia local (IndexedDB) es intercambiable por PostgreSQL, Firebase, o cualquier base de datos SQL/NoSQL. La lógica de negocio no depende del motor de base de datos.
- **Autenticación:** El sistema de login simple es reemplazable por cualquier proveedor OAuth (Google, Facebook, clave única municipal). La lógica de roles no cambia.
- **Agentes:** Los algoritmos de IA simulados son reemplazables por modelos reales alojados en AWS Lambda, Google Cloud Functions, o un servidor dedicado. La interfaz de los agentes (input/output) no cambia.

### Integración con Sistemas Municipales

El módulo de conciliación tributaria genera datos estructurados en formato CSV estándar, listos para ser importados por el Sistema Integrado de Administración Financiera (SIAF) que utilizan las municipalidades del Perú. Esto elimina la necesidad de integraciones personalizadas con cada municipio — el dato se entrega en el formato que el sistema ya entiende.

### Requisitos de Infraestructura

El MVP completo — incluyendo portal ciudadano, dashboard administrativo, y todos los agentes — funciona sin conexión a internet ni servidores externos. La base de datos corre en el navegador del usuario. Esto significa que la demo puede ejecutarse en cualquier computadora sin configuración previa, lo cual es crítico para una evaluación en vivo.

En producción, los requisitos son mínimos:
- **WhatsApp/Telegram Bot:** Un servidor Node.js o Python para manejar los webhooks
- **Agentes de IA:** Funciones serverless con GPUs bajo demanda
- **Dashboard Web:** Hosting estático (Vercel, Netlify, S3)
- **Base de Datos:** Instancia manejada de PostgreSQL

---

## 5. Alineamiento con las Bases de QuipuSoft 2026

| Requerimiento de Bases | Implementación en AYNI |
|------------------------|------------------------|
| **4.1 Solución a problemática real** | Gestión ineficiente de residuos sólidos urbanos — problema priorizado por el MINAM y la Ley REP |
| **4.2 Tecnologías de IA** | Tres agentes de IA en cadena: visión computacional (Clasificador), cálculo de impacto (Impacto), orquestación de incentivos (Ayni) |
| **4.3 Integridad de datos** | Trazabilidad completa de cada transacción con registro de auditoría accesible desde el dashboard municipal |
| **4.4 Prevención de fraudes** | Triple capa de seguridad: pHash para duplicados, validación EXIF para origen, segmentación semántica para anonimización |
| **4.5 Protección de datos** | Cumplimiento de Ley N° 29733 mediante pipeline de anonimización automática en la ingesta de imágenes |
| **4.6 Escalabilidad** | Arquitectura desacoplada con comunicación asíncrona entre componentes. Agentes independientes y escalables |
| **4.7 Usabilidad** | Canal principal es WhatsApp/Telegram — cero curva de aprendizaje. Portal web complementario para consulta |
| **4.8 Impacto económico y ambiental** | Incentivo tributario directo (descuento en arbitrios) + métricas de CO₂ evitado + cumplimiento de cuota REP |
| **4.9 Sostenibilidad del proyecto** | Modelo de negocio B2G: la municipalidad paga por la plataforma, el ciudadano recibe el beneficio. Sin depender de donaciones o financiamiento externo |

---

## 6. Especificaciones Técnicas del MVP

### Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| **Frontend** | React 18 + Vite 5 |
| **Estilos** | Tailwind CSS 3 |
| **Base de datos local** | Dexie.js (IndexedDB) |
| **Gráficos** | Recharts |
| **Iconos** | Lucide React |
| **Enrutamiento** | React Router DOM (HashRouter) |
| **Autenticación** | SessionStorage con roles |

### Estructura de Datos

**Billetera del Ciudadano:**
- kg: número (total acumulado)
- co2: número (CO₂ equivalente evitado)
- tickets: número (Tickets Ayni)
- progress: número (porcentaje hacia descuento)
- savings: número (ahorro generado en soles)

**Registro de Transacciones:**
- timestamp: fecha y hora
- wasteType: tipo de material
- kg: peso del material
- co2: CO₂ evitado
- scenario: aprobado | rechazado | duplicado

**Contribuyentes (Municipio):**
- name: nombre del ciudadano (anonimizado en dashboard)
- code: código predial
- level: nivel de participación (Constante | Moderado | Nuevo)
- discount: porcentaje de descuento aplicable
- signed: estado de firma de descuento
- blocked: estado de bloqueo
- blockReason: motivo de bloqueo

---

## 7. Conclusión Técnica

AYNI demuestra que es posible construir un sistema de gestión de residuos con inteligencia artificial que cumple estándares empresariales de seguridad, escalabilidad, y usabilidad, utilizando tecnologías modernas y accesibles. La separación clara entre la capa de captura (WhatsApp/Telegram), la capa de procesamiento (agentes de IA), y la capa de gestión (dashboard municipal) permite que cada componente evolucione de forma independiente.

La triple capa de seguridad — hashing perceptual, validación EXIF, y segmentación semántica — garantiza la integridad del sistema sin sacrificar la experiencia del usuario. El alineamiento con la Ley REP y la Ley N° 29733 posiciona a AYNI como una solución técnicamente sólida y legalmente conforme.

El MVP presentado no es un prototipo académico. Es la base de un producto de infraestructura municipal listo para escalar.
