/* ══════════════════════════════════════════════════════════
   TENSE PRACTICE DATA
   Fill-in-the-blank conjugation quizzes, organised by tense.
   Each quiz = 15 sentences.
   Each sentence: subject pronoun + infinitive given, student
   types the correctly conjugated verb for that tense.

   Verbs used (our 15): hablar, ser, estar, tener, ir, hacer,
   querer, comer, vivir, poder, saber, venir, decir, dar, poner

   Field reference per item:
     pre   = text before the blank
     subj  = subject shown in brackets (display)
     inf   = infinitive shown in brackets (UPPERCASE display)
     post  = text after the blank
     answer= correct conjugated form (lowercase)
     en    = English translation (whole sentence)
══════════════════════════════════════════════════════════ */

const TENSE_PRACTICE = {

  present: {
    name: 'Present',
    colour: '#3dd6ac',
    blurb: 'El presente — actions happening now, habits and general truths.',
    quizzes: [
      {
        title: 'Quiz 1',
        items: [
          { pre:'Yo ',            subj:'yo',       inf:'hablar', post:' español con mi profesora.',     answer:'hablo',   en:'I speak Spanish with my teacher.' },
          { pre:'Nosotros ',      subj:'nosotros', inf:'comer',  post:' a las dos todos los días.',      answer:'comemos', en:'We eat at two o\'clock every day.' },
          { pre:'¿Tú ',          subj:'tú',       inf:'vivir',  post:' en Madrid?',                      answer:'vives',   en:'Do you live in Madrid?' },
          { pre:'Ella ',          subj:'ella',     inf:'ser',    post:' muy inteligente.',                answer:'es',      en:'She is very intelligent.' },
          { pre:'Yo ',            subj:'yo',       inf:'tener',  post:' dos hermanos.',                   answer:'tengo',   en:'I have two brothers.' },
          { pre:'Vosotros ',      subj:'vosotros', inf:'ir',     post:' al cine los sábados.',            answer:'vais',    en:'You all go to the cinema on Saturdays.' },
          { pre:'Mi padre ',      subj:'él',       inf:'hacer',  post:' la cena por la noche.',           answer:'hace',    en:'My father makes dinner at night.' },
          { pre:'Nosotros ',      subj:'nosotros', inf:'estar',  post:' en casa ahora.',                  answer:'estamos', en:'We are at home now.' },
          { pre:'¿Usted ',       subj:'usted',    inf:'querer', post:' un café?',                        answer:'quiere',  en:'Do you want a coffee?' },
          { pre:'Ellos ',         subj:'ellos',    inf:'poder',  post:' venir mañana.',                   answer:'pueden',  en:'They can come tomorrow.' },
          { pre:'Yo no ',         subj:'yo',       inf:'saber',  post:' la respuesta.',                   answer:'sé',      en:'I don\'t know the answer.' },
          { pre:'Tú ',           subj:'tú',       inf:'venir',  post:' conmigo a la fiesta.',            answer:'vienes',  en:'You come with me to the party.' },
          { pre:'Ella siempre ',  subj:'ella',     inf:'decir',  post:' la verdad.',                      answer:'dice',    en:'She always tells the truth.' },
          { pre:'Nosotros te ',   subj:'nosotros', inf:'dar',    post:' un regalo.',                      answer:'damos',   en:'We give you a present.' },
          { pre:'Yo ',            subj:'yo',       inf:'poner',  post:' la mesa cada día.',               answer:'pongo',   en:'I set the table every day.' },
        ]
      },
      {
        title: 'Quiz 2',
        items: [
          { pre:'Tú ',            subj:'tú',       inf:'hablar', post:' muy rápido.',                     answer:'hablas',  en:'You speak very fast.' },
          { pre:'Yo ',            subj:'yo',       inf:'ser',    post:' de Inglaterra.',                  answer:'soy',     en:'I am from England.' },
          { pre:'Ellos ',         subj:'ellos',    inf:'comer',  post:' demasiado.',                      answer:'comen',   en:'They eat too much.' },
          { pre:'Mi abuela ',     subj:'ella',     inf:'vivir',  post:' cerca de aquí.',                  answer:'vive',    en:'My grandmother lives near here.' },
          { pre:'Vosotros ',      subj:'vosotros', inf:'tener',  post:' razón.',                          answer:'tenéis',  en:'You all are right.' },
          { pre:'Nosotros ',      subj:'nosotros', inf:'ir',     post:' a la playa en verano.',           answer:'vamos',   en:'We go to the beach in summer.' },
          { pre:'¿Qué ',         subj:'tú',       inf:'hacer',  post:' los domingos?',                   answer:'haces',   en:'What do you do on Sundays?' },
          { pre:'El niño ',       subj:'él',       inf:'estar',  post:' cansado.',                        answer:'está',    en:'The boy is tired.' },
          { pre:'Yo ',            subj:'yo',       inf:'querer', post:' aprender español.',               answer:'quiero',  en:'I want to learn Spanish.' },
          { pre:'¿Vosotros ',    subj:'vosotros', inf:'poder',  post:' ayudarme?',                       answer:'podéis',  en:'Can you all help me?' },
          { pre:'Ella ',          subj:'ella',     inf:'saber',  post:' tocar el piano.',                 answer:'sabe',    en:'She knows how to play the piano.' },
          { pre:'Mis amigos ',    subj:'ellos',    inf:'venir',  post:' a las ocho.',                     answer:'vienen',  en:'My friends come at eight.' },
          { pre:'Yo te ',         subj:'yo',       inf:'decir',  post:' un secreto.',                     answer:'digo',    en:'I tell you a secret.' },
          { pre:'Ellos nos ',     subj:'ellos',    inf:'dar',    post:' las gracias.',                    answer:'dan',     en:'They give us their thanks.' },
          { pre:'¿Dónde ',       subj:'tú',       inf:'poner',  post:' las llaves?',                     answer:'pones',   en:'Where do you put the keys?' },
        ]
      },
    ]
  },

  preterite: {
    name: 'Preterite',
    colour: '#e8a838',
    blurb: 'El pretérito indefinido — completed actions at a specific point in the past.',
    quizzes: [
      {
        title: 'Quiz 1',
        items: [
          { pre:'Ayer yo ',       subj:'yo',       inf:'hablar', post:' con mi jefe.',                    answer:'hablé',     en:'Yesterday I spoke with my boss.' },
          { pre:'Nosotros ',      subj:'nosotros', inf:'comer',  post:' en un restaurante anoche.',       answer:'comimos',   en:'We ate in a restaurant last night.' },
          { pre:'¿Tú ',          subj:'tú',       inf:'ir',     post:' al concierto?',                   answer:'fuiste',    en:'Did you go to the concert?' },
          { pre:'Ella ',          subj:'ella',     inf:'ser',    post:' la mejor de la clase.',           answer:'fue',       en:'She was the best in the class.' },
          { pre:'El año pasado yo ', subj:'yo',    inf:'vivir',  post:' en Francia.',                     answer:'viví',      en:'Last year I lived in France.' },
          { pre:'Vosotros ',      subj:'vosotros', inf:'hacer',  post:' un buen trabajo.',                answer:'hicisteis', en:'You all did a good job.' },
          { pre:'Ellos ',         subj:'ellos',    inf:'tener',  post:' un problema serio.',              answer:'tuvieron',  en:'They had a serious problem.' },
          { pre:'Yo ',            subj:'yo',       inf:'estar',  post:' en casa todo el día.',            answer:'estuve',    en:'I was at home all day.' },
          { pre:'Nosotros ',      subj:'nosotros', inf:'querer', post:' ir, pero no pudimos.',            answer:'quisimos',  en:'We wanted to go, but we couldn\'t.' },
          { pre:'¿Tú ',          subj:'tú',       inf:'poder',  post:' terminar el examen?',             answer:'pudiste',   en:'Were you able to finish the exam?' },
          { pre:'Ella no ',       subj:'ella',     inf:'saber',  post:' qué decir.',                      answer:'supo',      en:'She didn\'t know what to say.' },
          { pre:'Mis primos ',    subj:'ellos',    inf:'venir',  post:' a visitarnos.',                   answer:'vinieron',  en:'My cousins came to visit us.' },
          { pre:'El profesor ',   subj:'él',       inf:'decir',  post:' que era importante.',             answer:'dijo',      en:'The teacher said it was important.' },
          { pre:'Ellos me ',      subj:'ellos',    inf:'dar',    post:' una buena noticia.',              answer:'dieron',    en:'They gave me good news.' },
          { pre:'Yo ',            subj:'yo',       inf:'poner',  post:' el libro en la mesa.',            answer:'puse',      en:'I put the book on the table.' },
        ]
      },
      {
        title: 'Quiz 2',
        items: [
          { pre:'Tú ',            subj:'tú',       inf:'comer',  post:' toda la pizza.',                  answer:'comiste',    en:'You ate all the pizza.' },
          { pre:'Yo ',            subj:'yo',       inf:'ir',     post:' al médico el lunes.',             answer:'fui',        en:'I went to the doctor on Monday.' },
          { pre:'Nosotros ',      subj:'nosotros', inf:'hablar', post:' durante horas.',                  answer:'hablamos',   en:'We talked for hours.' },
          { pre:'Ella ',          subj:'ella',     inf:'vivir',  post:' allí muchos años.',               answer:'vivió',      en:'She lived there many years.' },
          { pre:'Vosotros ',      subj:'vosotros', inf:'ser',    post:' muy amables.',                    answer:'fuisteis',   en:'You all were very kind.' },
          { pre:'¿Qué ',         subj:'tú',       inf:'hacer',  post:' el fin de semana?',               answer:'hiciste',    en:'What did you do at the weekend?' },
          { pre:'Mis padres ',    subj:'ellos',    inf:'estar',  post:' en Italia.',                      answer:'estuvieron', en:'My parents were in Italy.' },
          { pre:'Yo ',            subj:'yo',       inf:'tener',  post:' que trabajar tarde.',             answer:'tuve',       en:'I had to work late.' },
          { pre:'Él ',            subj:'él',       inf:'querer', post:' comprar el coche.',               answer:'quiso',      en:'He wanted to buy the car.' },
          { pre:'Nosotros no ',   subj:'nosotros', inf:'poder',  post:' dormir.',                         answer:'pudimos',    en:'We couldn\'t sleep.' },
          { pre:'¿Vosotros ',    subj:'vosotros', inf:'saber',  post:' la verdad?',                      answer:'supisteis',  en:'Did you all find out the truth?' },
          { pre:'Yo ',            subj:'yo',       inf:'venir',  post:' tan pronto como pude.',           answer:'vine',       en:'I came as soon as I could.' },
          { pre:'Ellos ',         subj:'ellos',    inf:'decir',  post:' que sí.',                         answer:'dijeron',    en:'They said yes.' },
          { pre:'Yo te ',         subj:'yo',       inf:'dar',    post:' mi número.',                      answer:'di',         en:'I gave you my number.' },
          { pre:'Ella ',          subj:'ella',     inf:'poner',  post:' la música muy alta.',             answer:'puso',       en:'She put the music on very loud.' },
        ]
      },
    ]
  },

  future: {
    name: 'Future',
    colour: '#5b9cf6',
    blurb: 'El futuro simple — what will happen. Endings are added to the full infinitive.',
    quizzes: [
      {
        title: 'Quiz 1',
        items: [
          { pre:'Mañana yo ',     subj:'yo',       inf:'hablar', post:' con el director.',               answer:'hablaré',   en:'Tomorrow I will speak with the director.' },
          { pre:'Nosotros ',      subj:'nosotros', inf:'comer',  post:' paella el domingo.',              answer:'comeremos', en:'We will eat paella on Sunday.' },
          { pre:'¿Tú ',          subj:'tú',       inf:'vivir',  post:' en el extranjero?',               answer:'vivirás',   en:'Will you live abroad?' },
          { pre:'Ella ',          subj:'ella',     inf:'ser',    post:' una gran médica.',               answer:'será',      en:'She will be a great doctor.' },
          { pre:'El año que viene yo ', subj:'yo', inf:'tener',  post:' treinta años.',                   answer:'tendré',    en:'Next year I will be thirty.' },
          { pre:'Vosotros ',      subj:'vosotros', inf:'ir',     post:' a la universidad.',               answer:'iréis',     en:'You all will go to university.' },
          { pre:'Yo ',            subj:'yo',       inf:'hacer',  post:' los deberes esta tarde.',         answer:'haré',      en:'I will do the homework this afternoon.' },
          { pre:'Ellos ',         subj:'ellos',    inf:'estar',  post:' aquí pronto.',                    answer:'estarán',   en:'They will be here soon.' },
          { pre:'¿Usted ',       subj:'usted',    inf:'querer', post:' más información?',                answer:'querrá',    en:'Will you want more information?' },
          { pre:'Nosotros ',      subj:'nosotros', inf:'poder',  post:' visitarte en julio.',             answer:'podremos',  en:'We will be able to visit you in July.' },
          { pre:'Pronto tú ',     subj:'tú',       inf:'saber',  post:' la respuesta.',                   answer:'sabrás',    en:'Soon you will know the answer.' },
          { pre:'Mis amigos ',    subj:'ellos',    inf:'venir',  post:' a la boda.',                      answer:'vendrán',   en:'My friends will come to the wedding.' },
          { pre:'El jefe te ',    subj:'él',       inf:'decir',  post:' la decisión mañana.',             answer:'dirá',      en:'The boss will tell you the decision tomorrow.' },
          { pre:'Yo te ',         subj:'yo',       inf:'dar',    post:' una respuesta el lunes.',         answer:'daré',      en:'I will give you an answer on Monday.' },
          { pre:'Nosotros ',      subj:'nosotros', inf:'poner',  post:' las maletas en el coche.',        answer:'pondremos', en:'We will put the suitcases in the car.' },
        ]
      },
      {
        title: 'Quiz 2',
        items: [
          { pre:'Tú ',            subj:'tú',       inf:'hablar', post:' con ellos esta noche.',           answer:'hablarás',  en:'You will speak with them tonight.' },
          { pre:'Yo ',            subj:'yo',       inf:'ser',    post:' profesor algún día.',             answer:'seré',      en:'I will be a teacher one day.' },
          { pre:'Ellos ',         subj:'ellos',    inf:'comer',  post:' con nosotros mañana.',            answer:'comerán',   en:'They will eat with us tomorrow.' },
          { pre:'Mi hermana ',    subj:'ella',     inf:'vivir',  post:' en Barcelona.',                   answer:'vivirá',    en:'My sister will live in Barcelona.' },
          { pre:'Vosotros ',      subj:'vosotros', inf:'tener',  post:' mucho tiempo libre.',             answer:'tendréis',  en:'You all will have a lot of free time.' },
          { pre:'Nosotros ',      subj:'nosotros', inf:'ir',     post:' a España en agosto.',             answer:'iremos',    en:'We will go to Spain in August.' },
          { pre:'¿Qué ',         subj:'tú',       inf:'hacer',  post:' después de clase?',               answer:'harás',     en:'What will you do after class?' },
          { pre:'Yo ',            subj:'yo',       inf:'estar',  post:' libre el viernes.',               answer:'estaré',    en:'I will be free on Friday.' },
          { pre:'Ella ',          subj:'ella',     inf:'querer', post:' verte otra vez.',                 answer:'querrá',    en:'She will want to see you again.' },
          { pre:'¿Vosotros ',    subj:'vosotros', inf:'poder',  post:' venir el sábado?',                answer:'podréis',   en:'Will you all be able to come on Saturday?' },
          { pre:'Nadie ',         subj:'él',       inf:'saber',  post:' lo que pasó.',                    answer:'sabrá',     en:'Nobody will know what happened.' },
          { pre:'Yo ',            subj:'yo',       inf:'venir',  post:' a recogerte.',                    answer:'vendré',    en:'I will come to pick you up.' },
          { pre:'Ellos ',         subj:'ellos',    inf:'decir',  post:' que no a la propuesta.',          answer:'dirán',     en:'They will say no to the proposal.' },
          { pre:'Nosotros te ',   subj:'nosotros', inf:'dar',    post:' una sorpresa.',                   answer:'daremos',   en:'We will give you a surprise.' },
          { pre:'¿Dónde ',       subj:'tú',       inf:'poner',  post:' el cuadro?',                      answer:'pondrás',   en:'Where will you put the painting?' },
        ]
      },
    ]
  },

};
