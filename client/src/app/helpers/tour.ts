export const Tour = {
  startMenu: () => {
    let intro = introJs()
    intro.setOptions({
      nextLabel: ' > ',
      prevLabel: ' < ',
      doneLabel: 'OK',
      skipLabel: 'Ignorar',
      showStepNumbers: false,
      exitOnOverlayClick: false,
      steps: [
        {
          element: '#menu-my-questions',
          intro: 'Veja a lista de questões que você já criou',
          position: 'right'
        }, {
          element: '#menu-my-room',
          intro: 'Veja a lista de salas que você já criou',
          position: 'right'
        }, {
          element: '#menu-opened-rooms',
          intro: "Veja as salas que estão abertas que você pode participar",
          position: 'right'
        }, {
          element: '#menu-associated-rooms',
          intro: "Veja as salas que você participa ou já participu",
          position: 'right'
        }, {
          element: '#menu-all-questions',
          intro: 'Veja uma lista de questões compartilhadas por você e por outros usuários',
          position: 'right'
        }
      ]
    })
    intro.start();
  },

  tutorial1: (callback) => {
    let intro = introJs()
    intro.setOptions({
      nextLabel: ' > ',
      prevLabel: ' < ',
      doneLabel: 'OK',
      skipLabel: 'Ignorar',
      showStepNumbers: false,
      exitOnOverlayClick: false,
      steps: [
        {
          element: '#createQuestion',
          intro: 'Crie uma nova questão',
          position: 'right'
        }
      ]
    })
    intro.oncomplete(() => {
      if (callback)
        callback()
    })
    intro.start();
  },

  tutorial2: () => {
    let intro = introJs()
    intro.setOptions({
      nextLabel: ' > ',
      prevLabel: ' < ',
      doneLabel: 'OK',
      skipLabel: 'Ignorar',
      showStepNumbers: false,
      exitOnOverlayClick: false,
      steps: [
        {
          element: '#selectArea',
          intro: 'Selecione uma área para a sua questão',
          position: 'top'
        }, {
          element: '#customArea',
          intro: 'Caso não encontre sua área específica selecione a opção "Outra..." para habilitar este campo e digite uma nova Àrea. Ex: Matemática, Química, etc...',
          position: 'top'
        }, {
          element: '#btnNextStep',
          intro: 'Após o preenchimento dos campos vá para o próximo passo.',
          position: 'top'
        }
      ]
    })
    intro.start();
  },

  tutorial3: () => {
    let intro = introJs()
    intro.setOptions({
      nextLabel: ' > ',
      prevLabel: ' < ',
      doneLabel: 'OK',
      skipLabel: 'Ignorar',
      showStepNumbers: false,
      exitOnOverlayClick: false,
      steps: [
        {
          element: '#questionDescription',
          intro: 'Informe a pergunta da questão para pode prosseguir',
          position: 'top'
        }
      ]
    })
    intro.start();
  },

  tutorial4: () => {
    let intro = introJs()
    intro.setOptions({
      nextLabel: ' > ',
      prevLabel: ' < ',
      doneLabel: 'OK',
      skipLabel: 'Ignorar',
      showStepNumbers: false,
      exitOnOverlayClick: false,
      steps: [
        {
          element: '.introDescriptionAnswer',
          intro: 'Informe a alternativas da questão',
          position: 'top'
        }, {
          element: '.introCorrectAnswer',
          intro: 'Confira se a alternativa marcada é a correta',
          position: 'top'
        }
      ]
    })
    intro.start();
  },

  tutorial5: () => {
    let intro = introJs()
    intro.setOptions({
      nextLabel: ' > ',
      prevLabel: ' < ',
      doneLabel: 'OK',
      skipLabel: 'Ignorar',
      showStepNumbers: false,
      exitOnOverlayClick: false,
      steps: [
        {
          element: '#shareQuestion',
          intro: 'Compartilhe as questões criadas com outros usuários.',
          position: 'top'
        }, {
          element: '#manageQuestion',
          intro: 'Edite ou exclua suas questões.',
          position: 'top'
        }
      ]
    })
    intro.start();
  }
}