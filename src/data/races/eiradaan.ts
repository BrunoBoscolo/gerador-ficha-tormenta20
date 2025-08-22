import Race from '../../interfaces/Race';
import { Atributo } from '../atributos';
import Skill from '../../interfaces/Skills';

const EIRADAAN: Race = {
  name: 'Eiradaan',
  attributes: {
    attrs: [
      { attr: Atributo.SABEDORIA, mod: 2 },
      { attr: Atributo.CARISMA, mod: 1 },
      { attr: Atributo.FORCA, mod: -1 },
    ],
  },
  faithProbability: {
    ALLIHANNA: 1,
    LENA: 1,
    THYATIS: 1,
    WYNNA: 1,
  },
  abilities: [
    {
      name: 'Essência Feérica',
      description:
        'Sua criatura é do tipo espírito. Você recebe visão na penumbra e pode falar com animais livremente.',
      sheetActions: [
        {
          source: {
            type: 'power',
            name: 'Essência Feérica',
          },
          action: {
            type: 'addSense',
            sense: 'Visão na penumbra',
          },
        },
      ],
    },
    {
      name: 'Magia Instintiva',
      description:
        'Você pode usar Sabedoria no lugar do atributo-chave para magias arcanas e para a perícia Misticismo. Ao lançar uma magia, você recebe +1 PM para gastar em aprimoramentos. Este bônus não é cumulativo com outros efeitos que fornecem PM para aprimoramentos.',
      sheetBonuses: [
        {
          source: {
            type: 'power',
            name: 'Magia Instintiva',
          },
          target: {
            type: 'ModifySkillAttribute',
            skill: Skill.MISTICISMO,
            attribute: Atributo.SABEDORIA,
          },
          modifier: {
            type: 'Fixed',
            value: 0,
          },
        },
      ],
    },
    {
      name: 'Sentidos Místicos',
      description:
        'Você está permanentemente sob o efeito básico da magia Visão Mística.',
    },
    {
      name: 'Canção da Melancolia',
      description:
        'Ao realizar um teste de Vontade contra efeitos mentais, você deve rolar dois dados e utilizar o pior resultado.',
    },
    {
      name: 'Longevidade',
      description: 'Você multiplica a idade base por 5 (x5).',
    },
  ],
};

export default EIRADAAN;
