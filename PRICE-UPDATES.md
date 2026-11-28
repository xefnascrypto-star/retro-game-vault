# Revisiones de mercado

La revisión usa una lista explícita de ejemplares verificados en `data/market-mappings.json`. Cada elemento indica región, condición y ajuste por conservación. Las referencias con manuales ausentes, inserciones reproducidas, mezcla regional, edición especial o identificación incierta no se equiparan automáticamente a un ejemplar completo: mantienen su última tasación hasta contar con un comparativo apropiado.

GamePriceFeed ofrece estimaciones basadas en ventas por región y condición, gratuitas con crédito y enlace a la página del juego: https://gamepricefeed.com/use-our-prices. No se copia su catálogo. Su documentación no especifica una cuota numérica; el proceso limita las consultas y usa solo cuatro fichas verificadas. El tipo de cambio procede del BCE.

Se requieren al menos cinco ventas, confianza good/high, identidad exacta y un tipo de cambio reciente. Los cambios superiores al 35 % se bloquean. Si una consulta falla se conserva el último precio válido. La tasación original no se sobrescribe; `data/market-reviews.json` registra cada revisión y atribución. La primera revisión compara estimaciones de distinta metodología y no se presenta como fluctuación histórica.

Las siguientes revisiones comparan los mismos identificadores y atribuyen por separado nuevas fichas o bajas. No hay variación semanal o mensual hasta disponer de un punto al menos siete o treinta días anterior. La cobertura debe ampliarse mediante revisión manual de edición, región y componentes; una coincidencia de título no basta.
