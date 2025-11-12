import React from 'react';
import { PageData } from './types';

export const BOOK_TITLE = "Elena y la Fábrica de Longanizas";

interface Chapter {
    title: string;
    synopsis: string;
    content: {
        text: string;
        prompt: string;
    }[];
}

const chapters: Chapter[] = [
    {
        title: "Una Mañana Nebulosa",
        synopsis: "Se agachó. La mancha era fresca. La tocó con un pañuelo: espesa, tibia. No era grasa. No era vino. Era sangre.",
        content: [
            {
                text: "La niebla caía espesa sobre el pequeño pueblo de San Cebrián, envolviendo las calles empedradas en una mortaja blanca que apenas dejaba ver las farolas. A esa hora —las cinco y cuarto de la mañana— sólo un lugar mantenía su actividad febril: la Fábrica de Longanizas de los Hermanos Ighnaim, una empresa familiar con más de setenta años de historia y una reputación tan impecable como el filo de sus cuchillos.",
                prompt: "Un pequeño pueblo con calles empedradas cubierto por una espesa niebla al amanecer. Una fábrica antigua con un letrero que dice 'Hermanos Ighnaim' se ve a lo lejos. Estilo de animación Pixar.",
            },
            {
                text: "Elena Ighnaim cruzó la verja de hierro con paso firme, aunque por dentro sentía el mismo escalofrío que le recorría cada vez que entraba a trabajar antes del amanecer. Era la encargada de control sanitario, una mujer meticulosa y reservada, de ojos grises y expresión que pocos sabían leer. Siempre llegaba antes que nadie, revisaba los registros de temperatura, la limpieza de los utensilios, y el nivel de cloro en los depósitos de agua. Pero aquella mañana algo era distinto.",
                prompt: "Una mujer de ojos grises con una expresión seria, llamada Elena, cruza la verja de hierro de una fábrica en una mañana con niebla. Viste una bata de trabajo. Estilo de animación Pixar.",
            },
            {
                text: "Desde el portón se percibía un aroma metálico, dulzón y denso, que no pertenecía a la carne recién molida ni a las especias. Era un olor que recordaba al óxido… o a la sangre vieja. Elena se detuvo un instante. El aire estaba inmóvil, y el único sonido era el goteo intermitente del sistema de refrigeración.",
                prompt: "Elena se detiene justo dentro de la puerta de la fábrica, con una expresión de preocupación en su rostro. El interior está oscuro y silencioso, con un goteo de agua de un sistema de refrigeración. Estilo de animación Pixar.",
            },
            {
                text: "Avanzó hacia el interior, con el eco de sus pasos resonando en las baldosas húmedas. A cada lado, las líneas de producción dormían bajo las sombras: las picadoras, los embutidores, las mesas de acero. Todo parecía en orden… salvo por una mancha oscura en el suelo del área de envasado.",
                prompt: "Elena camina por el interior oscuro y silencioso de la fábrica de salchichas. Ve una mancha oscura y misteriosa en el suelo del área de envasado. Estilo de animación Pixar.",
            },
            {
                text: "Se agachó. La mancha era fresca. La tocó con un pañuelo: espesa, tibia. No era grasa. No era vino. Era sangre.",
                prompt: "Un primer plano de la mano de Elena, usando un pañuelo para tocar una mancha de sangre fresca en el suelo de baldosas de la fábrica. Su expresión es de shock. Estilo de animación Pixar.",
            },
            {
                text: "El corazón de Elena comenzó a martillarle en el pecho. Se incorporó de golpe, mirando hacia la oficina del capataz. La puerta estaba entreabierta y una luz amarillenta temblaba en su interior. —¿Señor Ighnaim? —llamó, con la voz un poco quebrada. Nadie respondió.",
                prompt: "Elena se levanta rápidamente, con el corazón acelerado, y mira hacia la puerta entreabierta de una oficina de la que sale una luz temblorosa. Estilo de animación Pixar.",
            },
            {
                text: "Empujó la puerta lentamente. Adentro, el escritorio estaba cubierto de papeles, facturas, y una taza de café ya fría. El reloj de pared marcaba las cinco y diecisiete. En la silla giratoria, el cuerpo del mayor de los Ighnaim yacía inclinado hacia atrás, con la cabeza ladeada y los ojos abiertos. La piel de su cuello estaba marcada por una fina línea azulada, como si un hilo invisible lo hubiera estrangulado sin esfuerzo.",
                prompt: "Dentro de una oficina desordenada, un hombre yace sin vida en una silla giratoria, con los ojos abiertos y una marca azul en el cuello. La escena es sombría y misteriosa. Estilo de animación Pixar.",
            },
            {
                text: "Elena retrocedió un paso, tropezando con el borde de una caja. El sonido de un cuchillo cayendo al suelo le arrancó un grito. La hoja rodó lentamente hasta detenerse junto a la puerta, dejando un reguero rojo.",
                prompt: "Elena retrocede horrorizada, tropezando. Un cuchillo ensangrentado cae al suelo y rueda hasta la puerta, dejando un rastro rojo. Estilo de animación Pixar.",
            },
            {
                text: "Entonces lo oyó. Un leve movimiento en el pasillo, apenas perceptible, un roce metálico… como si alguien —o algo— arrastrara una cadena entre las sombras.",
                prompt: "Elena, aterrorizada, escucha un sonido metálico desde un pasillo oscuro de la fábrica. Sombras largas y amenazantes la rodean. Estilo de animación Pixar.",
            },
            {
                text: "Elena contuvo la respiración. —¿Quién está ahí? —preguntó, con un hilo de voz. El silencio fue absoluto durante unos segundos que parecieron eternos. Luego, un susurro helado le rozó el oído:",
                prompt: "Un primer plano del rostro aterrorizado de Elena mientras susurra '¿Quién está ahí?' en la fábrica oscura. Una presencia invisible susurra en su oído. Estilo de animación Pixar.",
            },
            {
                text: "—No debiste venir tan temprano, Elena… La luz titiló. Y en el instante siguiente, todo volvió a quedar en silencio, salvo por el murmullo constante de los refrigeradores… y el suave, inconfundible aroma a longaniza recién hecha, que ahora parecía mezclarse con el olor de la muerte.",
                prompt: "La única luz de la fábrica parpadea sobre el rostro aterrorizado de Elena, sumergiendo la escena en la oscuridad por un momento. El ambiente es tenso y espeluznante. Estilo de animación Pixar.",
            }
        ]
    }
];

export const INITIAL_PAGES: PageData[] = [
    {
        id: 1,
        type: 'cover',
        prompt: `La portada de un libro de misterio titulado '${BOOK_TITLE}'. El estilo debe ser como una película de animación Pixar. Muestra una fábrica antigua en un pueblo con niebla al amanecer.`,
        imageUrl: null
    },
];

const CHARS_PER_PAGE = 1400;
let idCounter = 2;

chapters.forEach((chapter, chapterIndex) => {
    // Add a blank page before the chapter starts to ensure the title page is on the right.
    INITIAL_PAGES.push({
        id: idCounter++,
        type: 'blank',
        imageUrl: null,
    });

    // Add the chapter title page.
    INITIAL_PAGES.push({
        id: idCounter++,
        type: 'chapter',
        chapterInfo: {
            number: `Capítulo ${chapterIndex + 1}`,
            title: chapter.title,
            synopsis: chapter.synopsis,
        },
        imageUrl: null,
    });

    const storyContent = chapter.content;
    const fullStoryText = storyContent.map(p => p.text).join(' ');

    const promptMap: { startIndex: number; prompt: string }[] = [];
    let cumulativeLength = 0;
    storyContent.forEach(content => {
        promptMap.push({ startIndex: cumulativeLength, prompt: content.prompt });
        cumulativeLength += content.text.length + 1;
    });

    const findPromptForIndex = (index: number): string => {
        const applicablePrompt = promptMap.slice().reverse().find(p => p.startIndex <= index);
        return applicablePrompt ? applicablePrompt.prompt : storyContent[0].prompt;
    };

    let currentIndex = 0;
    while (currentIndex < fullStoryText.length) {
        let endIndex = currentIndex + CHARS_PER_PAGE;
        let chunk = fullStoryText.substring(currentIndex, endIndex);

        if (endIndex < fullStoryText.length) {
            const lastSpace = chunk.lastIndexOf(' ');
            if (lastSpace !== -1) {
                chunk = chunk.substring(0, lastSpace);
                endIndex = currentIndex + lastSpace;
            }
        }

        const promptForPage = findPromptForIndex(currentIndex);

        INITIAL_PAGES.push({
            id: idCounter++,
            type: 'image',
            prompt: promptForPage,
            imageUrl: null,
        });
        
        INITIAL_PAGES.push({
            id: idCounter++,
            type: 'text',
            text: chunk.trim(),
            imageUrl: null
        });

        currentIndex = endIndex < fullStoryText.length ? endIndex + 1 : endIndex;
    }
});