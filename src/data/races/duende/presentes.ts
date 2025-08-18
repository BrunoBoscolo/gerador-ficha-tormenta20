import { RaceAbility } from '../../../interfaces/Race';
import Skill from '../../../interfaces/Skills';

export const PRESENTES: RaceAbility[] = [
  {
    name: 'Afinidade Elemental',
    description:
      'Você tem uma forte ligação com um elemento. Escolha um: Água, Fogo ou Vegetação. Água: você recebe deslocamento de natação igual ao seu deslocamento terrestre e pode lançar as magias Criar Elementos (apenas água) e Névoa. Fogo: você recebe redução de fogo 5 e pode lançar as magias Criar Elementos (apenas fogo) e Explosão de Chamas. Vegetação: você pode atravessar terrenos difíceis naturais sem sofrer redução no deslocamento e pode lançar as magias Armamento da Natureza e Controlar Plantas. O atributo-chave para as magias é Carisma.',
  },
  {
    name: 'Encantar Objetos',
    description:
      'Você pode gastar uma ação de movimento e 3 PM para tocar um item e aplicar a ele um encanto (sem pré-requisitos) que dura até o fim da cena.',
  },
  {
    name: 'Enfeitiçar',
    description:
      'Você pode lançar a magia Enfeitiçar e seus aprimoramentos como se tivesse acesso aos mesmos círculos de magia que um arcanista de seu nível.',
  },
  {
    name: 'Invisibilidade',
    description:
      'Você pode lançar a magia Invisibilidade e seus aprimoramentos como se tivesse acesso aos mesmos círculos de magia que um arcanista de seu nível.',
  },
  {
    name: 'Língua da Natureza',
    description: 'Você pode falar com animais e plantas.',
    sheetBonuses: [
      {
        source: {
          type: 'race',
          raceName: 'Duende',
        },
        target: {
          type: 'Skill',
          name: Skill.ADESTRAMENTO,
        },
        modifier: {
          type: 'Fixed',
          value: 2,
        },
      },
      {
        source: {
          type: 'race',
          raceName: 'Duende',
        },
        target: {
          type: 'Skill',
          name: Skill.SOBREVIVENCIA,
        },
        modifier: {
          type: 'Fixed',
          value: 2,
        },
      },
    ],
  },
  {
    name: 'Maldição',
    description:
      'Você pode gastar uma ação padrão e 3 PM para amaldiçoar uma criatura em alcance curto. A vítima tem direito a um teste de resistência (Fortitude ou Vontade, escolhido por você na criação do duende). Se falhar, sofre um efeito permanente (escolhido de uma lista na criação do duende) até ser cancelado ou curado. Você só pode manter uma maldição por vez.',
  },
  {
    name: 'Mais Lá do que Aqui',
    description:
      'Você pode gastar uma ação padrão e 2 PM para fazer a maior parte do seu corpo desaparecer por uma cena, recebendo camuflagem leve e +5 em Furtividade.',
  },
  {
    name: 'Metamorfose Animal',
    description:
      'Você pode se transformar em um tipo de animal. Escolha uma forma selvagem básica do druida. Você pode gastar uma ação completa e 3 PM para assumir essa forma, podendo falar e lançar magias.',
  },
  {
    name: 'Sonhos Proféticos',
    description:
      'Uma vez por cena, você gasta 3 PM e rola 1d20. Até o fim da cena, você pode substituir o resultado do d20 de um teste de uma criatura em alcance curto pelo resultado que você rolou.',
  },
  {
    name: 'Velocidade do Pensamento',
    description:
      'No primeiro turno de cada cena, você pode gastar 2 PM para realizar uma ação padrão adicional, mas pula o turno na segunda rodada.',
  },
  {
    name: 'Visão Feérica',
    description:
      'Você recebe visão na penumbra e está permanentemente sob efeito da magia Visão Mística (com o aprimoramento para ver criaturas invisíveis).',
    sheetActions: [
      {
        source: {
          type: 'race',
          raceName: 'Duende',
        },
        action: {
          type: 'addSense',
          sense: 'Visão na Penumbra',
        },
      },
      {
        source: {
          type: 'race',
          raceName: 'Duende',
        },
        action: {
          type: 'addSense',
          sense: 'Ver o Invisível',
        },
      },
    ],
  },
  {
    name: 'Voo',
    description:
      'Você pode flutuar a 1,5m do chão com deslocamento de seu deslocamento base +3m. Você é imune a dano por queda. Pode voar gastando 1 PM por rodada, com deslocamento de seu deslocamento base +6m.',
  },
];
