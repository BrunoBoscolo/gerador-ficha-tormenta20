import { Atributo } from '../atributos';
import Race from '../../interfaces/Race';
import { RACE_SIZES } from './raceSizes/raceSizes';
import { PRESENTES } from './duende/presentes';

const DUENDE: Race = {
  name: 'Duende',
  attributes: {
    attrs: [], // Bônus de atributo são tratados pela habilidade "Dons".
  },
  abilities: [
    {
      name: 'Tipo de Criatura',
      description: 'Você é uma criatura do tipo Espírito.',
    },
    {
      name: 'Longevidade',
      description: 'Varia de duende para duende, não segue um ciclo natural.',
    },
    {
      name: 'Natureza',
      description: 'Escolha uma de três naturezas: Animal, Vegetal ou Mineral. Cada uma concede habilidades únicas.',
    },
    {
      name: 'Tamanho',
      description: 'Escolha um de quatro tamanhos: Minúsculo, Pequeno, Médio ou Grande. Cada um afeta seus atributos e deslocamento.',
    },
    {
      name: 'Dons',
      description: 'Você recebe +1 em dois atributos diferentes à sua escolha. Se sua natureza for Animal, pode acumular um bônus para +2 total.',
    },
    {
      name: 'Presentes de Magia e de Caos',
      description: 'Escolha três poderes da lista de presentes. A CD para resistência é baseada em Carisma.',
    },
    // Limitações
    {
      name: 'Aversão a Ferro',
      description: 'Sofre 1 ponto de dano adicional por dado de dano de ataques com armas de ferro ou aço. Sofre 1d6 de dano por rodada se estiver empunhando ou vestindo um item de ferro ou aço.',
    },
    {
      name: 'Aversão a Sinos',
      description: 'Ao ouvir o badalar de um sino, você fica nas condições alquebrado e esmorecido até o fim da cena. Em ambientes urbanos, há uma chance em seis de ouvir um sino no início de qualquer cena.',
    },
    {
      name: 'Tabu',
      description: 'Possui uma regra de comportamento que nunca pode quebrar. O tabu impõe uma penalidade de -5 em uma perícia à sua escolha (Diplomacia, Iniciativa, Luta ou Percepção). Consequências: 1º Dia de Desrespeito: Fica fatigado por um dia (condição incurável por outros meios). 2º Dia de Desrespeito: Fica exausto. 3º Dia de Desrespeito: Morte.',
    },
    {
      name: 'Sonhos Malucos (Opcional)',
      description: 'Para uma criação de personagem aleatória, role 1d3 para Natureza, 1d4 para Tamanho, 2d6 para dois bônus de +1 em atributos e 3d12 para três Presentes de Magia e de Caos. Role novamente resultados repetidos. Personagens criados assim começam com +2 Pontos de Mana.',
    },
  ],
  faithProbability: {
    AHARADAK: 0,
    OCEANO: 0,
    TENEBRA: 0,
    VALKARIA: 0,
    WYNNA: 1,
    LENA: 0,
    SSZZAAS: 0,
    THYATIS: 0,
    ARSENAL: 0,
    TANNATOH: 0,
    ALLIHANNA: 1,
    MARAH: 0,
    KALLYADRANOCH: 0,
    KHALMYR: 0,
    THWOR: 0,
    HYNINN: 1,
    AZGHER: 0,
    LINWU: 0,
    MEGALOKK: 0,
    NIMB: 1,
  },
  setup: (race, _, choices) => {
    const newRace = JSON.parse(JSON.stringify(race));
    if (!choices) {
      return newRace;
    }
    const tabuChoice = choices.tabu;
    const tamanhoChoice = choices.tamanho;
    const naturezaChoice = choices.natureza;
    const presentesChoices = choices.presentes as string[];

    if (presentesChoices) {
      const presentesAbility = newRace.abilities.find(
        (ability) => ability.name === 'Presentes de Magia e de Caos'
      );
      if (presentesAbility) {
        presentesAbility.description = `Você escolheu os seguintes presentes: ${presentesChoices.join(
          ', '
        )}.`;
      }
      const chosenPresentes = PRESENTES.filter((presente) =>
        presentesChoices.includes(presente.name)
      );
      newRace.abilities.push(...chosenPresentes);
    }

    const donsAttrs = choices.donsAttrs as Atributo[];
    const naturezaAnimalAttr = choices.naturezaAnimalAttr as Atributo;

    if (naturezaChoice) {
      const naturezaAbility = newRace.abilities.find(
        (ability) => ability.name === 'Natureza'
      );
      if (naturezaAbility) {
        naturezaAbility.description = `Sua natureza é ${naturezaChoice}.`;
      }

      switch (naturezaChoice) {
        case 'Animal':
          if (naturezaAnimalAttr) {
            const existingAttr = newRace.attributes.attrs.find(
              (a) => a.attr === naturezaAnimalAttr
            );
            if (existingAttr) {
              existingAttr.mod += 1;
            } else {
              newRace.attributes.attrs.push({ attr: naturezaAnimalAttr, mod: 1 });
            }
          }
          break;
        case 'Vegetal':
          newRace.abilities.push(
            {
              name: 'Natureza Vegetal',
              description:
                'Você é imune a atordoamento e metamorfose. É afetado por efeitos que afetam plantas monstruosas; se o efeito não tiver teste de resistência, você tem direito a um teste de Fortitude.',
            },
            {
              name: 'Florescer Feérico',
              description:
                'Uma vez por rodada, pode gastar uma quantidade de PM limitada pela sua Constituição para curar 2d8 Pontos de Vida por PM gasto no início do seu próximo turno.',
            }
          );
          break;
        case 'Mineral':
          newRace.abilities.push(
            {
              name: 'Natureza Mineral',
              description: 'Você possui imunidade a efeitos de metabolismo.',
            },
            {
              name: 'Resistência Mineral',
              description: 'Você possui Redução de Dano 5 contra corte, fogo e perfuração.',
            },
            {
              name: 'Restrição Alimentar',
              description: 'Você não se beneficia de itens da categoria alimentação.',
            }
          );
          break;
      }
    }

    if (tabuChoice) {
      const tabuAbility = newRace.abilities.find(
        (ability) => ability.name === 'Tabu'
      );
      if (tabuAbility) {
        tabuAbility.description = `Você possui uma regra de comportamento que não pode quebrar. Você sofre -5 de penalidade em ${tabuChoice}. Quebrar o tabu tem consequências severas.`;
        tabuAbility.sheetBonuses = [
          {
            source: {
              type: 'race',
              raceName: 'Duende',
            },
            target: {
              type: 'Skill',
              name: tabuChoice,
            },
            modifier: {
              type: 'Fixed',
              value: -5,
            },
          },
        ];
      }
    }

    if (tamanhoChoice) {
      const tamanhoAbility = newRace.abilities.find(
        (ability) => ability.name === 'Tamanho'
      );
      if (tamanhoAbility) {
        tamanhoAbility.description = `Seu tamanho é ${tamanhoChoice}.`;
      }

      switch (tamanhoChoice) {
        case 'Minúsculo':
          newRace.attributes.attrs.push({ attr: Atributo.FORCA, mod: -1 });
          newRace.getDisplacement = () => 6;
          newRace.getSize = () => RACE_SIZES.MINUSCULO;
          break;
        case 'Pequeno':
          newRace.getDisplacement = () => 6;
          newRace.getSize = () => RACE_SIZES.PEQUENO;
          break;
        case 'Médio':
          newRace.getDisplacement = () => 9;
          newRace.getSize = () => RACE_SIZES.MEDIO;
          break;
        case 'Grande':
          newRace.attributes.attrs.push({ attr: Atributo.DESTREZA, mod: -1 });
          newRace.getDisplacement = () => 9;
          newRace.getSize = () => RACE_SIZES.GRANDE;
          break;
      }
    }

    // Dons
    if (donsAttrs) {
      donsAttrs.forEach((attr) => {
        const existingAttr = newRace.attributes.attrs.find(
          (a) => a.attr === attr
        );
        if (existingAttr) {
          existingAttr.mod += 1;
        } else {
          newRace.attributes.attrs.push({ attr, mod: 1 });
        }
      });
    }

    return newRace;
  },
};

export default DUENDE;
